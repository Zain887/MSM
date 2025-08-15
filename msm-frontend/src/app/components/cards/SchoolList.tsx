// components/SchoolList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import ReusableForm from '../ReusableForm';
import { School, SuperAdmin } from '../../types';

const SchoolList: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [admins, setAdmins] = useState<SuperAdmin[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editSchool, setEditSchool] = useState<School | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteSchool, setDeleteSchool] = useState<School | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Fetch schools
    const fetchSchools = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schools`);
            setSchools(res.data);
        } catch (err: any) {
            console.error(err);
            setError('Failed to fetch schools');
        } finally {
            setLoading(false);
        }
    };

    // Fetch super admins for select options
    const fetchAdmins = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/super-admins`);
            setAdmins(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSchools();
        fetchAdmins();
    }, []);

    const handleDelete = async () => {
        if (!deleteSchool) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/schools/${deleteSchool.id}`);
            setSchools(schools.filter(s => s.id !== deleteSchool.id));
            setIsDeleteModalOpen(false);
            setDeleteSchool(null);
        } catch (err) {
            console.error(err);
            setError('Failed to delete school');
        }
    };

    const handleCreateOrUpdate = async (data: School) => {
        try {
            // Only send allowed DTO fields
            const payload = {
                name: data.name,
                address: data.address || null,
                contactEmail: data.contactEmail || null,
                contactPhone: data.contactPhone || null,
                superAdminId: data.superAdminId,
            };

            if (editSchool) {
                // Update
                const res = await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/schools/${editSchool.id}`,
                    payload
                );
                setSchools(schools.map(s => (s.id === editSchool.id ? res.data : s)));
                setIsEditModalOpen(false);
                setEditSchool(null);
            } else {
                // Create
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/schools`, payload);
                setSchools([...schools, res.data]);
                setIsCreateModalOpen(false);
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'Failed to save school');
        }
    };


    return (
        <div className="p-4">
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schools.map(school => (
                        <div key={school.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
                            <p className="font-semibold text-gray-900">{school.name}</p>
                            <p className="text-gray-700">{school.address}</p>
                            <p className="text-gray-700">{school.contactEmail}</p>
                            <p className="text-gray-700">{school.contactPhone}</p>
                            <p className="text-gray-700">
                                Super Admin: {admins.find(a => a.id === school.superAdminId)?.fullName || 'N/A'}
                            </p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => { setEditSchool(school); setIsEditModalOpen(true); }}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => { setDeleteSchool(school); setIsDeleteModalOpen(true); }}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create School"
            >
                <ReusableForm<School>
                    fields={[
                        { name: 'name', label: 'School Name', type: 'text', placeholder: 'Greenwood High', required: true },
                        { name: 'address', label: 'Address', type: 'text', placeholder: '123 Main St', required: false },
                        { name: 'contactEmail', label: 'Contact Email', type: 'email', placeholder: 'admin@admin.com', required: false },
                        { name: 'contactPhone', label: 'Contact Phone', type: 'text', placeholder: '+1234567890', required: false },
                        {
                            name: 'superAdminId',
                            label: 'Super Admin',
                            type: 'select',
                            options: admins
                                .filter(a => a.fullName)
                                .map(a => ({ label: a.fullName!, value: a.id })),
                            required: true,
                        },
                    ]}
                    onSubmit={handleCreateOrUpdate}
                    submitLabel="Create"
                />
            </Modal>

            {/* Edit Modal */}
            {editSchool && (
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => { setIsEditModalOpen(false); setEditSchool(null); }}
                    title="Edit School"
                >
                    <ReusableForm<School>
                        fields={[
                            { name: 'name', label: 'School Name', type: 'text', placeholder: 'Greenwood High', required: true },
                            { name: 'address', label: 'Address', type: 'text', placeholder: '123 Main St', required: false },
                            { name: 'contactEmail', label: 'Contact Email', type: 'email', placeholder: 'admin@admin.com', required: false },
                            { name: 'contactPhone', label: 'Contact Phone', type: 'text', placeholder: '+1234567890', required: false },
                            {
                                name: 'superAdminId',
                                label: 'Super Admin',
                                type: 'select',
                                options: admins
                                    .filter(a => a.fullName)
                                    .map(a => ({ label: a.fullName!, value: a.id })),
                                required: true,
                            },
                        ]}
                        onSubmit={handleCreateOrUpdate}
                        submitLabel="Update"
                        defaultValues={editSchool}
                    />
                </Modal>
            )}

            {/* Delete Modal */}
            {deleteSchool && (
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={() => { setIsDeleteModalOpen(false); setDeleteSchool(null); }}
                    title="Delete School"
                >
                    <p className="mb-4 text-black">
                        Are you sure you want to delete <strong>{deleteSchool.name}</strong>?
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => { setIsDeleteModalOpen(false); setDeleteSchool(null); }}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SchoolList;
