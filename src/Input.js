import React from 'react';

const input = (props) => {

	const inputElement = <input
											 className={"InputElement"}
											 {...props.elementConfig}
											 value={props.value} onChange={props.changed}/>;
	
	
	return(
		<div className="Input">
			<label className="Label">{props.label}</label>
			{inputElement}
		</div>
	);
}

export default input;