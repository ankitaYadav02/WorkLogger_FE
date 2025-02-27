import { useState } from "react";
import EmployCard from '../Employ';
import AttendanceList from '../SingleEmploy';
import AttendanceGraph from '../Graph';
import { IoArrowBack } from "react-icons/io5";
const EmployTab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [ViewId, setViewId] = useState(0);
    const switchTab = (id) => {
        setActiveTab(id);
    }
    const updateViewId = (id) => {
        setViewId(id);
    } 
    const tabs = [
        { id: 0, label: "AllEmployee", content: <EmployCard switchTab={switchTab} updateViewId={updateViewId} /> },
        { id: 1, label: "Employees", content: <AttendanceList switchTab={switchTab} viewId={ViewId} /> },
        { id: 2, label: "Graph", content: <AttendanceGraph switchTab={switchTab} viewId={ViewId} /> },
    ];
    return (
        <>
            <div >
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </>

    );
};

export default EmployTab;
