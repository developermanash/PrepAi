# 🧠 PrepAI – AI-Powered Interview Preparation Platform

PrepAI is a full-stack web application that helps users prepare for technical interviews using generative AI. Built with the Gemini API, it allows users to customize interview sessions based on their target role, years of experience, and focus areas.

---

## 🌍 Live Demo

👉 [Try PrepAI Live](https://prepai-9fom.onrender.com)  
> _Note: App may take a few seconds to load on free hosting (Render)._

---

## ✨ Features

- 🧑‍💻 **User Authentication**: Register, log in, and manage user profiles (with profile image uploads).
- 🎯 **Role-Based Interview Prep**: Target specific roles like Frontend Developer, DevOps, or Fullstack Engineer.
- 🛠️ **Experience-Aware Question Generation**: Specify years of experience to tailor difficulty.
- 🧩 **Topic Customization**: Focus on specific concepts or technologies.
- 💬 **AI-Generated Questions & Explanations**: Generate realistic interview questions and in-depth explanations using Gemini API.
- 📁 **Session Management**: Create, view, and delete multiple prep sessions.
- 🖼️ **Profile Image Upload**: Upload temporary profile pictures for a personalized experience.

---

## 🚀 Tech Stack

### 🧩 Frontend
- React (Vite)
- Axios
- React Router
- TailwindCSS

### ⚙️ Backend
- Node.js + Express
- MongoDB Atlas
- Gemini API (Google AI)
- Multer (for file uploads)
- JWT Authentication
- CORS / dotenv


## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/prepai.git
cd prepai

SETUP ENV

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development

