import { useState, useEffect } from "react";
import useProductStore from "../../Store/useProductStore";

function BasicInfoForm() {
  const { fetchWebsiteSettings, updateWebsiteSettings } = useProductStore();
  const [formValues, setFormValues] = useState({
    siteName: "",
    siteDescription: "",
    siteKeywords: "",
    siteLogo: null,
    favicon: null,
  });
  const [originalValues, setOriginalValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewFavicon, setPreviewFavicon] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchWebsiteSettings();
      if (settings) {
        const initialValues = {
          siteName: settings.siteName || "",
          siteDescription: settings.siteDescription || "",
          siteKeywords: settings.siteKeywords || "",
        };
        setFormValues(initialValues);
        setOriginalValues(initialValues);
        setPreviewLogo(settings.siteLogo || null);
        setPreviewFavicon(settings.favicon || null);
      }
    };
    loadSettings();
  }, [fetchWebsiteSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    setIsChanged(
      JSON.stringify(updatedValues) !== JSON.stringify(originalValues)
    );
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormValues((prev) => ({ ...prev, [name]: file }));

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "siteLogo") {
          setPreviewLogo(reader.result);
        } else if (name === "favicon") {
          setPreviewFavicon(reader.result);
        }
      };
      reader.readAsDataURL(file);

      setIsChanged(true);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("siteName", formValues.siteName);
    formData.append("siteDescription", formValues.siteDescription);
    formData.append("siteKeywords", formValues.siteKeywords);
    if (formValues.siteLogo) formData.append("siteLogo", formValues.siteLogo);
    if (formValues.favicon) formData.append("favicon", formValues.favicon);

    await updateWebsiteSettings(formData);
    setOriginalValues(formValues);
    setIsChanged(false);
  };

  return (
    <div className="col-span-12 2xl:col-span-8 bg-white p-10 rounded-md">
      <h5 className="text-xl mb-6">Basic Information</h5>
      <form onSubmit={handleUpdateSettings}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="mb-5">
            <label>Site Name</label>
            <input
              type="text"
              name="siteName"
              className="input w-full border rounded-md px-4 py-2"
              value={formValues.siteName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label>Site Keywords</label>
            <input
              type="text"
              name="siteKeywords"
              value={formValues.siteKeywords}
              onChange={handleChange}
              className="input w-full border rounded-md px-4 py-2"
            />
          </div>
        </div>

        <div className="mb-5">
          <label>Site Description</label>
          <textarea
            name="siteDescription"
            value={formValues.siteDescription}
            onChange={handleChange}
            className="input w-full border rounded-md px-4 py-4"
          />
        </div>

        {/* Site Logo Upload */}

        <div className="mb-5">
          <label>Site Logo</label>
          <input
            type="file"
            name="siteLogo"
            accept="image/*"
            onChange={handleFileChange}
            className=" p-4"
          />
          {previewLogo && (
            <img src={previewLogo} alt="Site Logo" className="h-20 mt-2 m-4" />
          )}
        </div>

        {/* Favicon Upload */}
        <div className="mb-5">
          <label>Favicon</label>
          <input
            type="file"
            name="favicon"
            accept="image/*"
            onChange={handleFileChange} className=" p-4"
          />
          {previewFavicon && (
            <img src={previewFavicon} alt="Favicon" className="h-10 mt-2" />
          )}
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

export default BasicInfoForm;
