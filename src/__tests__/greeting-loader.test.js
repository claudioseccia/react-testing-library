import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { loadGreeting as mockLoadGreeting } from '../api';
import { GreetingLoader } from '../greeting-loader-02-dependency-injection';

//solution for any environment that do support jest.mock (ex.storybook)

test('loads greetings on click', async () => {
	const mockLoadGreeting = jest.fn();
	const testGreeting = 'TEST_GREETING';
	mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting } }); //mocked version of loadGreeting from '../api.js'
	const { getByLabelText, getByText } = render(<GreetingLoader loadGreeting={mockLoadGreeting} />);
	const nameInput = getByLabelText(/name/i); //get element by its id: <input id="name" />
	const loadButton = getByText(/load/i); //get button by its text content
	nameInput.value = 'Mary'; //fill the name input with some value
	fireEvent.click(loadButton); //fire the event on click on the button
	expect(mockLoadGreeting).toHaveBeenLastCalledWith('Mary');
	expect(mockLoadGreeting).toHaveBeenCalledTimes(1); //make sure it is called once!!!
	await waitFor(() => expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting));
});
