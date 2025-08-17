import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";

function AddBanner() {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    order: "",
    isActive: true,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // for edit mode

  useEffect(() => {
    if (!id) return;

    const fetchBanner = async () => {
      try {
        const res = await fetch(`${Baseurl}banner/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setFormData({
          title: data.banner.title || "",
          link: data.banner.link || "",
          order: data.banner.order || "",
          isActive: data.banner.isActive,
        });
      } catch (err) {
        toast.error(err.message || "Error loading banner");
      }
    };

    fetchBanner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || (!file && !id)) {
      toast.error("Title and Image are required");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("link", formData.link);
    form.append("order", formData.order);
    form.append("isActive", formData.isActive);
    if (file) form.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(
        `${Baseurl}banner/${id ? `update/${id}` : "add"}`,
        {
          method: id ? "PATCH" : "POST",
          body: form,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving banner");

      toast.success(id ? "Banner updated successfully" : "Banner added");
      if (!id) {
        setFormData({ title: "", link: "", order: "", isActive: true });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        navigate("/banners");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-content px-8 py-8 bg-gray-200 min-h-screen">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">{id ? "Edit" : "Add"} Banner</h2>
        <p className="text-gray-600 text-sm">
          {id ? "Update existing banner" : "Upload a new banner"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {/* -- Title -- */}
        <div>
          <label className="block font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            placeholder="e.g. Diwali Sale"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Display Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            placeholder="e.g. 1"
          />
        </div>

        {/* -- Active checkbox -- */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Is Active</label>
        </div>

        {/* -- File Upload -- */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <label className="block font-medium mb-1">
            {id ? "Replace Image (optional)" : "Upload Image"}{" "}
            {!id && <span className="text-red-500">*</span>}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* -- Submit Button -- */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <button
            disabled={loading}
            type="submit"
            className="text-white tp-btn px-6 py-2 rounded bg-gray-600"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white inline-block mr-2"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading
              ? id
                ? "Updating..."
                : "Uploading..."
              : id
              ? "Update"
              : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBanner;
