import dotenv from 'dotenv';
import { gasOracle } from './src/services/gasOracle';

// Load environment variables
dotenv.config();

async function main() {
  console.log('💰 Testing Gas Oracle...');
  
  try {
    console.log('\n📊 Fetching current gas prices...');
    const gasData = await gasOracle.getCurrentGasPrices();
    
    console.log('✅ Gas prices fetched successfully!');
    console.log(`🐢 Deprioritized: ${gasData.deprioritized} Octas`);
    console.log(`⚡ Regular: ${gasData.regular} Octas`);
    console.log(`🚀 Prioritized: ${gasData.prioritized} Octas`);
    console.log(`🕐 Timestamp: ${new Date(gasData.timestamp).toLocaleString()}`);
    
    console.log('\n🔄 Testing cache (should return same data)...');
    const cachedData = await gasOracle.getCurrentGasPrices();
    
    if (cachedData.timestamp === gasData.timestamp) {
      console.log('✅ Cache working correctly!');
    } else {
      console.log('❌ Cache not working as expected');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Gas Oracle test failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
