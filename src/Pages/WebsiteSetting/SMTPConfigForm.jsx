import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import useProductStore from "../../Store/useProductStore";

function SMTPConfigForm() {
  const { fetchWebsiteSettings, updateWebsiteSettings } = useProductStore();
  const [formValues, setFormValues] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    fromEmail: "",
  });

  const [originalValues, setOriginalValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchWebsiteSettings();
      if (settings?.smtpConfig) {
        const initialValues = {
          host: settings.smtpConfig.host || "",
          port: settings.smtpConfig.port || "",
          username: settings.smtpConfig.username || "",
          password: settings.smtpConfig.password || "",
          fromEmail: settings.smtpConfig.fromEmail || "",
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
    setIsChanged(
      JSON.stringify(updatedValues) !== JSON.stringify(originalValues)
    );
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("smtpConfig", JSON.stringify(formValues));
    await updateWebsiteSettings(formData);
    setOriginalValues(formValues);
    setIsChanged(false);
  };

  return (
    <div className="col-span-12 2xl:col-span-6 bg-white p-10 rounded-md">
      <h5 className="text-xl mb-6">SMTP Configuration</h5>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdateSettings}>
          {Object.keys(formValues).map((field) => (
            <div className="mb-5 relative" key={field}>
              <label className="capitalize">{field}</label>
              <div className="relative">
                <input
                  type={field === "password" && !showPassword ? "password" : "text"}
                  name={field}
                  value={formValues[field]}
                  onChange={handleChange}
                  className="input w-full border rounded-md px-4 py-2 pr-10"
                />
                {field === "password" && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                )}
              </div>
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

export default SMTPConfigForm;
