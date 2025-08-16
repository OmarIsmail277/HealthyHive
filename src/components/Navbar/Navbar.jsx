import { useState } from "react";
import NavTopRow from "./components/NavTopRow/NavTopRow";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import DesktopDropdown from "./components/DesktopDropdown/DesktopDropdown";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import FlashyBanner from "../Banner/Banner";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownIndex, setMobileDropdownIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const navLinks = [
    {
      label: "Food",
      path: "/food",
      subLinks: [
        { label: "Fruits", path: "/food/fruits" },
        { label: "Vegetables", path: "/food/vegetables" },
        { label: "Healthy Meals", path: "/food/healthy-meals" },
      ],
    },
    {
      label: "Drinks",
      path: "/drinks",
      subLinks: [
        { label: "Smoothies", path: "/drinks/smoothies" },
        { label: "Juices", path: "/drinks/juices" },
        { label: "Teas", path: "/drinks/teas" },
      ],
    },
    {
      label: "Personal Care",
      path: "/personal-care",
      subLinks: [
        { label: "Shampoo", path: "/personal-care/shampoo" },
        { label: "Shower Gel", path: "/personal-care/showerGel" },
        { label: "Hand Wash", path: "/personal-care/handWash" },
      ],
    },
    {
      label: "Bakery",
      path: "/bakery",
      subLinks: [
        { label: "Bread", path: "/bakery/bread" },
        { label: "Pastries", path: "/bakery/pastries" },
        { label: "Gluten-Free", path: "/bakery/gluten-free" },
      ],
    },
    {
      label: "Order Meals",
      path: "/order-meals",
      subLinks: [
        { label: "Home Delivery", path: "/order-meals/home-delivery" },
        { label: "Catering", path: "/order-meals/catering" },
        { label: "Meal Plans", path: "/order-meals/meal-plans" },
      ],
    },
    {
      label: "Our Services",
      path: "/services",
      subLinks: [
        { label: "Calorie Calculator", path: "/services/calorie-calculator" },
        { label: "Medical Consultations", path: "/services/consultations" },
      ],
    },
  ];

  return (
  <div className="fixed top-0 left-0 right-0 z-50">
      {/* Fixed banner at very top */}
      <FlashyBanner />
      
      {/* Sticky navbar that appears below banner */}
      <nav className="bg-white shadow-md">
        <NavTopRow isOpen={isOpen} setIsOpen={setIsOpen} />
        <DesktopNav
          navLinks={navLinks}
          hoverIndex={hoverIndex}
          setHoverIndex={setHoverIndex}
        />
        <DesktopDropdown
          hoverIndex={hoverIndex}
          navLinks={navLinks}
          setHoverIndex={setHoverIndex}
        />
        <MobileMenu
          isOpen={isOpen}
          navLinks={navLinks}
          mobileDropdownIndex={mobileDropdownIndex}
          setMobileDropdownIndex={setMobileDropdownIndex}
        />
      </nav>
    </div>
  );
}

export default Navbar;
