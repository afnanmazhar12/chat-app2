import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      console.log('Logout Response Status:', res.status);
      const data = await res.json();
      console.log('Logout Response Data:', data);

      // Before removing, check if the item is stored
      console.log("Before Removal:", localStorage.getItem("chat-user1"));

      if (res.ok) {
        // If the logout is successful, clear localStorage and reset authUser
        localStorage.removeItem("chat-user1");
        setAuthUser(null);
        toast.success("Logged out successfully!");
      } else {
        // If logout failed, show an error message
        throw new Error(data.error || "Unknown logout error");
      }

      // After removal, check if it's removed
      console.log("After Removal:", localStorage.getItem("chat-user1"));

    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
