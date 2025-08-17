import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";
import { EditIcon, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function List() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const fetchDocuments = async () => {
    try {
      const res = await fetch(Baseurl + "finance");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load documents");
      setDocuments(data.documents || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  // Delete Document
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${Baseurl}finance/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Document deleted successfully");
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      toast.error(err.message || "Error deleting document");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <div className="flex justify-between mb-10">
        <div className="page-title">
          <h3 className="text-2xl font-semibold">Finance Documents</h3>
          <p className="text-gray-600 text-md">
            All uploaded financial documents
          </p>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-xs py-4">
        <div className="relative overflow-x-auto mx-8">
          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Loading documents...
            </p>
          ) : documents.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No documents found.
            </p>
          ) : (
            <table className="w-full text-base text-left text-gray-500">
              <thead className="bg-white">
                <tr className="border-b border-gray6 text-tiny">
                  <th className="pr-8 py-3 text-text2 uppercase font-semibold">
                    Title
                  </th>
                  <th className="px-3 py-3 text-end text-text2 uppercase font-semibold w-[170px]">
                    Type
                  </th>
                  <th className="px-3 py-3 text-end text-text2 uppercase font-semibold w-[170px]">
                    Year
                  </th>
                  <th className="px-3 py-3 text-end text-text2 uppercase font-semibold w-[170px]">
                    Quarter
                  </th>
                  <th className="px-3 py-3 text-end text-text2 uppercase font-semibold w-[170px]">
                    File
                  </th>
                  <th className="px-9 py-3 text-end text-text2 uppercase font-semibold w-[12%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc._id}
                    className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                  >
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <span className="font-medium text-heading text-hover-primary transition">
                        {doc.title}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-end text-[#55585B]">
                      {doc.documentType}
                    </td>
                    <td className="px-3 py-3 text-end text-[#55585B]">
                      {doc.year || "-"}
                    </td>
                    <td className="px-3 py-3 text-end text-[#55585B]">
                      {doc.quarter || "-"}
                    </td>
                    <td className="px-3 py-3 text-end">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View File
                      </a>
                    </td>
                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="w-10 h-10 bg-success text-white rounded-md hover:bg-green-600">
                         
                          <Link to={`/finance/edit/${doc._id}`} > <EditIcon size={18} /></Link>
                        </button>
                        <button
                          className={`w-10 h-10 border border-gray text-slate-600 rounded-md ${
                            deletingId === doc._id
                              ? "bg-gray-300 cursor-not-allowed"
                              : "hover:bg-danger hover:border-danger hover:text-white"
                          }`}
                          disabled={deletingId === doc._id}
                          onClick={() => handleDelete(doc._id)}
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

export default List;
