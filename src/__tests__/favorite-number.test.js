import React from 'react';
import { render } from '@testing-library/react';
import { FavoriteNumber } from '../favorite-number';

test('renders a number input with a label "Favorite number"', () => {
	const { getByLabelText, debug } = render(<FavoriteNumber />);
	const input = getByLabelText(/favorite number/i); //test with regEx
	expect(input).toHaveAttribute('type', 'number'); //same as above
	debug(input);
});
// ch7
