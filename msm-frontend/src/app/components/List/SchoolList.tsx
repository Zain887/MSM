"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { School } from "@/app/types";
import FormModal from "../Form/DynamicFormModal";
import { schoolFormFields } from "../Form/formFields"; // ✅ moved to separate file
import ConfirmModal from "../ConfirmModal";

export default function SchoolListPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null);



    // 🔹 Fetch schools
    const fetchSchools = async () => {
        try {
            const res = await api.get<School[]>("/schools");
            setSchools(res.data);
        } catch (error) {
            console.error("❌ Error fetching schools:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    // 🔹 Handle Add New
    const handleAddNew = () => {
        setSelectedSchool(null);
        setIsModalOpen(true);
    };

    // 🔹 Handle Update
    const handleUpdate = (school: School) => {
        setSelectedSchool(school);
        setIsModalOpen(true);
    };

    // 🔹 Trigger modal instead of confirm()
    const handleDelete = (id: string) => {
        setSchoolToDelete(id);
        setConfirmOpen(true);
    };
    const confirmDelete = async () => {
        if (!schoolToDelete) return;
        try {
            await api.delete(`/schools/${schoolToDelete}`);
            setSchools((prev) => prev.filter((s) => s.id !== schoolToDelete));
        } catch (error) {
            console.error("❌ Error deleting school:", error);
        } finally {
            setConfirmOpen(false);
            setSchoolToDelete(null);
        }
    };


    const handleSave = async (formData: Record<string, any>) => {
        try {
            // 🛠 Remove id (backend forbids it in body)
            delete formData.id;

            // Convert numeric fields
            if (formData.establishedYear) {
                formData.establishedYear = Number(formData.establishedYear);
            }

            // Handle logo file (optional, if file upload is separate)
            if (formData.logoUrl instanceof File) {
                delete formData.logoUrl; // or upload to storage & replace with URL
            }

            // Debug payload
            console.log("Submitting payload:", formData);

            if (selectedSchool) {
                // Update
                await api.put(`/schools/${selectedSchool.id}`, formData);
            } else {
                // Create
                await api.post(`/schools`, formData);
            }

            fetchSchools();
            setIsModalOpen(false);
        } catch (error: any) {
            console.error("Save failed:", error.response?.data || error.message);
        }
    };


    if (loading) return <p className="p-4">Loading schools...</p>;

    return (
        <main className="p-6">
            {/* 🔹 Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">School List</h1>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add School
                </button>
            </div>

            {/* 🔹 Schools Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-200 uppercase text-sm text-blue-500">
                        <tr>
                            <th className="p-3 text-left">Logo</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Reg. No</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">City</th>
                            <th className="p-3 text-left">State</th>
                            <th className="p-3 text-left">Country</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Website</th>
                            <th className="p-3 text-left">Established</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.map((school, idx) => (
                            <tr
                                key={school.id}
                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } text-gray-800 hover:bg-gray-100 transition-colors`}
                            >
                                <td className="p-3">
                                    {school.logoUrl ? (
                                        <img
                                            src={school.logoUrl}
                                            alt="Logo"
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">N/A</span>
                                    )}
                                </td>
                                <td className="p-3 font-semibold">{school.name}</td>
                                <td className="p-3">{school.registrationNumber}</td>
                                <td className="p-3">{school.type}</td>
                                <td className="p-3">{school.city}</td>
                                <td className="p-3">{school.state}</td>
                                <td className="p-3">{school.country}</td>
                                <td className="p-3">{school.contactEmail || "—"}</td>
                                <td className="p-3">{school.contactPhone || "—"}</td>
                                <td className="p-3">
                                    {school.websiteUrl ? (
                                        <a
                                            href={school.websiteUrl}
                                            target="_blank"
                                            className="text-blue-500 underline"
                                        >
                                            Visit
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </td>
                                <td className="p-3">{school.establishedYear || "—"}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${school.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {school.status}
                                    </span>
                                </td>
                                <td className="p-3 flex justify-evenly h-16">
                                    <button
                                        onClick={() => handleUpdate(school)}
                                        className="text-blue-600 hover:text-blue-800 transition"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(school.id)}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔹 Reusable Form Modal */}
            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialValues={selectedSchool || {}}
                fields={schoolFormFields}
                layout={2}
                title={selectedSchool ? "Edit School" : "Add School"}
            />

            <ConfirmModal
                isOpen={confirmOpen}
                title="Delete School"
                message="Are you sure you want to delete this school? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </main>
    );
}
