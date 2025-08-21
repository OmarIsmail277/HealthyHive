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
      path: "/products?mainCategory=food",
      subLinks: [
        {
          label: "Dairy",
          path: "/products?mainCategory=food&subCategory=dairy",
        },
        {
          label: "Nuts Spread",
          path: "/products?mainCategory=food&subCategory=nuts+spread",
        },
        {
          label: "Healthy Meals",
          path: "/products?mainCategory=food&subCategory=healthy+meals",
        },
        {
          label: "Sauces",
          path: "/products?mainCategory=food&subCategory=sauces",
        },
      ],
    },
    {
      label: "Drinks",
      path: "/products?mainCategory=drinks",
      subLinks: [
        {
          label: "Smoothies",
          path: "/products?mainCategory=drinks&subCategory=smoothies",
        },
                {
          label: "Herbs",
          path: "/products?mainCategory=drinks&subCategory=herbs",
        },
        {
          label: "Juices",
          path: "/products?mainCategory=drinks&subCategory=juice",
        },

      ],
    },
    {
      label: "Personal Care",
      path: "/products?mainCategory=personal+care",
      subLinks: [
        {
          label: "Shampoo",
          path: "/products?mainCategory=personal+care&subCategory=shampoo",
        },
        {
          label: "Shower Gel",
          path: "/products?mainCategory=personal+care&subCategory=shower+gel",
        },
        {
          label: "Hand Wash",
          path: "/products?mainCategory=personal+care&subCategory=hand+wash",
        },
      ],
    },
    {
      label: "Bakery",
      path: "/products?mainCategory=bakery",
      subLinks: [
        {
          label: "Bread",
          path: "/products?mainCategory=bakery&subCategory=bread",
        },
        {
          label: "Pastries",
          path: "/products?mainCategory=bakery&subCategory=pastries",
        },
        {
          label: "Croissants",
          path: "/products?mainCategory=bakery&subCategory=croissants",
        },
      ],
    },
    {
      label: "Order Meals",
      path: "/products?mainCategory=meals",
      subLinks: [
        {
          label: "Frozen ",
          path: "/products?mainCategory=meals&subCategory=frozen",
        },
        {
          label: "Pre-Order",
          path: "/products?mainCategory=meals&subCategory=preorder",
        },
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
    <div className="sticky top-0 left-0 right-0 z-50">
      <FlashyBanner />

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
