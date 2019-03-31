const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/directory', {
  useNewUrlParser: true
});

// Create a scheme for contacts in the directory.
const contactSchema = new mongoose.Schema({
  aptNumber: String,
  lastName: String,
  firstName: String,
  email: String,
});

// Create a model for contacts in the directory.
const Contact = mongoose.model('Contact', contactSchema);

// Create a new contact in the directory.
app.post('/api/contacts', async (req, res) => {
  const contact = new Contact({
    aptNumber: req.body.aptNumber,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
  });
  try {
    await contact.save();
    res.send(contact);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/contacts', async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await Contact.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
