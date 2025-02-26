import React, { useState, useEffect } from "react";
import InputBox from "../../Primitives/Inputbox";
import ButtonCard from "../../Primitives/Button/ButoonCard";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loading from "../../Loading";
const ChangePassword = ({ role }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const { Change_Password, Change_admin_Password, loading } = useAuth();
    useEffect(() => {
        if (confirmPassword && confirmPassword === newPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        if (newPassword && newPassword.length >= 8 && newPassword.match(/(?=.*[A-Z])(?=.*\d).{8,}/)) {
            setErrors((prev) => ({ ...prev, newPassword: "" }));
        }
        if (currentPassword) {
            setErrors((prev) => ({ ...prev, currentPassword: "" }));
        }
    }, [confirmPassword, newPassword, currentPassword]);

    const validatePassword = (password) => {
        return /(?=.*[A-Z])(?=.*\d).{8,}/.test(password);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!currentPassword) {
            validationErrors.currentPassword = "Current password is required.";
        }
        if (!newPassword) {
            validationErrors.newPassword = "New password is required.";
        } else if (!validatePassword(newPassword)) {
            validationErrors.newPassword = "Must contain 1 uppercase, 1 number, and be at least 8 characters.";
        }
        if (!confirmPassword) {
            validationErrors.confirmPassword = "Please confirm your new password.";
        } else if (newPassword !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const newData = {
            "oldPassword": currentPassword,
            "newPassword": newPassword
        }
        if (role == "user") {
            const response = await Change_Password(newData);
            if (response.statusCode == 200) {
                setErrors({});
                setSuccessMessage("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                enqueueSnackbar(response.message, { variant: "success" });
            } else {
                enqueueSnackbar(response.message, { variant: "error" });
            }
        }
        if (role == "admin") {
            const response = await Change_admin_Password(newData);
            if (response.statusCode == 200) {
                setErrors({});
                setSuccessMessage("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                enqueueSnackbar(response.message, { variant: "success" });
            } else {
                enqueueSnackbar(response.message, { variant: "error" });
            }
        }


    };

    if (loading) {
        return <Loading />;
      }

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex items-center space-x-2 mb-6">
                    <h1 className="text-xl font-semibold">Change Password</h1>
                </div>
                <p className="text-sm text-gray-600 mb-6">Update password for enhanced account security.</p>
                {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputBox
                        label="Current Password"
                        placeholder="Enter your current password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        error={errors.currentPassword}
                    />
                    <InputBox
                        label="New Password"
                        placeholder="Enter your new password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={errors.newPassword}
                    />
                    <InputBox
                        label="Confirm Password"
                        placeholder="Confirm your new password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                    />
                    <div className="flex flex-col justify-between w-max">
                        <ButtonCard title="Change Password" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
