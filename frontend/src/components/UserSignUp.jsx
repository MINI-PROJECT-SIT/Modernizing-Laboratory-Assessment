import React, { useState } from "react";
import { InputBox } from "./InputBox";
import { LoginButton } from "./LoginButton";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  usn: "",
  batch: "",
  year: "",
  branch: "",
};

export default function UserSignUp() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (key) => (value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v2/user/signup`,
        formData
      );
      if (response.status === 200) {
        setFormData(INITIAL_FORM_STATE);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to sign up. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputBox
            key="username"
            text="Username"
            type="text"
            value={formData.username}
            setter={updateField("username")}
          />
          <InputBox
            key="usn"
            text="USN"
            type="text"
            value={formData.usn}
            setter={updateField("usn")}
          />
        </div>
        <InputBox
          key="password"
          text="Password"
          type="password"
          value={formData.password}
          setter={updateField("password")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputBox
            key="batch"
            text="Batch"
            type="text"
            value={formData.batch}
            setter={updateField("batch")}
          />
          <InputBox
            key="year"
            text="Year"
            type="text"
            value={formData.year}
            setter={updateField("year")}
          />
        </div>
        <InputBox
          key="branch"
          text="Branch"
          type="text"
          value={formData.branch}
          setter={updateField("branch")}
        />
      </div>
      <div>
        <LoginButton
          loading={loading}
          text={"Create account"}
          loadingText={"Creating account.."}
        />
      </div>
    </form>
  );
}
