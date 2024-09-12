import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
  thumbnail:File | null;
  videoUrl: File | null;

}
function UploadVideo() {
  const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');
  const nevigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    thumbnail: null,
    videoUrl: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const url = "http://localhost:3000/api/v1/videos/";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }
    if (formData.videoUrl) {
      data.append("videoUrl", formData.videoUrl);
    }

    try {
      const response = await axios.post(url, data,{
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      console.log("register" + response);
      console.log("register" + response.data.success);
      if (response.data.success === true) {
        setLoading(false);
        nevigate(`/profile/${userId}`);

      }
    } catch (error) {
      console.error("Error fetching user: ", error);
        setLoading(false);
    }
  };

  return (
    <>

    <div className="h-screen items-center overflow-y-hidden">
    <div className="max-w-md w-full mx-auto space-y-8 bg-black bg-opacity-70 border-1 rounded-md p-2 backdrop-filter backdrop-blur-lg select-none mt-14">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black opacity-90">
            Publish Video
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">
            {/* Form Inputs */}
           
            <div>
              <label htmlFor="title" className="text-black opacity-90 m-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="title"
                autoComplete="textField"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-black opacity-90 m-1">
              Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                autoComplete="textField"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 w-96">
              <label
                htmlFor="thumbnail"
                className="mb-2 inline-block text-neutral-700 dark:text-black"
              >
                Upload thumbnail
              </label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-black focus:border-primary focus:text-black focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-3 w-96">
              <label
                htmlFor="videoUrl"
                className="mb-2 inline-block text-neutral-700 dark:text-black"
              >
                Upload Video
              </label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-black focus:border-primary focus:text-black focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="videoUrl"
                name="videoUrl"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            

            
        {loading ? (
          <div>
            <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          This will may take a few seconds
          </div>
        ) : (
          <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-1 p-2"
            >
              Upload
            </button>
        )}
          </div>
        </form>
      </div>
    </div>
      
    </>
  );
}

export default UploadVideo;
