import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // for edit

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${Baseurl}product/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch product");

        setFormData({
          name: data.name || "",
          brand: data.brand || "",
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.brand || (!file && !id)) {
      toast.error("Name, brand, and image are required");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("brand", formData.brand);
    if (file) form.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(
        `${Baseurl}product/${id ? `update/${id}` : "add"}`,
        {
          method: id ? "PATCH" : "POST",
          body: form,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving product");

      toast.success(id ? "Product updated" : "Product added");

      if (!id) {
        setFormData({ name: "", brand: "" });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        navigate("/products");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-content px-8 py-8 bg-gray-200 min-h-screen">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">
          {id ? "Edit" : "Add"} Product
        </h2>
        <p className="text-gray-600 text-sm">
          {id ? "Update existing product" : "Upload a new product"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            placeholder="e.g. Classic Watch"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Brand <span className="text-red-500">*</span>
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="">Select a brand</option>
            <option value="FUNTREATE">FUNTREATE</option>
            <option value="RICHLITE">RICHLITE</option>
            <option value="CRUNCHY KRAZE">CRUNCHY KRAZE</option>
          </select>
        </div>

        <div className="col-span-2">
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

        <div className="col-span-2">
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

export default AddProduct;
