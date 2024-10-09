const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Menambahkan seller baru
exports.addSeller = async (req, res) => {
    const { name, email, tokoName } = req.body;

    try {
        // Cek apakah toko sudah ada
        const existingToko = await prisma.toko.findUnique({
            where: {
                name: tokoName,
            }
        });

        const newSeller = await prisma.user.create({
            data: {
                name,
                email,
                role: 'SELLER', // Harus sesuai dengan enum di schema Prisma (bukan 'seller')
                password: "default_password", // Ganti ini dengan cara yang aman untuk menangani password
                toko: {
                    create: existingToko ? {} : { name: tokoName }, // Hanya buat toko baru jika tidak ada
                }
            }
        });

        res.status(201).json(newSeller);
    } catch (error) {
        console.error(error); // Log error untuk analisis lebih lanjut
        res.status(500).json({ message: "Error creating seller", error });
    }
};

// Memperbarui informasi seller
exports.updateSeller = async (req, res) => {
    const { id } = req.params;
    const { name, email, tokoName } = req.body;

    try {
        const updatedSeller = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                toko: {
                    update: {
                        name: tokoName,
                    }
                }
            }
        });

        res.status(200).json(updatedSeller);
    } catch (error) {
        console.error(error); // Log error untuk analisis lebih lanjut
        res.status(500).json({ message: "Error updating seller", error });
    }
};

// Menghapus seller berdasarkan ID
exports.deleteSeller = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        console.error(error); // Log error untuk analisis lebih lanjut
        res.status(500).json({ message: "Error deleting seller", error });
    }
};

// Mendapatkan semua seller
exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await prisma.user.findMany({
            where: { role: 'SELLER' }, // Menggunakan enum 'SELLER'
            include: { toko: true }
        });

        res.status(200).json(sellers);
    } catch (error) {
        console.error(error); // Log error untuk analisis lebih lanjut
        res.status(500).json({ message: "Error retrieving sellers", error });
    }
};

// Mendapatkan seller berdasarkan ID
exports.getSellerById = async (req, res) => {
    const { id } = req.params;

    try {
        const seller = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { toko: true }
        });

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.status(200).json(seller);
    } catch (error) {
        console.error(error); // Log error untuk analisis lebih lanjut
        res.status(500).json({ message: "Error retrieving seller", error });
    }
};

// Menambahkan produk ke toko seller
exports.addProduct = async (req, res) => {
    const { id } = req.params; // Seller ID
    const { name, description, price, stock } = req.body;

    try {
        // Cek apakah seller dan toko ada
        const seller = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { toko: true },
        });

        if (!seller || !seller.toko) {
            return res.status(404).json({ message: "Seller or toko not found" });
        }

        // Tambah produk ke toko
        const newProduct = await prisma.produk.create({
            data: {
                name,
                description,
                price,
                stock,
                tokoId: seller.toko.tokoId, // Menyimpan produk ke toko seller
            },
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error); // Log error untuk analisis lebih lanjut
        res.status(500).json({ message: "Error adding product", error });
    }
};
