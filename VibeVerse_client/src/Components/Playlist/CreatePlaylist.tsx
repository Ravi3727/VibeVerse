import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
interface FormData {
  title: string;
  description: string;
}
function CreatePlaylist() {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const Playlist_url = "http://localhost:3000/api/v1/playlist";
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });
  //   const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(Playlist_url, formData, {
        withCredentials: true,
      });
      console.log("Response: profile se ; ", response.data);

      if (response.data.success === true) {
        navigate(`/profile/${userId}`);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <div>
        <form
          className="mt-8 space-y-6 max-w-md w-full bg-black bg-opacity-70 p-2 rounded-xl shadow-xl mx-auto my-auto"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">
            <div className="text-2xl text-black opacity-90 font-bold font-sans text-center mb-3">
              Create Playlist
            </div>
            <div>
              <label htmlFor="title" className="text-black opacity-90 m-1">
                Video Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="text" className=" text-black opacity-90 m-1">
                Video Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                autoComplete="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-1 p-2"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePlaylist;
