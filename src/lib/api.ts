export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  deleted?: boolean; 
}


function loadProducts(): Product[] {
  const stored = localStorage.getItem("products");
  const products: Product[] = stored ? JSON.parse(stored) : [];
  console.log("Loaded products from localStorage:", products);
  return products;
}


function saveProducts(products: Product[]) {
  localStorage.setItem("products", JSON.stringify(products));
  console.log("Saved products to localStorage:", products);
}


export async function getProducts(): Promise<Product[]> {
  const products = loadProducts().filter(p => !p.deleted);
  console.log("Products fetched for table (non-deleted):", products);
  return products;
}


export async function addProduct(data: Omit<Product, "id">): Promise<Product> {
  const products = loadProducts();
  const newProduct: Product = { ...data, id: Date.now().toString() };
  products.push(newProduct);
  saveProducts(products);
  console.log("Product Added:", newProduct);
  return newProduct;
}


export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
  const products = loadProducts().map(p =>
    p.id === id ? { ...p, ...data } : p
  );
  saveProducts(products);
  console.log("Product Updated (id: " + id + "):", data);
  return products.find(p => p.id === id);
}


export async function deleteProduct(id: string): Promise<boolean> {
  const products = loadProducts().map(p =>
    p.id === id ? { ...p, deleted: true } : p
  );
  saveProducts(products); 
  console.log("Product Soft Deleted (id: " + id + "):", products.find(p => p.id === id));
  return true;
}
