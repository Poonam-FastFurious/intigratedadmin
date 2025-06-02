/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAdminStore from "../../Store/useAdminStore";
function Header({ toggleSideMenu }) {
  const { logout , getAdminDetails, adminDetails} = useAdminStore();
  const [searchOverlay, setSearchOverlay] = useState(false);
  const [userOption, setUserOption] = useState(false);

  const toggleSearchOverlay = () => {
    setSearchOverlay(!searchOverlay);
  };

  const toggleUserOption = () => {
    setUserOption(!userOption);
  };
  useEffect(() => {
    useAdminStore.getState().checkAndLogoutIfExpired(); // ✅ Check Token Expiry

    const adminId = localStorage.getItem("adminId"); // Ensure this is stored on login
    if (adminId) {
      getAdminDetails(adminId);
    }
  }, [getAdminDetails]);

  return (
    <>
      <header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8 ">
        <div className="flex justify-between">
          <div className="flex items-center space-x-6 lg:space-x-0">
            <button
              type="button"
              className="block lg:hidden text-2xl text-black"
              onClick={toggleSideMenu}
            >
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M1 6H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M1 11H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="w-[30%] hidden md:block">
              <form action="#">
                <div className="w-[250px] relative">
                  <input
                    className="input h-12 w-full pr-[45px]"
                    type="text"
                    placeholder="Search Here..."
                  />
                  <button className="absolute top-1/2 right-6 translate-y-[-50%] hover:text-theme">
                    <svg
                      className="-translate-y-[2px]"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M18.9999 19L14.6499 14.65"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-6">
            <div className="md:hidden">
              <button
                className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-textBody border border-gray hover:bg-themeLight hover:text-theme hover:border-themeLight"
                onClick={toggleSearchOverlay}
              >
                <svg
                  className="-translate-y-[2px]"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18.9999 19L14.6499 14.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>

            {/* User Profile Section */}

            <div className="relative w-[70%] flex justify-end items-center">
              <button
                className="relative"
                type="button"
                onClick={toggleUserOption}
              >
                <img
                  className="w-[40px] h-[40px] rounded-md"
                  src={adminDetails?.profilePhoto || "/default-avatar.jpg"}
                  alt=""
                />
                <span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
              </button>
              {userOption && (
                <div className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5">
                  <div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
                    <div className="">
                      <img
                        className="w-[50px] h-[50px] rounded-md"
                        src={adminDetails?.profilePhoto || "/default-avatar.jpg"}
                        alt=""
                      />
                    </div>
                    <div className="">
                    <h5 className="text-base mb-1">{adminDetails?.name || "Admin"}</h5>
                    <p className="text-tiny">{adminDetails?.email || "admin@example.com"}</p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={logout}
                        to="#"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Search Overlay */}
        <div
          className={`fixed top-0 left-0 w-full bg-white p-10 z-50 transition-transform duration-300 md:hidden ${
            searchOverlay
              ? "translate-y-[0px]"
              : "-translate-y-[230px] lg:translate-y-[0]"
          }`}
        >
          <form action="#">
            <div className="relative mb-3">
              <input
                className="input h-12 w-full pr-[45px]"
                type="text"
                placeholder="Search Here..."
              />
              <button className="absolute top-1/2 right-6 translate-y-[-50%] hover:text-theme">
                <svg
                  className="-translate-y-[2px]"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18.9999 19L14.6499 14.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Overlay */}
        <div
          className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${
            searchOverlay ? "visible opacity-1" : "invisible opacity-0"
          }`}
          onClick={toggleSearchOverlay}
        ></div>
      </header>
    </>
  );
}

export default Header;
