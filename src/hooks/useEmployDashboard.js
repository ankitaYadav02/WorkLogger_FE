import { useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

const useDashboardData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  const PunchInOut = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/punch-in`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  const FetchMonthlyData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get-last-month-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  const FetchweeklyData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get-last-week-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  const ForgrtPasswordOTP = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/verify-email`, { email });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      if (error.response.data) {
        setIsLoading(false);
        return error.response.data
      } else {
        setIsLoading(false);
        throw error;
      }
    }

  }
  const ChangeForgetPasswors = async (email , password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email, password });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      if (error.response.data) {
        setIsLoading(false);
        return error.response.data
      } else {
        setIsLoading(false);
        throw error;
      }
    }
  };
  return {
    fetchDashboardData,
    PunchInOut,
    isLoading,
    FetchMonthlyData,
    FetchweeklyData, ForgrtPasswordOTP, ChangeForgetPasswors

  };
};

export default useDashboardData;
