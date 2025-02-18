import { Outlet, useLocation } from "react-router-dom";
// import ScrollToTop from "./Components/Layout/Scrool";
function Layout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">

                <main className="flex-grow bg-gray-100">
                    {/* <ScrollToTop /> */}
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;
