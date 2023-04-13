import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
   // create todo
   const text = JSON.parse(req.body).text;
   const todo = await prisma.todo.create({
     data: { text, completed: false },
   });

   res.json(todo);
};
