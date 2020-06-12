import React from 'react';

const input = (props) => {
	let inputElement = null;
	const inputClasses =["InputElement"];
	

	
	switch(props.elementType){
		case ('input'):
			inputElement = <input
											 className={inputClasses.join(' ')}
											 {...props.elementConfig}
											 value={props.value} onChange={props.changed}/>;
			break;
		default:
			inputElement = <input
											 className={inputClasses.join(' ')}
											 {...props.elementConfig}
											 value={props.value} onChange={props.changed}/>;
	}	
	
	return(
		<div className="Input">
			<label className="Label">{props.label}</label>
			{inputElement}
		</div>
	);
}

export default input;