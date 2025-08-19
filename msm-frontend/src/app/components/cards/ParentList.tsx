'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import ReusableForm from '../ReusableForm';
import { Parent, School, Student } from '../../types';

const ParentList: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editParent, setEditParent] = useState<Parent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteParent, setDeleteParent] = useState<Parent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);


  /** Fetch all parents and schools */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [parentsRes, schoolsRes, studentsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parents`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schools`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/students`), // ✅ new fetch
      ]);
      setParents(parentsRes.data);
      setSchools(schoolsRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  /** Delete Parent **/
  const handleDelete = async () => {
    if (!deleteParent) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/parents/${deleteParent.id}`);
      setParents(parents.filter(p => p.id !== deleteParent.id));
      setIsDeleteModalOpen(false);
      setDeleteParent(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete parent');
    }
  };

  /** Create or Update Parent **/
  const handleCreateOrUpdate = async (data: Parent) => {
    try {
      const payload = {
        ...data,
        studentIds: data.studentIds || [],
      };

      if (editParent) {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parents/${editParent.id}`, payload);
        setParents(parents.map(p => (p.id === editParent.id ? res.data : p)));
        setIsEditModalOpen(false);
        setEditParent(null);
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/parents`, payload);
        setParents([...parents, res.data]);
        setIsCreateModalOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to save parent');
    }
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parents.map(parent => (
            <div key={parent.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
              <p className="font-semibold text-gray-900">{parent.fullName || `${parent.firstName} ${parent.lastName}`}</p>
              <p className="text-gray-700">Gender: {parent.gender || 'N/A'}</p>
              <p className="text-gray-700">Email: {parent.email || 'N/A'}</p>
              <p className="text-gray-700">Phone: {parent.phone || 'N/A'}</p>
              <p className="text-gray-700">Address: {parent.address || 'N/A'}</p>
              <p className="text-gray-700">Occupation: {parent.occupation || 'N/A'}</p>
              <p className="text-gray-700">Relationship: {parent.relationshipToStudent || 'N/A'}</p>
              <p className="text-gray-700">
                School: {schools.find(s => s.id === parent.schoolId)?.name || 'N/A'}
              </p>
              <p className="text-gray-700">
                Students: {parent.studentIds?.length
                  ? parent.studentIds
                    .map(id => students.find(s => s.id === id)?.firstName || id)
                    .join(', ')
                  : 'N/A'}
              </p>

              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => { setEditParent(parent); setIsEditModalOpen(true); }}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setDeleteParent(parent); setIsDeleteModalOpen(true); }}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {(isCreateModalOpen || editParent) && (
        <Modal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); setEditParent(null); }}
          title={editParent ? "Edit Parent" : "Create Parent"}
        >
          <ReusableForm<Parent>
            fields={[
              { name: "firstName", label: "First Name", type: "text", required: true },
              { name: "lastName", label: "Last Name", type: "text", required: true },
              {
                name: "gender", label: "Gender", type: "select", required: false, options: [
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]
              },
              { name: "email", label: "Email", type: "email", required: false },
              { name: "phone", label: "Phone", type: "text", required: false },
              { name: "address", label: "Address", type: "text", required: false },
              { name: "occupation", label: "Occupation", type: "text", required: false },
              { name: "relationshipToStudent", label: "Relationship", type: "text", required: false },
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
                options: [], // You can populate with actual student options if needed
              },
            ]}
            onSubmit={handleCreateOrUpdate}
            submitLabel={editParent ? "Update" : "Create"}
            defaultValues={editParent || undefined}
          />
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteParent && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => { setIsDeleteModalOpen(false); setDeleteParent(null); }}
          title="Delete Parent"
        >
          <p className="mb-4 text-black">
            Are you sure you want to delete <strong>{deleteParent.fullName || `${deleteParent.firstName} ${deleteParent.lastName}`}</strong>?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => { setIsDeleteModalOpen(false); setDeleteParent(null); }}
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

export default ParentList;
