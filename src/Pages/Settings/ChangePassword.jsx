import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Baseurl } from "../../Config";

export default function ChangePassword() {
  const accessToken = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // "success" or "error"
  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new !== formData.confirm) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        Baseurl + "admin/change-password",
        {
          oldPassword: formData.current,
          newPassword: formData.new,
        },
        {
          headers: {
            Authorization: `${accessToken}`, // Replace with actual token
          },
        }
      );
      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-10 bg-white rounded-md">
      <h5 className="text-xl mb-6">Security</h5>

      <form onSubmit={handleSubmit}>
        {[
          { label: "Current Password", field: "current" },
          { label: "New Password", field: "new" },
          { label: "Confirm Password", field: "confirm" },
        ].map(({ label, field }) => (
          <div className="mb-5 relative" key={field}>
            <p className="mb-0 text-base text-black">{label}</p>
            <input
              className="input w-full h-[49px] rounded-md border border-gray-300 px-6 text-base text-black pr-12"
              type={showPassword[field] ? "text" : "password"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={label}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-500"
              onClick={() => togglePassword(field)}
            >
              {showPassword[field] ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        ))}
        {message && (
          <p
            className={
              messageType === "success" ? "text-green-500" : "text-red-500"
            }
          >
            {message}
          </p>
        )}
        <div className="text-end mt-5">
          <button
            type="submit"
            className="tp-btn px-10 py-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
