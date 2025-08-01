import { grafanaService } from "services"

export async function POST(req: Request) {
  const body = await req.json()

  console.log("=======", JSON.stringify(body, null, 2))
  const response = await grafanaService.query(body)
  return Response.json(response)
}
