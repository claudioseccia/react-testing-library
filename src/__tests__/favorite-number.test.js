import React from 'react';
import user from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { FavoriteNumber } from '../favorite-number';

test('renders a number input with a label "Favorite number"', () => {
	const { getByLabelText, debug } = render(<FavoriteNumber />);
	const input = getByLabelText(/favorite number/i); //test with regEx
	expect(input).toHaveAttribute('type', 'number'); //same as above
	debug(input);
});
test('enter an invalid number shows an error message', () => {
	const { getByLabelText, getByRole, rerender, queryByRole } = render(<FavoriteNumber />);
	const input = getByLabelText(/favorite number/i);
	user.type(input, '10');
	expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i); //get this: <div role="alert">The number is invalid</div>
	rerender(<FavoriteNumber max={10} />); //rerender the same component with different props to test other values
	// expect(getByRole('alert')).toBeNull(); //any getBy... command throws an error if it can't find an element that is supposed to be matching
	expect(queryByRole('alert')).toBeNull(); //queryByRole returns null instead of throwing an error
});
//ch 11
