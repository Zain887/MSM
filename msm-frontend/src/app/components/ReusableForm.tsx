import React from "react";
import { useForm, SubmitHandler, Path, DefaultValues } from "react-hook-form";
import { FormField } from "../types";

interface ReusableFormProps<T> {
  fields: FormField[];
  onSubmit: (data: T) => void | Promise<void>;
  submitLabel?: string;
  defaultValues?: DefaultValues<T>;
}

const ReusableForm = <T extends Record<string, any>>({
  fields,
  onSubmit,
  submitLabel = "Submit",
  defaultValues,
}: ReusableFormProps<T>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<T>({
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<T> = (data: any) => {
    onSubmit(data as T);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto space-y-6"
    >
      {fields.map((field) => {
        const fieldName = field.name as Path<T>;

        return (
          <div key={field.name} className="flex flex-col">
            <label className="mb-2 text-gray-900 font-medium">{field.label}</label>

            {field.type === "select" && field.options ? (
              <select
                {...register(fieldName, { required: field.required })}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(fieldName, { required: field.required })}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}

            {errors[fieldName] && (
              <span className="text-red-600 text-sm mt-1">
                {field.label} is required
              </span>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default ReusableForm;
