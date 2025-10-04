import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  Product,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [snackbarMsg, setSnackbarMsg] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (productData: { name: string; price: number }) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      setSnackbarMsg("Product created!");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleUpdate = async (
    id: number,
    productData: { name: string; price: number }
  ) => {
    try {
      await updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
      );
      setSelectedProduct(null);
      setSnackbarMsg("Product updated!");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSnackbarMsg("Product deleted!");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductList
          products={products}
          onEdit={setSelectedProduct}
          onDelete={handleDelete}
        />
      )}

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </Typography>
        <ProductForm
          key={selectedProduct ? selectedProduct.id : "new"}
          product={selectedProduct}
          onCancel={() => setSelectedProduct(null)}
          onSubmit={
            selectedProduct
              ? (data) => handleUpdate(selectedProduct.id, data)
              : handleCreate
          }
        />
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!snackbarMsg}
        autoHideDuration={3000}
        onClose={() => setSnackbarMsg(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarMsg(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
