const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const Contact = require("../models/contact");

router.get('/', (req, res) => {
  Contact.find({}, (err, allContacts) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(allContacts);
    }
  });
});

router.post('/', bodyParser.json(), (req, res) => {
  const { name, email, address } = req.body

  if (name && email) {
    const newContact = {name: name, email: email, address: address};
    Contact.create( newContact, (err, contact) => {
      if(err){
        console.log(err);
      }
      else{
        res.send(contact);
      }
    });
  } else {
    res.status(403).send({
      error: 'Name and address is mandatory'
    })
  }
})

router.delete('/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id, err => {
    if(err){
        console.log(err);
    } else {
      res.send(req.params.id);

    }
  });
})

router.put('/:id', (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, (err, contact) => {
      if(err || !contact){
        res.status(403).send({
          error: 'Update was not successful'
        })
      } else {
        Contact.findById(req.params.id, (err, updatedContact) => {
          if(err){
            console.log(err);
          }
          else{
            res.send(updatedContact);
          }
        })
      }
  });
});

module.exports = router;