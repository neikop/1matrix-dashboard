/* eslint-disable perfectionist/sort-objects */
import { useQuery } from "@tanstack/react-query"
import { ChainID, Host } from "common/enum"
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
          uid: chainId === ChainID.GAMMA ? "eeu9jvmi9dv5sf" : "PBFA97CFB590B2093",
        },
        intervalMs: 15 * 1000,
        utcOffsetSec: 25200,
      }
      return apiClient.post("/api/query", {
        ...initTime,
        // host: chainId === ChainID.GAMMA ? Host.COSMOS : Host.MATRIX,
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
        ...(getLatestValue(key, result) as any),
      }
    },
    {} as { blocknumber: number; blocktime: number; finality: number; maxTps: number; node: number; tps: number },
  )
}

const getLatestValue = (key: string, result: Result) => {
  try {
    if (key === "blocknumber") {
      return { [key]: Math.round(max(result.frames[0].data.values[1]) ?? 0) }
    }
    if (key === "tps") {
      return {
        [key]: Math.round(mean(result.frames[0].data.values[1]) ?? 0),
        maxTps: Math.round(max(result.frames[0].data.values[1]) ?? 0),
      }
    }
    if (key === "blocktime") {
      const value = last(result.frames[0].data.values[1]) ?? 0
      if (value < 1) {
        return { [key]: value.toFixed(3) }
      }
      return { [key]: new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, useGrouping: false }).format(value) }
    }
    if (key === "finality") {
      const value = last(result.frames[0].data.values[1]) ?? 0
      if (value < 1) {
        return { [key]: value.toFixed(3) }
      }
      return { [key]: new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, useGrouping: false }).format(value) }
    }
    return { [key]: Math.round(mean(result.frames[0].data.values[1])) }
  } catch {
    return { [key]: 0 }
  }
}

const getQueryExpr = (chainId: ChainID, type: "blocknumber" | "blocktime" | "finality" | "node" | "tps") => {
  if (type === "node") {
    return {
      [ChainID.ALPHA]: `count(txpool_local{chain=\"1matrix-stressnet\"}) * 2`,
      [ChainID.BETA]: `count(ledger_block_height{chain=\"bcos-testnet-cmc\"}) * 3`,
      [ChainID.GAMMA]: `sum(up{job=\"cosmos\"}) * 2`,
      [ChainID.TCBCHAIN]: 'count(txpool_local{chain="1mtx-alpha-2"}) * 2',
      [ChainID.EPSILON]: 'count(ledger_block_height{chain="bcos-quorum"}) * 4',
      [ChainID.ZETA]: 'count(ledger_block_height{chain="bcos-sonic"}) * 4',
    }[chainId]
  }
  if (type === "blocknumber") {
    return {
      [ChainID.ALPHA]: `max(chain_head_block{chain="1matrix-stressnet"})`,
      [ChainID.BETA]: `ledger_block_height{node="node0", chain="bcos-testnet-cmc", environment="beta-validator-1"}`,
      [ChainID.GAMMA]: `cometbft_consensus_height{instance="archive-node-1"}`,
      [ChainID.TCBCHAIN]: 'max(chain_head_block{chain="1mtx-alpha-2"})',
      [ChainID.EPSILON]: 'min(ledger_block_height{node="node0", chain="bcos-quorum"})',
      [ChainID.ZETA]: 'min(ledger_block_height{node="node0", chain="bcos-sonic"})',
    }[chainId]
  }
  if (type === "tps") {
    return {
      [ChainID.ALPHA]: `(max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain=\"1matrix-stressnet\"}[1m])))) / (avg(eth_con_spec_seconds_per_slot{chain=\"1matrix-stressnet\"}))`,
      [ChainID.BETA]: `avg_over_time(txpool_tps{chain="bcos-testnet-cmc", environment="beta-validator-1"}[30s])`,
      [ChainID.GAMMA]: `avg(cometbft_consensus_num_txs) / (avg(cometbft_state_block_processing_time_count) / 1000)`,
      [ChainID.TCBCHAIN]: `(max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain=\"1mtx-alpha-2\"}[1m])))) / (avg(eth_con_spec_seconds_per_slot{chain=\"1mtx-alpha-2\"}))`,
      [ChainID.EPSILON]: 'sum by(chain) (txpool_tps{chain="bcos-quorum"})',
      [ChainID.ZETA]: 'sum by(chain) (txpool_tps{chain="bcos-sonic"})',
    }[chainId]
  }
  if (type === "blocktime") {
    return {
      [ChainID.ALPHA]: `1 / quantile(0.5, rate(chain_head_block{chain="1matrix-stressnet"}[5m]))`,
      [ChainID.BETA]: `block_time_gauge{chain="bcos-testnet-cmc", environment="beta-validator-1"}`,
      [ChainID.GAMMA]: `rate(cometbft_consensus_block_interval_seconds_sum{instance="archive-node-1"}[5m]) / rate(cometbft_consensus_block_interval_seconds_count{instance="archive-node-1"}[5m])`,
      [ChainID.TCBCHAIN]: '1 / quantile(0.5, rate(chain_head_block{chain="1mtx-alpha-2"}[5m]))',
      [ChainID.EPSILON]: 'avg(block_exec_duration_milliseconds_gauge{chain="bcos-quorum"}) / 1000',
      [ChainID.ZETA]: 'avg(block_exec_duration_milliseconds_gauge{chain="bcos-sonic"}) / 1000',
    }[chainId]
  }
  if (type === "finality") {
    return {
      [ChainID.ALPHA]: `avg(eth_con_spec_seconds_per_slot{chain="1matrix-stressnet"}) * 2`,
      [ChainID.BETA]: `avg(block_time_gauge{chain="bcos-testnet-cmc"})`,
      [ChainID.GAMMA]: `avg by(method) (cometbft_abci_connection_method_timing_seconds_bucket{chain_id="test_9000-1", type="sync", le="+Inf", method="finalize_block"}) / 1000`,
      [ChainID.TCBCHAIN]: `avg(eth_con_spec_seconds_per_slot{chain="1mtx-alpha-2"}) * 2`,
      [ChainID.EPSILON]: `avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="bcos-quorum"}[5m]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain="bcos-quorum"}[5m])) / 1000`,
      [ChainID.ZETA]: `avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="bcos-sonic"}[5m]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain="bcos-sonic"}[5m])) / 1000`,
    }[chainId]
  }
  return ""
}
