// components/SuperAdminList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SuperAdmin } from '../../types';
import Modal from '../Modal';
import ReusableForm from '../ReusableForm';

const SuperAdminList: React.FC = () => {
  const [admins, setAdmins] = useState<SuperAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editAdmin, setEditAdmin] = useState<SuperAdmin | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState<SuperAdmin | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch all admins
  const fetchAdmins = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/super-admins`);
      setAdmins(res.data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch super admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle delete
  const handleDelete = async () => {
    if (!deleteAdmin) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/super-admins/${deleteAdmin.id}`);
      setAdmins(admins.filter(a => a.id !== deleteAdmin.id));
      setIsDeleteModalOpen(false);
      setDeleteAdmin(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete admin');
    }
  };

  // Handle edit submit
  const handleUpdate = async (data: SuperAdmin) => {
    if (!editAdmin) return;

    // Filter only allowed fields
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    };

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/super-admins/${editAdmin.id}`,
        payload
      );
      setAdmins(admins.map(a => (a.id === editAdmin.id ? res.data : a)));
      setIsEditModalOpen(false);
      setEditAdmin(null);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to update admin');
    }
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {admins.map(admin => (
            <div key={admin.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
              <p className="font-semibold text-gray-900">{admin.fullName}</p>
              <p className="text-gray-700">{admin.email}</p>
              <p className="text-gray-700">{admin.phone}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => { setEditAdmin(admin); setIsEditModalOpen(true); }}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setDeleteAdmin(admin); setIsDeleteModalOpen(true); }}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editAdmin && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => { setIsEditModalOpen(false); setEditAdmin(null); }}
          title="Edit Super Admin"
        >
          <ReusableForm<SuperAdmin>
            fields={[
              { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
              { name: 'password', label: 'Password', type: 'password', placeholder: '********', required: false },
              { name: 'phone', label: 'Phone', type: 'text', placeholder: '+92 300 1234567', required: false },
            ]}
            onSubmit={handleUpdate}
            submitLabel="Update"
            defaultValues={editAdmin}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteAdmin && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => { setIsDeleteModalOpen(false); setDeleteAdmin(null); }}
          title="Delete Super Admin"
        >
          <p className="mb-4">Are you sure you want to delete <strong>{deleteAdmin.fullName}</strong>?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => { setIsDeleteModalOpen(false); setDeleteAdmin(null); }}
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

export default SuperAdminList;
