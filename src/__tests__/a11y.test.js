import React from 'react';
import { render } from '@testing-library/react';
//axe: specific testing module for testing accessibility of some container
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const Form = () => {
	//here form is NOT accessible because the input is not labeled
	return (
		<form>
			<input placeholder="email" />
		</form>
	);
};

test('the form is accessible', async () => {
	const { container } = render(<Form />);
	//console.log(container.innerHTML);
	const results = await axe(container);
	//console.log(results);
	//expect(results.violations).toHaveLength(0)
	expect(results).toHaveNoViolations();
});
