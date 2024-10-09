const { prisma } = require('../../utils/prisma');
const QRCode = require('qrcode');

// Create new orders for each Toko (merchant) involved
const createOrder = async (userId, cartItems) => {
    console.log("Creating order for user:", userId, "with items:", cartItems); // Debugging log

    try {
        // Fetch the products and their prices
        const productIds = cartItems.map(item => item.produkId); // Ambil produkId dari cartItems
        const products = await prisma.produk.findMany({
            where: { id: { in: productIds } },
        });

        // Check if products are found
        if (products.length === 0) {
            console.error("No products found for the given IDs:", productIds);
            throw new Error('No products found for the provided item IDs');
        }

        // Group items by Toko (merchant)
        const itemsByToko = cartItems.reduce((acc, item) => {
            const product = products.find(p => p.id === item.produkId);
            const tokoId = product?.tokoId; // Use optional chaining to prevent errors

            if (!tokoId) {
                console.error("Product does not have a tokoId:", product);
                return acc; // Skip if tokoId is not found
            }

            if (!acc[tokoId]) acc[tokoId] = [];
            acc[tokoId].push({ ...item, price: product.price });
            return acc;
        }, {});

        const orders = [];

        // Fetch the admin fee from the Config table
        const adminFeeConfig = await prisma.config.findUnique({
            where: { key: 'adminFee' },
        });

        const adminFee = adminFeeConfig ? parseFloat(adminFeeConfig.value) : 0; // Pastikan adminFee di parsing ke float

        // Create separate orders for each Toko
        for (const tokoId in itemsByToko) {
            const tokoItems = itemsByToko[tokoId];

            // Calculate total amount for each order
            let totalAmount = tokoItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalAmount += adminFee;

            // Create the order
            const order = await prisma.order.create({
                data: {
                    userId: userId,
                    tokoId: tokoId,
                    total: totalAmount,
                    status: 'Pending', // Order starts with 'Pending' status
                    items: {
                        create: tokoItems.map(item => ({
                            produkId: item.produkId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
            });
            
            orders.push(order);
        }

        return orders; // Kembalikan orders yang telah dibuat
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create orders');
    }
};

// Generate QR code based on order details
async function generateQRCode(orderId) {
    try {
        // Fetch the order and related data
        const order = await prisma.order.findUnique({
            where: { orderId }, // Change 'id' to 'orderId'
            include: {
                user: true,
                items: true,
            },
        });

        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }

        // Data to be included in the QR code
        const qrData = {
            orderId: order.orderId,
            userId: order.userId,
            total: order.total,
            status: order.status,
            items: order.items.map(item => ({
                produkId: item.produkId,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        // Generate the QR code as a data URL
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData));
        return qrCodeUrl;
    } catch (error) {
        console.error('Error generating QR code:', error.message);
        throw new Error('QR code generation failed');
    }
}

// Update the order status and handle logic based on status
async function updateOrderStatus(req, res) {
    const { orderId, status } = req.body;

    try {
        // Ensure the status is valid
        if (!["Pending", "Processing", "Ready", "Completed", "Cancelled"].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        // Retrieve the current order
        const order = await prisma.order.findUnique({
            where: { orderId },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check the logic for status transitions
        if (order.status === 'Pending' && status === 'Cancelled') {
            // Merchant cancels the order
            await prisma.order.update({
                where: { orderId },
                data: { status: 'Cancelled' },
            });
        } else if (order.status === 'Pending' && status === 'Processing') {
            // Merchant accepts the order and moves it to processing
            await prisma.order.update({
                where: { orderId },
                data: { status: 'Processing' },
            });
        } else if (order.status === 'Processing' && status === 'Ready') {
            // Merchant marks order as ready
            await prisma.order.update({
                where: { orderId },
                data: { status: 'Ready' },
            });

            // Generate QR code and store it
            const qrCodeUrl = await generateQRCode(orderId);
            await prisma.qRCode.create({
                data: {
                    orderId,
                    qrCodeUrl,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
                    status: 'active',
                },
            });
        } else if (order.status === 'Ready' && status === 'Completed') {
            // User scans QR code within time limit, mark order as completed
            await prisma.order.update({
                where: { orderId },
                data: { status: 'Completed' },
            });

            // Expire the QR code
            await prisma.qRCode.update({
                where: { orderId },
                data: { status: 'expired' },
            });
        } else {
            return res.status(400).json({ error: 'Invalid status transition' });
        }

        res.status(200).json({ message: `Order status updated to ${status}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
}

// Complete the order and expire QR code
async function completeOrder(req, res) {
    const { orderId } = req.body;

    try {
        // Update order status to 'Completed'
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status: 'Completed' },
        });

        // Mark the QR code as expired
        await prisma.qRCode.update({
            where: { orderId: orderId },
            data: { status: 'expired' },
        });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete order' });
    }
}

module.exports = {
    createOrder,
    updateOrderStatus,
    completeOrder,
};
