import { grafanaService } from "services"

export async function POST(req: Request) {
  const body = await req.json()
  const response = await grafanaService.query(body)
  return Response.json(response)
}
