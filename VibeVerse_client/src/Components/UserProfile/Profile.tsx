import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../Videos/VideoCard";
import AboutCreator from "./AboutCreator";
import { useNavigate } from "react-router-dom";
import PlaylistDisplay from "../Playlist/PlaylistDisplay";
import { useParams } from "react-router-dom";
import TweetHomePage from "../Tweets/TweetHomePage";
import Spinner from "react-bootstrap/Spinner";

interface Video {
  thumbnail: string;
  title: string;
}
const Profile = () => {
  const navigate = useNavigate();

  const redirectToCreatePlaylist = () => {
    navigate("/createplaylist");
  };


  const [userDetails, setUserDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playlistResponse, setPlaylistResponse] = useState([]);
  const [toggleSub, settoggleSub] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const url = "http://localhost:3000/api/v1/users/current_user";
  const video_url = "http://localhost:3000/api/v1/videos";
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  // console.log("param se userid : " + userId);

  const fetch_User_Playlist = async () => {
    const Playlist_url = `http://localhost:3000/api/v1/playlist/user/${userId}`;
    // console.log("UserId from profile playlist url: " + userId);

    try {
      const response = await axios.get(Playlist_url, {
        withCredentials: true,
      });

      
      setPlaylistResponse(response.data.data);
    } catch (error) {
      console.error(`Error fetching playlists: ${error.message}`);
      console.error("Error fetching playlist:", error);
    }
  };
  const getUserTweets = `http://localhost:3000/api/v1/tweets/user/${userId}`;

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "playlist") {
      setLoading(true);
      fetch_User_Playlist();
      setLoading(false);
    }
  };

  const get_videos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(video_url, {
        params: {
          userId: userId,
          page: 1,
          limit: 10,
          // query: false,
          sortBy: "isPublished",
          sortType: "asc",
        },
        withCredentials: true,
      });
      // console.log("Videos Response:", response.data);
      setVideos(response.data.data);
      // console.log(video_message);
      // console.log("videos" + response.data.data)
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching video user : ${error.message}`);
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { withCredentials: true });
        // console.log("Response: Profile vala : ", response.data);
        setUserDetails(response.data);
        if (userId === response.data.data._id) {
          settoggleSub(!toggleSub);
        }
        setLoading(false);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          setLoading(false);
          navigate("/login");

        }
        console.error(`Error fetching current user  : ${error.message}`);
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
    get_videos();
    setLoading(false);
  }, []);

  if (!userDetails) {
    return <div className="text-white">Loading...</div>;
  }

  // const updateUrl = `http://localhost:3000/api/v1/users/update_cover_image`;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-48 bg-white relative">
        <div
          onClick={() => navigate("/updateCoverImage")}
          className="relative w-full h-56 group cursor-pointer "
        >
          <img
            className="w-full h-full border-4 border-white rounded-lg"
            src={
              userDetails.data.coverImage || "https://via.placeholder.com/150"
            }
            alt="Profile"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <span className="text-white text-center font-semibold font-sans text-xl mx-auto">
              Edit
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-4 transform translate-y-1/2"
          onClick={() => navigate("/updateAvatarImage")}
        >
          <div className="relative group cursor-pointer">
            <img
              className="w-32 h-32 rounded-full border-4 border-white"
              src={userDetails.data.avatar || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <span className="text-white font-semibold">Edit</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 px-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          {userDetails.data.username}
        </h1>
        <p className="text-gray-600"> {userDetails.data.fullName}</p>
        {toggleSub && (
          <div className="mt-4 flex space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Message
            </button>
          </div>
        )}
        <button
          onClick={() => navigate("/updateAccount")}
          className="bg-red-600 text-white px-4 py-2 rounded-md mt-2"
        >
          Edit
        </button>
      </div>
      <div className="mt-8 border-b border-gray-300">
        <nav className="flex space-x-4 px-4">
          <div className={activeTab === "home" ? "text-red-500" : "text-gray"}>
            <button onClick={() => handleTabClick("home")}>Home</button>
          </div>

          <div
            className={activeTab === "videos" ? "text-red-500" : "text-gray"}
          >
            <button onClick={() => handleTabClick("videos")}>Videos</button>
          </div>

          <div
            className={activeTab === "playlist" ? "text-red-500" : "text-gray"}
          >
            <button onClick={() => handleTabClick("playlist")}>Playlist</button>
          </div>
          <div className={activeTab === "about" ? "text-red-500" : "text-gray"}>
            <button onClick={() => handleTabClick("about")}>About</button>
          </div>

          <div className={activeTab === "tweets" ? "text-red-500" : "text-gray"}>
            <button onClick={() => handleTabClick("tweets")}>Tweets</button>
          </div>
        </nav>
      </div>

      {loading ? (
        <Spinner  as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"/>
      ) : (
        <div className="p-4">
          {/* <h2 className="text-2xl font-semibold text-gray-900 ">{videosCount}</h2> */}
          <div className="">
            {activeTab === "videos" && (
              <div className="flex justify-between ">
                <div>
                  <h1 className="text-xl font-semibold leading-10  text-red-500">
                    Total Videos {videos.length}
                  </h1>
                </div>
                <button
                  onClick={() => navigate("/upload")}
                  className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                  Upload
                </button>
              </div>
            )}
            {(activeTab === "home" || activeTab === "videos") && (
              <VideoCard
                items={videos}
                imageField="thumbnail"
                titleField="title"
                onCardClick={(item: Video) => console.log("Video clicked:", item)}

              />
            )}

            {activeTab === "playlist" && (
              <div className="flex flex-col gap-4">
                <div className="w-full h-10 p-2 justify-between text-center flex ">
                  <div className="text-lg font-semibold leading-3 text-red-500">
                    {" "}
                    Total Playlists :{playlistResponse.length}
                  </div>
                  <div>
                    <button
                      onClick={redirectToCreatePlaylist}
                      className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    >
                      Create+
                    </button>
                  </div>
                </div>
                <div className=" w-full h-full ">
                  <PlaylistDisplay playlists={playlistResponse} />
                </div>
              </div>
            )}
            {/* {all_playlist && <VideoCard playlistVideo = {playlistVideo} /> } */}

            {activeTab === "about" && (
              <h1 className="text-xl font-semibold leading-10 text-center text-red-500">
                <AboutCreator
                  userPhoto={userDetails.data.avatar}
                  userCoverImage={userDetails.data.coverImage}
                />
              </h1>
            )}

            { activeTab === "tweets" && <TweetHomePage URL = {getUserTweets}/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
