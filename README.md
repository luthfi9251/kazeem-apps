# Kazeem App

Aplikasi Manajemen Pondok Pesantren

Fitur

-   [x] Autentikasi
-   [x] Manajemen User
-   [x] Manajemen Santri
-   [x] Manajemen Wali Santri
-   [x] Manajemen Kemadrasahan (Kelola Kelas, Tahun Ajar)
-   [x] Manajemen Pelanggaran Santri

## Installation

> [!NOTE]
> Insyaallah App ini akan di Dockerize ASAP.

1. Pastikan node js sudah terinstall (development menggunakan node v18.17).
    ```bash
    node --version
    ```
2. Clone repository ini
3. Jalankan npm install
    ```bash
    npm install
    ```
4. Jika terdapat opsi init `shadcn`, pilih `Y`
5. Pastikan sudah terdapat database postgresql yang berjalan
6. isi file `.env` sesuai dengan example
7. Jalankan migrasi database
    ```bash
    npx prisma db push
    ```
8. Jalankan perintah `npm run build`
9. Jalankan perintah `npm start` untuk menjalankan server

> [!NOTE]
> Setelah dijalankan silahkan menuju halaman /login dan login dengan credential default admin sbb email : `admin@admin.com` password : `passwordadmin`

## Testing

### Inisialisasi

App ini menggunakan Cypress sebagai testing library E2E, untuk menjalankan testing berikut adalah hal yang perlu dilakukan:

1. Menjalankan server web terlebih dahulu dengan command `npm start` atau `npm run dev`
2. Menjalankan server Cypress dengan perintah `npm run cypress:open`
3. Jendela baru akan terbuka

### Run Unit Test

Testing bersifat E2E
atau End to End yang berarti hanya menguji tiap flow dari aplikasi Kazeem, untuk saat ini, unit testing sudah mencakup fitur:

-   [x] Create, Read, Update, Delete Data Santri
-   [x] Create, Read, Update, Delete Data Wali Santri
-   [x] Create, Read, Update, Delete Data Kelas
-   [x] Create, Read, Update, Delete Data Tahun Ajar
-   [x] Create, Read, Update, Delete Data Pelanggaran dan Kategori Pelanggaran
-   added soon

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
