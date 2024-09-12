import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
const CreateTweet = () => {
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const tweetUrl = `http://localhost:3000/api/v1/tweets`;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        tweetUrl,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setMessage("Tweet created successfully");
        setContent("");
        nevigate("/");
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create a Tweet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          {loading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              please wait...
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Tweet
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className="mt-4 text-center text-red-500">{message}</div>
      )}
    </div>
  );
};

export default CreateTweet;
