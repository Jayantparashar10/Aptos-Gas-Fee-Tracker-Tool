import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const aptosConfig = new AptosConfig({
  network: process.env.APTOS_NETWORK as Network,
  fullnode: process.env.APTOS_RPC_URL,
});

export const aptos = new Aptos(aptosConfig);

// Test connection function
export async function testConnection(): Promise<boolean> {
  try {
    const chainId = await aptos.getChainId();
    console.log(`Connected to Aptos network. Chain ID: ${chainId}`);
    return true;
  } catch (error) {
    console.error("Failed to connect to Aptos network:", error);
    return false;
  }
}
