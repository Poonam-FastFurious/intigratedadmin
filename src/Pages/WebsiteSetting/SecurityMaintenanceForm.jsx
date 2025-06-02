import { useState, useEffect } from "react";
import useProductStore from "../../Store/useProductStore";

function SecurityMaintenanceForm() {
  const { fetchWebsiteSettings, updateWebsiteSettings } = useProductStore();
  const [formValues, setFormValues] = useState({
    maintenanceMode: false,
    termsAndConditions: "",
    privacyPolicy: "",
  });

  const [originalValues, setOriginalValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  // Fetch website settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchWebsiteSettings();
      if (settings) {
        const initialValues = {
          maintenanceMode: settings.maintenanceMode || false,
          termsAndConditions: settings.termsAndConditions || "",
          privacyPolicy: settings.privacyPolicy || "",
        };
        setFormValues(initialValues);
        setOriginalValues(initialValues);
      }
    };
    loadSettings();
  }, [fetchWebsiteSettings]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    setIsChanged(JSON.stringify(updatedValues) !== JSON.stringify(originalValues));
  };

  // Handle select changes (for boolean values)
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value === "true" };
    setFormValues(updatedValues);
    setIsChanged(JSON.stringify(updatedValues) !== JSON.stringify(originalValues));
  };

  // Handle form submission
  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("maintenanceMode", formValues.maintenanceMode);
    formData.append("termsAndConditions", formValues.termsAndConditions);
    formData.append("privacyPolicy", formValues.privacyPolicy);

    await updateWebsiteSettings(formData);
    setOriginalValues(formValues);
    setIsChanged(false);
  };

  return (
    <div className="col-span-12 2xl:col-span-6 bg-white p-10 rounded-md">
      <h5 className="text-xl mb-6">Security & Maintenance</h5>
      <form onSubmit={handleUpdateSettings}>
        <div className="mb-5">
          <label>Maintenance Mode</label>
          <select
            name="maintenanceMode"
            value={formValues.maintenanceMode.toString()}
            onChange={handleSelectChange}
            className="input w-full border rounded-md px-4 py-2"
          >
            <option value="false">Disabled</option>
            <option value="true">Enabled</option>
          </select>
        </div>

        <div className="mb-5">
          <label>Terms & Conditions</label>
          <input
            type="text"
            name="termsAndConditions"
            value={formValues.termsAndConditions}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="mb-5">
          <label>Privacy Policy</label>
          <input
            type="text"
            name="privacyPolicy"
            value={formValues.privacyPolicy}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="text-end mt-5">
          <button
            className={`tp-btn px-10 py-2 bg-blue-500 text-white rounded-md ${
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

export default SecurityMaintenanceForm;
