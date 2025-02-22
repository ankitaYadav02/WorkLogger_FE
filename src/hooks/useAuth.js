import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_SOME_KEY;
const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            if (response.data.data.accessToken) {
                localStorage.setItem("token", response.data.data.accessToken);
            }
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
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const Change_Password = async (data) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/change-password`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setLoading(false);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                setLoading(false);
                return error.response.data;
            }

            throw error;
        }
    };

    const Change_admin_Password = async (data) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/change-password-admin`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setLoading(false);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                setLoading(false);
                return error.response.data;
            }

            throw error;
        }
    };


    return { login, register, Change_Password, Change_admin_Password, loading };

}

export default useAuth;
