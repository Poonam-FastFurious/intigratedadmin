import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";

function AddTeamMember() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    category: "Team", // or "Board"
    order: "",
    isActive: true,
    description: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        const res = await fetch(`${Baseurl}team/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setFormData({
          name: data.member.name || "",
          designation: data.member.designation || "",
          category: data.member.category || "Team",
          order: data.member.order || "",
          isActive: data.member.isActive,
          description: data.member.description || "",
        });
      } catch (err) {
        toast.error(err.message || "Error loading member");
      }
    };

    fetchMember();
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

    if (!formData.name || !formData.designation || (!file && !id)) {
      toast.error("Name, Designation and Image are required");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("designation", formData.designation);
    form.append("category", formData.category);
    form.append("order", formData.order);
    form.append("isActive", formData.isActive);
    form.append("description", formData.description);
    if (file) form.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(`${Baseurl}team/${id ? `update/${id}` : "add"}`, {
        method: id ? "PATCH" : "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving member");

      toast.success(id ? "Member updated successfully" : "Member added");

      if (!id) {
        setFormData({
          name: "",
          designation: "",
          category: "Team",
          order: "",
          isActive: true,
          description: "",
        });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        navigate("/team-members");
      }
    } catch (err) {
      toast.error(err.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-content px-8 py-8 bg-gray-100 min-h-screen">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">
          {id ? "Edit" : "Add"} Team Member / Board of Director
        </h2>
        <p className="text-gray-600 text-sm">
          {id ? "Update existing entry" : "Add a new member"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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
            placeholder="e.g. John Doe"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            placeholder="e.g. CFO"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="Team">Team Member</option>
            <option value="Board">Board of Director</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            placeholder="e.g. 1"
          />
        </div>

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

        {/* File Upload */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <label className="block font-medium mb-1">
            {id ? "Replace Image (optional)" : "Upload Image"}{" "}
            {!id && <span className="text-red-500">*</span>}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
        {/* Description */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter detailed information about the member"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="text-white tp-btn px-6 py-2 rounded bg-gray-600"
          >
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

export default AddTeamMember;
