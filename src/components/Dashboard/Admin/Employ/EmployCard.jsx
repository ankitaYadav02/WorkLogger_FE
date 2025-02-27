import React, { useEffect, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useDebouncedCallback } from 'use-debounce';

import { motion } from "framer-motion";
import InputBox from "../../../Primitives/Inputbox";
import useAdminHook from "../../../../hooks/useAdminHook";
import { useSnackbar } from "notistack";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiListChecksFill } from "react-icons/pi";


const EmployCard = ({ switchTab, updateViewId }) => {
    const { admin_name, admin_employee, loading, SearchEmployee, AddEmploye, EditEmploye, DeleteEmploye } = useAdminHook();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ id: "", name: "", email: "", password: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!loading && admin_employee) {
            setEmployees(admin_employee);
        }
    }, [admin_employee]);
    const debouncedSearchEmployee = useDebouncedCallback((name) => {
        SearchEmployee(name);
    }, 1000);

    useEffect(() => {
        debouncedSearchEmployee(name);
    }, [name]);


    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!isEditing && !formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        let response;
        if (isEditing) {
            response = await EditEmploye(formData.id, formData.name, formData.email);
        } else {
            response = await AddEmploye(formData.name, formData.email, formData.password);
        }
        if (response.statusCode === 200) {
            enqueueSnackbar(response.message, { variant: "success" });
            if (!isEditing) {
                setEmployees([...employees, { ...formData, id: Date.now() }]);
            }
        } else {
            enqueueSnackbar(response.message, { variant: "error" });
        }
        setFormData({ id: "", name: "", email: "", password: "" });
        setIsEditing(false);
        setModalOpen(false);
    };

    const handleEdit = (id) => {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            setFormData({ ...employee, password: "" });
            setIsEditing(true);
            setModalOpen(true);
        }
    };
    const handleDelete = async (id) => {
        const res = await DeleteEmploye(id);
        if (res.statusCode === 200) {
            enqueueSnackbar(res.message, { variant: "success" });
            setEmployees(employees.filter(emp => emp.id !== id));
        } else {
            enqueueSnackbar(res.message, { variant: "error" });
        }
    };
    const handleUpdateViewId = (id, tab) => {
        updateViewId(id);
        switchTab(tab);
    };
    const columns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex space-x-4">
                    <motion.button onClick={() => handleUpdateViewId(row.original.id, 2)} className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"><FaRegEye /></motion.button>
                    <motion.button onClick={() => handleUpdateViewId(row.original.id, 1)} className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"><PiListChecksFill /></motion.button>
                    <motion.button onClick={() => handleEdit(row.original.id)} className="bg-yellow-500 text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-yellow-600 transition"><FaEdit /></motion.button>
                    <motion.button onClick={() => handleDelete(row.original.id)} className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-red-600 transition"><MdDelete /></motion.button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) {
        return (
            <>
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></div>
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }}></div>
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </>
        );
    }




    return (
        <div className="min-h-screen bg-white p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-black text-center">{admin_name} Dashboard</h1>
                <InputBox placeholder="Search..." value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100" >
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <motion.tr
                                key={row.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-4 px-6 text-sm text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>


            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-transparent backdrop-filter backdrop-blur-sm  bg-opacity-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
                    >
                        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Employee" : "Add Employee"}</h2>
                        <form onSubmit={handleSubmit}>
                            <InputBox label="Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} type="text" />
                            <InputBox label="Email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} type="email" />
                            {!isEditing && <InputBox label="Password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} error={errors.password} type="password" />}
                            <div className="flex justify-end space-x-2 mt-4">
                                <motion.button onClick={() => setModalOpen(false)} className="bg-gray-500 text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-gray-600 transition">Cancel</motion.button>
                                <motion.button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-700 transition">{isEditing ? "Update" : "Add"}</motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EmployCard;
