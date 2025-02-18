import { useState } from "react";
import { useSnackbar } from "notistack";
import InputBox from "../components/Primitives/Inputbox";
import ButtonCard from "../components/Primitives/Button/ButoonCard";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newError = { email: "", password: "" };
    if (!emailRegex.test(email)) {
      newError.email = "Invalid email format";
      setError(newError);
      enqueueSnackbar("Invalid email format", { variant: "error" });
      return;
    }
    setError(newError);
    navigate("/dashboard");
    const response = await login(email, password);
    // if (response.statusCode == 200 && response.data.userType == "admin") {
    //   navigate("/admin-dashboard");
    //   enqueueSnackbar(response.message, { variant: "success" });
    // } else if (response.statusCode == 200 && response.data.userType == "user") {
    //   navigate("/dashboard");
    //   enqueueSnackbar(response.message, { variant: "success" });
    // } else {
    //   enqueueSnackbar(response.message, { variant: "error" });
    // }
  };

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

        <ButtonCard title="Login" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
