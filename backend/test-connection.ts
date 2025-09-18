import dotenv from 'dotenv';
import { testConnection } from './src/services/aptosClient';

// Load environment variables
dotenv.config();

async function main() {
  console.log('🔗 Testing Aptos connection...');
  console.log(`Network: ${process.env.APTOS_NETWORK}`);
  console.log(`RPC URL: ${process.env.APTOS_RPC_URL}`);
  
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('✅ Aptos connection successful!');
    process.exit(0);
  } else {
    console.log('❌ Aptos connection failed!');
    process.exit(1);
  }
}

main().catch(console.error);
