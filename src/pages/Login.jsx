import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import InputBox from "../components/Primitives/Inputbox";
import ButtonCard from "../components/Primitives/Button/ButoonCard";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.email && email.includes("@")) {
      setError((prev) => ({ ...prev, email: "" }));
    }
  }, [email]);

  useEffect(() => {
    if (error.password && password.length >= 8) {
      setError((prev) => ({ ...prev, password: "" }));
    }
  }, [password]);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newError = { email: "", password: "" };

    if (!emailRegex.test(email)) {
      newError.email = "Invalid email format";
    }
    if (password.length < 8) {
      newError.password = "Password must be at least 8 characters";
    }

    if (newError.email || newError.password) {
      setError(newError);
      enqueueSnackbar("Please fix the errors", { variant: "error" });
      return;
    }

    setError(newError);
    const response = await login(email, password);
    if (response.statusCode === 200) {
      navigate(response.data.userType === "admin" ? "/admin-dashboard" : "/dashboard");
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h2>

        <InputBox
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.email}
          type="email"
        />

        <InputBox
          label="Password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.password}
          type="password"
        />
        <div className="text-right">
          <Link
            to="/forget-password"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex justify-center w-max ">
          <ButtonCard title="Login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
