import { useState, useEffect } from "react";
import useProductStore from "../../Store/useProductStore";

function SocialLinksForm() {
  const { fetchWebsiteSettings, updateWebsiteSettings } = useProductStore();
  const [formValues, setFormValues] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  });

  const [originalValues, setOriginalValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchWebsiteSettings();
      if (settings?.socialLinks) {
        const initialValues = {
          facebook: settings.socialLinks.facebook || "",
          instagram: settings.socialLinks.instagram || "",
          linkedin: settings.socialLinks.linkedin || "",
          twitter: settings.socialLinks.twitter || "",
          youtube: settings.socialLinks.youtube || "",
        };
        setFormValues(initialValues);
        setOriginalValues(initialValues);
      }
      setLoading(false);
    };
    loadSettings();
  }, [fetchWebsiteSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    // Check if values have changed from the original values
    setIsChanged(
      JSON.stringify(updatedValues) !== JSON.stringify(originalValues)
    );
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("socialLinks", JSON.stringify(formValues));
    await updateWebsiteSettings(formData);
    setOriginalValues(formValues);
    setIsChanged(false);
  };

  return (
    <div className="col-span-12 2xl:col-span-6 bg-white p-10 rounded-md">
      <h5 className="text-xl mb-6">Social Media Links</h5>

      {loading ? ( 
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdateSettings}>
          {Object.keys(formValues).map((platform) => (
            <div className="mb-5" key={platform}>
              <label className="capitalize">{platform}</label>
              <input
                type="text"
                name={platform}
                value={formValues[platform]}
                onChange={handleChange}
                className="input w-full border rounded-md px-4 py-2"
              />
            </div>
          ))}

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
      )}
    </div>
  );
}

export default SocialLinksForm;
