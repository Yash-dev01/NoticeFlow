import Link from "next/link";

interface NoticeCardProps {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  imageUrl?: string | null;
  onDelete: (id: number) => void;
}

export default function NoticeCard({
  id,
  title,
  body,
  category,
  priority,
  publishDate,
  imageUrl,
  onDelete,
}: NoticeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

          {priority === "Urgent" && (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
              Urgent
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {body}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {category}
          </span>

          <span>
            {new Date(publishDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href={`/notices/${id}`}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(id)}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}