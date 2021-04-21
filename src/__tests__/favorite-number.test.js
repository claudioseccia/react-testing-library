// import { getQueriesForElement } from '@testing-library/dom'; // no more necessary after implementing the  render function of react-testing-library
// import ReactDOM from 'react-dom'; // no more necessary after implementing the  render function of react-testing-library
import React from 'react';
import { render } from '@testing-library/react';
import { FavoriteNumber } from '../favorite-number';

/* 
// this does the same that the render function of react-testing-library does
function render(ui) {
	const container = document.createElement('div');
	ReactDOM.render(ui, container);
	// const { getByLabelText } = getQueriesForElement(div);
	const queries = getQueriesForElement(container);
	return { container, ...queries };
} */

test('renders a number input with a label "Favorite number"', () => {
	const { getByLabelText } = render(<FavoriteNumber />);
	const input = getByLabelText(/favorite number/i); //test with regEx
	expect(input).toHaveAttribute('type', 'number'); //same as above
});
