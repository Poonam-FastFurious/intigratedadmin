import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";
import { EditIcon, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch(Baseurl + "banner");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load banners");
      setBanners(data.banners || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the banner.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${Baseurl}banner/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Banner deleted successfully");
      setBanners((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error(err.message || "Error deleting banner");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <div className="flex justify-between mb-10">
        <div className="page-title">
          <h3 className="text-2xl font-semibold">All Banners</h3>
          <p className="text-gray-600 text-md">
            Manage banners shown on the site
          </p>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-xs py-4">
        <div className="relative overflow-x-auto mx-8">
          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Loading banners...
            </p>
          ) : banners.length === 0 ? (
            <p className="text-center py-10 text-gray-500">No banners found.</p>
          ) : (
            <table className="w-full text-base text-left text-gray-500">
              <thead className="bg-white">
                <tr className="border-b border-gray6 text-tiny">
                  <th className="px-3 py-3 font-semibold uppercase">Title</th>
                  <th className="px-3 py-3 font-semibold uppercase">Preview</th>

                  <th className="px-3 py-3 font-semibold uppercase">Order</th>
                  <th className="px-3 py-3 font-semibold uppercase">Status</th>
                  <th className="px-3 py-3 font-semibold uppercase text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner._id} className="border-b border-gray6">
                    <td className="px-3 py-3">{banner.title}</td>
                    <td className="px-3 py-3">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-28 h-auto rounded-md shadow"
                      />
                    </td>

                    <td className="px-3 py-4 ">{banner.order ?? "-"}</td>
                    <td className="px-3 ">
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          banner.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {banner.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/banner/edit/${banner._id}`}>
                          <button className="w-10 h-10 bg-success text-white rounded-md hover:bg-green-600">
                            <EditIcon size={18} />
                          </button>
                        </Link>
                        <button
                          className={`w-10 h-10 border border-gray text-slate-600 rounded-md ${
                            deletingId === banner._id
                              ? "bg-gray-300 cursor-not-allowed"
                              : "hover:bg-danger hover:border-danger hover:text-white"
                          }`}
                          disabled={deletingId === banner._id}
                          onClick={() => handleDelete(banner._id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default BannerList;
