import { useState } from "react";
import ButtonCard from "../components/Primitives/Button/ButoonCard";
import InputBox from "../components/Primitives/Inputbox";

const ForgetPassword = () => {
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleSendOTP = (e) => {
        e.preventDefault();
        console.log("OTP Sent to:", email);
        setStep(2);
    };
    const handleVerifyOTP = (e) => {
        e.preventDefault();
        console.log("OTP Verified:", otp);
        setStep(3);
    };
    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log("Password Reset for:", email);
        alert("Password Reset Successfully!");
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-white shadow-lg p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
                </h1>

                {step === 1 && (
                    <form onSubmit={handleSendOTP}>
                        <p className="text-center text-gray-600 mb-4">
                            Enter your email to receive a password reset OTP.
                        </p>
                        <div className="mb-4">
                            <InputBox
                                label="Email"
                                placeholder="Enter your email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center">
                            <ButtonCard title="Send OTP" type="submit" />
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP}>
                        <p className="text-center text-gray-600 mb-4">Enter the OTP sent to your email.</p>
                        <div className="mb-4">
                            <InputBox
                                label="OTP"
                                placeholder="Enter OTP"
                                name="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center">
                            <ButtonCard title="Verify OTP" type="submit" />
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <p className="text-center text-gray-600 mb-4">Set your new password.</p>
                        <div className="mb-4">
                            <InputBox
                                label="New Password"
                                placeholder="Enter new password"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center">
                            <ButtonCard title="Reset Password" type="submit" />
                        </div>
                    </form>
                )}

                {step !== 1 && (
                    <p className="text-center text-sm text-gray-600 mt-4">
                        <button onClick={() => setStep(1)} className="text-blue-500 hover:underline">
                            Start Over
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;
