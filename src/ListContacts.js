import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onSelectContact: PropTypes.func.isRequired
  }

  render() {
    const { contacts, onDeleteContact, onSelectContact } = this.props

    return (
      <div className='list-contacts'>
        <h3 className='page-title'>Contact List</h3>

        <div className='list-contacts-top'>
            <Link
              to='/create'
              className='add-contact'>
              Add Contact</Link>
        </div>

        <ol className='contact-list'>
          {contacts.map( contact => (
            <li key={contact._id} className='contact-list-item'>
              <div className='contact-details'>
              <label>Name:</label>
                <p>{contact.name}</p>
                <label >Email:</label>
                <p>{contact.email}</p>
                <label >Address:</label>
                <p>{contact.address}</p>
                {/* <label >Phones:</label>
                <p>{contact.phones.join(', ')}</p> */}
              </div>


              <Link
                to={`/edit/${contact._id}`}
                >
                <button className='contact-edit' onClick={() => onSelectContact(contact)}></button>
              </Link>
              
              <button className='contact-remove' onClick={() => onDeleteContact(contact)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts