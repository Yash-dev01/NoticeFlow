import { useEffect, useState } from "react";
import NoticeCard from "@/components/notice/NoticeCard";
import DeleteNoticeModal from "@/components/notice/DeleteNoticeModal";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 6;

  async function fetchNotices() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  async function confirmDelete() {
    if (!selectedNoticeId) return;

    try {
      await fetch(`/api/notices/${selectedNoticeId}`, {
        method: "DELETE",
      });

      fetchNotices();
      setShowDeleteModal(false);
      setSelectedNoticeId(null);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete(id: number) {
    setSelectedNoticeId(id);
    setShowDeleteModal(true);
  }

  // Pagination logic
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="animate-pulse space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-3 sm:h-4 bg-slate-200 rounded w-16 sm:w-20"></div>
              <div className="h-5 sm:h-6 bg-slate-200 rounded-full w-14 sm:w-16"></div>
            </div>
            <div className="h-4 sm:h-5 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="h-2.5 sm:h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-2.5 sm:h-3 bg-slate-200 rounded w-5/6"></div>
              <div className="h-2.5 sm:h-3 bg-slate-200 rounded w-4/6"></div>
            </div>
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100">
              <div className="h-2.5 sm:h-3 bg-slate-200 rounded w-20 sm:w-24"></div>
              <div className="h-7 sm:h-8 bg-slate-200 rounded-lg w-16 sm:w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Notice Board
              </h1>
            </div>
          </div>

          <a
            href="/notices/new"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Notice
          </a>
        </div>

      
        {isLoading ? (
          <SkeletonLoader />
        ) : notices.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">No notices yet</h3>
            <p className="text-sm sm:text-base text-slate-500 mb-4 sm:mb-6">Get started by creating your first notice</p>
            <a
              href="/notices/new"
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Notice
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentNotices.map((notice: any) => (
                <NoticeCard key={notice.id} {...notice} onDelete={handleDelete} />
              ))}
            </div>

            
            {totalPages > 1 && (
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-slate-600 order-2 sm:order-1">
                  Showing {indexOfFirstNotice + 1} to {Math.min(indexOfLastNotice, notices.length)} of {notices.length} notices
                </div>
                
                <div className="flex items-center space-x-1.5 sm:space-x-2 order-1 sm:order-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 sm:px-3 sm:py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm font-medium rounded-lg sm:rounded-xl transition-all ${
                        currentPage === number
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 sm:px-3 sm:py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <DeleteNoticeModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}