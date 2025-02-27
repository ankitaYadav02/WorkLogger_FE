import { useState } from "react";
import ButtonCard from "../components/Primitives/Button/ButoonCard";
import InputBox from "../components/Primitives/Inputbox";
import useDashboardData from "../hooks/useEmployDashboard";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import logo from "../assets/icon.png";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resotp, setResotp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { ForgrtPasswordOTP, ChangeForgetPasswors, isLoading } =
    useDashboardData();
  const [emailError, setEmailError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [new_password_error, set_new_password_error] = useState("");
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value && !passwordRegex.test(value)) {
      set_new_password_error(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
    } else {
      set_new_password_error("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const handleSendOTP = async (e) => {
    e.preventDefault();
    const res = await ForgrtPasswordOTP(email);
    if (res.statusCode === 200) {
      console.log(res.data);
      setResotp(res.data);
      enqueueSnackbar(res.message, { variant: "success" });
      setStep(2);
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === "") {
      enqueueSnackbar("Please enter OTP", { variant: "error" });
      return;
    }
    if (otp !== resotp) {
      enqueueSnackbar("Invalid OTP", { variant: "error" });
      return;
    }
    setStep(3);
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await ChangeForgetPasswors(email, newPassword);
    if (res.statusCode === 200) {
      enqueueSnackbar(res.message, { variant: "success" });
      navigate("/login");
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="h-screen flex items-center justify-center bg-slate-200 shadow-lg p-4 bg-gray-100 bg-no-repeat bg-cover bg-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col p-10">
        <img src={logo} alt="logo" className="h-20 w-40 self-center mb-8"></img>
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          {step === 1
            ? "Forgot Password"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </h1>
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <p className="text-center text-gray-600 mb-8">
              Enter your email to receive a password reset OTP.
            </p>
            <div className="mb-4">
              <InputBox
                placeholder="Enter your email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
            </div>
            <div className="flex justify-center">
              <ButtonCard
                title={isLoading ? "Sending OTP..." : "Send OTP"}
                type="submit"
              />
            </div>
            <div className="text-center mt-2">
              <Link
                to="/"
                className="text-[#0066ff] hover:underline text-sm font-bold flex flex-row justify-center gap-2"
              >
                <HiArrowNarrowLeft className="self-center"/> Back to Sign In
              </Link>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <p className="text-center text-gray-600 mb-4">
              Enter the OTP sent to your email.
            </p>
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
            <p className="text-center text-gray-600 mb-4">
              Set your new password.
            </p>
            <div className="mb-4">
              <InputBox
                label="New Password"
                placeholder="Enter new password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                error={new_password_error}
              />
            </div>
            <div className="flex justify-center">
              <ButtonCard title="Reset Password" type="submit" />
            </div>
          </form>
        )}

        {step !== 1 && (
          <p className="text-center text-sm text-gray-600 mt-4">
            <button
              onClick={() => {
                setStep(1);
                setEmail("");
                setOtp("");
                setNewPassword("");
                setEmailError("");
                set_new_password_error("");
              }}
              className="text-blue-500 hover:underline"
            >
              Start Over
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
