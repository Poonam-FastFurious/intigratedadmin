import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Baseurl } from "../Config";

const useProductStore = create((set) => ({
  loading: false,

  websiteSettings: null,

  fetchWebsiteSettings: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("Unauthorized: No access token found");
        return null;
      }

      const res = await axios.get(`${Baseurl}website`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data) {
        set({ websiteSettings: res.data }); // Store settings in Zustand state
        return res.data;
      } else {
        throw new Error("Failed to fetch website settings");
      }
    } catch (error) {
      toast.error("Failed to load website settings");
      console.error("Error fetching website settings:", error);
      return null;
    }
  },
  updateWebsiteSettings: async (formData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.patch(`${Baseurl}website/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data && res.data.success) {
        toast.success("Website settings updated successfully!");
        set({ websiteSettings: res.data.settings });
        return res.data.settings;
      } else {
        throw new Error(res.data.message || "Failed to update settings");
      }
    } catch (error) {
      toast.error("Failed to update website settings");
      console.error("Error updating website settings:", error);
      return null;
    }
  },
}));

export default useProductStore;
