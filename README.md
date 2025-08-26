# 🛍️ HealthyHive - E-Commerce Platform for Healthy Products

## 📖 Overview

HealthyHive is a modern web-based e-commerce platform that provides users with a curated selection of healthy food, beverages, personal care products, and meals.
The platform offers a smooth shopping experience with secure authentication, wishlist, cart, and order tracking. An admin dashboard allows administrators to manage products, users, and orders efficiently.


---

## ✨ Features

🔐 Authentication & Authorization (User & Admin roles)

🛒 Product Browsing with categories & details

❤️ Wishlist and Shopping Cart functionality

📦 Order Tracking with real-time status animations (Lottie)

👨‍💻 Admin Dashboard for managing products, users, and orders

📱 Responsive Design for desktop and mobile



---

## 🏗️ Tech Stack

Frontend: React.js, Redux Toolkit, React Query, React Router, Tailwind CSS

Backend & Database: Supabase (Authentication + PostgreSQL Database)

Other Tools:

REST APIs for products

Vite for fast builds

Lottie animations for order tracking




---

## 📂 Project Structure

healthy-hive/
│── public/               # Static assets
│── src/
│   ├── assets/           # Images, Lottie animations
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices (auth, cart, wishlist, orders)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages (Home, Login, Cart, Tracking, Admin)
│   ├── services/         # Supabase and API services
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
│── package.json
│── README.md


---

## 🚀 Installation & Setup

1. Clone the repository



git clone https://github.com/yourusername/healthy-hive.git
cd healthy-hive

2. Install dependencies



npm install

3. Set up environment variables
Create a .env file in the root directory and add your Supabase credentials:



VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

4. Run the development server



npm run dev

5. Build for production



npm run build


---

🔑 Admin Access

To access the Admin Dashboard, log in with an account where:

username = admin (or any rule you configure in Supabase).


Admins can:

Manage products

Manage orders

View and manage users



---

📸 Screenshots / Demo

(Add screenshots of your UI: Home Page, Cart, Tracking, Admin Dashboard)


---

## 🛠️ Challenges & Learnings

Implemented role-based access control with Supabase.

Learned Git workflow with a 5-member team.

Improved performance with React & Redux best practices.



---

## 📌 Future Enhancements

Integrate online payment (Stripe/PayPal).

Add notifications (email/SMS).

AI-based product recommendation system.



---

## 👨‍💻 Team

Built with ❤️ by Our team: Omar Ahmed, Omar Magdy, Abdelrahman Samir, Mohamed Mohsen, Youssef Amr during ITI Graduation Project 2025.


---
