import { render, screen, fireEvent } from "@testing-library/react";
import InputBox from "@/components/atoms/InputBox";

describe("InputBox Component", () => {
  test("renders with placeholder text", () => {
    render(<InputBox placeholder="Enter your name" id={""} label={""} />);
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  test("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(<InputBox placeholder="email" onChange={handleChange} id={""} label={""} />);

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "abc@test.com" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
