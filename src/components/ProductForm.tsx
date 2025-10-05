"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/schemas/product";

interface ProductFormProps {
  defaultValues?: ProductFormValues;
  onSubmit: SubmitHandler<ProductFormValues>;
  onCancel: () => void;
}

export default function ProductForm({ defaultValues, onSubmit, onCancel }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || { name: "", price: 0, stock: 0 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium text-gray-700 mb-1">Name</label>
        <input {...register("name")} className="w-full border p-2 rounded" placeholder="Enter product name" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Price</label>
        <input type="number" {...register("price", { valueAsNumber: true })} className="w-full border p-2 rounded" placeholder="Enter price" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Stock</label>
        <input type="number" {...register("stock", { valueAsNumber: true })} className="w-full border p-2 rounded" placeholder="Enter stock" />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  );
}
