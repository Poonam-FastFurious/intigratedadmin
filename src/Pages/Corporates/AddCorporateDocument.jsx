import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";

function AddCorporateDocument() {
  const [formData, setFormData] = useState({
    title: "",
    documentType: "",
    year: "",
    quarter: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // <- URL param to detect edit mode

  // Fetch document if editing
  useEffect(() => {
    if (!id) return;

    const fetchDocument = async () => {
      try {
        const res = await fetch(`${Baseurl}corporate-governance/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setFormData({
          title: data.document.title || "",
          documentType: data.document.documentType || "",
          year: data.document.year || "",
          quarter: data.document.quarter || "",
        });
      } catch (err) {
        toast.error(err.message || "Error loading document");
      }
    };

    fetchDocument();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.documentType || (!file && !id)) {
      toast.error("Title, Document Type and File are required");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("documentType", formData.documentType);
    form.append("year", formData.year);
    form.append("quarter", formData.quarter);
    if (file) form.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(
        `${Baseurl}corporate-governance/${id ? `update/${id}` : "add"}`,
        {
          method: id ? "PATCH" : "POST",
          body: form,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving document");

      toast.success(
        id ? "Document updated successfully" : "Uploaded successfully"
      );
      if (!id) {
        setFormData({ title: "", documentType: "", year: "", quarter: "" });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        navigate("/governance/Documents");
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
        <h2 className="text-2xl font-semibold">
          {id ? "Edit" : "Upload"} Finance Document
        </h2>
        <p className="text-gray-600 text-sm">
          {id ? "Update existing" : "Add new"} financial documents
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
            placeholder="e.g. Q1 Results 2025"
          />
        </div>

        {/* -- Document Type -- */}
        <div>
          <label className="block font-medium mb-1">
            Document Type <span className="text-red-500">*</span>
          </label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="">Select Type</option>
            <option value="Corporate Governance Report">
              Corporate Governance Report
            </option>
            <option value="Policy">Policy</option>
          </select>
        </div>

        {/* -- Year -- */}
        <div>
          <label className="block font-medium mb-1">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2025"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* -- Quarter -- */}
        <div>
          <label className="block font-medium mb-1">Quarter</label>
          <select
            name="quarter"
            value={formData.quarter}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="">Select Quarter</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </div>

        {/* -- File Upload -- */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <label className="block font-medium mb-1">
            {id ? "Replace File (optional)" : "Upload File"}{" "}
            {!id && <span className="text-red-500">*</span>}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
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

export default AddCorporateDocument;
