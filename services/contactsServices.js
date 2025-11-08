import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { contactsPath, seedPath } from "../helpers/paths.js";

async function seedContacts() {
  try {
    await fs.access(contactsPath);
    return;
  } catch (err) {
    const dir = path.dirname(contactsPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.copyFile(seedPath, contactsPath);
  }
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [contact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const existingContact = contacts.find((contact) => contact.email === email);
  if (existingContact) {
    throw new Error(`Contact with email '${email}' already exists`);
  }
  const newContact = { id: nanoid(21), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  seedContacts,
};
