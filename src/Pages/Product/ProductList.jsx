import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";
import toast from "react-hot-toast";
import { EditIcon, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(Baseurl + "product");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load products");
      setProducts(data || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${Baseurl}product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err.message || "Error deleting product");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <div className="flex justify-between mb-10">
        <div className="page-title">
          <h3 className="text-2xl font-semibold">Products</h3>
          <p className="text-gray-600 text-md">Manage all products</p>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-xs py-4">
        <div className="relative overflow-x-auto mx-8">
          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No products found.
            </p>
          ) : (
            <table className="w-full text-base text-left text-gray-500">
              <thead className="bg-white">
                <tr className="border-b border-gray6 text-tiny">
                  <th className="px-3 py-3 font-semibold uppercase">Name</th>
                  <th className="px-3 py-3 font-semibold uppercase">Brand</th>
                  <th className="px-3 py-3 font-semibold uppercase">Image</th>
                  <th className="px-3 py-3 font-semibold uppercase text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray6">
                    <td className="px-3 py-3">{product.name}</td>
                    <td className="px-3 py-3">{product.brand}</td>
                    <td className="px-3 py-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md shadow"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/edit-product/${product._id}`}>
                          <button className="w-10 h-10 bg-success text-white rounded-md hover:bg-green-600">
                            <EditIcon size={18} />
                          </button>
                        </Link>
                        <button
                          className={`w-10 h-10 border border-gray text-slate-600 rounded-md ${
                            deletingId === product._id
                              ? "bg-gray-300 cursor-not-allowed"
                              : "hover:bg-danger hover:border-danger hover:text-white"
                          }`}
                          disabled={deletingId === product._id}
                          onClick={() => handleDelete(product._id)}
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

export default ProductList;
