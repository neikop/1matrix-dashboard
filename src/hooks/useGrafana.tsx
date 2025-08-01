import { useQuery } from "@tanstack/react-query"
import { last, max, mean } from "lodash"
import { apiClient } from "services/clients"

type Props = {
  chainId: string
}

export const useGrafana = ({ chainId }: Props) => {
  const { data } = useQuery({
    queryFn: () => {
      const initTime = {
        from: (Date.now() - 1 * 60 * 60 * 1000).toString(),
        to: Date.now().toString(),
      }
      const initQuery = {
        datasource: {
          type: "prometheus",
          uid: "PBFA97CFB590B2093",
        },
        intervalMs: 15000,
      }
      return apiClient.post("/api/query", {
        ...initTime,
        queries: [
          {
            ...initQuery,
            expr:
              chainId === "bcos-testnet"
                ? `count(ledger_block_height{chain=\"bcos-testnet\"})`
                : `count(txpool_local{chain=\"${chainId}\"})`,
            refId: "node",
          },
          {
            ...initQuery,
            expr:
              chainId === "bcos-testnet"
                ? `min(ledger_block_height{node=\"node0\", chain=\"bcos-testnet\"})`
                : `min(chain_head_header{chain=\"${chainId}\"})`,
            refId: "blocknumber",
          },
          {
            ...initQuery,
            expr:
              chainId === "bcos-testnet"
                ? `sum by(chain) (avg_over_time(txpool_tps{chain=\"bcos-testnet\"}[1h]))`
                : `max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain=\"${chainId}\"}[1m])))`,
            refId: "tps",
          },
          {
            ...initQuery,
            expr:
              chainId === "1mtx-devnet"
                ? `avg(1 / rate(beacon_head_slot{chain=\"1mtx-devnet\", job=\"beacon\"}[1h]))`
                : chainId === "bcos-testnet"
                  ? `avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain=\"bcos-testnet\"}[1h])) / 1000`
                  : `avg(eth_con_spec_seconds_per_slot{chain=\"${chainId}\"})`,
            refId: "blocktime",
          },
          {
            ...initQuery,
            expr:
              chainId === "1mtx-devnet"
                ? `avg(time() - (beacon_finalized_epoch{chain=\"1mtx-devnet\", job=\"beacon\"} * 32*4 + 1749006559))`
                : chainId === "bcos-testnet"
                  ? `avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain=\"bcos-testnet\"}[1h]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain=\"bcos-testnet\"}[1h])) / 1000`
                  : `2 * avg(eth_con_spec_seconds_per_slot{chain=\"${chainId}\"})`,
            refId: "finality",
          },
        ],
      })
    },
    queryKey: ["query", chainId],
    refetchInterval: 5000,
  })

  const results: Record<string, Result> = data?.data.results

  return Object.keys(results ?? {}).reduce(
    (data, key) => {
      const result = results[key]
      return {
        ...data,
        [key]: getLatestValue(key, result),
      }
    },
    {} as { blocknumber: number; blocktime: number; finality: number; node: number; tps: number },
  )
}

const getLatestValue = (key: string, result: Result) => {
  try {
    if (key === "blocknumber") {
      return Math.round(max(result.frames[0].data.values[1]) ?? 0)
    }
    if (key === "tps") {
      return Math.round(mean(result.frames[0].data.values[1]) ?? 0)
    }
    if (key === "blocktime") {
      return Math.ceil(last(result.frames[0].data.values[1]) ?? 0)
    }
    if (key === "finality") {
      const avg = mean(result.frames[0].data.values[1]) ?? 0
      if (avg >= 1) return Math.round(avg)
      return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, useGrouping: false }).format(avg)
    }
    return Math.round(mean(result.frames[0].data.values[1]))
  } catch {
    return 0
  }
}
