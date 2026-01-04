# AI Job Portal

A full-stack Job Portal application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to search for jobs, apply, and for recruiters to post job openings.

## 🚀 Live Links

- **Frontend (Netlify):** [Click Here](https://jobporta2026.netlify.app/)
- **GitHub Pages:** [Click Here](https://lomashsrivastava.github.io/AI-Job-Portal/) *(Replace if different)*
- **Backend (Railway):** [Click Here](https://ai-job-portal-production-926a.up.railway.app/)

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS, Shadcn UI (Radix UI)
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** Sonner

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, Bcrypt
- **File Uploads:** Cloudinary, Multer, DataURI
- **CORS:** Enabled for secure cross-origin requests

## ✨ Features

- **User Authentication:** Secure Login/Signup for Seekers and Recruiters.
- **Job Search:** Filter jobs by keywords, location, and industry.
- **Job Posting:** Recruiters can post, edit, and manage job listings.
- **Application System:** Users can apply to jobs with resumes.
- **Responsive Design:** Fully responsive UI/UX using Tailwind CSS.
- **Real-time Notifications:** Instant feedback using Sonner.

## 📂 Project Structure

```bash
/
├── frontend/         # React Frontend
│   ├── src/
│   ├── public/
│   └── ...
├── backend/          # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
└── ...
```

## 🚀 Deployment Instructions

### 1. Backend (Render)
1. Push this repository to GitHub.
2. Go to [Render](https://render.com/).
3. Create a new **Web Service**.
4. Connect your GitHub repository.
5. Set `Root Directory` to `backend`.
6. Set `Build Command` to `npm install`.
7. Set `Start Command` to `npm start`.
8. Add Environment Variables from your `.env` file (MONGO_URI, SECRET_KEY, CLOUDINARY_*, etc.).

### 2. Frontend (Netlify)
1. Go to [Netlify](https://www.netlify.com/).
2. "Import from Git".
3. Connect your GitHub repository.
4. Set `Base directory` to `frontend`.
5. Set `Build command` to `npm run build`.
6. Set `Publish directory` to `dist`.
7. **Important:** Create a `_redirects` file in `frontend/public` with the content `/* /index.html 200` to handle client-side routing, or configure redirects in Netlify settings.

### 3. GitHub Pages (Optional for Frontend)
1. Update `frontend/package.json` with `"homepage": "https://lomashsrivastava.github.io/AI-Job-Portal"`.
2. Install `gh-pages`: `npm install gh-pages --save-dev`.
3. Add deploy script: `"deploy": "gh-pages -d dist"`.
4. Run `npm run build && npm run deploy`.

## 📧 Contact

**Author:** Lomash Srivastava  
**GitHub:** [lomashsrivastava](https://github.com/lomashsrivastava)
