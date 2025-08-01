type Product = {
  base_asset_symbol: string
  base_increment: string
  change_24h: string
  display_base_asset_symbol: string
  display_name: string
  funding_interval: string
  high_24h: string
  index: number
  index_price: string
  is_active: boolean
  last_cumulative_funding: string
  last_price: string
  low_24h: string
  mark_price: string
  max_position_size: string
  min_order_size: string
  next_funding_rate: string
  next_funding_time: string
  open_interest: string
  perpetual_product_config: {
    initial_margin: string
    maintenance_margin: string
    max_leverage: string
  }
  post_only: boolean
  predicted_funding_rate: string
  product_id: string
  quote_asset_symbol: string
  quote_increment: string
  quote_volume_24h: string
  underlying: string
  visible: boolean
}
