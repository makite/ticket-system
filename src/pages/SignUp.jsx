import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import InputField from "../widgets/inputField"; // Importing the custom InputField
import CustomButton from "../widgets/customButton"; // Importing the custom CustomButton
import OAuth from "../components/OAuth";
import useApiFetch from "../utils/apiMiddleware";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiFetch = useApiFetch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await apiFetch("/auth/signup", "POST", formData);
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-600 p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500">
          Ticket System
        </h1>
        <p className="text-lg text-center text-gray-600 mt-3">
          Create your account to book your tickets!
        </p>

        <form className="flex flex-col gap-5 mt-8" onSubmit={handleSubmit}>
          {/* Reusing InputField components */}
          <InputField
            label="Your username"
            id="username"
            name="username"
            type="text"
            color="green"
            placeholder="Username"
            onChange={handleChange}
          />

          <InputField
            label="Your email"
            id="email"
            name="email"
            type="email"
            color="purple"
            placeholder="name@company.com"
            onChange={handleChange}
          />

          <InputField
            label="Your password"
            id="password"
            name="password"
            type="password"
            color="blue"
            placeholder="Password"
            onChange={handleChange}
          />

          {/* Reusing CustomButton component */}
          <CustomButton
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
            className="py-3 px-8 mt-5 rounded-lg"
            text={loading ? "Signing up..." : "Sign Up"}
          />

          <OAuth />

          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span className="text-gray-600 dark:text-white">
              Already have an account?
            </span>
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
