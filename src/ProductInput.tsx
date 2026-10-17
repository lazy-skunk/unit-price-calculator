import { useState } from "react";

import { calculateUnitPrice } from "./unitPrice";

type Props = {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
};

export default function ProductInput({ index, canRemove, onRemove }: Props) {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const result = calculateUnitPrice(price, quantity);
  const invalid = (price !== "" && Number(price) < 0) || (quantity !== "" && Number(quantity) <= 0);

  return (
    <section className="bg-foreground/3 space-y-3 rounded p-4">
      <div className="flex items-end gap-2">
        <label className="min-w-0 flex-1">
          <span className="mb-1 block text-sm">Product name (optional)</span>
          <input
            className="bg-foreground/3 w-full min-w-0 rounded p-2"
            type="text"
            placeholder={`Product ${index + 1}`}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button
          className="disabled:bg-foreground/3 disabled:text-foreground/50 dark:disabled:bg-foreground/3 dark:disabled:text-foreground/50 cursor-pointer rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-900 disabled:cursor-not-allowed disabled:active:translate-y-0 motion-safe:transition motion-safe:active:translate-y-px dark:bg-red-900 dark:text-red-100"
          type="button"
          disabled={!canRemove}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <label className="min-w-0">
          <span className="mb-1 block text-sm">Price</span>
          <input
            className="bg-foreground/3 w-full min-w-0 rounded p-2"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label className="min-w-0">
          <span className="mb-1 block text-sm">Quantity</span>
          <input
            className="bg-foreground/3 w-full min-w-0 rounded p-2"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <div className="min-w-0">
          <span className="mb-1 block text-sm">Unit price</span>
          <p className="bg-foreground/3 rounded p-2 break-all tabular-nums">
            {result === null ? "N/A" : result.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      {invalid && (
        <p className="text-sm text-red-700">
          Price must be zero or greater. Quantity must be greater than zero.
        </p>
      )}
    </section>
  );
}
