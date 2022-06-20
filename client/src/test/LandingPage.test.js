import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/index.js'
import { BrowserRouter } from 'react-router-dom'
import Landing from '../components/Landing/index'

describe('LandingPage', () => {

    it('has an image as background', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Landing />
                </BrowserRouter>
            </Provider>
        )
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    })

  });
