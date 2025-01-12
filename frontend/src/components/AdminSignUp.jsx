import React, { useState } from "react";
import { InputBox } from "./InputBox";
import { LoginButton } from "./LoginButton";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
  department: "",
};

export default function AdminSignUp() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/admin/signup`,
        formData
      );
      if (response.status === 200) {
        setFormData(INITIAL_FORM_STATE);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        navigate("/admin/dashboard");
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

  const updateField = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors({});
  };

  const formFields = [
    { key: "username", text: "Username", type: "text" },
    { key: "email", text: "Email", type: "email" },
    { key: "password", text: "Password", type: "password" },
    { key: "department", text: "Department", type: "text" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}
      {formFields.map((field) => (
        <InputBox
          key={field.key}
          text={field.text}
          type={field.type}
          value={formData[field.key]}
          setter={updateField(field.key)}
        />
      ))}
      <div>
        <LoginButton
          loading={loading}
          text="Create Account"
          loadingText="Creating Account..."
        />
      </div>
    </form>
  );
}
