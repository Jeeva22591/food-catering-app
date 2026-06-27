const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let bookings = [];

app.get("/", (req, res) => {
  res.send("Royal Feast Catering Backend Running");
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/api/bookings", (req, res) => {
  const booking = {
    id: Date.now(),
    ...req.body,
    servers: Math.ceil(Number(req.body.guests || 0) / 50),
    totalAmount: Number(req.body.guests || 0) * Number(req.body.plateRate || 0),
    createdAt: new Date().toLocaleString(),
  };

  bookings.push(booking);

  res.status(201).json({
    success: true,
    message: "Booking submitted successfully!",
    booking,
  });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "12345") {
    return res.json({ success: true });
  }

  res.status(401).json({
    success: false,
    message: "Invalid username or password",
  });
});

app.get("/api/admin/bookings", (req, res) => {
  res.json(bookings);
});

app.delete("/api/admin/bookings/:id", (req, res) => {
  bookings = bookings.filter((b) => b.id !== Number(req.params.id));
  res.json({ success: true });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});