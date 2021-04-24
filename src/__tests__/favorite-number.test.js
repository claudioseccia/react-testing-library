import React from 'react';
import user from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import { FavoriteNumber } from '../favorite-number';

test('renders a number input with a label "Favorite number"', () => {
	const { getByLabelText, debug } = render(<FavoriteNumber />);
	const input = getByLabelText(/favorite number/i); //test with regEx
	expect(input).toHaveAttribute('type', 'number'); //same as above
	debug(input);
});
// ch7
test('enter an invalid number shows an error message', () => {
	const { getByLabelText, getByRole } = render(<FavoriteNumber />);
	const input = getByLabelText(/favorite number/i);
	// fireEvent.change(input, { target: { value: 10 } });
	//user instead of fireEvent (same result):
	user.type(input, '10');
	expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i); //get this: <div role="alert">The number is invalid</div>
});
