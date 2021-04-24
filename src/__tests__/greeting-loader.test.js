import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { loadGreeting as mockLoadGreeting } from '../api';
import { GreetingLoader } from '../greeting-loader-01-mocking';

//to test we mock the api file called from greeting-loader-01-mocking.js
jest.mock('../api'); //mock the server request with expected response not to make actual server requests
//we'll take all the functions from api and mock them

test('loads greetings on click', async () => {
	const testGreeting = 'TEST_GREETING';
	mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting } }); //mocked version of loadGreeting from '../api.js'
	const { getByLabelText, getByText } = render(<GreetingLoader />);
	const nameInput = getByLabelText(/name/i); //get element by its id: <input id="name" />
	const loadButton = getByText(/load/i); //get button by its text content
	nameInput.value = 'Mary'; //fill the name input with some value
	fireEvent.click(loadButton); //fire the event on click on the button
	expect(mockLoadGreeting).toHaveBeenLastCalledWith('Mary');
	expect(mockLoadGreeting).toHaveBeenCalledTimes(1); //make sure it is called once!!!
	await waitFor(() => expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting));
});
//todo ch 13
