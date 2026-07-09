import { useState } from "react";

interface NoticeFormProps {
  initialValues?: {
    title: string;
    body: string;
    category: string;
    priority: string;
    publishDate: string;
    imageUrl?: string;
  };
  onSubmit: (data: any) => Promise<void>;
  submitText: string;
}

export default function NoticeForm({
  initialValues,
  onSubmit,
  submitText,
}: NoticeFormProps) {
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    body: initialValues?.body || "",
    category: initialValues?.category || "General",
    priority: initialValues?.priority || "Normal",
    publishDate: initialValues?.publishDate || "",
    imageUrl: initialValues?.imageUrl || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Body
        </label>
        <textarea
          name="body"
          rows={5}
          value={formData.body}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        >
          <option value="Exam">Exam</option>
          <option value="Event">Event</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      {/* Publish Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Publish Date
        </label>
        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
          required
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={() => history.back()}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
