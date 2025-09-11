"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ChangePassword as changePasswordService } from "../../../services/settings";

export default function ChangePasswordComponent() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await changePasswordService({
        currentPassword,
        newPassword,
      });

      if (response.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.message || "Failed to update password.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-[#1e1e1e] text-white w-full rounded-lg shadow-lg p-8">
        <h2 className="text-lg font-semibold">Password</h2>
        <p className="text-sm text-[#828282] mt-1 mb-6">
          Please enter your current password to change your password.
        </p>
        <hr className="border-[#828282] mb-6" />

        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-1/2 sm:w-full xs:w-full"
        >
          {/* Current Password */}
          <div className="relative">
            <label className="block text-sm mb-2">Current password</label>
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full bg-[#282828] text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 placeholder:text-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <span
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showCurrent ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm mb-2">New password</label>
            <input
              type={showNew ? "text" : "password"}
              placeholder="********"
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 placeholder:text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showNew ? <FiEyeOff /> : <FiEye />}
            </span>
            <p className="text-xs text-gray-400 mt-1">
              Your new password must be more than 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm mb-2">Confirm new password</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="********"
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-600 placeholder:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-[#2e2e2e] text-white rounded-lg hover:bg-gray-600"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-nowrap disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
