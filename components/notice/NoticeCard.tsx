import Link from "next/link";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return {
          badge: "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30",
          dot: "bg-white",
          border: "border-red-400",
          glow: "shadow-red-500/50"
        };
      default:
        return {
          badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30",
          dot: "bg-white",
          border: "border-blue-400",
          glow: "shadow-blue-500/50"
        };
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Exam":
        return {
          bg: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-md shadow-purple-500/20",
          border: "border-purple-400",
          icon: (
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        };
      case "Event":
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20",
          border: "border-emerald-400",
          icon: (
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        };
      default:
        return {
          bg: "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-500/20",
          border: "border-indigo-400",
          icon: (
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          )
        };
    }
  };

  const priorityStyles = getPriorityStyles(priority);
  const categoryStyles = getCategoryStyles(category);
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-sm border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Always visible, equal height */}
      {imageUrl && !imageError ? (
        <a 
          href={imageUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative h-52 overflow-hidden block cursor-pointer flex-shrink-0"
        >
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
            }`}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* View Image Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              View Image
            </span>
          </div>

          {/* Priority Badge on Image */}
          {priority === "Urgent" && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3.5 py-2 rounded-full text-sm font-bold bg-red-500 text-white shadow-2xl backdrop-blur-sm">
                <span className="w-2 h-2 bg-white rounded-full mr-2" />
                Urgent
              </span>
            </div>
          )}
        </a>
      ) : (
        /* No Image Placeholder - Always shown when no imageUrl */
        <div className="relative h-52 overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 flex items-center justify-center border-b border-slate-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
              <svg className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">No image available</p>
          </div>
          
          {/* Priority Badge for no-image cards */}
          {priority === "Urgent" && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3.5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full mr-2" />
                Urgent
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
            {title}
          </h2>
          
          {/* Show priority badge in content area only if there's an image with urgent priority */}
          {priority === "Urgent" && imageUrl && !imageError && (
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${priorityStyles.badge} flex-shrink-0`}>
              <span className="w-2 h-2 bg-white rounded-full mr-2" />
              Urgent
            </span>
          )}
          
          {priority !== "Urgent" && (
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${priorityStyles.badge} flex-shrink-0`}>
              <span className="w-2 h-2 bg-white rounded-full mr-2" />
              Normal
            </span>
          )}
        </div>

        {/* Body */}
        <p className="text-slate-600 text-base leading-relaxed line-clamp-3 mb-5 flex-1">
          {body}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-semibold border-2 ${categoryStyles.bg}`}>
            {categoryStyles.icon}
            {category}
          </span>
          
          <span className="inline-flex items-center text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <svg className="w-4 h-4 mr-1.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t-2 border-slate-100 mt-auto">
          <Link
            href={`/notices/${id}`}
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 rounded-xl transition-all group/btn"
          >
            <svg className="w-5 h-5 mr-1.5 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>

          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 rounded-xl transition-all group/btn"
          >
            <svg className="w-5 h-5 mr-1.5 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}