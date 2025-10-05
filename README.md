# 📚 BookVerse – MERN Book Review Platform

*BookVerse* is a full-stack *MERN application* where users can explore, add, and review books.  
It provides *secure authentication, a **modern dark/light interface*, and smooth interaction between frontend and backend.

---

## 🚀 Features

### 👤 Authentication
- Signup, Login, and Logout functionality  
- Secure *JWT-based authentication*  
- User-specific *profile page*

### 📘 Book Management
- Add new books with *genre, **author, and **rating*
- View a complete list of all books  
- Add and edit *reviews*
- Automatic *average rating calculation*

### 🌗 Dark Mode
- Built-in *theme switcher* using *React Context API*

### 🔍 *Search and Sort*
  - Search books by title, author, or genre
  - Sort books by rating, date added, or alphabetically
---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| *Frontend* | React.js, Vite, Tailwind CSS, Axios |
| *State Management* | React Context API |
| *Backend* | Node.js, Express.js |
| *Database* | MongoDB, Mongoose |
| *Authentication* | JWT (JSON Web Token), bcrypt.js |

---

## ⚙ Setup Instructions (Run Step-by-Step)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse
```
### 2️⃣ Install Dependencies
👉 Backend

Copy code
bash
```
cd backend
npm install
```

👉 Frontend
Copy code
bash
```
cd ../frontend
npm install
```

###3️⃣ Configure Environment Variables
Create a .env file inside the backend folder with the following:

env
Copy code
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

###4️⃣ Run the Application (Development Mode)
▶ Start Backend
bash
```
npm run dev
```
Uses nodemon for auto-restart during development.

▶ Start Frontend
bash
```
npm run dev
```
Frontend runs on: http://localhost:5173

Backend runs on: http://localhost:5000



🧩 Folder Structure
bash
```
bookverse/
 ├── backend/
 │   ├── models/
 │   ├── routes/
 │   ├── controllers/
 │   ├── server.js
 │   └── .env
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── context/
 │   │   ├── App.jsx
 │   │   └── main.jsx
 │   └── tailwind.config.js
 └── README.md
```
💡 Notes
Use separate terminals for frontend and backend during development.

Ensure your MongoDB connection string is valid and accessible.

You can customize Tailwind theme or Context for additional UI improvements.

🧠 Author
Developed by [Arshiya SIngh]
📧 Contact: singh.arshiya128@gmail.com
🌐 GitHub: [https://github.com/your-username](https://github.com/Arshiya2801/BookVerse)
