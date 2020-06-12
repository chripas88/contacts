import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import EditContact from './EditContact';
import { Route } from 'react-router-dom';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
    selectedContact: null
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    ContactsAPI.remove(contact).then(contact => {
      const initialContacts = {...this.state.contacts};
      const updatedContacts = Object.values(initialContacts).filter((c) => c._id !== contact._id)
      this.setState({ contacts: updatedContacts })
    })
  }

  selectContact = (contact) => {
    this.setState({selectedContact: contact});
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact => {
      if(contact.error){
        console.log(contact.error);
      }
      else{
        this.setState(state => ({
          contacts: state.contacts.concat([ contact ])
        }))
      }
    })
  }

  editContact = (contact) => {
    ContactsAPI.edit(contact).then(contact => {
      if(contact.error){
        console.log(contact.error);
      }
      else{
        const initialContacts = {...this.state.contacts};
        const updatedContacts = Object.values(initialContacts).filter((c) => c._id !== contact._id).concat([ contact ])
        this.setState({ contacts: updatedContacts })
      }
    })
  }

  render() {
    console.log("render", this.state)
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onSelectContact={this.selectContact}
            onDeleteContact={this.removeContact}
            />
        )} />
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
        <Route path='/edit' render={({ history }) => (
          <EditContact
            contact={this.state.selectedContact}
            onEditContact={(contact) => {
              this.editContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App;
