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
  const contact = await contactsService.addContact(req.body);
  if (!contact) {
    return next(HttpError(409, `Contact already exists`));
  }
  res.status(201).json(contact);
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.updateContact(id, req.body);
  if (!contact) {
    return next(HttpError(404));
  }
  res.status(200).json(contact);
};

export const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsService.updateStatusContact(
    contactId,
    req.body
  );
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json(contact);
};
