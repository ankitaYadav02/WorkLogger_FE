import { useState } from "react";
import { MdAnnouncement } from "react-icons/md";
import { FiMenu, FiHome, FiSettings, FiLogOut, FiInfo, } from "react-icons/fi";
import { LuActivity } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import AdminDashboard from '../AdminDashboardCard';
import ChangePassword from '../../../Auth/ChangePassword/PasswordChange';
import { useNavigate } from "react-router-dom";
import EmployCard from '../Employ';


const DashboardAdmin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
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
    console.log(menu);
    setActiveMenu(menu);
    if(window.innerWidth < 768){
      setIsCollapsed(true);
    }
  };
  const menuData = [
    { id: "Dashboard", label: "Dashboard", icon: <FiHome size={20} />, content: <AdminDashboard /> },
    { id: "Employs", label: "Employs", icon: <FiInfo size={20} />, content: <EmployCard /> },
    { id: "ChangePassword", label: "Change Password", icon: <FiSettings size={20} />, content: <ChangePassword role={"admin"} /> },
  ];



  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex w-full h-screen  ">
      <div
        className={`bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col justify-between text-white transition-all duration-300 ${isCollapsed ? "md:w-16 w-0" : "md:w-64 w-[100vw]"} h-[100vh]`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={toggleSidebar}
            className={` fixed z-10 ${isCollapsed ? "md:text-white text-blue-600" : "text-white"} mt-4 ml-4`}
          >
            <FiMenu size={24} />
          </button>
          <nav className="mt-12 flex flex-col px-4">
            {menuData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center py-2 text-sm font-medium transition-all hover:text-primary duration-150 ease-in-out rounded-lg my-2 ${activeMenu === item.id ? "bg-white text-blue-600  " : "hover:bg-secondary"} ${isCollapsed ? "justify-center" : "justify-start px-4"}`}
              >
                {item.icon}
                <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{item.label}</span>
              </button>
            ))}
            <button className={`flex items-center py-2 text-sm font-medium transition-all hover:text-primary duration-150 ease-in-out rounded-lg my-2" hover:bg-secondary ${isCollapsed ? "justify-center" : "justify-start gap-2 px-4"}`} onClick={logoutCall}>
              <FiLogOut size={20} />
              {isCollapsed ? "" : " Logout"}
            </button>
          </nav>
        </div>
        <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
          <li data-sidebar="menu-item" className="group/menu-item relative">
            <button
              data-sidebar="menu-button"
              data-size="lg"
              data-active="false"
              className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:!p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              type="button"
              id="radix-:Redtrb:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <span className="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
                <span className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                  <FiUser className="text-xl text-white" />
                </span>
              </span>
              <div className={`grid flex-1 text-left text-sm leading-tight ${isCollapsed ? "hidden" : ""}`}>
                <span className="truncate font-semibold">Admin</span>
                <span className="truncate text-xs">super-admin@mail.com</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1  h-[100vh] overflow-y-scroll no-scrollbar">
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