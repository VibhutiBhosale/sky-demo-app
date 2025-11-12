import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./page";

describe("Signup Page", () => {
  it("renders form fields correctly", () => {
    render(<Signup />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("shows validation errors on submit without input", async () => {
    render(<Signup />);

    const button = screen.getByRole("button", { name: /Create account/i });
    fireEvent.click(button);

    expect(await screen.findByText(/Enter your full name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your password/i)).toBeInTheDocument();
  });
});
