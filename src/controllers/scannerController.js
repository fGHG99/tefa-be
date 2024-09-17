const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function scanQRCode(req, res) {
    const { qrCodeUrl } = req.body;

    try {
        console.log('QR Code URL received:', qrCodeUrl); // Log received URL
        
        // Cari QR Code di database berdasarkan qrCodeUrl
        const qrCode = await prisma.qRCode.findUnique({
            where: { qrCodeUrl: qrCodeUrl },
            include: { order: true }
        });

        console.log('QR Code from DB:', qrCode); // Log the QR code found in the DB

        if (!qrCode) {
            return res.status(404).json({ error: 'QR Code tidak ditemukan' });
        }

        // Cek apakah QR Code sudah expired
        const now = new Date();
        if (qrCode.expiresAt < now || qrCode.status === 'expired') {
            return res.status(400).json({ error: 'QR Code sudah expired' });
        }

        // Ambil informasi order terkait
        const order = qrCode.order;

        if (!order) {
            return res.status(404).json({ error: 'Order terkait tidak ditemukan' });
        }

        // Pastikan status order sudah Ready, baru bisa dipindai untuk diambil
        if (order.status !== 'Ready') {
            return res.status(400).json({ error: 'Pesanan belum siap diambil' });
        }

        // Update status order menjadi Completed setelah QR Code dipindai
        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: { status: 'Completed' }
        });

        console.log('Order updated to Completed:', updatedOrder); // Log the updated order

        // Update status QR Code menjadi expired setelah dipindai
        const updatedQRCode = await prisma.qRCode.update({
            where: { id: qrCode.id },
            data: { status: 'expired' }
        });

        console.log('QR Code updated to expired:', updatedQRCode); // Log the updated QR code

        res.status(200).json({ message: 'Pesanan berhasil diselesaikan dan QR Code sudah expired' });
    } catch (error) {
        console.error('Error during QR code scanning:', error); // Log the full error
        res.status(500).json({ error: 'Gagal memproses QR Code', details: error.message });
    }
}

module.exports = { scanQRCode };
