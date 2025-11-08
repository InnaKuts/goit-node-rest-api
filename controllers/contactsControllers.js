import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    return next(HttpError(404));
  }
  res.status(200).json(contact);
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (!contact) {
    return next(HttpError(404));
  }
  res.status(200).json(contact);
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await contactsService.addContact(name, email, phone);
  if (!contact) {
    return next(HttpError(409, `Contact with email '${email}' already exists`));
  }
  res.status(201).json(contact);
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await contactsService.updateContact(id, name, email, phone);
  if (!contact) {
    return next(HttpError(404));
  }
  res.status(200).json(contact);
};
