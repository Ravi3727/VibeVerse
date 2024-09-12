import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
function UpdateCoverImage() {
  const navigate = useNavigate();
  const [cover_image, setCover_image] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const updateUrl = `http://localhost:3000/api/v1/users/update_cover_image`;

  const handleFileChange = (e) => {
    setCover_image(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover_image", cover_image);

    try {
      const response = await axios.patch(updateUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setMessage(response.data.message);
      const userId = localStorage.getItem("userId");
      setLoading(false);
      navigate(`/profile/${userId}`);
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Cover Image</h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Cover mage
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {loading ? (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Update Cover Image
          </button>
        )}
      </form>
    </div>
  );
}

export default UpdateCoverImage;
