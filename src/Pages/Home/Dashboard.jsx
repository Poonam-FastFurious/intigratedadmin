import { useEffect } from "react";
import useGenarlStore from "../../Store/Genaralsetting";

function Dashboard() {
  const { blogs, fetchBlogs } = useGenarlStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <div className="flex justify-between items-end flex-wrap">
        <div className="page-title mb-7">
          <h3 className="mb-0 text-4xl">Dashboard</h3>
          <p className="text-textBody m-0">Welcome to your dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h4 className="text-xl font-semibold text-gray-700">Total Blogs</h4>
          <p className="text-3xl font-bold text-primary mt-2">
            {blogs.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
