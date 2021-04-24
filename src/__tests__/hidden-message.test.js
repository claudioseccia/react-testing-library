import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { HiddenMessage } from '../hidden-message';

//mocking react-transition-group to run things faster
jest.mock('react-transition-group', () => {
	return {
		CSSTransition: (props) => (props.in ? props.children : null)
	};
});
test('show hidden message when toggle is clicked', () => {
	const myMessage = 'Hello world';
	const { getByText, queryByText } = render(<HiddenMessage>{myMessage}</HiddenMessage>);
	const toggleButton = getByText(/toggle/i);

	expect(queryByText(myMessage)).not.toBeInTheDocument();
	fireEvent.click(toggleButton);
	expect(queryByText(myMessage)).toBeInTheDocument();
	fireEvent.click(toggleButton);
	expect(queryByText(myMessage)).not.toBeInTheDocument();
});
//ch 14
