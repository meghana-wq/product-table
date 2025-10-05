export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  deleted?: boolean;
}


function loadProducts(): Product[] {
  const stored = localStorage.getItem("products");
  return stored ? JSON.parse(stored) : [];
}


function saveProducts(products: Product[]) {
  localStorage.setItem("products", JSON.stringify(products));
}

export async function getProducts() {
  return loadProducts();
}

export async function addProduct(data: Omit<Product, "id">) {
  const products = loadProducts();
  const newProduct = { ...data, id: Date.now().toString() };
  products.push(newProduct);
  saveProducts(products);
  console.log(" Product Added:", newProduct);
  console.log(" All Products:", products);
  return newProduct;
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const products = loadProducts().map((p) =>
    p.id === id ? { ...p, ...data } : p
  );
  saveProducts(products);
  console.log("Product Updated:", id);
  console.log(" All Products:", products);
  return products.find((p) => p.id === id);
}

export async function deleteProduct(id: string) {

  const products = loadProducts().map((p) =>
    p.id === id ? { ...p, deleted: true } : p
  );
  saveProducts(products);
  console.log(" Product Soft Deleted:", id);
  console.log("All Products:", products);
  return true;
}

