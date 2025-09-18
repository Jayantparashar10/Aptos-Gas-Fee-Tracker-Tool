-- Gas prices history table for Aptos Gas Fee Tracker
-- This table stores historical gas price data for trend analysis

CREATE TABLE IF NOT EXISTS gas_prices (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deprioritized_price NUMERIC(20, 0) NOT NULL,
    regular_price NUMERIC(20, 0) NOT NULL,
    prioritized_price NUMERIC(20, 0) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient time-range queries
CREATE INDEX IF NOT EXISTS idx_gas_prices_timestamp ON gas_prices(timestamp);

-- Index for efficient ordering by creation time
CREATE INDEX IF NOT EXISTS idx_gas_prices_created_at ON gas_prices(created_at);

-- Comments for documentation
COMMENT ON TABLE gas_prices IS 'Historical gas price data from Aptos network';
COMMENT ON COLUMN gas_prices.deprioritized_price IS 'Low priority gas price in Octas';
COMMENT ON COLUMN gas_prices.regular_price IS 'Standard gas price in Octas';
COMMENT ON COLUMN gas_prices.prioritized_price IS 'High priority gas price in Octas';
COMMENT ON COLUMN gas_prices.timestamp IS 'When the gas price was fetched from network';
COMMENT ON COLUMN gas_prices.created_at IS 'When the record was inserted into database';
