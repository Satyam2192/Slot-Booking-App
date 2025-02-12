import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookingCalendar from "./pages/BookingCalendar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    // The dark mode class is applied at the top level so every child can use dark: variants.
    <div className={isDark ? "dark" : ""}>
      <BrowserRouter>
        <Header isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<BookingCalendar />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
