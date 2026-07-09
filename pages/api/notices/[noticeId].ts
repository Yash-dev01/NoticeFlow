import type { NextApiRequest, NextApiResponse } from "next";
import {
  getNoticeById,
  updateNotice,
  deleteNotice,
} from "@/services/notice.service";
import { noticeSchema } from "@/lib/validations";
import { ZodError } from "zod";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { noticeId } = req.query;
  const id = Number(noticeId);

  switch (req.method) {
    case "GET":
      try {
        const notice = await getNoticeById(id);

        if (!notice) {
          return res.status(404).json({
            message: "Notice not found",
          });
        }

        return res.status(200).json(notice);
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Failed to fetch notice",
        });
      }

    case "PUT":
      try {
        const validatedData = noticeSchema.parse(req.body);

        const notice = await updateNotice(id, {
          ...validatedData,
          publishDate: new Date(validatedData.publishDate),
        });

        return res.status(200).json(notice);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            errors: error.flatten().fieldErrors,
          });
        }

        console.error(error);

        return res.status(500).json({
          message: "Failed to update notice",
        });
      }

    case "DELETE":
      try {
        await deleteNotice(id);

        return res.status(200).json({
          message: "Notice deleted successfully",
        });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Failed to delete notice",
        });
      }

    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
}
