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
      const host: Host = chainId === ChainID.COSMOS ? Host.COSMOS : Host.MATRIX
      const initQuery = {
        datasource: {
          type: "prometheus",
          uid: host === Host.MATRIX ? "PBFA97CFB590B2093" : "deu611bogj1tsb",
        },
        intervalMs: 15 * 1000,
        utcOffsetSec: 25200,
      }
      return apiClient.post("/api/query", {
        ...initTime,
        host,
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
      [ChainID.TESTNET]: `count(txpool_local{chain="${chainId}"})`,
      [ChainID.BCOS]: `count(ledger_block_height{chain="${chainId}"})`,
      [ChainID.DEVNET]: `min(validator_count{chain="${chainId}", job="beacon", state="Active"})`,
      [ChainID.COSMOS]: 'cometbft_consensus_validators{chain_id="test_9000-1", instance="validator-1", job="cosmos"}',
      [ChainID.QUORUM]: 'count(ledger_block_height{chain="bcos-quorum"})',
      [ChainID.SONIC]: 'count(ledger_block_height{chain="bcos-sonic"})',
    }[chainId]
  }
  if (type === "blocknumber") {
    return {
      [ChainID.TESTNET]: `(min(chain_head_header{chain="${chainId}"}))`,
      [ChainID.BCOS]: `(min(ledger_block_height{node="node0", chain="${chainId}"}))`,
      [ChainID.DEVNET]: `(min(chain_head_header{chain="${chainId}"}))`,
      [ChainID.COSMOS]: 'cometbft_consensus_height{chain_id="test_9000-1", instance="validator-1", job="cosmos"}',
      [ChainID.QUORUM]: 'min(ledger_block_height{node="node0", chain="bcos-quorum"})',
      [ChainID.SONIC]: 'min(ledger_block_height{node="node0", chain="bcos-sonic"})',
    }[chainId]
  }
  if (type === "tps") {
    return {
      [ChainID.TESTNET]: `(max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain="${chainId}"}[1m])))) / (avg(eth_con_spec_seconds_per_slot{chain="${chainId}"}))`,
      [ChainID.BCOS]: `(sum by(chain) (avg_over_time(txpool_tps{chain=\"${chainId}\"}[1h])))`,
      [ChainID.DEVNET]: `(max by(chain) (sum by(instance) (increase(eth_exe_block_head_transactions_in_block{chain="${chainId}"}[1m])))) / (avg(eth_con_spec_seconds_per_slot{chain="${chainId}"}))`,
      [ChainID.COSMOS]: "avg(cometbft_consensus_num_txs) / (avg(cometbft_state_block_processing_time_count) / 1000)",
      [ChainID.QUORUM]: 'sum by(chain) (txpool_tps{chain="bcos-quorum"})',
      [ChainID.SONIC]: 'sum by(chain) (txpool_tps{chain="bcos-sonic"})',
    }[chainId]
  }
  if (type === "blocktime") {
    return {
      [ChainID.TESTNET]: `(avg(eth_con_spec_seconds_per_slot{chain="${chainId}"}))`,
      [ChainID.BCOS]: `avg(block_exec_duration_milliseconds_gauge{chain="${chainId}"}) / 1000`,
      [ChainID.DEVNET]: `(avg(1 / rate(beacon_head_slot{chain="${chainId}", job="beacon"}[1h])))`,
      [ChainID.COSMOS]: 'avg(cometbft_state_block_processing_time_count{chain_id="test_9000-1"}) / 1000',
      [ChainID.QUORUM]: 'avg(block_exec_duration_milliseconds_gauge{chain="bcos-quorum"}) / 1000',
      [ChainID.SONIC]: 'avg(block_exec_duration_milliseconds_gauge{chain="bcos-sonic"}) / 1000',
    }[chainId]
  }
  if (type === "finality") {
    return {
      [ChainID.TESTNET]: `(2 * avg(eth_con_spec_seconds_per_slot{chain="${chainId}"}))`,
      [ChainID.BCOS]: `avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="${chainId}"}[5m]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain="${chainId}"}[5m])) / 1000`,
      [ChainID.DEVNET]: `(2 * avg(1 / rate(beacon_head_slot{chain="${chainId}", job="beacon"}[1h])))`,
      [ChainID.COSMOS]: `avg by(method) (cometbft_abci_connection_method_timing_seconds_bucket{chain_id="test_9000-1", type="sync", le="+Inf", method="finalize_block"}) / 1000`,
      [ChainID.QUORUM]:
        'avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="bcos-quorum"}[5m]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain="bcos-quorum"}[5m])) / 1000',
      [ChainID.SONIC]:
        'avg(avg_over_time(block_exec_duration_milliseconds_gauge{chain="bcos-sonic"}[5m]) + avg_over_time(block_commit_duration_milliseconds_gauge{chain="bcos-sonic"}[5m])) / 1000',
    }[chainId]
  }
  return ""
}
