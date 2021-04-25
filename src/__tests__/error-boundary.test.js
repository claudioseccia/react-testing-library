import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { reportError as mockReportError } from '../api';
import { ErrorBoundary } from '../error-boundary';

//mock the effective api call NOT to make an api call
jest.mock('../api');

afterEach(() => {
	jest.clearAllMocks();
});

//create a test component
function Bomb({ shouldThrow }) {
	if (shouldThrow) {
		throw new Error('💣');
	} else {
		return null;
	}
}

test('calls reportError and renders that there was a problem', () => {
	mockReportError.mockResolvedValueOnce({ success: true }); //we make sure that our version of the reportError function resolves to true
	//we render the ErrorBoundary function with inside the <Bomb> mocked test component
	const { rerender } = render(
		<ErrorBoundary>
			<Bomb />
		</ErrorBoundary>
	);
	//we rerender it with the shouldThrow set to true
	rerender(
		<ErrorBoundary>
			<Bomb shouldThrow={true} />
		</ErrorBoundary>
	);
	//refer to componentDidCatch inside error-boundary.js
	const error = expect.any(Error);
	const info = { componentStack: expect.stringContaining('Bomb') };
	expect(mockReportError).toHaveBeenCalledWith(error, info);
	expect(mockReportError).toHaveBeenCalledTimes(1);
});
