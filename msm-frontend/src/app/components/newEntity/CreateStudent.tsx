// pages/createStudent.tsx
'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import ReusableForm from "../ReusableForm";
import { Class, Parent, School, Student } from "@/app/types";

const CreateStudent = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [schools, setSchools] = useState<School[]>([]);
    const [parents, setParents] = useState<Parent[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);

    useEffect(() => {
        fetchDropdowns();
    }, []);

    const fetchDropdowns = async () => {
        try {
            const [schoolsRes, parentsRes, classesRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schools`),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parents`),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/classes`)
            ]);
            setSchools(schoolsRes.data);
            setParents(parentsRes.data);
            setClasses(classesRes.data);
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to load dropdown data");
        }
    };

    const handleSubmit = async (data: Student) => {
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/students`, data);
            setSuccessMessage("Student created successfully!");
            setIsOpen(false);
            console.log("Response:", response.data);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error?.response?.data?.message || "Failed to create student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 space-y-4">
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Student">
                <ReusableForm<Student>
                    fields={[
                        { name: "firstName", label: "First Name", type: "text", placeholder: "John", required: true },
                        { name: "lastName", label: "Last Name", type: "text", placeholder: "Doe", required: true },
                        { name: "gender", label: "Gender", type: "text", placeholder: "Male", required: false },
                        { name: "dateOfBirth", label: "Date of Birth", type: "date", placeholder: "2000-01-01", required: false },
                        { name: "admissionNumber", label: "Admission Number", type: "text", placeholder: "ADM12345", required: false },
                        { name: "admissionDate", label: "Admission Date", type: "date", placeholder: "2025-08-15", required: false },
                        { name: "email", label: "Email", type: "email", placeholder: "student@school.com", required: false },
                        { name: "phone", label: "Phone", type: "text", placeholder: "+1234567890", required: false },
                        { name: "address", label: "Address", type: "text", placeholder: "123 Main St, City", required: false },
                        { name: "profileImageUrl", label: "Profile Image URL", type: "text", placeholder: "image-url", required: false },
                        { name: "rollNumber", label: "Roll Number", type: "text", placeholder: "R001", required: false },
                        { name: "section", label: "Section", type: "text", placeholder: "A", required: false },
                        { name: "hostelRoomId", label: "Hostel Room ID", type: "text", placeholder: "H101", required: false },
                        { name: "transportAssignmentId", label: "Transport Assignment ID", type: "text", placeholder: "T101", required: false },
                        { name: "status", label: "Status", type: "text", placeholder: "Active", required: false },
                        { name: "remarks", label: "Remarks", type: "text", placeholder: "Good student", required: false },

                        // Dropdowns
                        {
                            name: "schoolId",
                            label: "School",
                            type: "select",
                            required: true,
                            options: schools.map(s => ({ value: s.id, label: s.name })),
                        },
                        {
                            name: "parentIds",
                            label: "Parents",
                            type: "select",
                            multiple: true,
                            required: true,
                            options: parents.map(p => ({ value: p.id, label: p.fullName ?? 'Unknown' })),
                        },
                        {
                            name: "classId",
                            label: "Class",
                            type: "select",
                            required: true,
                            options: classes.map(c => ({ value: c.id, label: c.name })),
                        },
                        {
                            name: "subjectIds",
                            label: "Subjects",
                            type: "select",
                            multiple: true,
                            required: false,
                            options: [], // optional, you can fetch subjects similarly
                        },
                    ]}
                    onSubmit={handleSubmit}
                    submitLabel={loading ? "Creating..." : "Create"}
                />
            </Modal>
        </div>
    );
};

export default CreateStudent;
