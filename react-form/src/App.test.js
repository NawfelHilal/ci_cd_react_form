import { render, screen } from "@testing-library/react";
import Form from "./components/Form";

test("renders form", () => {
  render(<Form />);
  const formElement = screen.getByText(/Form/i);
  expect(formElement).toBeInTheDocument();
});
