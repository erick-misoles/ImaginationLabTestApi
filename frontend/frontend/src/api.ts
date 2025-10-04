const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5151/api";

export interface Product {
    id: number;
    name: string;
    price: number;
    createdDate: string;
}

export interface ProductCreateUpdate {
    name: string;
    price: number;
}

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/Products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export async function createProduct(product: ProductCreateUpdate): Promise<Product> {
    const res = await fetch(`${API_URL}/Products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
}

export async function updateProduct(id: number, product: ProductCreateUpdate): Promise<void> {
    const res = await fetch(`${API_URL}/Products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to update product");
}

export async function deleteProduct(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/Products/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
}
