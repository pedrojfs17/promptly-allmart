# E-Commerce Shopping App - AllMart

This project is a full-stack e-commerce shopping application with a React frontend (using Next.js) and a Python backend (using FastAPI).

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Git (for cloning the repository)

### Steps to Run the Application

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up the environment variables:

   - Copy the `.env.example` file to `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and fill in the necessary values for your environment.

3. Build and run the application using Docker Compose:

   ```
   docker-compose up --build
   ```

4. Once the containers are up and running, you can access:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000/api
   - OpenAPI Documentation: http://localhost:3000/api/redoc

## Completed Features and Future Improvements

### Backend

#### Completed Features:

1. **API for Product and Cart Management:**
   - **Product Management:**
     - Create an endpoint to **list** and **search** for products.
     - Create an endpoint to **get details** of a single product.
   - **Cart Management:**
     - Create endpoints to **add** products to a user's cart and **remove** products from the cart.
     - Create an endpoint to **view the cart** and calculate the total price.
   - **Order Management:**
     - Create an endpoint to **place an order** based on the contents of the cart.
     - Ensure that when an order is placed, the product inventory is updated accordingly.
2. **Database Design:**
   - Design a schema for **products**, **carts**, **users**, and **orders**.
   - You should include relationships between users, products, and orders.
   - Use **PostgreSQL** or another relational database and explain the reasoning behind your schema design in your `README.md`.
3. **Error Handling & Input Validation:**
   - Ensure **error handling** for cases like out-of-stock products, invalid product IDs, and bad requests.
   - Implement proper **status codes** and **input validation** in API endpoints.
4. **General Programming Skills:**
   - Make sure the code is structured, readable, and follows **best practices**.
   - Apply **design patterns** where appropriate (e.g., Repository, Service).
5. **Bonus Tasks:**
   - Implement **JWT-based authentication** so that users can log in and manage their own cart and orders.
   - Expose an **OpenAPI schema** for the API you just built. (serve it via the API)

#### Future Improvements:

1. **Bonus Tasks:**
   - Add **unit tests** for critical API functionality (e.g., placing an order, adding to cart).

---

### Frontend

#### Completed Features:

1. **React App with TypeScript:**
   - Create a simple **React** application that allows users to:
     - **Browse products**: Display a paginated list of products with search functionality.
     - **View product details**: Show product information on a dedicated page.
     - **Add/remove products** from their shopping cart.
     - **View the cart**: Display the current cart and total price.
     - **Place an order**: Simulate an order placement process.
2. **API Integration:**
   - Use **Axios** or **Fetch** to connect the frontend to your backend API.
   - Handle backend errors gracefully and provide feedback to the user (e.g., when an order cannot be placed due to out-of-stock products).
3. **HTML Semantics and Accessibility:**
   - Use proper **HTML semantics** to ensure the app is accessible.
   - Ensure the layout is **responsive** and works well on both mobile and desktop.
4. **Frontend State Management:**
   - Manage application state using either **Context API** or **React's built-in state management**.
   - Make sure the code is modular, reusable, and organized.
5. **Bonus Tasks:**
   - Use **TailwindCSS** to style the application.

#### Future Improvements:

1. **Bonus Tasks:**
   - Implement a simple **Redux** store for state management.
   - Add **unit tests** for critical UI components (e.g., Cart, Product List).

---

### DevOps

#### Completed Features:

1. **Dockerization:**
   - Create a **Dockerfile** for both the backend and frontend applications.
   - Use **Docker Compose** to orchestrate services (e.g., backend, frontend, and database).
   - Ensure that the application can be easily started with `docker-compose up`.

#### Future Improvements:

1. **Bonus Tasks:**
   - Set up a simple CI pipeline using **GitHub Actions** (or another CI tool) to run tests and lint code automatically on each pull request.
   - Set up a basic **Kubernetes deployment** (if comfortable) for extra challenge. You can either use plain resource files, or **Helm**.
