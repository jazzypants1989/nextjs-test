import { NextApiResponse } from "next"
import { NextRequest } from "next/server"

async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return
  }

  res.status(200).send({
    message: "Hello World!",
  })
}

export default handler
