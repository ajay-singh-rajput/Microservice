
---

# Communication Platform with Google OAuth and Postmark Integration

This project implements a communication platform allowing users to log in using Google OAuth for authentication, view their communication details, and interact with the Postmarkapp.com API for email communication. The application is divided into a Node.js backend microservice and a React frontend, providing a seamless user experience for email management.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Additional Features](#additional-features)
6. [Contributing](#contributing)
7. [License](#license)

## Features
- **User Authentication**: Enables users to log in using Google OAuth for secure authentication.
  
- **Communication Details**: Allows users to view their communication history, including sent and received emails.
  
- **Send Email**: Implements an endpoint to send emails using the Postmarkapp.com API.
  
- **Email Filter**:  Manage them by putting them in folder.

- **Add favorite**:  Highlight any mail using add to favorite.

- **Real Time Update**: Get realtime notification when u received mail.

## Technologies Used
### Backend (Node.js)
- Node.js
- Express.js
- Passport.js (for OAuth authentication)
- Postmarkapp.com API (for email communication)
- Socket.io  (for realtime update)

### Frontend (React)
- React
- Redux (for state management)
- Taiwlind css (for styling components)
- Axios (for HTTP requests)


## Setup Instructions
To run this project locally, follow these steps:

### Prerequisites
- Node.js installed on your local environment
- Postmarkapp.com API credentials (API token)

### Installation
1. Clone the repository from GitHub:

2. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies for auth
   cd Auth_Server
   npm install

   # Install backend dependencies for Communication
   cd Communication_Server
   npm install

   # Install backend dependencies for Send Email
   cd Send_Email
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

### Configuration
1. Backend Configuration:
   - Create a `.env` file in the `backend` directory.
   - Add your Google OAuth credentials and Postmarkapp.com API token to the `.env` file:
     ```dotenv
     GOOGLE_CLIENT_ID= here_is_your_google_client_id
GOOGLE_CLIENT_SECRET= here_is_your_google_client_secret
JWT_SECRET=your-jwt-secret
MONGO_URI=  here_is_your_mongodb
POSTMARK_API_TOKEN = here_postmark_api_token
PORT = 8080
CLIENT_URL = http://localhost:5173/
SEND_MAIL_URL = http://localhost:8082
COMU_URL = http://localhost:8081
COMPANY_MAIL_ID = company_mail_for_update
COOKIE_NAME = here_is_come_name
COOKIE_KEY = here_is_come_key
     ```

2. Frontend Configuration:
   - Update the API endpoint in env file.
   ```dotenv
   VITE_BASE_URL = http://localhost:8080
   ```

### Running the Application
1. Start all the backend servers:
   ```bash
   # From the backend directory
   npm start
   ```

2. Start the frontend/client development server:
   ```bash
   # From the frontend/client directory
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage
1. **Google OAuth Login**:
   - Click on the "Login with Google" button to authenticate using your Google account.

2. **Communication History**:
   - Once logged in, you can view your communication history, including sent and received emails.

3. **Compose Email**:
   - Use the provided interface to compose and send emails.

4. **Live update**:
   - Get notification on receiving mail.

## Additional Features
- Real-time updates of communication history 
- Email organization into folders 
---
