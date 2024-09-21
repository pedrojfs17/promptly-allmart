# E-Commerce API Schema Design Decisions

This document outlines the reasoning behind the schema design decisions for our e-commerce API.

## User Table

- `user_id`: Primary key for unique identification.
- `username`: Unique identifier for user.
- `email`: Unique email address for login.
- `password_hash`: Securely stored hashed password.
- `created_at`: Timestamp for user registration date.

This structure provides the necessary user information while ensuring security and uniqueness.

## Category Table

- `category_id`: Primary key for unique identification.
- `name`: Unique category name.
- `description`: Optional description of the category.

Simple table allowing for the categorization and filtering of products by type.

## Product Table

- `product_id`: Primary key for unique identification.
- `name`: Product name.
- `description`: Product description.
- `price`: Current product price.
- `inventory_count`: Current inventory count.
- `category_id`: Foreign key to Category table.
- `created_at` and `updated_at`: Timestamps for tracking product updates.

Product information including inventory management and categorization. Timestamps allow for tracking product changes over time.

## ProductImage Table

- `image_id`: Primary key for unique identification.
- `product_id`: Foreign key to Product table.
- `image_data`: Binary image data.
- `image_name` and `image_type`: Image metadata.
- `is_primary`: Flag for the main product image.
- `created_at`: Timestamp for upload date.

Allows multiple images per product with a primary image identification. If no primary image is found for a product, then the first one uploaded is used. Storing image data in the database simplifies management but for larger applications other ways would work best, for example, S3 buckets.

## Cart and CartItem Tables

- Cart: `cart_id` (PK), `user_id` (FK to User), timestamps.
- CartItem: Composite PK (`cart_id`, `product_id`), `quantity`.

Separation of Cart and CartItem allows multiple items in a cart and easy quantity updates.

## Order and OrderItem Tables

- Order: `order_id` (PK), `user_id` (FK to User), `total_amount`, `status`, timestamps.
- OrderItem: Composite PK (`order_id`, `product_id`), `quantity`, `price_at_time`.

Similar to Cart structure, this allows for order tracking with multiple items. `price_at_time` in OrderItem captures the price at the moment of purchase.
