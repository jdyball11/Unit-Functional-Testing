import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("checbox is unchecked by default", () => {
  const user = userEvent.setup();

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

test("when checkbox is clicked, confirm order button is disabled", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  await user.click(checkbox);

  expect(confirmOrderButton).toBeEnabled();

  await user.click(checkbox);

  expect(confirmOrderButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopOver).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popOver).toBeInTheDocument();

  await user.unhover(termsAndConditions);
  expect(popOver).not.toBeInTheDocument();
});
