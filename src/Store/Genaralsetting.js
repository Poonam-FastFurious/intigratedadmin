import axios from "axios";
import { create } from "zustand";
import { Baseurl } from "../Config";
import { toast } from "react-hot-toast";

const useGenarlStore = create((set) => ({
  banners: [],

  loading: false,
  error: null,

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
