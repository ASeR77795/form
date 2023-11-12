import React from 'react';
import { useField } from 'formik';

const Input = ({ name }) => {
	const all = useField(name);
	return <input type='text' name={name} />;
};

export default Input;
