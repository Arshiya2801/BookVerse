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
2️⃣ Install Dependencies
👉 Backend
bash
Copy code
cd backend
npm install
👉 Frontend
bash
Copy code
cd ../frontend
npm install
3️⃣ Configure Environment Variables
Create a .env file inside the backend folder with the following:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run the Application (Development Mode)
▶ Start Backend
bash
Copy code
cd backend
npm run dev
# Uses nodemon for auto-restart during development.
▶ Start Frontend
bash
Copy code
cd frontend
npm run dev
Frontend runs on: http://localhost:5173

Backend runs on: http://localhost:5000

5️⃣ Run in Production (Build)
⚙ Build Frontend
bash
Copy code
cd frontend
npm run build
⚙ Serve Frontend Locally
bash
Copy code
npm run preview
⚙ Start Backend in Production
bash
Copy code
cd backend
npm start
6️⃣ (Optional) Database Setup
If MongoDB is not yet configured:

Create a MongoDB Atlas cluster

Copy its connection URI and paste it into your .env file under MONGO_URI

Example:

env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookverse
📡 API Documentation
🔐 Authentication Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Log in an existing user
GET	/api/auth/profile	Get current logged-in user (requires JWT token)

📚 Book Routes
Method	Endpoint	Description
GET	/api/books	Get all books
POST	/api/books	Add a new book
GET	/api/books/:id	Get single book by ID
POST	/api/books/:id/reviews	Add a review to a book
DELETE	/api/books/:id	Delete a book (admin/owner only)

🧩 Folder Structure
bash
Copy code
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
💡 Notes
Use separate terminals for frontend and backend during development.

Ensure your MongoDB connection string is valid and accessible.

You can customize Tailwind theme or Context for additional UI improvements.

🧠 Author
Developed by [Your Name]
📧 Contact: your.email@example.com
🌐 GitHub: https://github.com/your-username
