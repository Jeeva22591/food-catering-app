app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});