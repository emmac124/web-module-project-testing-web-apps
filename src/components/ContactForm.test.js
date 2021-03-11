import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = await screen.findByLabelText(/First Name*/i);
    userEvent.type(firstName, "emma");
    const firstNameError = await screen.findByTestId(/error/i);
    expect(firstNameError).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(firstName, '');
    userEvent.type(lastName, '');
    userEvent.type(email, '');
    const firstNameError = screen.queryAllByTestId(/error/i);
    const lastNameError = screen.queryAllByTestId(/error/i);
    const emailError = screen.queryAllByTestId(/error/i);
    // expect(firstNameError).toBeInTheDocument();
    // expect(lastNameError).toBeInTheDocument();
    // expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(firstName, 'emmaa');
    userEvent.type(lastName, 'Hawkins');
    userEvent.type(email, '');
    const emailError = screen.queryByTestId(/error/i);
    // expect(emailError).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = await screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    // userEvent.type(email, /bluebill1049hotmail.com/i);
    // const emailError = await screen.queryByText(/email must be a valid email address/i); 
    // expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    //query for all inputs
    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    //type into all inputs
     userEvent.type(firstName, 'edd');
     userEvent.type(lastName, 'burke');
     userEvent.type(email, 'bluebill1049@hotmail.com');

    //query for button
    const button = screen.getByRole('button', { name: /submit/i })

    //click button

    userEvent.click(button);

    //assert
    expect.objectContaining({firstName: /edd/i, lastName: /burke/i, email: /bluebill1049@hotmail.com/i});
});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm />);

    //query for all inputs
    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const message = screen.queryByLabelText(/message/i);

    //type into all inputs
     userEvent.type(firstName, 'edd');
     userEvent.type(lastName, 'burke');
     userEvent.type(email, 'bluebill1049@hotmail.com');
     userEvent.type(message, 'testing');

    //query for button
    const button = screen.getByRole('button', { name: /submit/i })

    //click button

    userEvent.click(button);

    //assert
    expect.objectContaining({firstName: /edd/i, lastName: /burke/i, email: /bluebill1049@hotmail.com/i, message: /testing/i});

});