import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  const data = await prisma.category.findMany();
  return data;
};
