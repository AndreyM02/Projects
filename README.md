# Men's Wear Marketplace

A full‑stack e-commerce application built to showcase a complete online store for men's wear. This project demonstrates skills in JavaScript, React, Node.js, Express, MongoDB, and Stripe payment integration, and is designed as a portfolio project.

## Features

### User Authentication & Profile Management
- Secure user registration, login, and password change.
- Profile update functionality with role‑based access (buyers, sellers, admins).

### Product Management
- CRUD operations for products (add, update, delete) managed by sellers and admins.
- Public product catalog for buyers with a clean, responsive design.

### Shopping Cart
- Users can add products to the cart, update quantities, and remove items.
- Dynamic calculation of the total price.

### Checkout & Payment Integration
- Seamless checkout process where shipping information is collected.
- Integration with Stripe Checkout in test mode to securely process payments.
- Payment confirmation triggers order finalization.

### Order Management
- Orders are recorded in the database only after successful payment.
- Order history view for customers.

### Responsive Design
- Built with React and Bootstrap for a modern, mobile-friendly interface.

## Tech Stack

- **Frontend:** React, React Router, Bootstrap, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payment Processing:** Stripe (using Stripe Checkout Sessions)
- **Deployment:** Can be deployed locally, and uses serverless functions (via Aircode) for payment-related operations if desired.

## Installation

## Clone the Repository

### bash
- git clone https://github.com/AndreyM02/Projects.git
- cd menswear-marketplace
- Backend Setup
- bash
- Copy
- cd backend
- npm install
 ### Create a .env file in the backend folder with the following variables:
- env
- Copy
- MONGO_URI=your_mongodb_connection_string
- STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
- JWT_SECRET=your_jwt_secret
- ALLOWED_ORIGINS=http://localhost:3000
### Frontend Setup
- bash
- Copy
- cd ../frontend
- npm install
###Create a .env file in the frontend folder with:
- env
- Copy
- REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
### Run the Application
### Backend
- bash
- Copy
- cd ../backend
- npm start
### Frontend
- bash
- Copy
- cd ../frontend
- npm start

## Usage

### User Roles

- **Buyers:** Browse products, add items to the cart, and complete checkout with Stripe payment integration.
- **Sellers/Admin:** Manage products (create, update, delete) through a dedicated product management interface.

### Checkout Flow

1. Users add products to their cart.
2. They proceed to checkout where they provide shipping information.
3. Payment is processed via Stripe.
4. Upon successful payment, an order is created in the database and the user can view their order history.
