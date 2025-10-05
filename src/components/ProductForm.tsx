"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/schemas/product";

export default function ProductForm({
  defaultValues,
  onSubmit,
  onCancel,
}: {
  defaultValues?: ProductFormValues;
  onSubmit: SubmitHandler<ProductFormValues>;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || { name: "", price: 0, stock: 0 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium text-gray-700 mb-1">Name</label>
        <input
          {...register("name")}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-2.5 shadow-sm outline-none transition"
          placeholder="Enter product name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Price (₹)</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-2.5 shadow-sm outline-none transition"
          placeholder="Enter price"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Stock</label>
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-2.5 shadow-sm outline-none transition"
          placeholder="Enter stock quantity"
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
