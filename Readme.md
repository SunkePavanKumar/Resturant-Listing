# Restaurant Listing Application Documentation

## Overview

The Restaurant Listing Application is a platform that provides information about various restaurants, including details such as menus, images, addresses, features, pricing, and user reviews. It facilitates interaction between businesses (vendors) and users (customers), allowing users to view restaurant listings, submit reviews, and interact with restaurant owners.

## Features

- User Authentication
- CRUD Operations for Business Listings
- Review System
- Business Owner Interaction with Reviews

## Usage

1. **Installation**: Clone the repository and install dependencies using the following commands:
   ```bash
   https://github.com/SunkePavanKumar/Resturant-Listing.git
   cd restaurant-listing-application
   npm install
   ```
2. **Configuration**: Set up environment variables for MongoDB connection URI and JWT secret key.
   ```bash
       MONGO_URI = "Your Connection String"
       JWT_SCRECT = "Your secret"
       PORT = 3000
   ```
3. **Run the Application**: Start the application using the following command:
   ```bash
    PROD : npm start
    DEV : npm run dev
   ```

## Authentication

1. Authentication is requird for accessing the protected routes. To authenticate, include a valid token in the request headers:
   ```
   Authorization: Bearer your_access_token
   ```

## API Documentation

### Authentication

1. **Register a New User**: Use the following endpoint to register a new user:
   - **Endpoint**: `POST api/v1/users/register`
   - **Request Body**:
     ```json
     {
       "name": "pavan kumar sunke",
       "email": "pavan.1413489@gmail.com",
       "password": "pavan1234",
       "role": "admin"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "User registered successfully",
       "token": "<JWT_token>"
     }
     ```
2. **Login**: Use the following endpoint to login with the registered credentials and obtain a JWT token:
   - **Endpoint**: `POST /api/v1/users/login`
   - **Request Body**:
     ```json
     {
       "email": "vtu13227@veltech.edu.in",
       "password": "pavan1234"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "User Logged in Successfully",
       "token": "<JWT_token>"
     }
     ```

### Business Listings

1. **Create Listing**: Create a new business listing

   - **EndPoint** `POST /api/v1/listing`
   - **Request Body**

     ```json
     {
       "name": "KFC",
       "businessPhone": "1234567890",
       "city": "Example City",
       "address": "123 Example St",
       "images": ["image1.jpg", "image2.jpg"],
       "owner": "65f1f91d6f85dbfbf559f1ee",
       "averageRating": 7,
       "reviews": ["65f1f91d6f85dbfbf559f1ee"]
     }
     ```

   - **Response**
     ```json
     {
       "success": true,
       "message": "Restaurant Details Added Successfully"
     }
     ```

2. **Get all the Listing**: Get all business listings

   - **EndPoint** `GET /api/v1/listing`
   - **Request Body**

     ```json
        no request body
     ```

   - **Response**
     ```json
     {
       "success": true,
       "message": "successfully fetched all the details",
       "data": [
         {
           "_id": "65f2a787c63105f26dbc0662",
           "name": "KFC",
           "businessPhone": "1234567890",
           "city": "Example City",
           "address": "123 Example St",
           "images": ["image1.jpg", "image2.jpg"],
           "owner": "65f1f91d6f85dbfbf559f1ee",
           "averageRating": 7,
           "reviews": ["65f1f91d6f85dbfbf559f1ee"],
           "__v": 0
         },
         {
           "_id": "65f2e828771e8675941795bb",
           "name": "KFCdummy",
           "businessPhone": "1234567890",
           "city": "Example City",
           "address": "123 Example St",
           "images": ["image1.jpg", "image2.jpg"],
           "owner": "65f1f91d6f85dbfbf559f1ee",
           "averageRating": 7,
           "reviews": ["65f1f91d6f85dbfbf559f1ee"],
           "__v": 0
         }
       ]
     }
     ```

3. **Get the Listing**: Get a single business listing by ID

   - **EndPoint** `PATCH /api/v1/listing/:id`
   - **Request Body**

     ```json
        no req body
     ```

   - **Response**
     ```json
     {
       "success": true,
       "message": "Successfully fetched the details",
       "data": {
         "_id": "65f2a787c63105f26dbc0662",
         "name": "KFC",
         "businessPhone": "1234567890",
         "city": "Example City",
         "address": "123 Example St",
         "images": ["image1.jpg", "image2.jpg"],
         "owner": "65f1f91d6f85dbfbf559f1ee",
         "averageRating": 7,
         "reviews": ["65f1f91d6f85dbfbf559f1ee"],
         "__v": 0
       }
     }
     ```

4. **Update the Listing**: pdate a business listing by ID

   - **EndPoint** `GET /api/v1/listing/:id`
   - **Request Body**

     ```json
     {
       "name": "Burger King"
     }
     ```

   - **Response**
     ```json
     {
       "success": true,
       "message": "Updated the listing successfully",
       "data": {
         "_id": "65f2a787c63105f26dbc0662",
         "name": "Burger King",
         "businessPhone": "1234567890",
         "city": "Example City",
         "address": "123 Example St",
         "images": ["image1.jpg", "image2.jpg"],
         "owner": "65f1f91d6f85dbfbf559f1ee",
         "averageRating": 7,
         "reviews": ["65f1f91d6f85dbfbf559f1ee"],
         "__v": 0
       }
     }
     ```

5. **Delete the Listing**: Delete a business listing by ID

   - **EndPoint** `DELETE /api/v1/listing/:id`
   - **Request Body**

     ```json
        no request body
     ```

   - **Response**
     ```json
     {
       "success": true,
       "message": "Listing deleted Successfully"
     }
     ```

### Reviews

**Create the Review**: Create a new review

- **EndPoint** `POST api/v1/review`
- **Request Body**

  ```json
  {
    "content": "Great restaurant!",
    "rating": 5,
    "user": "65f1f8f2f99e11add20394e4",
    "listing": "65f2a787c63105f26dbc0662",
    "response": "Thank you for your review."
  }
  ```

- **Response**

  ```json
  {
    "success": true,
    "message": "Review Details Added Successfully"
  }
  ```

2. **Get the Review**: Get all reviews

- **EndPoint** `GET api/v1/review`
- **Request Body**

  ```json
     no request body
  ```

- **Response**

  ```json
  {
    "success": true,
    "message": "successfully fetched all the details",
    "data": [
      {
        "_id": "65f2d8ee5786f2dbcf0c8e51",
        "content": "Great restaurant!",
        "rating": 5,
        "user": "65f1f8f2f99e11add20394e4",
        "listing": "65f2a787c63105f26dbc0662",
        "response": "Thank you for your review.",
        "__v": 0
      }
    ]
  }
  ```

3. **Get the Reviews**: Get a single review by ID

- **EndPoint** `GET api/v1/review/:id`
- **Request Body**

  ```json
     no request body
  ```

- **Response**

  ```json
  {
    "success": true,
    "message": "Successfully fetched the details",
    "data": {
      "_id": "65f2d8ee5786f2dbcf0c8e51",
      "content": "Great restaurant!",
      "rating": 5,
      "user": "65f1f8f2f99e11add20394e4",
      "listing": "65f2a787c63105f26dbc0662",
      "response": "Thank you for your review.",
      "__v": 0
    }
  }
  ```

4. **Update the Review**:Update a review by ID

- **EndPoint** `Patch api/v1/review`
- **Request Body**

  ```json
  {
    "rating": 4
  }
  ```

- **Response**

  ```json
  {
    "success": true,
    "message": "Updated the review successfully"
  }
  ```

5. **DELETE the Review**: Delete the review by id

- **EndPoint** `DELETE api/v1/review`
- **Request Body**

  ```json
    no request body
  ```

- **Response**

  ```json
  {
    "success": true,
    "message": "Review deleted Successfully"
  }
  ```

## Data Models

### User

- name: String
- email: String
- password: String
- role: Enum[user, business_owner, admin]

### Listing

- name: String
- businessPhone: String
- city: String
- address: String
- images: Array[String]
- owner: ObjectId (User)
- averageRating: Number
- reviews: Array[ObjectId (Review)]

### Review

- content: String
- rating: Number
- user: ObjectId (User)
- listing: ObjectId (Listing)
- response: String
