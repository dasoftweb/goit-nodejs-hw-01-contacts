const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Returns all contacts list
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts)
  } catch (error) {
    error.message = "Cannot read contacts db file :(";
    throw error;
  }
};

// Returns contact by Id
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);
    if(!contact) {
      return console.error("No contact with such Id :(");
    }
    console.table(contact);
  } catch (error) {
    throw error;
  }
};

// Removes contact by Id
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = await contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return console.error("Contact with such id cannot be removed");
    }
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    const str = JSON.stringify(filteredContacts);
    await fs.writeFile(contactsPath, str);
    console.log('Successfully deleted');
  } catch (error) {
    throw error;
  }
};

// Adds new contact
const addContact = async (name, email, phone) => {
  const id = v4();
  const newContact = { id, name, email, phone };

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = [...contacts, newContact];
    const str = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, str);
    console.table(newContacts)
    console.log('Successfully added');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
