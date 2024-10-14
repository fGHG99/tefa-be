const produk = [
   // Pak Sugito's products
   { title: 'Cakue', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Sugito', quantity: 100, tokoId: '35856bf0-b28b-4172-a708-4be21045e5de' },

   // Pak Iwan's products
   { title: 'Batagor', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Iwan', quantity: 100, tokoId: 'ddd01a16-4e62-4fe9-9e49-b42d88cf848d' },

   // Ibu Yuliani's products
   { title: 'Sosis Gulung', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Yuliani', quantity: 100, tokoId: '5d9e3255-f2ed-457f-a6c0-d149da6966fa' },
   { title: 'Tahu Crispy', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Yuliani', quantity: 100, tokoId: '5d9e3255-f2ed-457f-a6c0-d149da6966fa' },
   { title: 'Cimol Bojot', price: 7000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Yuliani', quantity: 100, tokoId: '5d9e3255-f2ed-457f-a6c0-d149da6966fa' },
   { title: 'Oreo Goreng', price: 6000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Yuliani', quantity: 100, tokoId: '5d9e3255-f2ed-457f-a6c0-d149da6966fa' },
   { title: 'Jasuke', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Yuliani', quantity: 100, tokoId: '5d9e3255-f2ed-457f-a6c0-d149da6966fa' },
   { title: 'Cimin', price: 4000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Yuliani', quantity: 100, tokoId: '5d9e3255-f2ed-457f-a6c0-d149da6966fa' },

   // Pak Didi's products
   { title: 'Comro', price: 3000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Tempe', price: 2000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Bala-bala', price: 1000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Gehu', price: 1000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Molen', price: 3000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Cireng', price: 4000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Piscok', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },
   { title: 'Ubi', price: 3000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Didi', quantity: 100, tokoId: 'aed53731-2541-4f3c-9847-ae159a2a4da4' },

   // Pak Atep's products
   { title: 'Siomay', price: 12000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Atep', quantity: 100, tokoId: 'd91b65e0-9dad-4b13-8034-ed8ffd73f80d' },
   { title: 'Tahu Putih', price: 2000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Atep', quantity: 100, tokoId: 'd91b65e0-9dad-4b13-8034-ed8ffd73f80d' },
   { title: 'Tahu Goreng', price: 2000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Atep', quantity: 100, tokoId: 'd91b65e0-9dad-4b13-8034-ed8ffd73f80d' },
   { title: 'Kol', price: 3000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Pak Atep', quantity: 100, tokoId: 'd91b65e0-9dad-4b13-8034-ed8ffd73f80d' },

   // Pak Maman's products (Beverages)
   { title: 'Sisri', price: 3000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Pak Maman', quantity: 100, tokoId: '5b296861-a3f8-42a2-98a5-5c5243b768ef' },
   { title: 'Marimas', price: 2000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Pak Maman', quantity: 100, tokoId: '5b296861-a3f8-42a2-98a5-5c5243b768ef' },
   { title: 'Finto', price: 2000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Pak Maman', quantity: 100, tokoId: '5b296861-a3f8-42a2-98a5-5c5243b768ef' },
   { title: 'Nutrisari', price: 3000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Pak Maman', quantity: 100, tokoId: '5b296861-a3f8-42a2-98a5-5c5243b768ef' },
   { title: 'Frenta', price: 4000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Pak Maman', quantity: 100, tokoId: '5b296861-a3f8-42a2-98a5-5c5243b768ef' },
   { title: 'Top Ice', price: 3000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Pak Maman', quantity: 100, tokoId: '5b296861-a3f8-42a2-98a5-5c5243b768ef' },

   // Mas Sumandi's products
   { title: 'Cuanki', price: 15000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Mas Sumandi', quantity: 100, tokoId: '5b9993ee-bcdc-4914-be77-65f336fbb2fa' },
   { title: 'Bubur Ayam', price: 12000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Mas Sumandi', quantity: 100, tokoId: '5b9993ee-bcdc-4914-be77-65f336fbb2fa' },
   { title: 'Ayam Penyet', price: 15000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Mas Sumandi', quantity: 100, tokoId: '5b9993ee-bcdc-4914-be77-65f336fbb2fa' },
   { title: 'Nasi Kuning', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Mas Sumandi', quantity: 100, tokoId: '5b9993ee-bcdc-4914-be77-65f336fbb2fa' },

    // Ibu Lina's products
    { title: 'Aneka Jus', price: 10000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Ibu Lina', quantity: 100, tokoId: '5bf50237-b0e3-4d8c-9f20-2242e0d1f975' },
    { title: 'Es Buah', price: 12000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Ibu Lina', quantity: 100, tokoId: '5bf50237-b0e3-4d8c-9f20-2242e0d1f975' },

       // Ibu Enok's products
{ title: 'Indomie', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Enok', quantity: 100, tokoId: '66c7e87a-d63f-4add-9440-60d8ea2937355' },
{ title: 'Sarimi', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Enok', quantity: 100, tokoId: '66c7e87a-d63f-4add-9440-60d8ea2937355' },
{ title: 'Sukses', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Enok', quantity: 100, tokoId: '66c7e87a-d63f-4add-9440-60d8ea2937355' },
{ title: 'Gaga', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Enok', quantity: 100, tokoId: '66c7e87a-d63f-4add-9440-60d8ea2937355' },

// Ibu Irma's products
{ title: 'Basmut', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },
{ title: 'Makaroni', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },
{ title: 'Spageti', price: 12000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },
{ title: 'Seblak', price: 12000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },
{ title: 'Dimsum', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },
{ title: 'Lumpia Basah', price: 9000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },
{ title: 'Basreng', price: 3000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Irma', quantity: 100, tokoId: '54320456-bd55-4600-8d83-9bd7445799cc' },

// Ibu Iin's products
{ title: 'Bacitul', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Iin', quantity: 100, tokoId: '4ec2b101-ddba-45a1-8ab8-ee405e2d242d' },
{ title: 'Martabak Telur', price: 20000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Iin', quantity: 100, tokoId: '4ec2b101-ddba-45a1-8ab8-ee405e2d242d' },
{ title: 'Pisang Keju', price: 15000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Iin', quantity: 100, tokoId: '4ec2b101-ddba-45a1-8ab8-ee405e2d242d' },
{ title: 'Martabak Manis', price: 20000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Iin', quantity: 100, tokoId: '4ec2b101-ddba-45a1-8ab8-ee405e2d242d' },
{ title: 'Mie Goreng', price: 7000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Iin', quantity: 100, tokoId: '4ec2b101-ddba-45a1-8ab8-ee405e2d242d' },
{ title: 'Satu Telur', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Iin', quantity: 100, tokoId: '4ec2b101-ddba-45a1-8ab8-ee405e2d242d' },

// Ibu Afika's products
{ title: 'Roti Bakar', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Roti Kukus', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Burger', price: 15000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Sosis Bakar', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Sate SeaFood', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Suki Bakar', price: 15000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Risol Ayam', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },
{ title: 'Nugget', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Afika', quantity: 100, tokoId: 'fd2b7c44-aa05-4654-8e7a-8602e7e3bca' },


      
        // Ibu Sumiyati's products
{ title: 'Pempek', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Sumiyati', quantity: 100, tokoId: '275b2cb7-d431-4002-b559-0873b7ef0a79' },
{ title: 'Eskrim', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Sumiyati', quantity: 100, tokoId: '275b2cb7-d431-4002-b559-0873b7ef0a79' },
{ title: 'Telur Gulung', price: 3000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Sumiyati', quantity: 100, tokoId: '275b2cb7-d431-4002-b559-0873b7ef0a79' },
{ title: 'Pentol', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Sumiyati', quantity: 100, tokoId: '275b2cb7-d431-4002-b559-0873b7ef0a79' },
{ title: 'Sushi', price: 12000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Sumiyati', quantity: 100, tokoId: '275b2cb7-d431-4002-b559-0873b7ef0a79' },

// Ibu Kosim's products
{ title: 'Nasi Kuning', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Kosim', quantity: 100, tokoId: '5efbdd22-c8c5-42d7-80c4-785ba1ced947' },
{ title: 'Nasi Remes', price: 10000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Kantin Ibu Kosim', quantity: 100, tokoId: '5efbdd22-c8c5-42d7-80c4-785ba1ced947' },
{ title: 'Aneka Kopi & Susu Hangat', price: 15000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Kantin Ibu Kosim', quantity: 100, tokoId: '5efbdd22-c8c5-42d7-80c4-785ba1ced947' },
      
// Koperasi Siswa products
{ title: 'Kerupuk Putih Pedes', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kerupuk Gurilem', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Makaroni', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kentang', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kripik Bening', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Basreng', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kripik Kaca', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Pop Corn', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Pangsit', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kebab', price: 15000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Donat', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Cilok', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Mochi', price: 6000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Sosis', price: 7000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Piscok', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Pisaroma', price: 7000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Gemblong', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Gehu', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Roti Aoka', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Moring', price: 5000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kripik Warna Warni', price: 6000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Kripik Pisang', price: 7000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Ciki Crunchy Potato Bee', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Ciki Crunchy Potato Twster', price: 8000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Siki Rosta', price: 7000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Ciki Twist', price: 6000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },
{ title: 'Chitato', price: 6000, imgUrl: 'url_to_image', type: 'Food', tokoName: 'Koperasi Siswa', quantity: 100, tokoId: 'f5000de8-6b4c-43bd-b4e5-1e5138f87a16' },

        //Hydro 4
        { title: 'Hydro 4 Gallon Water', price: 5000, imgUrl: 'url_to_image', type: 'Beverage', tokoName: 'Hydro 4', quantity: 100, tokoId: '6a9c9c7d-88f8-4668-8959-b25cafe2a0e8' },
      ];

  module.exports = produk;
  