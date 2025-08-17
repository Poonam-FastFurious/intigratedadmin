import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import ChangePassword from "./ChangePassword";
import { InputField } from "../../Components/Utils/InputFields";

import useAdminStore from "../../Store/useAdminStore";

function Profile() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const adminId = localStorage.getItem("adminId");
  const { getAdminDetails, updateAdmin, adminDetails } = useAdminStore();

  const [formData, setFormData] = useState({
    adminId: adminId,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    designation: "",
  });

  useEffect(() => {
    async function fetchAdmin() {
      const data = await getAdminDetails(adminId);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          ...data,
          adminId: adminId, // Ensure adminId remains
        }));
      }
    }
    fetchAdmin();
  }, [updateTrigger, adminId, getAdminDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAdmin = await updateAdmin(formData); // Use Zustand function
    if (updatedAdmin) {
      setUpdateTrigger((prev) => !prev);
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Something went wrong while updating your profile.",
        confirmButtonColor: "#d33",
      });
    }
  };
  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between mb-10">
          <div className="page-title">
            <h3 className="mb-0 text-[28px]">My Profile</h3>
          </div>
        </div>

        <div className="bg-white rounded-md overflow-hidden mb-10">
          <div className="relative h-[200px] w-full">
            <div
              style={{
                backgroundImage:
                  "url(https://html.aqlova.com/ebazer/assets/img/bg/profile-header.jpg)",
              }}
              className="data-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
            ></div>
            <input type="file" id="coverPhoto" />
            <label
              htmlFor="coverPhoto"
              className="bg-white px-4 py-1 rounded-md text-center absolute right-5 top-5 sm:top-auto sm:bottom-5 z-10 text-tiny font-medium shadow-lg transition-all duration-200 border-0  hover:cursor-pointer hover:bg-theme hover:text-white"
            >
              <svg
                className="-translate-y-[2px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
              >
                <path
                  fill="currentColor"
                  d="M19,4h-.508L16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L5.508,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A5.006,5.006,0,0,0,19,4ZM9.276,2.39A1.006,1.006,0,0,1,10.068,2h3.864a1.008,1.008,0,0,1,.792.39L15.966,4H8.034ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6H19a3,3,0,0,1,3,3Z"
                />
                <path
                  fill="currentColor"
                  d="M12,8a6,6,0,1,0,6,6A6.006,6.006,0,0,0,12,8Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,18Z"
                />
              </svg>
              Upload Cover Photo
            </label>
          </div>
          <div className="px-8 pb-8 relative">
            <div className="-mt-[75px] mb-3 relative inline-block">
              <img
                className="w-[150px] h-[150px] rounded-[14px] border-4 border-white bg-white"
                src={adminDetails?.profilePhoto}
                alt=""
              />
              <input type="file" id="profilePhoto" className="hidden" />
              <label
                htmlFor="profilePhoto"
                className="inline-block w-8 h-8 rounded-full shadow-lg text-white bg-theme border-[2px] border-white text-center absolute top-[6px] right-[6px] translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
              >
                <svg
                  className="-translate-y-[2px]"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 36.174 36.174"
                >
                  <path
                    fill="currentColor"
                    d="M23.921,20.528c0,3.217-2.617,5.834-5.834,5.834s-5.833-2.617-5.833-5.834s2.616-5.834,5.833-5.834 S23.921,17.312,23.921,20.528z M36.174,12.244v16.57c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4v-16.57c0-2.209,1.791-4,4-4h4.92 V6.86c0-1.933,1.566-3.5,3.5-3.5h11.334c1.934,0,3.5,1.567,3.5,3.5v1.383h4.92C34.383,8.244,36.174,10.035,36.174,12.244z M26.921,20.528c0-4.871-3.963-8.834-8.834-8.834c-4.87,0-8.833,3.963-8.833,8.834s3.963,8.834,8.833,8.834 C22.958,29.362,26.921,25.399,26.921,20.528z"
                  />
                </svg>
              </label>
            </div>
            <div className="">
              <h5 className="text-xl mb-0">{Profile.username}</h5>
              <p className="text-tiny mb-0">{Profile.designation}</p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-8">
              <div className="py-10 px-10 bg-white rounded-md">
                <h5 className="text-xl mb-6">Basic Information</h5>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="mb-5">
                      <InputField
                        label="First Name"
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <InputField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="mb-5">
                      <p className="mb-0 text-base text-black">Phone </p>
                      <input
                        className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                        type="number"
                        name="phoneNumber"
                        placeholder="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5 profile-gender-select select-bordered">
                      <InputField
                        label="User Name"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">Bio </p>
                    <textarea
                      className="input w-full h-[200px] py-4 rounded-md border border-gray6 px-6 text-base resize-none text-black"
                      placeholder=" Hi there, this is my bio..."
                      value={formData.designation}
                      onChange={handleChange}
                      name="designation"
                    ></textarea>
                  </div>
                  <div className="text-end mt-5">
                    <button className="tp-btn px-10 py-2" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-span-12 2xl:col-span-4">
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
