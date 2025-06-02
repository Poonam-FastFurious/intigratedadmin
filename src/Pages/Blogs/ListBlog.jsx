import { useEffect } from "react";

import SerachButton from "../../Components/Utils/SerachButton";
import Toppages from "../../Components/Utils/Toppages";
import useGenarlStore from "../../Store/Genaralsetting";

function ListBlog() {
  const { blogs, fetchBlogs, loading, deleteBlog } = useGenarlStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Toppages title="Blogs" hidden />

        <div className="bg-white rounded-md shadow-xs py-4">
          {/* Search & Filter Section */}
          <div className="tp-search-box flex items-center justify-between px-8 py-8">
            <SerachButton placeholder="Search by Name" />
           
          </div>

          {/* Table Section */}
          <div className="relative overflow-x-auto mx-8">
            {loading ? (
              <p className="text-center py-4">Loading blogs...</p>
            ) : (
              <table className="w-full text-base text-left text-gray-500">
                <thead className="bg-white">
                  <tr className="border-b border-gray6 text-tiny">
                    <th className="py-3 w-[3%]">
                      <input type="checkbox" id="selectAllProduct" />
                    </th>
                    <th className="pr-8 py-3">Url</th>
                    <th className="px-3 py-3">Title</th>
                   
                    <th className="px-3 py-3">Image</th>
                    <th className="px-3 py-3">Created At</th>
                    <th className="px-9 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => {
                    const title =
                      blog.sections.find((sec) => sec.type === "title")
                        ?.content || "Untitled";

                    const images = blog.sections
                      .filter((sec) => sec.type === "image")
                      .flatMap((sec) => sec.content);
                    const firstImage =
                      images.length > 0
                        ? images[0]
                        : "https://via.placeholder.com/40";

                    return (
                      <tr
                        key={blog._id}
                        className="bg-white border-b border-gray6 text-start"
                      >
                        <td className="pr-3">
                          <input type="checkbox" />
                        </td>
                        <td className="px-3 py-3">{blog.link}</td>
                        <td className="px-3 py-3">{title}</td>
                        <td className="px-3 py-3">
                          <img
                            className="w-[40px] h-[40px] rounded-md"
                            src={firstImage}
                            alt="Blog"
                          />
                        </td>
                        <td className="px-3 py-3">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-9 py-3">
                          <div className="flex items-center space-x-2">
                           
                            <button
                              className="w-10 h-10 border border-gray text-slate-600 rounded-md hover:bg-danger hover:text-white"
                              onClick={() => deleteBlog(blog._id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListBlog;
