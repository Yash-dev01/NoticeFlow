import { useRouter } from "next/router";
import NoticeForm from "@/components/notice/NoticeForm";

export default function NewNoticePage() {
  const router = useRouter();

  async function handleCreate(data: any) {
    try {
      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response.status);
      console.log(await response.text());
      if (!response.ok) {
        throw new Error("Failed to create notice");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create notice");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        
        <NoticeForm submitText="Create Notice" onSubmit={handleCreate} />
      </div>
    </main>
  );
}
