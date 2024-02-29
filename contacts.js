const path = require("node:path");
const fs = require("fs");
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, function (err, data) {
    if (err) {
      console.log("error:", err.message);
    } else {
      console.log(data.toString());
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", function (err, data) {
    if (err) {
      console.log("error:", err);
      return;
    }
    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      console.log(contact);
    } else {
      console.log("contact not found");
    }
  });
}
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", function (err, data) {
    if (err) {
      console.log("error:", err);
      return;
    }
    const contacts = JSON.parse(data);

    const indexToRemove = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (indexToRemove !== -1) {
      contacts.splice(indexToRemove, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
        if (err) {
          console.log("error:", err);
          return;
        }
        console.log("Contact removed successfully");
      });
    } else {
      console.log("Contact not found");
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log("error:", err);
      return;
    }

    const contacts = JSON.parse(data);

    const newContact = {
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      console.log(`Added contact: ${name} ${email} ${phone}`);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
