import axios from "axios"
import { GRAFANA_API_KEY, GRAFANA_API_URL } from "config/env"

const grafanaClient = axios.create({
  baseURL: GRAFANA_API_URL,
  headers: {
    Authorization: GRAFANA_API_KEY,
  },
})
grafanaClient.interceptors.response.use(({ data }) => data.data)

const query = (body?: any): Promise<unknown> =>
  grafanaClient.post(`/api/ds/query`, body, {
    fetchOptions: {
      mode: "no-cors",
    },
  })

export const grafanaService = {
  query,
}
