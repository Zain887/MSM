'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import ReusableForm from "../ReusableForm";
import { Parent, School } from "../../types";

const CreateParent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [students, setStudents] = useState<{ id: string; fullName: string }[]>([]);

  // Fetch schools and students for dropdowns
  const fetchData = async () => {
    try {
      const [schoolsRes, studentsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schools`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/students`),
      ]);
      setSchools(schoolsRes.data);
      setStudents(studentsRes.data.map((s: any) => ({ id: s.id, fullName: `${s.firstName} ${s.lastName}` })));
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to load schools or students");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (data: Parent) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/parents`, data);
      setSuccessMessage("Parent created successfully!");
      setIsOpen(false);
      console.log("Response:", response.data);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.response?.data?.message || "Failed to create parent");
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
        Create Parent
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Parent">
        <ReusableForm<Parent>
          fields={[
            { name: "firstName", label: "First Name", type: "text", required: true },
            { name: "lastName", label: "Last Name", type: "text", required: true },
            { 
              name: "gender", 
              label: "Gender", 
              type: "select", 
              required: false, 
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ] 
            },
            { name: "email", label: "Email", type: "email", required: false },
            { name: "phone", label: "Phone", type: "text", required: false },
            { name: "address", label: "Address", type: "text", required: false },
            { name: "occupation", label: "Occupation", type: "text", required: false },
            { name: "relationshipToStudent", label: "Relationship to Student", type: "text", required: false },
            {
              name: "schoolId",
              label: "School",
              type: "select",
              required: true,
              options: schools.map(s => ({ value: s.id, label: s.name })),
            },
            {
              name: "studentIds",
              label: "Students",
              type: "select",
              multiple: true,
              required: false,
              options: students.map(s => ({ value: s.id, label: s.fullName })),
            },
            { name: "profileImageUrl", label: "Profile Image URL", type: "text", required: false },
          ]}
          onSubmit={handleSubmit}
          submitLabel={loading ? "Creating..." : "Create"}
        />
      </Modal>
    </div>
  );
};

export default CreateParent;
