
import axios from "axios";
import { create } from "zustand";
import { Baseurl } from "../Config";
import { toast } from "react-hot-toast";

const useGenarlStore = create((set) => ({
  blogs: [],
  banners: [],
  customers: [],
  loading: false,
  error: null,
  editBanner: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(Baseurl + "blog");
      set({ blogs: response.data.blogs, loading: false });
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      set({ error: "Failed to fetch blogs", loading: false });
      toast.error("Failed to fetch blogs. Please try again.");
    }
  },

  addBlog: async (sections, images, metaData = {}) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("sections", JSON.stringify(sections));
  
      images.forEach((image) => {
        formData.append("images", image);
      });
  
      // ✅ Match the schema field names
      if (metaData.metaTitle) {
        formData.append("metaTitle", metaData.metaTitle);
      }
      if (metaData.metaDescription) {
        formData.append("metaDescription", metaData.metaDescription);
      }
      if (metaData.metaKeywords) {
        formData.append("metakeywords", JSON.stringify(metaData.metaKeywords)); // not metaTags
      }
      if (metaData.link) {
        formData.append("link", metaData.link);
      }
      const response = await axios.post(Baseurl + "blog/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      set((state) => ({
        blogs: [...state.blogs, response.data.blog],
        loading: false,
      }));
  
      toast.success("Blog added successfully!");
    } catch (error) {
      console.error("❌ Error adding blog:", error);
      set({ error: "Failed to add blog", loading: false });
      toast.error("Failed to add blog. Please try again.");
    }
  },
  
  deleteBlog: async (blogId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(Baseurl + `blog/delete?id=${blogId}`);

      if (response.data.success) {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog._id !== blogId), // Remove deleted blog
          loading: false,
        }));
        toast.success("Blog deleted successfully!"); // Success toast
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("❌ Error deleting blog:", error);
      set({ error: "Failed to delete blog", loading: false });
      toast.error("Failed to delete blog. Please try again."); // Error toast
    }
  },

  fetchBanners: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(Baseurl + "banner");
      set({ banners: response.data.data, loading: false });
    } catch (error) {
      console.error("❌ Error fetching banners:", error);
      set({ error: "Failed to fetch banners", loading: false });
      toast.error("Failed to fetch banners. Please try again.");
    }
  },

  // Add Banner
 
}));

export default useGenarlStore;
