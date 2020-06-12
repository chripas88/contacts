import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

class EditContact extends Component {
	state={
		contactForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
      },
      email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			address: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Address'
				},
				value: '',
				validation: {},
				valid: true
			}
		},
		formIsValid: false
  }

  handleSubmit = (e) => {
    event.preventDefault();
		const formData = {};
		for(let formElementIdentifier in this.state.contactForm){
			formData[formElementIdentifier] = this.state.contactForm[formElementIdentifier].value;
    }
    
    if(this.props.onEditContact && this.props.contact) {
      this.props.contact.name = formData.name
      this.props.contact.email = formData.email
      this.props.contact.address = formData.address
      this.props.onEditContact(this.props.contact)
    }
  }

  checkValidity(value, rules) {
		let isValid = true;
		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}
		return isValid;
  }
  
  inputChangedHandler = (event, inputIdentifier) => {
		const updatedContactForm = {
			...this.state.contactForm
		};
		const updatedFormElement = {
			...updatedContactForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedContactForm[inputIdentifier] = updatedFormElement;
		let formIsValid = true;
		for(let inputIdentifier in  updatedContactForm){
			formIsValid = updatedContactForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({contactForm: updatedContactForm, formIsValid: formIsValid});
	}

  render() {
    const formElementsArray = [];
		
		for(let key in this.state.contactForm){
			formElementsArray.push({
				id: key,
				config: this.state.contactForm[key]
			});
    }

    let form = (
			<form onSubmit={this.handleSubmit} className='create-contact-form'>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						changed={(event) => this.inputChangedHandler(event, formElement.id)} />
				))}
				<button disabled={!this.state.formIsValid}>Add Contact</button>
			</form>
		);
    
    return (
      <div>
        <Link to='/' className='close-create-contact'>Close</Link>
        {form}
      </div>
    )
  }
}

export default EditContact