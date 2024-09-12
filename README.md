# VideVers
VideVerse is a full-stack web application inspired by YouTube, where users can upload videos, write tweets, comment on content, and like videos or tweets. It integrates advanced video handling features, including video uploads and streaming, while providing a social platform for interactions around multimedia content.

# Features
Video Uploading and Streaming: Upload videos in various formats, which are processed using FFmpeg for efficient streaming.
Tweet & Comment System: Share thoughts through tweets and leave comments on videos, fostering community engagement.
Like & Interactions: Like your favorite videos and tweets.
Authentication & Authorization: Secure login and signup using JWT-based authentication.

# Tech Stack

## Frontend
### React: Component-based architecture for building an interactive user interface.
### TailwindCSS: Utility-first CSS framework for fast and responsive UI design.

# Backend
### Node.js: JavaScript runtime for building the server-side logic.
### Express.js: Backend framework for handling API requests and managing routes.
### MongoDB: NoSQL database for efficient storage of user, video, and tweet data.
## Additional Tools
### FFmpeg: Used for handling video uploads, processing, and streaming.
### Docker: Containerization for consistent environment setups across development and production.
### JWT (JSON Web Tokens): Securing API routes through authentication and authorization.

# Installation

1. Clone the repository:
   ```git clone https://github.com/yourusername/VideVerse.git```
2. Navigate to the project directory:
   ```cd VideVerse```
3. Install dependencies for both frontend and backend:
   For frontend:
   ```cd FrontEnd```
   ```npm install```
   For backend:
   ```cd BackEnd```
   ```npm install```
4. Create a .env file in the BackEnd folder with the following environment variables:
   PORT=3000
    MONGODB_URI = 
    CORS_ORIGIN = 
    ACCESS_TOKEN_SCERET = 
    ACCESS_TOKEN_EXPIRE = 
    REFRESH_TOKEN_SCERET = 
    REFRESH_TOKEN_EXPIRE =
    CLOUDINARY_CLOUD_NAME =
    CLOUDINARY_API_KEY =
    ALOUDINARY_API_SECRET =  
5. Run the application:
   For frontend:
   ```cd FrontEnd```
   ```npm start```
   For backend:
   ```cd BackEnd```
   ```npm start```

6. Access the app at http://localhost:5173

# How it Works
Users can create an account or log in using their credentials.
After logging in, they can upload videos or write tweets.
Videos are processed with FFmpeg for streaming and stored in MongoDB along with metadata.
Users can interact by commenting and liking videos or tweets.
JWT tokens ensure that only authorized users can access certain features like uploading or commenting.

# Deployment
This project can be deployed using Render for backend services and Vercel for frontend hosting.

# Future Enhancements
Enhanced Search and Filtering: Advanced algorithms to help users discover videos based on their preferences.
User Playlists: Allow users to create and manage custom video playlists.
Subscriptions and Notifications: Users can subscribe to channels and receive notifications about new uploads.

#  Contributing
Feel free to submit pull requests to improve VideVerse. Please ensure that your contributions align with the project's goals and standards.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
