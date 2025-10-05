"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./ProductForm";
import { Product, getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/api";

export default function ProductTable() {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addMutation = useMutation({
    mutationFn: (data: Omit<Product, "id">) => addProduct(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteMutation = useMutation({
  mutationFn: deleteProduct,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }) 
});

  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          🛍️ Product Management
        </h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow hover:shadow-lg transition"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product, idx) => (
              <tr
                key={p.id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-purple-50 transition`}
              >
                <td className="p-3 font-medium text-gray-800">{p.name}</td>
                <td className="p-3 text-gray-700">₹{p.price}</td>
                <td className="p-3 text-gray-700">{p.stock}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => { setEditing(p); setShowForm(true); }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(p.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editing ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm
              defaultValues={editing || undefined}
              onSubmit={(data) => {
                if (editing) updateMutation.mutate({ id: editing.id, data });
                else addMutation.mutate(data);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
