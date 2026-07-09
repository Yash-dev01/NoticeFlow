import { useEffect, useState } from "react";
import NoticeCard from "@/components/notice/NoticeCard";
import DeleteNoticeModal from "@/components/notice/DeleteNoticeModal";
export default function Home() {
  const [notices, setNotices] = useState([]);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  async function fetchNotices() {
    try {
      const response = await fetch("/api/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
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

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Notice Board</h1>

          <a
            href="/notices/new"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            + Add Notice
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice: any) => (
            <NoticeCard key={notice.id} {...notice} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      <DeleteNoticeModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={confirmDelete}
/>
    </main>
  );
}
