# 📝 Inkwell (Blog Application)

A modern blogging platform built with **Next.js + TypeScript (frontend)** and **Express + TypeScript (backend)**.  
The app supports authentication, profile management, creating/editing/deleting blogs, admin side management and more.

---

## 🚀 Tech Stack
- **Frontend:** Next.js 14, TypeScript, Redux, TailwindCSS, shadcn/ui  
- **Backend:** Express.js, TypeScript, MongoDB, Mongoose  
- **Deployment:**  
  - Frontend → Vercel 
  - Backend → Render

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/afeefakvt/Inkwell.git
cd Inkwell
```

2. **Setup Backend**

```bash
cd backend
npm install
```
Create a .env file in backend/ with:

```bash
PORT=3001
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

Build and run:

```bash
npm run build
npm start

```
Backend runs at 👉 http://localhost:3001.

3. **Setup Frontend**

```bash
cd frontend
npm isntall
```

Create a .env.local file in frontend/ with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
Start the dev server:

```bash
npm run dev
```
Frontend runs at 👉 http://localhost:3000.
