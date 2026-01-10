# Sahayata Connect

Sahayata Connect is a full-stack **MERN (MongoDB, Express, React, Node.js)** web application developed for **NGO event and volunteer management**.  
The platform provides separate **User** and **Admin** portals for efficient event handling and participation tracking.

---

## 🔗 Live Project Links

- **User Website**  
  https://sahayata-connect-1b7ct7hm4-shibam-hazras-projects.vercel.app

- **Admin Panel**  
  https://sahayata-connect-ul2c.vercel.app

- **Backend API**  
  https://sahayata-connect-server.onrender.com

- **GitHub Repository**  
  https://github.com/Shibam849/Sahayata-Connect

---

## 📂 Project Structure

Sahayata-Connect/
│
├── site/ → User-facing React application
├── admin/ → Admin dashboard React application
├── server/ → Node.js & Express backend
│
├── .env.example
├── .gitignore
└── README.md


---

## ⚙️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5 & CSS3
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer (Password reset)

### Deployment
- Frontend (User & Admin): **Vercel**
- Backend API: **Render**
- Database: **MongoDB Atlas**

---

## ✨ Features

### User Module
- User registration and login
- View NGO events
- Register for events
- View registered events
- Forgot & reset password via email

### Admin Module
- Admin authentication
- Add and manage events
- View total users
- View event registrations
- Dashboard statistics

---

## 🔐 Environment Variables (Server)

Create a `.env` file inside the **server** folder:

PORT=2000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=https://sahayata-connect-1b7ct7hm4-shibam-hazras-projects.vercel.app


---

## 📌 Important Notes

- Uploaded images are stored on the backend server filesystem.  
  On platforms like **Render**, this storage is temporary and may reset on redeployment.
- Email-based password reset uses **Gmail App Passwords** for security.
- For production-scale applications, cloud storage solutions (e.g., Cloudinary, AWS S3) are recommended.

---

## 👤 Author

**Shibam Hazra**  
GitHub: https://github.com/Shibam849

---

## 📄 License

This project is developed for **educational and academic purposes**.