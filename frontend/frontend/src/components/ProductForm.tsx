import React, { useState, useEffect } from "react";

interface ProductFormProps {
  product?: {
    id: number;
    name: string;
    price: number;
    createdDate?: string; // optional, if your Product includes this
  } | null; // allow null here
  onSubmit: (data: { name: string; price: number }) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(product?.name || "");
    setPrice(product?.price.toString() || "");
    setError(null);
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError("Please enter a valid positive price");
      return;
    }

    setError(null);
    onSubmit({ name: name.trim(), price: priceNumber });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {error && (
        <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>
      )}
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <button type="submit">{product ? "Update" : "Create"}</button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
