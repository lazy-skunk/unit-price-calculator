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
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center gap-5 px-3 py-8">
      <header>
        <h1 className="text-3xl font-bold">
          <a href="#">Unit Price Calculator</a>
        </h1>
      </header>

      <main className="w-full max-w-xl space-y-3">
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
          className="cursor-pointer rounded bg-green-100 px-4 py-2 text-sm font-medium text-green-900 motion-safe:transition motion-safe:active:translate-y-px dark:bg-green-900 dark:text-green-100"
          type="button"
          onClick={addProduct}
        >
          Add product
        </button>
      </main>
    </div>
  );
}
