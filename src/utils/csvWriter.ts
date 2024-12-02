import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeToCsv = async (data: any[], filename: string) => {
  const csvWriter = createObjectCsvWriter({
    path: path.join(__dirname, config.outputDir, `${filename}.csv`),
    header: [
      { id: "order_id", title: "Order ID" },
      { id: "product_description", title: "Product Description" },
      { id: "sku", title: "SKU" },
      { id: "quantity", title: "Quantity" },
    ],
  });

  await csvWriter.writeRecords(data);
};
