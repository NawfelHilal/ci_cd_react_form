import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form from './Form';

describe('Form DOM Interactions', () => {
  test('should show error messages in DOM when submitting invalid data', async () => {
    const user = userEvent.setup();
    render(<Form />);

    // Remplir avec des données invalides
    const nomInput = screen.getByTestId('nom').querySelector('input');
    await user.type(nomInput, '123');

    // Remplir les autres champs pour activer le bouton submit
    await user.type(screen.getByTestId('prenom').querySelector('input'), 'Jean');
    await user.type(screen.getByTestId('email').querySelector('input'), 'test@test.com');
    await user.type(screen.getByTestId('dob').querySelector('input'), '2000-01-01');
    await user.type(screen.getByTestId('city').querySelector('input'), 'Paris');
    await user.type(screen.getByTestId('postalCode').querySelector('input'), '75001');

    // Soumettre le formulaire
    await user.click(screen.getByText('Submit'));

    // Vérifier que le message d'erreur apparaît dans le DOM
    const errorMessage = await screen.findByText(/Le champ nom ne doit contenir que des lettres/i);
    expect(errorMessage).toBeVisible();
    
    // Vérifier que le champ est marqué comme invalide dans le DOM
    expect(nomInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('should update DOM classes when field becomes valid', async () => {
    const user = userEvent.setup();
    render(<Form />);

    const nomInput = screen.getByTestId('nom').querySelector('input');
    
    // Saisir une valeur invalide
    await user.type(nomInput, '123');
    
    // Remplir les autres champs
    await user.type(screen.getByTestId('prenom').querySelector('input'), 'Jean');
    await user.type(screen.getByTestId('email').querySelector('input'), 'test@test.com');
    await user.type(screen.getByTestId('dob').querySelector('input'), '2000-01-01');
    await user.type(screen.getByTestId('city').querySelector('input'), 'Paris');
    await user.type(screen.getByTestId('postalCode').querySelector('input'), '75001');
    
    // Soumettre pour déclencher la validation
    await user.click(screen.getByText('Submit'));
    
    // Vérifier la classe d'erreur
    expect(nomInput.parentElement).toHaveClass('Mui-error');
    
    // Corriger la valeur
    await user.clear(nomInput);
    await user.type(nomInput, 'Martin');
    
    // Vérifier que la classe d'erreur a été supprimée
    expect(nomInput.parentElement).not.toHaveClass('Mui-error');
  });

  test('should show success message in DOM after valid submission', async () => {
    const user = userEvent.setup();
    render(<Form />);

    // Remplir tous les champs avec des données valides
    await user.type(screen.getByTestId('nom').querySelector('input'), 'Martin');
    await user.type(screen.getByTestId('prenom').querySelector('input'), 'Jean');
    await user.type(screen.getByTestId('email').querySelector('input'), 'test@test.com');
    await user.type(screen.getByTestId('dob').querySelector('input'), '2000-01-01');
    await user.type(screen.getByTestId('city').querySelector('input'), 'Nice');
    await user.type(screen.getByTestId('postalCode').querySelector('input'), '06200');

    // Soumettre le formulaire
    await user.click(screen.getByText('Submit'));

    // Vérifier que le message de succès apparaît dans le DOM
    const successMessage = await screen.findByText('Enregistrement réussi');
    expect(successMessage).toBeVisible();

    // Vérifier que le formulaire est réinitialisé dans le DOM
    expect(screen.getByTestId('nom').querySelector('input')).toHaveValue('');
  });

  test('should toggle submit button state based on form completion', async () => {
    const user = userEvent.setup();
    render(<Form />);

    const submitButton = screen.getByText('Submit');
    
    // Au début, le bouton devrait être désactivé
    expect(submitButton).toBeDisabled();

    // Remplir partiellement le formulaire
    await user.type(screen.getByTestId('nom').querySelector('input'), 'Martin');
    expect(submitButton).toBeDisabled();

    // Remplir complètement le formulaire
    await user.type(screen.getByTestId('prenom').querySelector('input'), 'Jean');
    await user.type(screen.getByTestId('email').querySelector('input'), 'test@test.com');
    await user.type(screen.getByTestId('dob').querySelector('input'), '2000-01-01');
    await user.type(screen.getByTestId('city').querySelector('input'), 'Nice');
    await user.type(screen.getByTestId('postalCode').querySelector('input'), '06200');

    // Le bouton devrait maintenant être activé
    expect(submitButton).not.toBeDisabled();
  });
}); 