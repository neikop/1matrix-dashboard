import { Host } from "common/enum"
import { grafanaService } from "services"

export async function POST(req: Request) {
  const body = await req.json()

  const response = body.host === Host.COSMOS ? await grafanaService.queryCosmos(body) : await grafanaService.query(body)

  return Response.json(response)
}
