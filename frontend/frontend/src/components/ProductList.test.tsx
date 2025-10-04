import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "./ProductList";
import { Product } from "../api";

const products: Product[] = [
  { id: 1, name: "Product 1", price: 10, createdDate: "2025-10-04" },
  { id: 2, name: "Product 2", price: 20, createdDate: "2025-10-04" },
];

describe("ProductList", () => {
  it("renders products", () => {
    render(
      <ProductList
        products={products}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        loading={false}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    render(
      <ProductList
        products={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        loading={true}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("calls onEdit when edit button clicked", () => {
    const onEdit = jest.fn();
    render(
      <ProductList
        products={products}
        onEdit={onEdit}
        onDelete={jest.fn()}
        loading={false}
      />
    );

    const editButtons = screen.getAllByLabelText("edit");
    fireEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(products[0]);
  });
});
