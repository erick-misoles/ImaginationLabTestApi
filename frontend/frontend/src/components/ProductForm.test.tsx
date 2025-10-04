import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";

describe("ProductForm", () => {
  it("renders inputs with correct placeholders", () => {
    render(<ProductForm onSubmit={jest.fn()} />);

    expect(screen.getByPlaceholderText(/product name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
  });

  it("shows error when submitting empty fields", () => {
    render(<ProductForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByText(/create/i));
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  it("shows error for invalid price input", () => {
    render(<ProductForm onSubmit={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText(/price/i), {
      target: { value: "-10" },
    });

    fireEvent.click(screen.getByText(/create/i));
    expect(
      screen.getByText(/please enter a valid positive price/i)
    ).toBeInTheDocument();
  });

  it("calls onSubmit with valid data", () => {
    const onSubmit = jest.fn();
    render(<ProductForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText(/price/i), {
      target: { value: "99.99" },
    });

    fireEvent.click(screen.getByText(/create/i));
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Test Product",
      price: 99.99,
    });
  });

  it("calls onCancel when cancel button clicked", () => {
    const onCancel = jest.fn();
    render(<ProductForm onSubmit={jest.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByText(/cancel/i));
    expect(onCancel).toHaveBeenCalled();
  });
});
