# QRCraft - Pembuat QR Code Modern & Profesional

Aplikasi web modern, cepat, dan elegan untuk menghasilkan **QR Code kustom berkualitas tinggi** untuk kebutuhan publik, kafe, UMKM, perkantoran, dan percetakan.

---

## 🌟 Fitur Utama

1. **Multi-Format Informasi**:
   - 🌐 **Tautan / URL Website**: Lengkap dengan validasi dan tombol uji tautan langsung.
   - 💬 **WhatsApp**: Langsung membuka percakapan dengan nomor tujuan dan pesan template otomatis.
   - 📶 **Wi-Fi Otomatis**: Pengunjung kafe / kantor cukup scan untuk langsung terhubung ke Wi-Fi (WPA/WPA2/WPA3, WEP, atau Open) tanpa mengetik kata sandi manual.
   - 👤 **vCard / Kontak Digital**: Scan untuk langsung simpan kontak ke buku telepon smartphone.
   - ✉️ **Email**: Membuka aplikasi email dengan penerima, subjek, dan draf pesan.
   - 📝 **Teks Bebas**: Teks bebas hingga ribuan karakter untuk nomor seri, catatan, atau kupon diskon.

2. **Kustomisasi Visual & Desain**:
   - **Pola Titik (Dots Style)**: Rounded, Dots, Classy, Classy Rounded, Square, Extra Rounded.
   - **Bentuk Sudut (Corner Frame & Inner Dot)**: Modern Round, Circle, Square.
   - **Warna & Gradient**: Solid atau Linear/Radial Gradient dengan color picker akurat.
   - **Palet Warna Cepat**: Hitam Klasik, Ocean Gradient, Coffee Warm, Emerald Green, Sunset Flame, Violet Neon.
   - **Logo di Tengah QR Code**: Unggah logo brand sendiri (PNG/JPG/SVG) atau gunakan ikon preset (WhatsApp, Wi-Fi, Web, Kafe Kopi, Bintang) lengkap dengan kontrol ukuran dan padding.
   - **Koreksi Kesalahan (Error Correction)**: Tingkat L (7%), M (15%), Q (25%), dan H (30%) agar QR code tetap terbaca meski tertutup logo atau tergores saat dicetak.

3. **Format Download & Percetakan**:
   - **PNG**: Resolusi 512px (Web), 1024px (HD Dokumen), dan 2048px (Ultra HD 4K untuk spanduk/packaging).
   - **SVG Vektor**: Format lossless berbasis vektor, tidak akan pernah pecah untuk percetakan skala besar (Adobe Illustrator, CorelDraw, Canva).
   - **JPEG & WebP**: Pilihan kompresi ringan.
   - **Salin ke Papan Klip (Copy to Clipboard)**: Salin langsung gambar PNG tanpa perlu mendownload file.

4. **100% Client-Side & Privasi Terjamin**:
   - Seluruh proses pembuatan QR code berjalan langsung di browser pengguna.
   - Tidak ada data sensitif (password Wi-Fi, kontak, dll.) yang dikirim atau disimpan ke server mana pun.

---

## 🚀 Menjalankan Secara Lokal

```bash
# Masuk ke direktori
cd qr-craft

# Jalankan server pengembangan
npm run dev
```

Buka browser di `http://localhost:5173/`

---

## 📦 Build untuk Produksi

```bash
npm run build
```

Hasil build akan berada di folder `dist/`.

---

## 🌐 Cara Deploy Gratis ke Publik

### 1. Vercel (Paling Direkomendasikan)
1. Buat akun di [Vercel](https://vercel.com).
2. Install Vercel CLI atau sambungkan repository GitHub Anda.
3. Jalankan `npx vercel` di terminal folder `qr-craft`.
4. Website langsung aktif dengan domain `.vercel.app` dan HTTPS gratis!

### 2. Netlify
1. Buka [Netlify Drop](https://app.netlify.com/drop).
2. Cukup drag-and-drop folder `dist` yang telah di-build.
3. Website langsung aktif seketika.

### 3. GitHub Pages
1. Pasang package `gh-pages`: `npm install -D gh-pages`
2. Tambahkan script `"deploy": "gh-pages -d dist"` di `package.json`.
3. Jalankan `npm run build && npm run deploy`.
