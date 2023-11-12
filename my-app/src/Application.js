import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import Input from './Input';

const useContacts = () => {
	const initialContacts = localStorage.datacontacts
		? JSON.parse(localStorage.datacontacts)
		: [];
	const [contacts, setContacts] = useState(initialContacts);
	useEffect(() => {
		localStorage.datacontacts = JSON.stringify(contacts);
	}, [contacts]);
	const addContact = (name, number) => {
		setContacts(prevState => {
			return [
				...prevState,
				{
					id: crypto.randomUUID(),
					name,
					number,
				},
			];
		});
	};
	return {
		contacts,
		addContact,
	};
};

const Application = () => {
	const [nameValue, setNameValue] = useState('');
	const [numberValue, setNumberValue] = useState('');
	const { contacts, addContact } = useContacts();

	return (
		<div>
			<form
				action=''
				onSubmit={e => {
					e.preventDefault();
					addContact(nameValue, numberValue);
					setNameValue('');
					setNumberValue('');
				}}
			>
				<input
					type='text'
					name='name'
					value={nameValue}
					onChange={e => setNameValue(e.target.value)}
				/>
				<input
					type='number'
					name='number'
					value={numberValue}
					onChange={e => setNumberValue(e.target.value)}
				/>
				<button type='submit'>Create</button>
			</form>
			<Formik initialValues={{ name: '', number: '' }} onSubmit={() => {}}>
				<Form>
					<Input name='name' />
					<Input name='number' />
					<button type='submit'>Send</button>
				</Form>
			</Formik>

			{contacts.map(({ id, name, number }) => {
				return (
					<li key={id}>
						{name} - {number}
					</li>
				);
			})}
		</div>
	);
};

export default Application;
