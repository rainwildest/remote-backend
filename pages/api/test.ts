import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const kk = prisma.post
    .findUnique({
      where: { id: 1 }
    })
    .author();
  // console.log(kk.)
  kk.then(val => {
    console.log(val);
  });

  const k = prisma.$queryRaw`SELECT * FROM User where id=2`;
  // const k = prisma.$queryRaw(Prisma.sql`SELECT * FROM User WHERE id=2`);
  k.then(val => {
    console.log("val", val[0]);
  });

  return res.end(JSON.stringify({ code: 2000, msg: null, data: null }));
};
