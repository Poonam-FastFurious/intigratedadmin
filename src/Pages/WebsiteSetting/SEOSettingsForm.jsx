import { useState, useEffect } from "react";
import useProductStore from "../../Store/useProductStore";

function SEOSettingsForm() {
  const { fetchWebsiteSettings, updateWebsiteSettings } = useProductStore();
  const [formValues, setFormValues] = useState({
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [originalValues, setOriginalValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  // Fetch website settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchWebsiteSettings();
      if (settings) {
        const initialValues = {
          seoTitle: settings.seoTitle || "",
          seoDescription: settings.seoDescription || "",
          seoKeywords: settings.seoKeywords || "",
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

    // Check if form values have changed
    setIsChanged(
      JSON.stringify(updatedValues) !== JSON.stringify(originalValues)
    );
  };

  // Handle form submission
  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("seoTitle", formValues.seoTitle);
    formData.append("seoDescription", formValues.seoDescription);
    formData.append("seoKeywords", formValues.seoKeywords);

    await updateWebsiteSettings(formData);
    setOriginalValues(formValues);
    setIsChanged(false);
  };

  return (
    <div className="col-span-12 2xl:col-span-6 bg-white p-10 rounded-md">
      <h5 className="text-xl mb-6">SEO Settings</h5>
      <form onSubmit={handleUpdateSettings}>
        <div className="mb-5">
          <label>SEO Title</label>
          <input
            type="text"
            name="seoTitle"
            value={formValues.seoTitle}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-5">
          <label>SEO Description</label>
          <textarea
            name="seoDescription"
            value={formValues.seoDescription}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-5">
          <label>SEO Keywords</label>
          <input
            type="text"
            name="seoKeywords"
            value={formValues.seoKeywords}
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

export default SEOSettingsForm;
