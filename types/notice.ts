import { Category, Priority } from "@prisma/client";

export interface NoticeInput {
  title: string;
  body: string;
  category: Category;
  priority: Priority;
  publishDate: Date;
  imageUrl?: string;
}