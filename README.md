# Educase-project

## Overview

The School Management API is a Node.js-based application built with Express.js and MySQL. This API allows users to manage school data by adding new schools and retrieving a list of schools sorted by their proximity to a user-specified location.

## Features

-  **Add School:** Insert a new school record with details such as name, address, latitude, and longitude.
-  **List Schools:** Retrieve all schools and sort them based on the distance from a provided set of coordinates using the Haversine formula.
-  **Database Integration:** Uses MySQL for persistent data storage.
-  **Basic Validation:** Ensures that the required fields are provided and are of the correct type before data is inserted.

## Technologies Used

-  Node.js
-  Express.js
-  MySQL (via the `mysql2` library)
-  Postman (for API testing)

## Project Setup

### Prerequisites

-  [Node.js](https://nodejs.org/) (version 12 or higher)
-  [MySQL](https://www.mysql.com/) installed and running

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SauravChaudhary26/educase-project.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Database Setup:**

   -  **Create a Database:**  
      Log in to your MySQL client and create a new database:

      ```sql
      CREATE DATABASE school_db;
      USE school_db;
      ```

   -  **Create the `schools` Table:**  
       Execute the following SQL command:
      `sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
`
      ``

4. **Configure the Database Connection:**

   -  Open the `app.js` file and update your MySQL connection settings with your credentials:
      ```javascript
      const db = mysql.createConnection({
         host: "localhost",
         user: "your_username",
         password: "your_password",
         database: "school_db",
      });
      ```

## Running the Application

1. **Start the Server:**
   ```bash
   npm start
   ```
   Alternatively, if you are using nodemon for development:
   ```bash
   npm run dev
   ```
2. **Access the API:**  
   The server runs on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Add School API

-  **Endpoint:** `/addSchool`
-  **Method:** `POST`
-  **Description:** Inserts a new school record into the database.
-  **Payload Requirements:**  
   A JSON object containing:
   -  `name` (string)
   -  `address` (string)
   -  `latitude` (number)
   -  `longitude` (number)
-  **Example Request Body:**
   ```json
   {
      "name": "Greenwood High School",
      "address": "123 Greenwood Ave, Springfield, IL",
      "latitude": 39.7817,
      "longitude": -89.6501
   }
   ```
-  **Response Example:**
   ```json
   {
      "message": "School added successfully",
      "schoolId": 1
   }
   ```

### 2. List Schools API

-  **Endpoint:** `/listSchools`
-  **Method:** `GET`
-  **Description:** Retrieves all schools and sorts them based on proximity to a user-specified location.
-  **Query Parameters:**
   -  `latitude`: User's current latitude.
   -  `longitude`: User's current longitude.
-  **Example Request:**
   ```
   GET http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060
   ```
-  **Response Example:**
   ```json
   {
      "schools": [
         {
            "id": 5,
            "name": "Riverdale High School",
            "address": "202 River Rd, New York, NY",
            "latitude": 40.7128,
            "longitude": -74.006,
            "distance": 0
         }
         // Additional school records sorted by distance...
      ]
   }
   ```

## Author

Saurav Kumar Chaudhary
[sauravchaudhary2609@gmail.com](mailto:sauravchaudhary2609@gmail.com)
