import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Config";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false); // state to track password visibility
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState(""); // Handle both email and username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(Baseurl + "admin/login", {
        email: emailOrUsername, // Send email or username as email
        username: emailOrUsername, // Send email or username as username
        password,
      });

      // Assuming the response contains accessToken, refreshToken, and user info
      if (response.data) {
        // Save tokens and user info in localStorage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("adminId", response.data.data.user._id);
        localStorage.setItem("username", response.data.data.user.username);

        // Save tokens in cookies (optional)
        document.cookie = `accessToken=${response.data.data.accessToken}; path=/; max-age=3600`; // Expires in 1 hour
        document.cookie = `refreshToken=${response.data.data.refreshToken}; path=/; max-age=3600`; // Expires in 1 hour
        document.cookie = `adminId=${response.data.data.user._id}; path=/; max-age=3600`; // Expires in 1 hour

        // Handle successful login (e.g., save token, redirect user)
        console.log("Login successful:", response.data);
        navigate("/"); // Redirect to the dashboard or home page
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials, please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const isButtonDisabled = !password || !checkboxChecked;
  return (
    <>
      <div className="tp-main-wrapper h-screen">
        <div className="container mx-auto my-auto h-full flex items-center justify-center">
          <div className="py-24">
            <div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md">
              <div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
                <div
                  className="data-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url(https://html.hixstudio.net/ebazer/assets/img/bg/login-bg.jpg)",
                  }}
                ></div>
              </div>
              <div className="col-span-12 lg:col-span-6 md:w-[500px] mx-auto my-auto pt-[100px] py-[95px] px-5 md:px-[60px]">
                <div className="text-center">
                  <h4 className="text-[24px] mb-1">Login Now.</h4>
                  <p>
                    Login to your store
                    <span>
                      <Link to="#" className="text-theme pl-2">
                        to view
                      </Link>{" "}
                    </span>
                  </p>
                </div>
                <div className="my-6 flex items-center space-x-3">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <p className="mb-0">Use</p>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                <div className="">
                  <form onSubmit={handleLogin}>
                    <div className="mb-5">
                      <p className="mb-0 text-base text-black">
                        Email or Username <span className="text-red">*</span>
                      </p>
                      <input
                        className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
                        type="text"
                        placeholder="Enter Your Email or Username"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-5 relative">
                      <p className="mb-0 text-base text-black">
                        Password <span className="text-red">*</span>
                      </p>
                      <input
                        className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
                        type={passwordVisible ? "text" : "password"} // toggle the password visibility
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)} // toggle password visibility
                        className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-500"
                      >
                        {passwordVisible ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="tp-checkbox flex items-start space-x-2 mb-3">
                        <input
                          id="product-1"
                          type="checkbox"
                          checked={checkboxChecked}
                          onChange={() => setCheckboxChecked(!checkboxChecked)}
                        />
                        <label htmlFor="product-1" className="text-tiny">
                          Remember Me
                        </label>
                      </div>
                      <div className="mb-4">
                        <Link
                          to="/forgot"
                          className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`  h-[49px] w-full justify-center  ${
                        isButtonDisabled
                          ? "tp-btn bg-info/10 text-black"
                          : "tp-btn"
                      }`}
                      disabled={isButtonDisabled || loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </form>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
