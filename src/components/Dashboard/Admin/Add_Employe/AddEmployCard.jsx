import { useState, useEffect } from "react";
import InputBox from "../../../Primitives/Inputbox";
import ButtonCard from "../../../Primitives/Button/ButoonCard";
import useAdminHook from "../../../../hooks/useAdminHook";
import { useSnackbar } from "notistack";

const AddEmployee = ({ handleChangeTab }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const {
    admin_name,
    admin_employee,
    loading,
    AddEmploye,
    EditEmploye,
    DeleteEmploye,
  } = useAdminHook();

  useEffect(() => {
    if (password.length < 6) setErrors({ ...errors, password: "" });
    if (/\S+@\S+\.\S+/.test(email)) setErrors({ ...errors, email: "" });
    if (name.trim()) setErrors({ ...errors, name: "" });
  }, [name, email, password]);
  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", { name, email, password });
      const response = await AddEmploye(name, email, password);
      if (response.statusCode === 200) {
        enqueueSnackbar(response.message, { variant: "success" });
        handleChangeTab("Employee");
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <div className="g-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
        <h1 className="text-2xl text-center font-bold mb-4">Add Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox
            label="Name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" }); // Clear error on input change
            }}
            error={errors.name}
            type="text"
          />
          <InputBox
            label="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            error={errors.email}
            type="email"
          />
          <InputBox
            label="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            error={errors.password}
            type="password"
          />

          {/* <div className="flex justify-end space-x-2 w-max"> */}
          <ButtonCard title="Add" type="submit" style="w-fit" />
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
