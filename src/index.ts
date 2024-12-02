import { getOpenOrdersGraphQL } from "./services/graphqlClient.js";
import { writeToCsv } from "./utils/csvWriter.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// create output dir if not exists
const outputDir = path.join(__dirname, "../output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function main() {
  try {
    console.log("Shopify API Client (GraphQL API)");
    console.log("Getting open orders...");
    const orders = await getOpenOrdersGraphQL();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fname = `orders-${timestamp}`;
    await writeToCsv(orders, fname);
    console.log(`Success! Exported to ${fname}`);
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
}

main();
