const express = require("express")
const app = express()
app.use(express.json())
const tourRouter = require("./routes/tourRouter")
app.use("/tours",tourRouter)
const userRouter = require("./routes/userRouter")
app.use("/users",userRouter)
const authRouter = require("./routes/authRouter")
app.use("/",authRouter)

const { ZodError } = require("zod");

app.use((err, req, res, next) => {
  // Handle Zod validation errors specifically
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Fallback for everything else (including your AppError)
  res.status(err.statusCode || 500).json({
    status: err.statusCode ? "fail" : "error",
    message: err.message || "Something went wrong",
  });
});

module.exports = app