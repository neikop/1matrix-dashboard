import { useQuery } from "@tanstack/react-query"
import { ChainID } from "common/enum"
import { last, max, mean } from "lodash"
import { apiClient } from "services/clients"

type Props = {
  chainId: ChainID
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
            expr: getQueryExpr(chainId, "node"),
            refId: "node",
          },
          {
            ...initQuery,
            expr: getQueryExpr(chainId, "blocknumber"),
            refId: "blocknumber",
          },
          {
            ...initQuery,
            expr: getQueryExpr(chainId, "tps"),
            refId: "tps",
          },
          {
            ...initQuery,
            expr: getQueryExpr(chainId, "blocktime"),
            refId: "blocktime",
          },
          {
            ...initQuery,
            expr: getQueryExpr(chainId, "finality"),
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
      const value = last(result.frames[0].data.values[1]) ?? 0
      return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, useGrouping: false }).format(value)
    }
    if (key === "finality") {
      const value = last(result.frames[0].data.values[1]) ?? 0
      return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, useGrouping: false }).format(value)
    }
    return Math.round(mean(result.frames[0].data.values[1]))
  } catch {
    return 0
  }
}

const getQueryExpr = (chainId: ChainID, type: "blocknumber" | "blocktime" | "finality" | "node" | "tps") => {
  if (type === "node") {
    return {
      [ChainID.BCOS]: `count(ledger_block_height{chain="${chainId}"})`,
      [ChainID.DEVNET]: `min(validator_count{chain="${chainId}", job="beacon", state="Active"})`,
      [ChainID.TESTNET]: `count(txpool_local{chain="${chainId}"})`,
    }[chainId]
  }
  if (type === "blocknumber") {
    return {
      [ChainID.BCOS]: `(min(ledger_block_height{node="node0", chain="${chainId}"}))`,
      [ChainID.DEVNET]: `(min(chain_head_header{chain="${chainId}"}))`,
      [ChainID.TESTNET]: `(min(chain_head_header{chain="${chainId}"}))`,
    }[chainId]
  }
  if (type === "tps") {
    return {
      [ChainID.BCOS]: `(sum by(chain) (avg_over_time(txpool_tps{chain=\"${chainId}\"}[1h])))`,
      [ChainID.DEVNET]: `max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain="${chainId}"}[1m])))`,
      [ChainID.TESTNET]: `max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain="${chainId}"}[1m])))`,
    }[chainId]
  }
  if (type === "blocktime") {
    return {
      [ChainID.BCOS]: `(avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="${chainId}"}[1h])) / 1000)`,
      [ChainID.DEVNET]: `(avg(1 / rate(beacon_head_slot{chain="${chainId}", job="beacon"}[1h])))`,
      [ChainID.TESTNET]: `(avg(eth_con_spec_seconds_per_slot{chain="${chainId}"}))`,
    }[chainId]
  }
  if (type === "finality") {
    return {
      [ChainID.BCOS]: `avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="${chainId}"}[1h]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain="${chainId}"}[1h])) / 1000`,
      [ChainID.DEVNET]: `(2 * avg(1 / rate(beacon_head_slot{chain="${chainId}", job="beacon"}[1h])))`,
      [ChainID.TESTNET]: `(2 * avg(eth_con_spec_seconds_per_slot{chain="${chainId}"}))`,
    }[chainId]
  }
  return ""
}
