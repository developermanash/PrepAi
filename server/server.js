require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { protect } = require("./middlewares/authMiddleware");
const {
  generateInterviewQuestions,
  generateConceptExplanationQuestions,
} = require("./controllers/aiController");

const app = express();

//Middleware  to handle cors
app.use(cors({
  origin: 'http://localhost:5173', // or '*' for all (not recommended in production)
  credentials: true // if you're using cookies or HTTP auth
}));

connectDB();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use(
  "/api/ai/generate-explanation",
  protect,
  generateConceptExplanationQuestions
);

//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// Error handler should be the last middleware
app.use(errorHandler);


//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
