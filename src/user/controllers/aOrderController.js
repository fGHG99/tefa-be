const { prisma } = require('../../utils/Prisma');
const QRCode = require('qrcode');
const { protect, authorizeRoles } = require('../middlewares/aMiddleware'); // Import middleware

// Create new orders for each Toko (merchant) involved
const createOrder = async (req, res) => {
    const { userId } = req.user; // Get userId from authenticated user
    const { cartItems, deliveryMethod, address, recipientName, paymentMethod } = req.body;
    
    console.log("Creating order for user:", userId, "with items:", cartItems); // Debugging log

    if (!deliveryMethod || !recipientName || !paymentMethod) {
        return res.status(400).json({ error: 'Delivery method, recipient name, and payment method are required.' });
    }

    if (deliveryMethod === 'delivery' && !address) {
        return res.status(400).json({ error: 'Address is required for delivery.' });
    }

    try {
        // Fetch the products and their prices
        const productIds = cartItems.map(item => item.produkId);
        const products = await prisma.produk.findMany({
            where: { id: { in: productIds } },
        });

        // Check if products are found
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found for the provided item IDs' });
        }

        // Group items by Toko (merchant)
        const itemsByToko = cartItems.reduce((acc, item) => {
            const product = products.find(p => p.id === item.produkId);
            const tokoId = product?.tokoId; 

            if (!tokoId) return acc;
            if (!acc[tokoId]) acc[tokoId] = [];
            acc[tokoId].push({ ...item, price: product.price });
            return acc;
        }, {});

        const orders = [];
        const adminFeeConfig = await prisma.config.findUnique({
            where: { key: 'adminFee' },
        });
        const adminFee = adminFeeConfig ? parseFloat(adminFeeConfig.value) : 0;

        // Create separate orders for each Toko
        for (const tokoId in itemsByToko) {
            const tokoItems = itemsByToko[tokoId];
            let totalAmount = tokoItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalAmount += adminFee;

            const order = await prisma.order.create({
                data: {
                    userId: userId,
                    tokoId: tokoId,
                    total: totalAmount,
                    status: 'Pending',
                    deliveryMethod: deliveryMethod,
                    address: deliveryMethod === 'delivery' ? address : null,
                    recipientName: recipientName,
                    paymentMethod: paymentMethod,
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

            sendNotification(order.userId, `Pesanan Anda dengan ID: ${order.id} sudah siap!`);
            sendNotificationToToko(order.tokoId, `Pesanan dengan ID: ${order.id} sudah siap di toko Anda!`);
        }

        return res.status(201).json(orders);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: 'Failed to create orders' });
    }
};

// Generate QR code based on order details
async function generateQRCode(orderId) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: true,
                items: true,
            },
        });

        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }

        const qrData = {
            orderId: order.id,
            userId: order.userId,
            total: order.total,
            status: order.status,
            items: order.items.map(item => ({
                produkId: item.produkId,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData));
        return qrCodeUrl;
    } catch (error) {
        console.error('Error generating QR code:', error.message);
        throw new Error('QR code generation failed');
    }
}

// Update the order status
async function updateOrderStatus(req, res) {
    const { orderId, status } = req.body;

    try {
        if (!["Pending", "Processing", "Ready", "Completed", "Cancelled"].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const order = await prisma.order.findUnique({ where: { id: orderId } });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status === 'Pending' && status === 'Cancelled') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'Cancelled' },
            });
        } else if (order.status === 'Pending' && status === 'Processing') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'Processing' },
            });
        } else if (order.status === 'Processing' && status === 'Ready') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'Ready' },
            });

            const qrCodeUrl = await generateQRCode(orderId);
            await prisma.qRCode.create({
                data: {
                    orderId,
                    qrCodeUrl,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                    status: 'active',
                },
            });
        } else if (order.status === 'Ready' && status === 'Completed') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'Completed' },
            });

            await prisma.qRCode.update({
                where: { orderId: orderId },
                data: { status: 'expired' },
            });
        } else {
            return res.status(400).json({ error: 'Invalid status transition' });
        }

        return res.status(200).json({ message: `Order status updated to ${status}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update order status' });
    }
}

// Complete the order
async function completeOrder(req, res) {
    const { orderId } = req.body;

    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status: 'Completed' },
        });

        await prisma.qRCode.update({
            where: { orderId: orderId },
            data: { status: 'expired' },
        });

        sendNotification(order.userId, `Pesanan Anda dengan ID: ${orderId} telah selesai!`);

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to complete order' });
    }
}

module.exports = {
    createOrder: [protect, authorizeRoles('USER'), createOrder], // Apply middleware here
    updateOrderStatus: [protect, authorizeRoles('USER'), updateOrderStatus], // Apply middleware here
    completeOrder: [protect, authorizeRoles('USER'), completeOrder], // Apply middleware here
};
