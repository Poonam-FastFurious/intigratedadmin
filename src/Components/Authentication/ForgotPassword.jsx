import { useState } from "react";
import { Link } from "react-router-dom";
import useAdminStore from "../../Store/useAdminStore";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAdminStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const success = await forgotPassword(email);

    if (success) {
      setEmail(""); // Clear input after success
    }
  };
  return (
    <>
      <div className="tp-main-wrapper h-screen">
        <div className="container mx-auto my-auto h-full flex items-center justify-center">
          <div className="w-[500px] mx-auto my-auto shadow-lg bg-white pt-[50px] py-[60px] px-[60px]">
            <div className="text-center">
              <h4 className="text-[24px] mb-1">Reset Password</h4>
              <p>Enter your email address to request password reset.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <p className="mb-0 text-base text-black">
                  Email <span className="text-red">*</span>
                </p>
                <input
                  className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="tp-btn h-[49px] w-full justify-center"
              >
                Send Mail
              </button>

              <div className="tp-checkbox flex items-start space-x-2 mt-5 justify-center">
                <p className="mb-0 leading-none">
                  Remember password ?{" "}
                  <Link
                    to="/login"
                    className="text-theme border-b border-transparent hover:border-theme"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
