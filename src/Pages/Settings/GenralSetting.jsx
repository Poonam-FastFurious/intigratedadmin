
import { useEffect, useState } from "react";

import useAdminStore from "../../Store/useAdminStore";
import Swal from "sweetalert2";
const stateCityData = {
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
  Delhi: ["New Delhi", "Dwarka", "Saket", "Karol Bagh", "Rohini"],
};
function GenralSetting() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const { updateAdmin, getAdminDetails ,adminDetails} = useAdminStore();
  const adminId = localStorage.getItem("adminId");

  
  const [formData, setFormData] = useState({
    adminId: adminId,
    state: "",
    city: "",
    address: "",
    postalCode: "",
    website: "",
  });

 
  useEffect(() => {
    setFormData((prev) => ({ ...prev, city: "" }));
  }, [formData.state]);

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
            <h3 className="mb-0 text-[28px]"> Settings</h3>
          </div>
        </div>

        <div className="bg-white rounded-md">
          <div className="px-6 md:px-10 py-7  border-b border-gray6 sm:flex justify-between items-center">
            <h5 className="text-lg mb-5 sm:mb-0">Basic Information</h5>
            <div className="sm:text-end">
              <button className="tp-btn px-10 py-2" onClick={handleSubmit}>
                save
              </button>
            </div>
          </div>
          <div className="px-0 md:px-10 py-10">
            <div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-0">Site URL</h6>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <div className="">
                  <input
                    value={formData.website || ""}
                    onChange={handleChange}
                    type="text"
                    name="website"
                    className="input rounded-md h-11 w-full border border-gray6  text-black"
                    placeholder="https://siteurl.com"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-0">Administration Email</h6>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <div className="">
                  <input
                    type="text"
                    className="input rounded-md h-11 w-full border border-gray6 text-black"
                    placeholder="Email"
                    value={adminDetails?.email}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 px-6 py-6 gap-6">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-1">Supported Payment Methods</h6>
                <p className="mb-0 leading-[18px] text-tiny">
                  Select Payment methods to show on website.
                </p>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <div className="flex flex-col space-y-5">
                  <div className="tp-checkbox flex items-center">
                    <input id="cod" type="checkbox" />
                    <label htmlFor="cod">Cash On Delivery</label>
                  </div>{" "}
                  <div className="tp-checkbox flex items-center">
                    <input id="RazorPay" type="checkbox" />
                    <label htmlFor="RazorPay">RazorPay</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-0">State</h6>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className="input rounded-md h-11 w-full border border-gray6 text-black"
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityData).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Dropdown */}
            <div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-0">City</h6>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <select
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                  className="input rounded-md h-11 w-full border border-gray6 text-black"
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {formData.state &&
                    stateCityData[formData.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <div className="">
                  <input
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    type="text"
                    className="input rounded-md h-11 w-full border border-gray6 text-black"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
              <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                <h6 className="mb-0">Post Code</h6>
              </div>
              <div className="col-span-12 sm:col-span-7 lg:col-span-8">
                <div className="">
                  <input
                    name="postalCode"
                    value={formData.postalCode || ""}
                    onChange={handleChange}
                    type="text"
                    className="input rounded-md h-11 w-full border border-gray6 text-black"
                    placeholder="Postal Code"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end mt-5">
          <button className="tp-btn px-10 py-2" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default GenralSetting;
