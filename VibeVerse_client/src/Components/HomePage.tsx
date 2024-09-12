import React, { useEffect } from "react";
import VideoCard from "./Videos/VideoCard";
import { useState } from "react";
import axios from "axios";
import HomePageTweets from "./Tweets/HomePageTweets";
import { Spinner } from "react-bootstrap";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const allVideoUrl = "http://localhost:3000/api/v1/videos/allVideos";
  useEffect(() => {
    const getAllVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(allVideoUrl);
        // console.log("Videos Response:", response.data);
        setVideos(response.data.data);
        setPage("tweets");
        // console.log(video_message);
        // console.log("videos" + response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching video user : ${error.message}`);
        setLoading(false);
        // console.error("Error fetching videos:", error);
      }
    };

    getAllVideos();
  }, []);
  


  const toggleHomeTweets = (tag) => {
    setPage(tag);
  };

  return (
    <div className="w-full h-full ">
      <div className="w-full flex flex-row justify-evenly text-xl font-semibold leading-8 p-2 cursor-pointer">
        <div onClick={() => toggleHomeTweets("home")} className="underline">
          Videos
        </div>
        <div onClick={() => toggleHomeTweets("tweets")} className="underline">
          Tweets
        </div>
      </div>
      {
        loading ? (
          <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          />
        ):(
          <div className="">
        {page === "home" ? (
          <VideoCard
            items={videos}
            imageField="thumbnail"
            titleField="title"
            onCardClick={(item) => console.log("Video clicked:", item)}
          />
        ) : (
          <HomePageTweets />
        )}
      </div>
        )
      }
    </div>
  );
}

export default HomePage;
