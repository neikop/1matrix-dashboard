type Frame = {
  data: {
    values: [Array<number>, Array<number>]
  }
  schema: unknown
}

type Result = {
  frames: [Frame]
  status: number
}
