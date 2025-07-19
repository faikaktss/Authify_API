# 🔐 Node.js Authentication API (Express + Prisma)

Bu proje, Express.js tabanlı bir Node.js uygulaması olarak, web tabanlı kullanıcı kimlik doğrulama ve kullanıcı yönetim sistemi sunar.  
**Amaç**: Kullanıcıların güvenli bir şekilde kayıt olması, giriş yapması, oturumlarının korunması ve güvenli veri işlemlerinin gerçekleştirilmesini sağlamaktır.

---

## 🚀 Özellikler

- 📌 Kullanıcı kayıt sistemi (`/api/register`)
- 🔑 Kimlik doğrulama (Passport.js + `local` stratejisi)
- ✅ Oturum yönetimi (`express-session`)
- 🧾 Şifreleme (bcrypt ile parola güvenliği)
- 🔄 Oturum açıkken kullanıcı verisi gösterme
- 🔐 Güvenli çıkış (`/api/logout`)
- 🗃️ PostgreSQL + Prisma ORM kullanımı

---

## 🗂️ Proje Yapısı

```
AUTH/
│
├── prisma/
│   ├── migrations/
│   │   └── 20250719111012_init/
│   │       └── migration_lock.toml
│   └── schema.prisma        # Kullanıcı modeli ve veritabanı yapılandırması
│
├── src/
│   └── index.ts             # Ana uygulama dosyası (Express sunucusu)
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

---

## 🧠 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|----------|----------|
| **Node.js** | Sunucu ortamı |
| **Express.js** | Web sunucusu çatısı |
| **Prisma ORM** | PostgreSQL ile güçlü tip desteği |
| **Passport.js** | Kimlik doğrulama sistemi |
| **bcrypt** | Parola şifreleme |
| **dotenv** | Ortam değişkenleri yönetimi |
| **TypeScript** | Tip güvenliği için JS süper kümesi |

---

## 🧪 API Uç Noktaları

| Yöntem | URL | Açıklama |
|--------|-----|----------|
| `POST` | `/api/register` | Kullanıcı kayıt işlemi |
| `POST` | `/api/login` | Kullanıcı girişi (`passport.authenticate`) |
| `GET`  | `/api` | Giriş yapan kullanıcının bilgileri |
| `GET`  | `/api/logout` | Güvenli çıkış işlemi |
| `GET`  | `/` | Sağlık kontrolü (API çalışıyor mu?) |

---

## 🧬 Prisma Modeli

```prisma
model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  role     String
}
```

Veritabanı bağlantısı `.env` dosyasındaki `DATABASE_URL` üzerinden alınır.  
Prisma CLI ile migration yapılabilir:

```bash
npx prisma migrate dev --name init
```

---

## ⚙️ Başlatma

### 1. Kurulum

```bash
npm install
```

### 2. Ortam Değişkenleri (.env)

```
DATABASE_URL=postgresql://kullanici:sifre@localhost:5432/veritabani
SESSION_SECRET_KEY=guvenli_bir_key
```

### 3. Prisma CLI ile Veritabanı Kurulumu

```bash
npx prisma migrate dev --name init
```

### 4. Uygulama Başlatma

```bash
npm run dev
```

---

## 🔐 Güvenlik Notları

- Üretim ortamında HTTPS zorunlu olmalı.
- `SESSION_SECRET_KEY` gizli tutulmalı.
- Parola saklama her zaman `bcrypt` gibi algoritmalarla yapılmalı.

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
