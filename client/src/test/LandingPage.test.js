import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import Landing from '../components/Landing/index'

describe('Landing Page component test', () => {

    test('renders content', () => {

        const component = render(<BrowserRouter><Landing /></BrowserRouter>);   
        expect(component.container).toHaveTextContent('WELCOME');
    });

    test(`WELCOME button should de working`, () => {
        const component = render(<BrowserRouter><Landing /></BrowserRouter>);   
        expect(component.getByRole('button')).not.toBeDisabled()
    });   



});
