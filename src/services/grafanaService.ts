import axios from "axios"

const grafanaClient = axios.create({
  baseURL: process.env.GRAFANA_API_URL,
  headers: {
    Authorization: process.env.GRAFANA_API_KEY,
  },
})
grafanaClient.interceptors.response.use(({ data }) => data)

const query = (body?: object): Promise<unknown> => grafanaClient.post(`/api/ds/query`, body)

const cosmosClient = axios.create({
  baseURL: process.env.GRAFANA_COSMOS_API_URL,
  headers: {
    Authorization: process.env.GRAFANA_COSMOS_API_KEY,
  },
})

cosmosClient.interceptors.response.use(({ data }) => data)

const queryCosmos = (body?: object): Promise<unknown> => cosmosClient.post(`/api/ds/query`, body)

export const grafanaService = {
  query,
  queryCosmos,
}
