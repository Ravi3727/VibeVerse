import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const url = "http://localhost:3000/api/v1/users/login";

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      if (response.data.success === true) {
        const userId = response.data.data.user._id;
        localStorage.setItem("userId", userId);

        navigate(`/profile/${userId}`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error) && error.response) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(error.response.data, "text/html");
        const preElement = doc.querySelector("pre");

        if (preElement) {
          const preText = preElement.textContent || "";
          const match = preText.match(
            /Error: (Invalid password|User does not exist)/
          );
          if (match) {
            setErrorMessage(match[1]);
          } else {
            setErrorMessage("An unknown error occurred.");
          }
        } else {
          setErrorMessage("An unknown error occurred.");
        }
      } else {
        setErrorMessage("An unknown error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md w-full space-y-8 bg-black bg-opacity-70 border-1 rounded-md p-2 backdrop-filter backdrop-blur-lg select-none">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Welcome to VibeVerse
          </h2>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Password"
                value={formData.password}
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
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
