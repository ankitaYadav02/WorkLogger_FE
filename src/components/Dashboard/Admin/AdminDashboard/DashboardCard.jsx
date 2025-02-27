import { useState } from "react";
import { FiMenu, FiSettings, FiLogOut, FiInfo, } from "react-icons/fi";
import ChangePassword from '../../../Auth/ChangePassword/PasswordChange';
import { useNavigate } from "react-router-dom";
import EmployTab from '../EmployTab'
import { IoMdPeople } from "react-icons/io";
import AddEmployee from '../Add_Employe/AddEmployCard'
import { IoMdPersonAdd } from "react-icons/io";
import logo from '../../../../assets/whitbg.png';

const DashboardAdmin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Employee");
  const [post, setPost] = useState("Death");
  const navigate = useNavigate();

  const handleUpdatePost = (post) => {
    setPost(post);
  };

  const logoutCall = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };
  const handleChangeTab = (tab) => {
    setActiveMenu(tab);
  }
  const menuData = [
    { id: "Employee", label: "Home", icon: <IoMdPeople size={20} />, content: <EmployTab /> },
    { id: "ChangePassword", label: "Change Password", icon: <FiSettings size={20} />, content: <ChangePassword role={"admin"} /> },
    { id: "Add_Employee", label: "Add Employee", icon: <IoMdPersonAdd size={20} />, content: <AddEmployee handleChangeTab={handleChangeTab} /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex w-full h-screen no-scrollbar  ">
      <div
        className={` flex flex-col bg-[#0066ff] justify-between text-white transition-all duration-300 ${isCollapsed ? "md:w-16 w-0" : "md:w-64 w-[100vw]"} h-[100vh]`}
      >
        <div className="flex flex-col h-full p-4">
          <button
            onClick={toggleSidebar}
            className={` fixed z-10 ${isCollapsed ? "md:text-white bg-white" : "text-white"} mt-4 ml-4 md:hidden bloack`}
          >
            <FiMenu size={24} />
          </button>
           <img src={logo} alt="logo" className="h-20 w-40"></img>
          <nav className="flex flex-col justify-between h-[-webkit-fill-available] px-4 mt-4">
            <div className="flex flex-col">
              {menuData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center py-2 text-sm font-medium transition-all cursor-pointer hover:border hover:text-primary duration-150 ease-in-out rounded-lg my-2 ${activeMenu === item.id ? "bg-white text-blue-600  " : "hover:bg-secondary"} ${isCollapsed ? "justify-center" : "justify-start px-4"}`}
                >
                  {item.icon}
                  <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{item.label}</span>
                </button>
              ))}
            </div>
            <button className={`flex items-center py-2 text-sm cursor-pointer font-medium transition-all relative bottom-0  hover:text-primary duration-150 ease-in-out rounded-lg ${isCollapsed ? "justify-center" : "justify-start gap-2 px-4"}`} onClick={logoutCall}>
              <FiLogOut size={20} />
              {isCollapsed ? "" : " Logout"}
            </button>
          </nav>
        </div>
      </div>
      <div className="flex-1  h-[100vh] overflow-y-scroll no-scrollbar bg-slate-100">
        {menuData.find(item => item.id === activeMenu)?.content || (
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 animate__animated animate__fadeInUp">
              Welcome
            </h1>
            <p className="mt-4 text-gray-600 animate__animated animate__fadeIn animate__delay-1s animate__infinite animate__pulse">
              Select an option from the sidebar.
            </p>
            <p className="mt-4 text-gray-600 animate__animated animate__fadeIn animate__delay-2s animate__infinite animate__pulse">
              Your personalized experience is just a click away.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;