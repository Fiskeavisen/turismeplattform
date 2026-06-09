/**
 * Validerer alle kundeprofiler i customers/ mot schemaet.
 * Bruk: npm run validate:customers
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const { customerProfileSchema } = await import("../src/lib/customer-profile.ts");

const customersDir = join(import.meta.dirname, "..", "customers");
const files = readdirSync(customersDir).filter((file) => file.endsWith(".json"));

if (files.length === 0) {
  console.log("Ingen kundeprofiler funnet i customers/.");
  process.exit(0);
}

let failed = false;

for (const file of files) {
  const data = JSON.parse(readFileSync(join(customersDir, file), "utf8"));
  const result = customerProfileSchema.safeParse(data);

  if (result.success) {
    console.log(`OK   ${file} (${result.data.name})`);
  } else {
    failed = true;
    console.error(`FEIL ${file}:`);
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join(".") || "(rot)"}: ${issue.message}`);
    }
  }
}

process.exit(failed ? 1 : 0);
