import { getByRole, render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App'

test('button has correct initial colour, and updates when clicked', () => {
  render(<App />);


  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  // click button
  fireEvent.click(colorButton);

  // expect to have background color of blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue'});

  //expect the button text to be 'Changed to red'
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red')

});

test('initial conditions', () => {
  render(<App />)

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })

  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})

test('To disable or enable button when checkbox is clicked', () => {
  render(<App />)

  // check whether button is disabled when checkbox is clicked
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'})

  fireEvent.click(checkbox)

  expect(colorButton).toBeDisabled()

  // check whether button is enabled when checkbox is unchecked/unclicked

  fireEvent.click(checkbox)

  expect(colorButton).toBeEnabled()

})

test('disable button turns grey, when enabled turns red', () => {
  render(<App />)
  
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  
    fireEvent.click(checkbox)
  
    expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })
  
    fireEvent.click(checkbox)
  
    expect(colorButton).toHaveStyle({ backgroundColor: 'Medium Violet Red'})
  
  })

  test('disabled button turns red, enabled turns blue', () => {
    render(<App />)

    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button'})

    fireEvent.click(colorButton)

    expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue' })

    fireEvent.click(checkbox)

    expect(colorButton).toHaveStyle({ backgroundColor: 'gray'})

    fireEvent.click(checkbox)

    expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue' })
  })

  describe('spaces before camel-case capital letters', () => {
    test('Works for no inner capital letters', () => {
      expect(replaceCamelWithSpaces('Red')).toBe('Red')
    })
    test('Works for one inner capital letter', () => {
      expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
    })
    test('Works for multiple inner capital letters', () => {
      expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
    })
  })
