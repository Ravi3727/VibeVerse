import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
function TweetHomePage({ URL }) {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [editTweetId, setEditTweetId] = useState(null);
  const [likedTweets, setLikedTweets] = useState({});
  const [editContent, setEditContent] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const getTweetsUrl = URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTweets = async () => {
      setLoading(true);
      try {
        const response = await axios.get(getTweetsUrl, {
          withCredentials: true,
        });
        setTweets(response.data.data);
        // Initialize likedTweets state
        const likedTweetsState = response.data.data.reduce((acc, tweet) => {
          acc[tweet._id] = tweet.liked; // Assuming the API returns if the tweet is liked by the user
          return acc;
        }, {});
        setLikedTweets(likedTweetsState);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching tweets: ", error.message);
        setLoading(false);
      }
    };
    getTweets();
  }, []);

  const redirectToCreateTweets = () => {
    navigate("/createTweets");
  };

  const handleEdit = (tweetId, currentContent) => {
    setEditTweetId(tweetId);
    setEditContent(currentContent);
  };

  const handleDelete = async (tweetId) => {
    setLoading(true);
    const deleteTweetUrl = `http://localhost:3000/api/v1/tweets/${tweetId}`;
    try {
      await axios.delete(deleteTweetUrl, { withCredentials: true });
      setTweets((prevTweets) =>
        prevTweets.filter((tweet) => tweet._id !== tweetId)
      );
      setLikedTweets((prevLikedTweets) => {
        const { [tweetId]: _, ...rest } = prevLikedTweets;
        return rest;
      });
      setLoading(false);
    } catch (error) {
      setErrorMsg(error.message);
      console.log("Error deleting tweet: ", error.message);
      setLoading(false);
    }
  };

  const handleUpdate = async (tweetId) => {
    setLoading(true);
    const updateTweetsUrl = `http://localhost:3000/api/v1/tweets/${tweetId}`;
    try {
      await axios.patch(
        updateTweetsUrl,
        { content: editContent },
        { withCredentials: true }
      );
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === tweetId ? { ...tweet, content: editContent } : tweet
        )
      );
      setEditTweetId(null);
      setEditContent("");
      setLoading(false);
    } catch (error) {
      setErrorMsg(error.message);
      console.log("Error updating tweet: ", error.message);
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTweetId(null);
    setEditContent("");
    setErrorMsg("");
  };

  const handleTweetsLikes = async (tweetId) => {
    setLoading(true);
    const tweetLikeUrl = `http://localhost:3000/api/v1/likes/toggle/t/${tweetId}`;
    try {
      const response = await axios.post(
        tweetLikeUrl,
        {},
        { withCredentials: true }
      );
      setLikedTweets((prevLikedTweets) => ({
        ...prevLikedTweets,
        [tweetId]: !prevLikedTweets[tweetId],
      }));
      console.log("Response: Tweets like toggled: ", response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error on like tweets: ${error.message}`);
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full p-4 flex justify-center items-center text-black text-xl">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-evenly w-full h-full">
      <div className="w-10/12 h-full bg-black opacity-90 p-4 rounded-lg">
        <h1 className="text-white text-xl font-bold mb-4">
          TweetHomePage - {tweets.length} Tweets
        </h1>
        <div className="space-y-4">
          <p className="text-white">
            {ErrorMsg === "Request failed with status code 500"
              ? "You don't have permission to perform this action"
              : ""}
          </p>
          {tweets.map((tweet) => (
            <div key={tweet._id} className="p-4 bg-white rounded shadow-md">
              {editTweetId === tweet._id ? (
                <div>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  ></textarea>
                  <div className="mt-2">
                    <button
                      onClick={() => handleUpdate(tweet._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between p-1 ">
                  <div className="flex flex-col gap-2 ">
                    <p className="mb-2 text-xl font-semibold leading-4">
                      {tweet.content}
                    </p>
                    <span className="text-gray-500 text-sm font-semibold">
                      {new Date(tweet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <button onClick={() => handleTweetsLikes(tweet._id)}>
                      <div className="text-black text-4xl">
                        {likedTweets[tweet._id] ? (
                          <FcLike />
                        ) : (
                          <FcLikePlaceholder />
                        )}
                      </div>
                    </button>
                    <button
                      onClick={() => handleEdit(tweet._id, tweet.content)}
                      className="ml-2 text-black text-2xl hover:bg-green-500 font-bold py-1 px-2 rounded"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tweet._id)}
                      className="ml-2 text-black text-2xl hover:bg-red-500 font-bold py-1 px-2 rounded"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={redirectToCreateTweets}
          className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Create Tweets
        </button>
      </div>
    </div>
  );
}

export default TweetHomePage;
