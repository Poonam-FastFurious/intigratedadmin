import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Baseurl } from "../../Config";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [dash, setdash] = useState([]);
  const [setLoading] = useState(true);
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
  const fetchdash = async () => {
    try {
      const res = await fetch(Baseurl + "dashboard");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load products");
      setdash(data.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchdash();
  }, []);
  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <div className="flex justify-between items-end flex-wrap">
        <div className="page-title mb-7">
          <h3 className="mb-0 text-4xl">Dashboard</h3>
          <p className="text-textBody m-0">Welcome to your dashboard</p>
        </div>
        <div className=" mb-7">
          <a href="add-product.html" className="tp-btn px-5 py-2">
            Add Product
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {/* Banner */}
        <div className="widget-item bg-white p-6 flex justify-between rounded-md">
          <div>
            <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
              {dash.banners || 0}
            </h4>
            <p className="text-tiny leading-4">Total Banners</p>
          </div>
          <div>
            <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-success">
              🖼️
            </span>
          </div>
        </div>

        {/* Product */}
        <div className="widget-item bg-white p-6 flex justify-between rounded-md">
          <div>
            <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
              {dash.products || 0}
            </h4>
            <p className="text-tiny leading-4">Total Products</p>
          </div>
          <div>
            <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-purple">
              📦
            </span>
          </div>
        </div>

        {/* Team Member */}
        <div className="widget-item bg-white p-6 flex justify-between rounded-md">
          <div>
            <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
              {dash.teamMembers || 0}
            </h4>
            <p className="text-tiny leading-4">Team Members</p>
            <div className="badge space-x-1">
              <span>Stable</span>
            </div>
          </div>
          <div>
            <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-info">
              👥
            </span>
          </div>
        </div>

        {/* Document */}
        <div className="widget-item bg-white p-6 flex justify-between rounded-md">
          <div>
            <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
              {dash.documents || 0}
            </h4>
            <p className="text-tiny leading-4">Uploaded Documents</p>
          </div>
          <div>
            <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-warning">
              📄
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-scroll 2xl:overflow-visible">
        <div className="w-[1400px] 2xl:w-full">
          <div className="grid grid-cols-12 border-b border-gray rounded-t-md bg-white px-10 py-5">
            <div className="table-information col-span-4">
              <h3 className="font-medium tracking-wide text-slate-800 text-lg mb-0 leading-none">
                Product List
              </h3>
            </div>
          </div>

          <div className="">
            <div className="relative rounded-b-md bg-white px-10 py-7 ">
              <table className="w-full text-base text-left text-gray-500">
                <thead className="bg-white">
                  <tr className="border-b border-gray6 text-tiny">
                    <th
                      scope="col"
                      className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr
                      className="bg-white border-b border-gray6 last:border-0 text-start "
                      key={product._id}
                    >
                      <td className="pr-8  whitespace-nowrap">
                        <div className="font-medium text-heading text-hover-primary">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-normal text-slate-600">
                        {product.brand}
                      </td>

                      <td className="px-3 py-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-md shadow"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
