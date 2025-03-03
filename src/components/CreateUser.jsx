import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../widgets/inputField"; // Import your custom InputField
import CustomButton from "../widgets/customButton"; // Import your custom CustomButton
import useApiFetch from "../utils/apiMiddleware";
export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiFetch = useApiFetch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/user/create", "POST", formData);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      navigate("/dashboard/users"); // Redirect to users dashboard
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a User</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Username Field */}
        <InputField
          label="Username"
          id="username"
          type="text"
          placeholder="Enter username"
          required
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        {/* Email Field */}
        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Password Field */}
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* Admin Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAdmin"
            onChange={(e) =>
              setFormData({ ...formData, isAdmin: e.target.checked })
            }
            className="w-4 h-4"
          />
          <label htmlFor="isAdmin" className="text-sm font-medium">
            Is Admin?
          </label>
        </div>

        {/* Submit Button */}
        <CustomButton
          type="submit"
          text="Create User"
          color="green"
          className="w-full"
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}
