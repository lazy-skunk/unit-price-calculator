import { useRef, useState } from "react";

import ProductInput from "./ProductInput";

export function App() {
  const [products, setProducts] = useState([0]);
  const nextId = useRef(1);

  const addProduct = () => {
    const id = nextId.current++;
    setProducts((current) => [...current, id]);
  };

  return (
    <main className="flex flex-col items-center gap-5 px-3 py-8">
      <h1 className="text-3xl font-bold">Unit Price Calculator</h1>

      <div className="w-full max-w-xl space-y-3">
        {products.map((id, index) => (
          <ProductInput
            key={id}
            index={index}
            canRemove={products.length > 1}
            onRemove={() =>
              setProducts((current) => current.filter((productId) => productId !== id))
            }
          />
        ))}
        <button
          className="rounded-full bg-green-900/50 px-3 py-1 transition hover:bg-green-900 active:scale-95"
          type="button"
          onClick={addProduct}
        >
          Add product
        </button>
      </div>
    </main>
  );
}
