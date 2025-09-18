import dotenv from 'dotenv';
import { simulationService } from './src/services/simulationService';

// Load environment variables
dotenv.config();

async function main() {
  console.log('🧪 Testing Transaction Simulation Service...');
  
  try {
    // Test APT transfer simulation
    console.log('\n📊 Creating APT transfer transaction...');
    
    // Using well-known Aptos addresses for testing
    const sender = "0x1"; // Aptos Framework address
    const recipient = "0x2"; // Another test address 
    const amount = BigInt(100000000); // 1 APT in Octas
    
    console.log(`Sender: ${sender}`);
    console.log(`Recipient: ${recipient}`);
    console.log(`Amount: ${amount} Octas (1 APT)`);
    
    // Create transaction
    const transaction = await simulationService.createTransferTransaction(
      sender,
      recipient,
      amount
    );
    
    console.log('✅ Transaction created successfully!');
    
    // Simulate transaction
    console.log('\n⚡ Simulating transaction...');
    const result = await simulationService.simulateTransaction(sender, transaction);
    
    if (result.success) {
      console.log('✅ Simulation successful!');
      console.log(`💨 Gas Used: ${result.gasUsed?.toLocaleString()} units`);
      console.log(`💰 Total Fee: ${result.totalFeeApt?.toFixed(6)} APT (${result.totalFeeOctas} Octas)`);
      
      if (result.feeStatement) {
        console.log('\n📋 Fee Breakdown:');
        console.log(`  🔧 Execution Gas: ${result.feeStatement.executionGas} units`);
        console.log(`  📁 I/O Gas: ${result.feeStatement.ioGas} units`);
        console.log(`  💾 Storage Fee: ${result.feeStatement.storageFee} Octas`);
        console.log(`  💸 Storage Refund: ${result.feeStatement.storageRefund} Octas`);
      }
    } else {
      console.log('❌ Simulation failed:', result.error);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Simulation test failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
