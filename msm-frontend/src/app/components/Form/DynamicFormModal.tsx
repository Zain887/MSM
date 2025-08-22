"use client";

import { useState, useEffect } from "react";
import { FormField } from "../../types";

interface DynamicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  layout?: number; // number of columns (default 2)
}

export default function DynamicFormModal({
  isOpen,
  onClose,
  title,
  fields,
  initialValues = {},
  onSave,
  layout = 2,
}: DynamicFormModalProps) {
  const [formData, setFormData] = useState(initialValues);

  // keep formData in sync when editing existing entity
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  // Map dynamic layout into Tailwind grid classes
  const layoutClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[layout] || "grid-cols-2";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`grid ${layoutClass} gap-4`}
        >
          {fields.map((field) => {
            const spanClass =
              {
                1: "col-span-1",
                2: "col-span-2",
                3: "col-span-3",
                4: "col-span-4",
              }[field.span || 1] || "col-span-1";

            return (
              <div key={field.name} className={spanClass}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black placeholder-gray-400"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "file" ? (
                  <input
                    type="file"
                    onChange={(e) =>
                      handleChange(field.name, e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black placeholder-gray-400"
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black placeholder-gray-400"
                    required={field.required}
                  />
                )}


              </div>
            );
          })}

          {/* Actions */}
          <div
            className={`col-span-${layout} flex justify-end gap-3 mt-4`}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
