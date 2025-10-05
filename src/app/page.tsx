"use client";
import ProductTable from "@/components/ProductTable";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <ProductTable />
      </div>
    </main>
  );
}
