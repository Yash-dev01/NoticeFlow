import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NoticeForm from "@/components/notice/NoticeForm";
import { noticeSchema } from "@/lib/validations";
export default function EditNoticePage() {
  const router = useRouter();
  const { noticeId } = router.query;

  const [notice, setNotice] = useState<any>(null);

  useEffect(() => {
    if (!noticeId) return;

    fetch(`/api/notices/${noticeId}`)
      .then((res) => res.json())
      .then((data) => {
        setNotice({
          ...data,
          publishDate: data.publishDate.split("T")[0],
        });
      })
      .catch(console.error);
  }, [noticeId]);

  async function handleUpdate(data: any) {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response.status);
      console.log(await response.text());
      if (!response.ok) {
        throw new Error("Failed to update notice");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update notice");
    }
  }

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        

        <NoticeForm
          initialValues={notice}
          submitText="Update Notice"
          onSubmit={handleUpdate}
        />
      </div>
    </main>
  );
}