import type { NextApiRequest, NextApiResponse } from "next";
import { createNotice, getAllNotices } from "@/services/notice.service";
import { noticeSchema } from "@/lib/validations";
import { ZodError } from "zod";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const notices = await getAllNotices();

        return res.status(200).json(notices);
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Failed to fetch notices",
        });
      }

    case "POST":
      try {
        const validatedData = noticeSchema.parse(req.body);

        const notice = await createNotice({
          ...validatedData,
          publishDate: new Date(validatedData.publishDate),
        });

        return res.status(201).json(notice);
      } catch (error) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      errors: error.flatten().fieldErrors,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Failed to create notice",
  });
}

    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
}
