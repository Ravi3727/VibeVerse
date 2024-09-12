import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
//Isse me user controller me cookie access kr paa raha hun in both "req.cokkie or res.cookie" because we add cokkie middleware
app.use(cookieParser());
app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
// parses incoming requests with JSON payloads. When a request comes in with a JSON payload (like data from a form submitted with JavaScript's fetch() or XMLHttpRequest), this middleware parses the JSON body and makes it available as req.body.

app.use(express.urlencoded({ extended: true, limit: "16kb" })); //parses incoming requests with URL-encoded payloads. This is typically used when submitting form data in a web page

app.use(express.static("public"));
app.use('/video_uploads', express.static('video_uploads'));




// routes
import userRouter from './routes/user.routes.js';
import videoRouter from './routes/video.routes.js';
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import healthcheckRouter from "./routes/healthcheckup.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/sub.routes.js";



//routes decleration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export { app }