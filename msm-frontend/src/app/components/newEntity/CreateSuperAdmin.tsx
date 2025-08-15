'use client'

import React, { useState } from "react";
import axios from "axios"; import Modal from "../Modal";
import ReusableForm from "../ReusableForm";
import { SuperAdmin } from "../../types";

const CreateSuperAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (data: SuperAdmin) => {
        setLoading(true); setSuccessMessage(""); setErrorMessage("");
        try {
            const response = await axios.post(`${ process.env.NEXT_PUBLIC_API_URL}/super-admins`, data);
            setSuccessMessage("Super Admin created successfully!");
            setIsOpen(false);
            console.log("Response:", response.data);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error?.response?.data?.message || "Failed to create Super Admin");
        } finally {
            setLoading(false);
        }
    }; return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 space-y-4">
            {successMessage &&
                <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <button onClick={() => setIsOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors" >
                Create Super Admin </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Super Admin">
                <ReusableForm<SuperAdmin>
                    fields={[
                        { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
                        { name: "email", label: "Email", type: "email", placeholder: "john@example.com", required: true },
                        { name: "password", label: "Password", type: "password", placeholder: "********", required: true },
                        { name: "phone", label: "Phone", type: "text", placeholder: "+92 300 1234567", required: true },
                    ]} onSubmit={handleSubmit} submitLabel={loading ? "Creating..." : "Create"} />
            </Modal> </div>);
}; export default CreateSuperAdmin;