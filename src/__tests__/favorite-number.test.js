import { getQueriesForElement } from '@testing-library/dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { FavoriteNumber } from '../favorite-number';

// expect.extend({ toHaveAttribute, toHaveTextContent });
// expect.extend({ jestDOM }); //same as above

test('renders a number input with a label "Favorite number"', () => {
	const div = document.createElement('div');
	ReactDOM.render(<FavoriteNumber />, div);
	const { getByLabelText } = getQueriesForElement(div);
	// const input = queries.getByLabelText(div, 'Favorite Number');
	const input = getByLabelText(/favorite number/i); //test with regEx
	// expect(div.querySelector('input')).toHaveAttribute('type', 'number');
	expect(input).toHaveAttribute('type', 'number'); //same as above
	// expect(div.querySelector('label')).toHaveTextContent('Favorite Number'); //no more necessary
});

//todo ch5
