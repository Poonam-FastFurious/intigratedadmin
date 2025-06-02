import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../Store/useAdminStore";
import toast from "react-hot-toast";

function ResetPassword() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");

  const navigate = useNavigate();
  const { resetPassword } = useAdminStore();
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !token) {
      toast.error("Invalid reset link.");
      return;
    }

    if (!passwords.new || !passwords.confirm) {
      toast.error("Both fields are required!");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    const success = await resetPassword({ id, token, password: passwords.new });

    if (success) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="tp-main-wrapper h-screen">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="w-[500px] mx-auto shadow-lg bg-white pt-[50px] pb-[50px] px-[60px]">
          <div className="text-center">
            <h4 className="text-[24px] mb-1">Enter Password</h4>
            <p>Check your email. Weve sent a reset link.</p>
          </div>
          <form onSubmit={handleSubmit}>
            {["new", "confirm"].map((field) => (
              <div className="mb-5 relative" key={field}>
                <p className="mb-0 text-base text-black">
                  {field === "new" ? "New Password" : "Confirm Password"}
                </p>
                <input
                  className="input w-full h-[49px] rounded-md border px-6 text-base pr-12"
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  placeholder={
                    field === "new" ? "New Password" : "Confirm Password"
                  }
                  value={passwords[field]}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-500"
                  onClick={() => togglePassword(field)}
                >
                  {showPassword[field] ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            ))}
            <div className="text-end mt-5">
              <button type="submit" className="tp-btn px-10 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
