import { useState } from "react";
import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaUtensils,
  FaBirthdayCake,
  FaHeart,
  FaBaby,
  FaGift,
  FaLeaf,
  FaDrumstickBite,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import "./App.css";

const API_BASE = "https://food-catering-app-production.up.railway.app";

function App() {
  const discountPrice = (price) => Math.round(price * 0.7);

  const rawVegMenu = [
    ["Idly Sambar", 60], ["Mini Idly", 70], ["Pongal", 80], ["Poori Masala", 90],
    ["Masala Dosa", 100], ["Ghee Roast", 120], ["Rava Dosa", 110], ["Onion Uthappam", 100],
    ["Mini Tiffin", 130], ["Tamil Nadu Veg Meals", 150], ["Special Veg Meals", 180],
    ["Sambar Rice", 90], ["Rasam Rice", 80], ["Curd Rice", 80], ["Lemon Rice", 90],
    ["Tomato Rice", 90], ["Tamarind Rice", 90], ["Coconut Rice", 100], ["Veg Biryani", 160],
    ["Mushroom Biryani", 180], ["Paneer Biryani", 190], ["Kashmiri Pulao", 170],
    ["Jeera Rice", 120], ["Veg Fried Rice", 140], ["Gobi Fried Rice", 150],
    ["Paneer Fried Rice", 170], ["Veg Noodles", 140], ["Gobi Noodles", 150],
    ["Chappathi Kurma", 100], ["Parotta Kurma", 110], ["Veg Kothu Parotta", 130],
    ["Paneer Butter Masala", 190], ["Mushroom Masala", 180], ["Gobi Manchurian", 150],
    ["Chilli Paneer", 190], ["Chilli Gobi", 160], ["Aloo Gobi", 140],
    ["Dal Fry", 120], ["Dal Tadka", 130], ["Chana Masala", 140], ["Rajma Masala", 150],
    ["Palak Paneer", 190], ["Kadai Paneer", 200], ["Veg Kurma", 130],
    ["Avial", 100], ["Kootu", 80], ["Poriyal", 70], ["Vazhaipoo Vadai", 90],
    ["Medu Vada", 50], ["Samosa", 50], ["Bajji", 50], ["Bonda", 50],
    ["Kesari", 70], ["Payasam", 80], ["Gulab Jamun", 80], ["Laddu", 70],
    ["Jangiri", 80], ["Mysore Pak", 90], ["Ice Cream", 70], ["Fruit Salad", 80],
  ];

  const rawNonVegMenu = [
    ["Egg Biryani", 160], ["Chicken Biryani", 220], ["Mutton Biryani", 320],
    ["Fish Biryani", 260], ["Prawn Biryani", 300], ["Nattu Kozhi Biryani", 300],
    ["Chicken 65", 180], ["Chicken Lollipop", 220], ["Chicken Pakoda", 180],
    ["Chicken Fry", 200], ["Chicken Pepper Fry", 230], ["Chicken Chettinad", 240],
    ["Chicken Gravy", 180], ["Butter Chicken", 260], ["Kadai Chicken", 240],
    ["Chicken Tikka", 260], ["Tandoori Chicken", 280], ["Grill Chicken", 320],
    ["Mutton Chukka", 280], ["Mutton Pepper Fry", 300], ["Mutton Chettinad", 340],
    ["Mutton Gravy", 260], ["Mutton Kola Urundai", 250], ["Mutton Liver Fry", 260],
    ["Fish Fry", 250], ["Fish Curry", 220], ["Vanjaram Fry", 320],
    ["Nethili Fry", 180], ["Prawn Fry", 300], ["Prawn Masala", 320],
    ["Crab Masala", 350], ["Egg Curry", 120], ["Egg Masala", 130],
    ["Omelette", 60], ["Boiled Egg", 40], ["Kothu Parotta Chicken", 180],
    ["Egg Kothu Parotta", 140], ["Chicken Parotta", 160], ["Mutton Parotta", 220],
    ["Non-Veg Meals", 280], ["Chicken Meals", 240], ["Mutton Meals", 320],
    ["Fish Meals", 260], ["Kerala Fish Curry", 240], ["Hyderabadi Chicken", 280],
    ["Lucknowi Chicken", 300], ["Kolkata Fish Curry", 250], ["Punjabi Chicken Curry", 280],
    ["Andhra Chicken Fry", 260],
  ];

  const vegMenu = rawVegMenu.map(([name, price]) => [name, discountPrice(price)]);
  const nonVegMenu = rawNonVegMenu.map(([name, price]) => [name, discountPrice(price)]);

  const [page, setPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([
    { name: "Tamil Nadu Veg Meals", price: discountPrice(150) },
  ]);

  const [form, setForm] = useState({
    customerName: "",
    mobile: "",
    email: "",
    eventType: "",
    eventDate: "",
    guests: 100,
    foodMenu: "Tamil Nadu Veg Meals",
    plateRate: discountPrice(150),
    address: "",
    message: "",
  });

  const selectedRate = selectedFoods.reduce((sum, food) => sum + food.price, 0);
  const selectedFoodNames = selectedFoods.map((food) => food.name).join(", ");
  const servers = Math.ceil(Number(form.guests) / 50);
  const totalAmount = Number(form.guests) * selectedRate;

  const events = [
    ["Wedding", <FaHeart />],
    ["Birthday", <FaBirthdayCake />],
    ["Reception", <FaGift />],
    ["Baby Shower", <FaBaby />],
    ["Ear Piercing", <FaUtensils />],
    ["Other Functions", <FaCalendarAlt />],
  ];

  const weddingVeg = [
    ["Welcome Drinks", ["Rose Milk", "Badam Milk", "Panagam", "Neer Mor"]],
    ["Breakfast", ["Idly", "Vada", "Pongal", "Poori Masala", "Dosa"]],
    ["Lunch", ["Banana Leaf Meals", "Rice", "Sambar", "Rasam", "Poriyal", "Appalam"]],
    ["Sweets", ["Paal Payasam", "Kesari", "Laddu", "Jangiri"]],
  ];

  const weddingNonVeg = [
    ["Starters", ["Chicken 65", "Fish Fry", "Prawn Fry", "Mutton Chukka"]],
    ["Biryani", ["Chicken Biryani", "Mutton Biryani", "Egg Biryani"]],
    ["Gravy", ["Chicken Chettinad", "Mutton Chettinad", "Fish Curry"]],
    ["Combo", ["Non-Veg Meals", "Chicken Gravy", "Rasam", "Curd"]],
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleFood = (name, price) => {
    const exists = selectedFoods.some((food) => food.name === name);
    const updatedFoods = exists
      ? selectedFoods.filter((food) => food.name !== name)
      : [...selectedFoods, { name, price }];

    const updatedRate = updatedFoods.reduce((sum, food) => sum + food.price, 0);
    const updatedNames = updatedFoods.map((food) => food.name).join(", ");

    setSelectedFoods(updatedFoods);
    setForm({
      ...form,
      foodMenu: updatedNames,
      plateRate: updatedRate,
    });
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    if (selectedFoods.length === 0) {
      alert("Please select at least one food item.");
      return;
    }

    const bookingData = {
      ...form,
      foodMenu: selectedFoodNames,
      plateRate: selectedRate,
      totalAmount,
      servers,
    };

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message || "Booking submitted successfully!");

        setSelectedFoods([{ name: "Tamil Nadu Veg Meals", price: discountPrice(150) }]);
        setForm({
          customerName: "",
          mobile: "",
          email: "",
          eventType: "",
          eventDate: "",
          guests: 100,
          foodMenu: "Tamil Nadu Veg Meals",
          plateRate: discountPrice(150),
          address: "",
          message: "",
        });
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Unable to submit booking. Check backend server.");
    }
  };

  const adminLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAdmin(true);
        setPage("dashboard");
        loadBookings();
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      alert("Unable to login. Check backend server.");
    }
  };

  const loadBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Load Bookings Error:", error);
      alert("Unable to load bookings.");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await fetch(`${API_BASE}/api/admin/bookings/${id}`, {
        method: "DELETE",
      });
      loadBookings();
    } catch (error) {
      console.error("Delete Booking Error:", error);
      alert("Unable to delete booking.");
    }
  };

  const renderFoodList = (menu) =>
    menu.map(([item, price]) => (
      <div className="menuItem" key={item}>
        <span>{item}</span>
        <b>₹{price}</b>
        <label className="checkBoxMenu">
          <input
            type="checkbox"
            checked={selectedFoods.some((food) => food.name === item)}
            onChange={() => toggleFood(item, price)}
          />
          Select
        </label>
      </div>
    ));

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <div className="logoIcon">🍽</div>
          <div>
            <h2>Royal Feast</h2>
            <p>Catering Services</p>
            <small>Owner: Jeevarathinam</small>
          </div>
        </div>

        <div className="navLinks">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("events")}>Events</button>
          <button onClick={() => setPage("menu")}>Menu</button>
          <button onClick={() => setPage("booking")}>Booking</button>
          <button onClick={() => setPage("admin")}>Provider Login</button>
        </div>

        <div className="callBox">
          <FaPhoneAlt /> +91 8072063173
        </div>
      </nav>

      {page === "home" && (
        <section className="hero">
          <div className="heroText">
            <h1>
              Delicious Food <span>For Every Occasion</span>
            </h1>

            <p>
              Premium catering by Jeevarathinam for weddings, birthdays,
              receptions, baby showers, ear piercing functions and corporate events.
            </p>

            <div className="features">
              <p>✅ Hygienic Food</p>
              <p>✅ 100+ Indian Menu</p>
              <p>✅ 70% Offer Price</p>
              <p>✅ Instant Quote</p>
            </div>

            <button className="primaryBtn" onClick={() => setPage("booking")}>
              Book Now
            </button>
            <button className="outlineBtn" onClick={() => setPage("menu")}>
              View Menu
            </button>
          </div>

          <div className="heroImage">
            <img
              src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
              alt="Royal Feast Catering"
            />
            <div className="badge">70% Price Menu</div>
          </div>
        </section>
      )}

      {page === "events" && (
        <section className="section">
          <h2>Functions We Cater</h2>
          <div className="eventGrid">
            {events.map(([name, icon]) => (
              <div className="eventCard" key={name}>
                <div className="eventIcon">{icon}</div>
                <h3>{name}</h3>
                <p>Custom food packages with premium service.</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === "menu" && (
        <>
          <section className="section menuSection">
            <h2>100+ Indian Food Menu With 70% Price</h2>

            <div className="foodImageGrid">
              <div className="foodBanner vegBanner">
                <h3>Pure Veg Specials</h3>
              </div>
              <div className="foodBanner nonVegBanner">
                <h3>Non-Veg Specials</h3>
              </div>
            </div>

            <div className="menuLayout">
              <div className="menuBox veg">
                <h3>
                  <FaLeaf /> Veg Menu
                </h3>
                {renderFoodList(vegMenu)}
              </div>

              <div className="menuBox nonveg">
                <h3>
                  <FaDrumstickBite /> Non-Veg Menu
                </h3>
                {renderFoodList(nonVegMenu)}
              </div>
            </div>

            <div className="menuActionBox">
              <h3>Selected Plate Rate: ₹{selectedRate}</h3>
              <p>{selectedFoodNames || "No food selected"}</p>
              <button className="primaryBtn" onClick={() => setPage("booking")}>
                Continue Booking
              </button>
            </div>
          </section>

          <section className="section weddingMenu">
            <h2>Tamil Nadu Wedding Menu</h2>

            <h3 className="vegTitle">Pure Veg Wedding Menu</h3>
            <div className="weddingGrid">
              {weddingVeg.map(([title, items]) => (
                <div className="weddingCard vegBorder" key={title}>
                  <h3>{title}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>🌿 {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="nonVegTitle">Non-Veg Wedding Menu</h3>
            <div className="weddingGrid">
              {weddingNonVeg.map(([title, items]) => (
                <div className="weddingCard nonVegBorder" key={title}>
                  <h3>{title}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>🍗 {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === "booking" && (
        <section className="bookingSection">
          <div className="bookingForm">
            <h2>Online Catering Booking</h2>

            <form onSubmit={submitBooking}>
              <div className="inputGroup">
                <FaUser />
                <input
                  name="customerName"
                  placeholder="Customer Name"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputGroup">
                <FaPhoneAlt />
                <input
                  name="mobile"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select Function</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Reception</option>
                <option>Baby Shower</option>
                <option>Ear Piercing Function</option>
                <option>Corporate Event</option>
              </select>

              <div className="inputGroup">
                <FaCalendarAlt />
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputGroup">
                <FaUsers />
                <input
                  type="number"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="selectedFoodBox">
                <h3>Selected Food Particulars</h3>
                {selectedFoods.length === 0 ? (
                  <p>No food selected</p>
                ) : (
                  selectedFoods.map((food) => (
                    <p key={food.name}>
                      ✅ {food.name} - ₹{food.price}
                    </p>
                  ))
                )}
                <h4>Total Plate Rate: ₹{selectedRate}</h4>
              </div>

              <textarea
                name="address"
                placeholder="Function Address"
                value={form.address}
                onChange={handleChange}
                required
              ></textarea>

              <textarea
                name="message"
                placeholder="Additional Message"
                value={form.message}
                onChange={handleChange}
              ></textarea>

              <button className="fullBtn" type="submit">
                Submit Booking
              </button>
            </form>
          </div>

          <div className="summaryBox">
            <h2>Booking Estimate</h2>
            <p>Customers: <b>{form.guests}</b></p>
            <p>Selected Food: <b>{selectedFoodNames || "No food selected"}</b></p>
            <p>Plate Rate: <b>₹{selectedRate}</b></p>
            <p>Required Servers: <b>{servers}</b></p>
            <h3>Total Amount: ₹{totalAmount}</h3>
            <div className="chef">👨‍🍳</div>
          </div>
        </section>
      )}

      {page === "admin" && !isAdmin && (
        <section className="container loginBox">
          <h1>Service Provider Login</h1>

          <form onSubmit={adminLogin} className="form">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>

          <p className="hint">Username: admin</p>
          <p className="hint">Password: 12345</p>
        </section>
      )}

      {page === "dashboard" && isAdmin && (
        <section className="container dashboard">
          <div className="dashboardTitle">
            <h1>Service Provider Dashboard</h1>
            <div>
              <button onClick={loadBookings}>Refresh</button>
              <button onClick={() => { setIsAdmin(false); setPage("home"); }}>
                Logout
              </button>
            </div>
          </div>

          {bookings.length === 0 ? (
            <h3>No client bookings yet.</h3>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Function</th>
                  <th>Date</th>
                  <th>Guests</th>
                  <th>Food</th>
                  <th>Servers</th>
                  <th>Total</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.customerName}</td>
                    <td>{b.mobile}</td>
                    <td>{b.email}</td>
                    <td>{b.eventType}</td>
                    <td>{b.eventDate}</td>
                    <td>{b.guests}</td>
                    <td>{b.foodMenu}</td>
                    <td>{b.servers}</td>
                    <td>₹{b.totalAmount}</td>
                    <td>{b.address}</td>
                    <td>
                      <button onClick={() => deleteBooking(b.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      <footer>
        <div>
          <h2>Royal Feast</h2>
          <p>Owner: Jeevarathinam</p>
          <p>Making your special moments delicious.</p>
          <div className="social">
            <FaFacebookF />
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> +91 8072063173</p>
          <p>📧 royalfeast@gmail.com</p>
          <p><FaMapMarkerAlt /> Chennai, Tamil Nadu</p>
        </div>
      </footer>
    </>
  );
}

export default App;