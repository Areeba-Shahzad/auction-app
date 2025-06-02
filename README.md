# 🏷️ MERN Auction App 

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It simulates an auction platform where users can list items for auction, and other users can bid on them in real-time. The frontend is developed using TypeScript and Vite, while the backend is implemented with JavaScript. Real-time communication for bidding is handled using Socket.IO.

## ✨ Features

*  **User Authentication:**
    * Secure Sign Up with unique usernames.
    * User Login.
*  **Auction Management:**
    * **Create Auctions:** Logged-in users can put items up for auction with details like title, description, starting price, start time, and end time.
    * **Browse Auctions:** View a list of all ongoing auctions.
    * **Search & Filter:** Filter auctions by searching for keywords in the title.
*  **Real-Time Bidding:**
    * Users can view specific auction details.
    * Place bids in real-time on the "Specific Auction" page.
    * Bid updates are broadcast to all connected users viewing the same auction.
    * Users cannot bid an amount lower than the current price.
    * The auction creator cannot bid on their own auction.
    * Auctions automatically end at the specified time.
*  **User Profiles:**
    * View user details (name, username).
    * See a list of auctions created by the user.
    * Track the number of items owned (updated when an auction is won).
    * Option to navigate to "Create Auction" and "Change Password" pages.
*  **Password Management:**
    * Users can change their existing passwords.
*  **Responsive Navigation:**
    * A navigation bar is present on all pages except Login and Sign Up.
*  **Socket Handling:**
    * Addresses potential issues with socket reconnections on page refresh by maintaining client identity.

---

## 🛠️ Tech Stack

* **Frontend:**
    * React (with TypeScript)
    * Vite (for frontend tooling)
    * CSS (with provided design guide, customizable)
* **Backend:**
    * Node.js
    * Express.js
* **Database:**
    * MongoDB (with Mongoose ODM)
* **Real-time Communication:**
    * Socket.IO
* **Languages:**
    * TypeScript (Frontend)
    * JavaScript (Backend)

---

## ⚙️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```

3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    # OR if you prefer yarn
    # yarn install
    ```

---

## 🚀 Running the Application

1.  **Start the Backend Server:**
    * Navigate to the `backend` folder:
        ```bash
        cd backend
        npm run dev
        ```
    * The server will start on `http://localhost:8000` by default. It will handle HTTP requests and Socket.IO connections.

2.  **Start the Frontend Development Server:**
    * Navigate to the `frontend` folder:
        ```bash
        cd frontend
        npm run dev
        # OR if you prefer yarn
        # yarn dev
        ```
    * The frontend application will typically start on `http://localhost:5173` (Vite's default) or another port. Check your terminal for the exact address.

3.  Open your browser and navigate to the frontend URL. The app will first land on the Sign Up page.

---

## 📄 Pages / Screens

The application consists of the following pages:

* **Sign Up:** New user registration.
* **Login:** Existing user authentication.
* **Home:** Landing page after login/signup.
* **Browse:** Displays all ongoing auctions with search functionality.
* **My Profile:** Shows user details, created auctions, items won, and links to create auctions/change password.
* **Create Auction:** Form to list a new item for auction.
* **Change Password:** Allows users to update their password.
* **Specific Auction:** Detailed view of an auction, enabling real-time bidding.
* **Navbar:** Visible on most pages for easy navigation.

---

## 🗂️ Database Models (MongoDB - Mongoose Schemas)

### User
* `username`: String (unique, required)
* `password`: String (required, should be hashed)
* `itemsOwned`: Number (defaults to 0)
* `createdAuctions`: Array of ObjectIds (references to the Auction model)

### Auction
* `title`: String (required)
* `description`: String
* `startingPrice`: Number (required)
* `currentPrice`: Number (defaults to `startingPrice`, updates with bids)
* `startingTime`: Date (required)
* `endingTime`: Date (required)
* `creator`: ObjectId (references the User model, required)
* `highestBidder`: ObjectId (references the User model, optional)
* `status`: String (e.g., 'ongoing', 'ended', 'sold')

---

## 🔌 Socket.IO Implementation Notes

* Real-time bidding functionality on the "Specific Auction" page is powered by Socket.IO.
* When a user navigates to an auction page, a socket connection is established.
* Bids are emitted to the server, which then broadcasts them to all clients connected to that specific auction's "room."
* The server manages unique client IDs to handle page refreshes and maintain consistent user sessions across socket reconnections.

---
