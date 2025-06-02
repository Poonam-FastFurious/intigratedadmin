import axios from "axios";
import { create } from "zustand";
import { Baseurl } from "../Config";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
const useAdminStore = create((set) => ({
  adminDetails: null,
  dashboardHeaderData: null,
  getAdminDetails: async (adminId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("Unauthorized: No access token found");
        return null;
      }

      const res = await axios.get(
        `${Baseurl}admin/Profile?adminId=${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data && res.data.success) {
        set({ adminDetails: res.data.data }); // Store admin details in Zustand state
        return res.data.data;
      } else {
        throw new Error(res.data.message || "Failed to fetch admin details");
      }
    } catch (error) {
      toast.error("Failed to fetch admin details");
      console.error("Error fetching admin details:", error);
      return null;
    }
  },

  // ✅ Update Admin Function
  updateAdmin: async (formData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.patch(`${Baseurl}admin/update`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data && res.data.admin) {
        toast.success("Admin details updated successfully!");
        set({ adminDetails: res.data.admin }); // Update admin state
        return res.data.admin;
      } else {
        throw new Error(res.data.error || "Failed to update admin details");
      }
    } catch (error) {
      toast.error("Failed to update admin details");
      console.error("Error updating admin details:", error);
      return null;
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await axios.post(`${Baseurl}admin/forgot-password`, {
        email,
      });

      if (res.data.status === "Success") {
        toast.success("Password reset link sent to your email");
        return true;
      } else {
        throw new Error(res.data.message || "Failed to send reset email");
      }
    } catch (error) {
      toast.error("Failed to send reset email");
      console.error("Error during forgot password:", error);
      return false;
    }
  },

  // ✅ Reset Password
  resetPassword: async ({ id, token, password }) => {
    try {
      const res = await axios.post(
        `${Baseurl}admin/reset-password?id=${id}&token=${token}`, // ✅ Send as query params
        { password } // ✅ Send only password in body
      );

      if (res.data.Status === "Success") {
        toast.success("Password reset successful!");
        return true;
      } else {
        throw new Error(res.data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Failed to reset password");
      console.error("Error during reset password:", error);
      return false;
    }
  },
  getDashboardHeaderData: async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.error("Unauthorized: No access token found");
        return null;
      }

      const res = await axios.get(`${Baseurl}dashboard/dashboard-header?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data && res.data.success) {
        set({ dashboardHeaderData: res.data.data }); // ✅ Store data in Zustand state
        return res.data.data;
      } else {
        throw new Error(res.data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
      console.error("Error fetching dashboard data:", error);
      return null;
    }
  },

  logout: async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (isConfirmed) {
      try {
        await axios.post(`${Baseurl}admin/logout`);
      } catch (error) {
        console.error("Logout API error:", error);
      }

      localStorage.clear();
      document.cookie
        .split(";")
        .forEach(
          (c) =>
            (document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*$/, `=;expires=${new Date().toUTCString()};path=/`))
        );
      window.location.href = "/login";
    }
  },

  isTokenExpired: () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return true; // No token means expired

    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000; // Compare with current time
    } catch (error) {
      console.log(error);
      return true; // If decoding fails, assume token is expired
    }
  },
  checkAndLogoutIfExpired: () => {
    if (useAdminStore.getState().isTokenExpired()) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  },
}));

export default useAdminStore;
