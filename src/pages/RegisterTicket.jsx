import { Alert, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import InputField from "../widgets/inputField";
import CustomButton from "../widgets/customButton";
import useApiFetch from "../utils/apiMiddleware";
import PropTypes from "prop-types";
export default function RegisterTicket({ closeModal }) {
  const initialFormData = {
    title: "",
    category: "uncategorized",
    description: "",
    price: "",
    quantity: "",
    eventDate: "",
    eventTime: "",
    status: "Registered", // Default status
  };

  const [formData, setFormData] = useState(initialFormData);
  const [publishError, setPublishError] = useState(null);
  const apiFetch = useApiFetch();

  useEffect(() => {
    const firstInput = document.getElementById("title");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/ticket/register", "POST", formData);
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      // Clear the form after successful submission
      setFormData(initialFormData);
      closeModal();
      // Optionally navigate to a different page
      // navigate(`/ticket/${data.ticketId}`);
    } catch (error) {
      console.error(error);
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Register a Ticket
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Ticket Title */}
        <InputField
          label="Ticket Title"
          id="title"
          placeholder="Enter ticket title"
          required
          value={formData.title} // Bind value
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Ticket Category */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium">
            Ticket Category
          </label>
          <Select
            id="category"
            value={formData.category} // Bind value
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="uncategorized">Select a category</option>
            <option value="general">General Admission</option>
            <option value="vip">VIP</option>
            <option value="student">Student</option>
            <option value="early-bird">Early Bird</option>
          </Select>
        </div>

        {/* Ticket Description */}
        <InputField
          label="Ticket Description"
          id="description"
          placeholder="Describe the ticket..."
          type="textarea"
          required
          value={formData.description} // Bind value
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* Ticket Price */}
        <InputField
          label="Ticket Price"
          id="price"
          type="number"
          placeholder="Enter ticket price"
          required
          value={formData.price} // Bind value
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        {/* Number of Tickets */}
        <InputField
          label="Number of Tickets"
          id="quantity"
          type="number"
          placeholder="Enter number of tickets"
          required
          value={formData.quantity} // Bind value
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />

        {/* Event Date and Time */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center">
          <InputField
            label="Date"
            id="eventDate"
            type="date"
            required
            value={formData.eventDate} // Bind value
            onChange={(e) =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
            min={new Date().toISOString().split("T")[0]}
          />
          <InputField
            label="Time"
            id="eventTime"
            type="time"
            required
            value={formData.eventTime} // Bind value
            onChange={(e) =>
              setFormData({ ...formData, eventTime: e.target.value })
            }
          />
        </div>

        {/* Ticket Status (Hidden, default value is "Registered") */}
        <input
          type="hidden"
          name="status"
          value="Registered"
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />

        {/* Submit Button */}
        <CustomButton
          type="submit"
          text="Register Ticket"
          color="green"
          className="w-full"
        />

        {/* Error Message */}
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
RegisterTicket.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
