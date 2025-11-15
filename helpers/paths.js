import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "..");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const seedPath = path.join(__dirname, "seed.json");

export { contactsPath, seedPath };
