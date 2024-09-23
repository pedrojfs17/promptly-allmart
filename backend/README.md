# E-Commerce Shopping App Backend

This is the backend for the E-Commerce Shopping App, built with FastAPI and SQLAlchemy.

## Setup Instructions

### Prerequisites

- Docker installed on your machine
- Git (for cloning the repository)

### Steps to Run the Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Set up the environment variables:

   - Copy the `.env.example` file to `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and fill in the necessary values for your environment.

3. Build the Docker image:

   ```
   docker build -t ecommerce-backend .
   ```

4. Run the backend using Docker:

   ```
   docker run -p 8000:8000 --env-file .env ecommerce-backend
   ```

   The backend API will be accessible at `http://localhost:8000`.
   You can access the API documentation at `http://localhost:8000/redoc`.

## File Structure

The main application code is located in the `app` folder, organized as follows:

### `main.py`

This file is responsible for starting up the API. It initializes the FastAPI application, includes the routers, and sets up any middleware or event handlers.

### `dependencies.py`

Defines dependencies to be used across the application. Key dependencies include:

- `get_db`: Provides a database session for database operations
- `get_current_user`: Retrieves the current authenticated user

### `models/`

This folder contains all SQLAlchemy models that connect to the database. Each model represents a table in the database and defines its structure and relationships.

### `schemas/`

Contains Pydantic schemas for requests and responses. These schemas ensure type safety across the entire application and are used for data validation and serialization.

### `crud/`

This folder contains the logic needed to create, read, update, and delete entries from the database. It's organized by entity (e.g., `user.py`, `product.py`).

### `core/`

Contains core functionality needed across the app, namely security utilities.

### `routers/`

This folder contains different route modules. Each module typically corresponds to a specific entity or feature set in the API (e.g., `user.py`, `product.py`).

## API Documentation

The API documentation is automatically generated and can be accessed at `http://localhost:8000/redoc` when the server is running. This interactive documentation allows you to explore and test the API endpoints directly from your browser.

## Database

The application uses PostgreSQL as its database. The database schema is managed through SQLAlchemy models, ensuring consistency between the application code and the database structure.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token to be included in the Authorization header of the request.
