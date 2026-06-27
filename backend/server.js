const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let bookings = [];

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";

app.get("/", (req, res) => {
  res.send("Royal Feast Catering Backend Running");
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/api/bookings", (req, res) => {
  const {
    customerName,
    mobile,
    email,
    eventType,
    eventDate,
    guests,
    foodMenu,
    plateRate,
    address,
    message,
  } = req.body;

  if (!customerName || !mobile || !email || !eventType || !eventDate || !address) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  const totalGuests = Number(guests) || 0;
  const rate = Number(plateRate) || 0;
  const servers = Math.ceil(totalGuests / 50);
  const totalAmount = totalGuests * rate;

  const booking = {
    id: Date.now(),
    customerName,
    mobile,
    email,
    eventType,
    eventDate,
    guests: totalGuests,
    foodMenu,
    plateRate: rate,
    servers,
    totalAmount,
    address,
    message,
    status: "Pending",
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

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Admin login successful",
    });
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
  const id = Number(req.params.id);

  bookings = bookings.filter((booking) => booking.id !== id);

  res.json({
    success: true,
    message: "Booking deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Royal Feast Backend Running on port ${PORT}`);
});