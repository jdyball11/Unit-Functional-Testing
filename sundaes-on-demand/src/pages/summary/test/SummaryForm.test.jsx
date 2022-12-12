import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("checbox is unchecked by default", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  expect(checkbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();
});

test("when checkbox is clicked, confirm order button is disabled", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  fireEvent.click(checkbox);

  expect(confirmOrderButton).toBeEnabled();

  fireEvent.click(checkbox);

  expect(confirmOrderButton).toBeDisabled();
});
