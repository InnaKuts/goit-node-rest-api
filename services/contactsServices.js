import { nanoid } from "nanoid";
import Contact from "../models/Contact.js";

async function listContacts() {
  return await Contact.findAll();
}

async function getContactById(contactId) {
  return await Contact.findByPk(contactId);
}

async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(data) {
  const newContact = await Contact.create({
    id: nanoid(21),
    ...data,
  });
  return newContact;
}

async function updateContact(contactId, updateData) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(updateData);
  return contact;
}

async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(body);
  return contact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
