const { prisma } = require('../../utils/prisma');
const QRCode = require('qrcode');

// Create a new order
async function createOrder(req, res) {
    const { userId, tokoId, items } = req.body;

    try {
        // Fetch the products and their prices
        const productIds = items.map(item => item.id);
        const products = await prisma.produk.findMany({
            where: { id: { in: productIds } },
        });

        // Map product prices for easy lookup
        const productPrices = new Map(products.map(product => [product.id, product.price]));

        // Calculate total price based on the prices from the Produk table
        let totalAmount = items.reduce((sum, item) => {
            const productPrice = productPrices.get(item.id);
            return sum + (productPrice * item.quantity); // Multiply price by quantity
        }, 0);

        // Fetch the admin fee from the Config table
        const adminFeeConfig = await prisma.config.findUnique({
            where: { key: 'adminFee' },
        });

        const adminFee = adminFeeConfig ? adminFeeConfig.value : 0;

        // Add admin fee to the total amount
        totalAmount += adminFee;

        // Create the order
        const order = await prisma.order.create({
            data: {
                userId,
                tokoId,
                total: totalAmount,
                status: 'Pending', // Order starts with 'Pending' status
                items: {
                    create: items.map(item => ({
                        produkId: item.id, // Use 'id' as per your Produk model
                        quantity: item.quantity,
                        price: productPrices.get(item.id), // Use price from Produk table
                    })),
                },
            },
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
}

// Update the status of an order and generate QR Code if status is 'Ready'
async function updateOrderStatus(req, res) {
    const { orderId, status } = req.body;

    try {
        // Update the order status
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });

        // If the status is 'Ready', generate and store the QR code
        if (status === 'Ready') {
            const qrCodeUrl = await generateQRCode(orderId);

            // Store the generated QR code in the database
            await prisma.qRCode.create({
                data: {
                    orderId: orderId,
                    qrCodeUrl,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // QR code expires in 10 minutes
                    status: 'active',
                },
            });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
}

// Generate QR code based on order details
async function generateQRCode(orderId) {
    try {
        // Fetch the order and related data
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: true,
                items: true,
            },
        });

        // Data to be included in the QR code
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

        // Convert the data to JSON string and generate the QR code
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData));
        return qrCodeUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('QR code generation failed');
    }
}

// Mark order as ready and generate QR code if necessary
async function markOrderReady(req, res) {
    const { orderId } = req.body;

    try {
        // Update order status to 'Ready'
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status: 'Ready' },
        });

        // Generate and store QR code when the order is ready
        const qrCodeUrl = await generateQRCode(orderId);
        await prisma.qRCode.create({
            data: {
                orderId: orderId,
                qrCodeUrl,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000), // QR code expires in 10 minutes
                status: 'active',
            },
        });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark order as ready' });
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
    markOrderReady,
    completeOrder,
};
