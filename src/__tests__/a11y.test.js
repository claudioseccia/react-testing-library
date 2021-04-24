import React from 'react';
import { render } from '@testing-library/react';
//axe: specific testing module for testing accessibility of some container
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
// expect.extend(toHaveNoViolations);

const Form = () => {
	//here form is NOT accessible because the input is not labeled
	return (
		<form>
			<label htmlFor="email">Email</label>
			<input id="email" placeholder="email" />
		</form>
	);
};

test('the form is accessible', async () => {
	const { container } = render(<Form />);
	//console.log(container.innerHTML);
	const results = await axe(container); //async function that returns a promise
	//console.log(results);
	//expect(results.violations).toHaveLength(0)
	expect(results).toHaveNoViolations();
});
