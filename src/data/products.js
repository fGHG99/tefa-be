const produk = [
    // Pak Sugito's products
    { title: 'Cakue', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 13, quantity: 100 },
  
    // Pak Iwan's products
    { title: 'Batagor', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 12, quantity: 100 },
  
    // Ibu Yuliani's products
    { title: 'Sosis Gulung', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 9, quantity: 100 },
    { title: 'Tahu Crispy', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 9, quantity: 100 },
    { title: 'Cimol Bojot', price: 7000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 9, quantity: 100 },
    { title: 'Oreo Goreng', price: 6000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 9, quantity: 100 },
    { title: 'Jasuke', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 9, quantity: 100 },
    { title: 'Cimin', price: 4000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 9, quantity: 100 },
  
    // Pak Didi's products
    { title: 'Comro', price: 3000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Tempe', price: 2000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Bala-bala', price: 1000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Gehu', price: 1000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Molen', price: 3000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Cireng', price: 4000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Piscok', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
    { title: 'Ubi', price: 3000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 11, quantity: 100 },
  
    // Pak Atep's products
    { title: 'Siomay', price: 12000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 10, quantity: 100 },
    { title: 'Tahu Putih', price: 2000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 10, quantity: 100 },
    { title: 'Tahu Goreng', price: 2000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 10, quantity: 100 },
    { title: 'Kol', price: 3000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 10, quantity: 100 },
  
    // Pak Maman's products (Minumans)
    { title: 'Sisri', price: 3000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 7, quantity: 100 },
    { title: 'Marimas', price: 2000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 7, quantity: 100 },
    { title: 'Finto', price: 2000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 7, quantity: 100 },
    { title: 'Nutrisari', price: 3000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 7, quantity: 100 },
    { title: 'Frenta', price: 4000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 7, quantity: 100 },
    { title: 'Top Ice', price: 3000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 7, quantity: 100 },
  
    // Mas Sumandi's products
    { title: 'Cuanki', price: 15000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 8, quantity: 100 },
    { title: 'Bubur Ayam', price: 12000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 8, quantity: 100 },
  
    // Ibu Lina's products
    { title: 'Aneka Jus', price: 10000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 8, quantity: 100 },
    { title: 'Es Buah', price: 12000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 8, quantity: 100 },
  
    // Ibu Enok's products
    { title: 'Indomie', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 6, quantity: 100 },
    { title: 'Sarimi', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 6, quantity: 100 },
    { title: 'Sukses', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 6, quantity: 100 },
    { title: 'Gaga', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 6, quantity: 100 },
  
    // Ibu Irma's products
    { title: 'Basmut', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },
    { title: 'Makaroni', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },
    { title: 'Spageti', price: 12000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },
    { title: 'Seblak', price: 12000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },
    { title: 'Dimsum', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },
    { title: 'Lumpia Basah', price: 9000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },
    { title: 'Basreng', price: 3000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 5, quantity: 100 },

  
    // Ibu Iin's products
    { title: 'Bacitul', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 4, quantity: 100 },
    { title: 'Martabak Telur', price: 20000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 4, quantity: 100 },
    { title: 'Pisang Keju', price: 15000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 4, quantity: 100 },
  
    // Ibu Afika's products
    { title: 'Roti Bakar', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Roti Kukus', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Burger', price: 15000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Sosis Bakar', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Sate SeaMakanan', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Suki Bakar', price: 15000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Risol Ayam', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
    { title: 'Nugget', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 3, quantity: 100 },
  
    // Ibu Sumiyati's products
    { title: 'Pempek', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 2, quantity: 100 },
    { title: 'Eskrim', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 2, quantity: 100 },
    { title: 'Telur Gulung', price: 3000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 2, quantity: 100 },
    { title: 'Pentol', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 2, quantity: 100 },
    { title: 'Sushi', price: 12000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 2, quantity: 100 },
  
    // Ibu Kosim's products
    { title: 'Nasi Kuning', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 1, quantity: 100 },
    { title: 'Nasi Remes', price: 10000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 1, quantity: 100 },
    { title: 'Aneka Kopi & Susu Hangat', price: 15000, imgUrl: 'url_to_image', type: 'Minuman', tokoId: 1, quantity: 100 },
  
    // Koperasi products
    // { title: 'Kerupuk Putih Pedes', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kerupuk Gurilem', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Makaroni', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kentang', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kripik Bening', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Basreng', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kripik Kaca', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Pop Corn', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Pangsit', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kebab', price: 15000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Donat', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Cilok', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Mochi', price: 6000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Sosis', price: 7000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Piscok', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Pisaroma', price: 7000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Gemblong', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Gehu', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Roti Aoka', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Moring', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kripik Warna Warni', price: 6000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Kripik Pisang', price: 7000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Ciki Crunchy Potato Bee', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Ciki Crunchy Potato Twster', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Siki Rosta', price: 7000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Ciki Twist', price: 6000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Chitato', price: 6000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Chiki Ball', price: 7000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Ciki Crunchy Potato Net', price: 8000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
    // { title: 'Krupuk', price: 5000, imgUrl: 'url_to_image', type: 'Makanan', tokoId: 14, quantity: 100 },
  ];

  module.exports = produk;
  