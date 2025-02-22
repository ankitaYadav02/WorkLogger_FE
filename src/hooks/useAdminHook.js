import { useState , useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SOME_KEY;
const useAdminHook = () => {
    const [admin_employee, setAdminEmployee] = useState(null);
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        Admin_employes();
    }, [loading]);

    const Admin_employes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/all-employ`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLoading(false);
            setAdminEmployee(response.data.data);
            return response.data.data;
        } catch (error) {
            if(error.response.data.message == "Unauthorizedjwt expired"){
                localStorage.removeItem("token");
                window.location.reload();
                return
            }
            setLoading(false);
            setError(error.response.data.message);
            throw error;
        }
    };
    const AddEmploye = async (name , email , password) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, { name , email , password }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                setLoading(false);
                return error.response.data
            } else {
                setLoading(false);
                throw error;
            }
        }
    }
    const EditEmploye = async (id , name , email ) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/edit-employ-admin`, { id , name , email }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                setLoading(false);
                return error.response.data
            } else {
                setLoading(false);
                throw error;
            }
        }
    }
    const DeleteEmploye = async (id) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/delete-employ-admin`, { id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                setLoading(false);
                return error.response.data
            } else {
                setLoading(false);
                throw error;
            }
        }
    }
    const getAttendence = async (id) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/get-attence-admin`,{ id } , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data.data;
        } catch (error) {
            throw error;
        }
    };
    const UpdateWorking_Hour = async (id , working_hour) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/update-working-hour`, { id , working_hour }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    };
    const FetchMonthlyData = async (id) => {
        setLoading(true);
        try {
          const response = await axios.post(`${API_BASE_URL}/get-last-month-data-admin`,{ id }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setLoading(false);
          return response.data.data;
        } catch (error) {
          setLoading(false);
          throw error;
        }
      };
      const FetchweeklyData = async (id) => {
        setLoading(true);
        try {
          const response = await axios.post(`${API_BASE_URL}/get-last-week-data-admin`,{id}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setLoading(false);
          return response.data.data;
        } catch (error) {
          setLoading(false);
          throw error;
        }
      };
    return {
        admin_employee,
        error,
        loading,
        Admin_employes,
        AddEmploye , EditEmploye , DeleteEmploye , getAttendence , UpdateWorking_Hour , FetchMonthlyData , FetchweeklyData
    };
};

export default useAdminHook;