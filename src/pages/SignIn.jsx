import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import InputField from "../widgets/inputField"; // Importing the custom InputField
import CustomButton from "../widgets/customButton"; // Importing the custom CustomButton
import OAuth from "../components/OAuth";
import { Alert } from "flowbite-react";
import useApiFetch from "../utils/apiMiddleware";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiFetch = useApiFetch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await apiFetch("/auth/signin", "POST", formData);
      const data = await res.json();
      console.log("data", data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-600 p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500">
          Ticket System
        </h1>
        <p className="text-lg text-center text-gray-600 mt-3">
          Welcome! Please sign in to your account.
        </p>

        <form className="flex flex-col gap-5 mt-8" onSubmit={handleSubmit}>
          {/* Input fields using custom InputField component */}
          <InputField
            label="Enter your email"
            id="email"
            name="email"
            type="email"
            color="green"
            placeholder="name@example.com"
            onChange={handleChange}
          />

          <InputField
            label="Enter your password"
            id="password"
            name="password"
            type="password"
            color="purple"
            placeholder="**********"
            onChange={handleChange}
          />
          <CustomButton
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
            className="py-3 px-8 mt-5 rounded-lg"
            text={loading ? "Signing in..." : "Sign In"}
          />

          <OAuth />

          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span className="text-gray-600 dark:text-white">
              Don&apos;t have an account?
            </span>
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
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
