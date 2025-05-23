# Trezo Dashboard

Trezo Dashboard adalah aplikasi dashboard analitik berbasis Angular yang digunakan untuk memantau performa campaign, konversi, statistik, dan aktivitas user secara real-time. Dashboard ini mendukung tampilan responsif (mobile & desktop) dan dark mode.

## Fitur Utama
- **Live Reports**: Melihat klik dan konversi secara real-time.
- **Statistics**: Statistik performa campaign dan user.
- **Conversions**: Daftar konversi terbaru dengan filter tanggal.
- **Performs**: Analisis performa berdasarkan SUB ID.
- **Short Gen**: Fitur tambahan untuk kebutuhan campaign.
- **Sidebar Responsif**: Sidebar otomatis menutup di mobile saat menu diklik, tetap terbuka di desktop.
- **Dark/Light Mode**: Tampilan otomatis menyesuaikan mode gelap/terang.
- **Custom Congratulations Box**: Box ucapan selamat dengan highlight SUB ID terbaik bulan ini.

## Teknologi
- **Angular 18+**
- **Tailwind CSS**
- **NgScrollbar**
- **TypeScript**

## Cara Menjalankan Lokal
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server development:
   ```bash
   npm start
   # atau
   ng serve
   ```
3. Buka browser ke `http://localhost:4200/`

## Build Production
Untuk build versi production:
```bash
npm run build -- --configuration=production
```
Hasil build ada di folder `dist/trezo`.

## Deploy ke Hosting
- **Static Hosting (cPanel, Netlify, Vercel):**
  Upload seluruh isi folder `dist/trezo` ke public_html atau root hosting Anda.
- **VPS (Nginx/Apache):**
  Copy isi `dist/trezo` ke web root. Tambahkan .htaccess berikut agar routing Angular berjalan:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_URI} ^/$
  RewriteRule ^$ /authentication [L,R=302]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

## Catatan Penting
- **Sidebar:**
  - Di mobile, sidebar otomatis menutup saat menu diklik.
  - Di desktop, sidebar tetap terbuka saat menu diklik.
- **Box Congratulations:**
  - Warna dan layout sudah dioptimalkan untuk mobile & desktop.
- **Customisasi:**
  - Untuk perubahan warna, layout, dan logic, edit file di folder `src/app/dashboard` dan `src/styles.scss`.

---

Untuk pertanyaan lebih lanjut, silakan kontak developer atau cek dokumentasi Angular CLI.