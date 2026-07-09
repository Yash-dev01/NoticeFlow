import { prisma } from "@/lib/prisma";
import { NoticeInput } from "@/types/notice";

export async function getAllNotices() {
  return prisma.notice.findMany({
    orderBy: [
      {
        priority: "desc",
      },
      {
        publishDate: "desc",
      },
    ],
  });
}

export async function getNoticeById(noticeId: number) {
  return prisma.notice.findUnique({
    where: {
      id: noticeId,
    },
  });
}

export async function createNotice(data: NoticeInput) {
  return prisma.notice.create({
    data,
  });
}

export async function updateNotice(
  noticeId: number,
  data: NoticeInput
) {
  return prisma.notice.update({
    where: {
      id: noticeId,
    },
    data,
  });
}

export async function deleteNotice(noticeId: number) {
  return prisma.notice.delete({
    where: {
      id: noticeId,
    },
  });
}