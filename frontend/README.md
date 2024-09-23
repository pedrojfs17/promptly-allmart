# E-Commerce Shopping App Frontend

This is the frontend for the E-Commerce Shopping App, built with Next.js.

## Setup Instructions

### Prerequisites

- Docker installed on your machine
- Git (for cloning the repository)

### Steps to Run the Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Set up the environment variables:

   - Copy the `.env.example` file to `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and fill in the necessary values for your environment.

3. Build the Docker image:

   ```
   docker build -t ecommerce-frontend .
   ```

4. Run the frontend using Docker:

   ```
   docker run -p 3000:3000 --env-file .env ecommerce-frontend
   ```

   The frontend will be accessible at `http://localhost:3000`.

## API Proxy

This application uses Next.js API routes as a proxy to redirect requests to the backend. When a request is made to `/api/:path`, it is automatically redirected to the backend URL `/:path`.

## File Structure

The main application code is located in the `src` folder, organized as follows:

### `app/`

Contains all the routing and pages:

- `/`: Shows three featured products
- `/products`: Displays a complete list of products with search and category filtering
- `/products/[id]`: Shows details for a single product
- `/login`: Contains login and registration forms
- `/cart`: Displays the user's cart (for logged-in users)
- `/profile`: Shows the user profile with a list of past orders (for logged-in users)
- `/orders/confirmation/[id]`: Confirms a newly created order (for logged-in users)
- `/orders/[id]`: Shows details for a specific order (for logged-in users)

### `components/`

- `auth/`: Login and Register form components
- `layout/`: Components for the application's Header and Footer
- `loading/`: Components for displaying loading states
- `ui/`: Imported shadcn components
- `CartItem.tsx`: Component for displaying a cart item
- `OrderStatusBadge.tsx`: Component for showing an order status badge (styled based on status)
- `ProductCard.tsx`: Component for displaying a single product in a card format

### `contexts/`

Stores global app state:

- `AuthContext.tsx`: Provides access to authentication state
- `CartContext.tsx`: Provides access to cart items

### `hooks/`

- `useProtectedRoute.ts`: Redirects users from protected routes if not logged in
- `useToastNotification.ts`: Displays notifications to users after specific actions

### `lib/`

- `api.ts`: Handles all API requests, setting headers and managing error handling

### `types/`

Defines TypeScript types for the application based on the database schema
