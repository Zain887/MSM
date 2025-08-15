// pages/createSchool.tsx
'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import ReusableForm from "../ReusableForm";

interface School {
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  superAdminId: string;
}

interface SuperAdmin {
  id: string;
  fullName: string;
}

const CreateSchool = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);

  // Fetch super admins for dropdown
  const fetchSuperAdmins = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/super-admins`);
      setSuperAdmins(res.data);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to load super admins");
    }
  };

  useEffect(() => {
    fetchSuperAdmins();
  }, []);

  const handleSubmit = async (data: School) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/schools`, data);
      setSuccessMessage("School created successfully!");
      setIsOpen(false);
      console.log("Response:", response.data);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.response?.data?.message || "Failed to create school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 space-y-4">
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Create School
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create School">
        <ReusableForm<School>
          fields={[
            { name: "name", label: "School Name", type: "text", placeholder: "Greenwood High", required: true },
            { name: "address", label: "Address", type: "text", placeholder: "123 Main St, Springfield", required: true },
            { name: "contactEmail", label: "Contact Email", type: "email", placeholder: "admin@admin.com", required: true },
            { name: "contactPhone", label: "Contact Phone", type: "text", placeholder: "+1234567890", required: true },
            {
              name: "superAdminId",
              label: "Super Admin",
              type: "select",
              placeholder: "",
              required: true,
              options: superAdmins.map((admin) => ({ value: admin.id, label: admin.fullName })),
            },
          ]}
          onSubmit={handleSubmit}
          submitLabel={loading ? "Creating..." : "Create"}
        />
      </Modal>
    </div>
  );
};

export default CreateSchool;
