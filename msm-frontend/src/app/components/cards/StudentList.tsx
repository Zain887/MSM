// components/StudentList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import ReusableForm from '../ReusableForm';
import { Student, School, Parent, Class } from '../../types';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /** Fetch all data **/
  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, schoolsRes, parentsRes, classesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/students`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schools`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parents`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/classes`),
      ]);
      setStudents(studentsRes.data);
      setSchools(schoolsRes.data);
      setParents(parentsRes.data);
      setClasses(classesRes.data);
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

  /** Delete Student **/
  const handleDelete = async () => {
    if (!deleteStudent) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/students/${deleteStudent.id}`);
      setStudents(students.filter(s => s.id !== deleteStudent.id));
      setIsDeleteModalOpen(false);
      setDeleteStudent(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete student');
    }
  };

  /** Create or Update Student **/
  const handleCreateOrUpdate = async (data: Student) => {
    try {
      const payload = {
        ...data,
        parentIds: data.parentIds || [],
      };

      if (editStudent) {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/students/${editStudent.id}`, payload);
        setStudents(students.map(s => (s.id === editStudent.id ? res.data : s)));
        setIsEditModalOpen(false);
        setEditStudent(null);
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/students`, payload);
        setStudents([...students, res.data]);
        setIsCreateModalOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to save student');
    }
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
            <div key={student.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
              <p className="font-semibold text-gray-900">{student.firstName} {student.lastName}</p>
              <p className="text-gray-700">Gender: {student.gender || 'N/A'}</p>
              <p className="text-gray-700">DOB: {student.dateOfBirth?.split('T')[0] || 'N/A'}</p>
              <p className="text-gray-700">Admission #: {student.admissionNumber || 'N/A'}</p>
              <p className="text-gray-700">Email: {student.email || 'N/A'}</p>
              <p className="text-gray-700">Phone: {student.phone || 'N/A'}</p>
              <p className="text-gray-700">Address: {student.address || 'N/A'}</p>
              <p className="text-gray-700">
                School: {schools.find(s => s.id === student.schoolId)?.name || 'N/A'}
              </p>
              <p className="text-gray-700">
                Class: {classes.find(c => c.id === student.classId)?.name || 'N/A'}
              </p>
              <p className="text-gray-700">
                Parents: {student.parentIds.map(pid => parents.find(p => p.id === pid)?.fullName).filter(Boolean).join(', ') || 'N/A'}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => { setEditStudent(student); setIsEditModalOpen(true); }}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setDeleteStudent(student); setIsDeleteModalOpen(true); }}
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
      {(isCreateModalOpen || editStudent) && (
        <Modal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); setEditStudent(null); }}
          title={editStudent ? "Edit Student" : "Create Student"}
        >
          <ReusableForm<Student>
            fields={[
              { name: "firstName", label: "First Name", type: "text", required: true },
              { name: "lastName", label: "Last Name", type: "text", required: true },
              { name: "gender", label: "Gender", type: "text", required: false },
              { name: "dateOfBirth", label: "Date of Birth", type: "date", required: false },
              { name: "admissionNumber", label: "Admission Number", type: "text", required: false },
              { name: "admissionDate", label: "Admission Date", type: "date", required: false },
              { name: "email", label: "Email", type: "email", required: false },
              { name: "phone", label: "Phone", type: "text", required: false },
              { name: "address", label: "Address", type: "text", required: false },
              { name: "rollNumber", label: "Roll Number", type: "text", required: false },
              { name: "section", label: "Section", type: "text", required: false },
              {
                name: "schoolId",
                label: "School",
                type: "select",
                required: true,
                options: schools.map(s => ({ value: s.id, label: s.name })),
              },
              {
                name: "classId",
                label: "Class",
                type: "select",
                required: true,
                options: classes.map(c => ({ value: c.id, label: c.name })),
              },
              {
                name: "parentIds",
                label: "Parents",
                type: "select",
                multiple: true,
                required: true,
                options: parents.map(p => ({ value: p.id, label: p.fullName ?? 'Unknown' })),
              },
            ]}
            onSubmit={handleCreateOrUpdate}
            submitLabel={editStudent ? "Update" : "Create"}
            defaultValues={editStudent || undefined}
          />
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteStudent && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => { setIsDeleteModalOpen(false); setDeleteStudent(null); }}
          title="Delete Student"
        >
          <p className="mb-4 text-black">
            Are you sure you want to delete <strong>{deleteStudent.firstName} {deleteStudent.lastName}</strong>?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => { setIsDeleteModalOpen(false); setDeleteStudent(null); }}
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

export default StudentList;
