import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice"; // Import your action

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://mern-ticket-system.vercel.app/api"; // Define your base URL here

const useApiFetch = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const apiFetch = async (endpoint, method = "GET", body = null) => {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": currentUser?._id || "", // Add currentUser._id to headers
        "X-Is-Admin": currentUser?.isAdmin || false, // Add currentUser.isAdmin to headers },
      },
    };
    console.log("isadmin in middleware: " + currentUser?.isAdmin);

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      console.log("response", response);

      if (!response.ok) {
        // Check for session expiration
        if (response.status === 401) {
          dispatch(signoutSuccess()); // Clear Redux state
          alert("Session expired. Please log in again.");
          window.location.href = "/sign-in"; // Redirect to login page
          return; // Exit the function
        }
        throw new Error(response.message || "Something went wrong");
      }

      return response;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error; // Rethrow the error for further handling
    }
  };

  return apiFetch;
};

export default useApiFetch;
