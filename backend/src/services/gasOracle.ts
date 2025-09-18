import { aptos } from './aptosClient';

interface GasPriceData {
  deprioritized: number;
  regular: number;
  prioritized: number;
  timestamp: number;
}

class GasOracle {
  private cache: GasPriceData | null = null;
  private readonly CACHE_TTL = 15000; // 15 seconds

  async getCurrentGasPrices(): Promise<GasPriceData> {
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_TTL) {
      return this.cache;
    }

    try {
      const gasEstimate = await aptos.getGasPriceEstimation();
      
      this.cache = {
        deprioritized: gasEstimate.deprioritized_gas_estimate || 100,
        regular: gasEstimate.gas_estimate || 150,
        prioritized: gasEstimate.prioritized_gas_estimate || 200,
        timestamp: Date.now()
      };

      return this.cache;
    } catch (error) {
      console.error('Error fetching gas prices:', error);
      // Return fallback prices if API fails
      return {
        deprioritized: 100,
        regular: 150,
        prioritized: 200,
        timestamp: Date.now()
      };
    }
  }
}

export const gasOracle = new GasOracle();
