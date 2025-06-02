import { useState, useEffect } from "react";
import useProductStore from "../../Store/useProductStore";

function ContactInfoForm() {
  const { fetchWebsiteSettings, updateWebsiteSettings } = useProductStore();
  const [formValues, setFormValues] = useState({
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
  });
  const [originalValues, setOriginalValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchWebsiteSettings();
      if (settings) {
        const initialValues = {
          contactEmail: settings.contactEmail || "",
          contactPhone: settings.contactPhone || "",
          contactAddress: settings.contactAddress || "",
        };
        setFormValues(initialValues);
        setOriginalValues(initialValues);
      }
    };
    loadSettings();
  }, [fetchWebsiteSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    // Check if form values are changed from original values
    setIsChanged(
      JSON.stringify(updatedValues) !== JSON.stringify(originalValues)
    );
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contactEmail", formValues.contactEmail);
    formData.append("contactPhone", formValues.contactPhone);
    formData.append("contactAddress", formValues.contactAddress);

    await updateWebsiteSettings(formData);
    setOriginalValues(formValues);
    setIsChanged(false);
  };

  return (
    <div className="col-span-12 2xl:col-span-4 bg-white p-10 rounded-md">
      <h5 className="text-xl mb-6">Contact Information</h5>
      <form onSubmit={handleUpdateSettings}>
        <div className="mb-5">
          <label>Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formValues.contactEmail}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-5">
          <label>Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={formValues.contactPhone}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-5">
          <label>Contact Address</label>
          <textarea
            name="contactAddress"
            value={formValues.contactAddress}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>
        <div className="text-end mt-5">
          <button
            className={`tp-btn px-10 py-2 ${
              !isChanged ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={!isChanged}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactInfoForm;
