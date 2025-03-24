import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Le composant Form contient un titre "Form", donc nous pouvons vérifier 
    // que ce texte est bien présent dans le DOM
    const formElement = screen.getByText(/Form/i);
    expect(formElement).toBeInTheDocument();
  });

  test('renders Form component', () => {
    render(<App />);
    // Vérifier que des éléments attendus du Form sont présents
    // Par exemple, les champs du formulaire devraient être présents
    const nameField = screen.getByTestId('nom');
    const lastnameField = screen.getByTestId('prenom');
    const emailField = screen.getByTestId('email');
    const dobField = screen.getByTestId('dob');
    const cityField = screen.getByTestId('city');
    const postalCodeField = screen.getByTestId('postalCode');
    
    // Vérifier que tous ces éléments sont dans le document
    expect(nameField).toBeInTheDocument();
    expect(lastnameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(dobField).toBeInTheDocument();
    expect(cityField).toBeInTheDocument();
    expect(postalCodeField).toBeInTheDocument();
  });

  test('renders App with correct CSS class', () => {
    const { container } = render(<App />);
    const appDiv = container.firstChild;
    expect(appDiv).toHaveClass('App');
  });
});