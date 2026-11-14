import { useState } from "react";

import { calculateUnitPrice } from "./unitPrice";

type Props = {
  canRemove: boolean;
  onRemove: () => void;
};

export default function ProductInput({ canRemove, onRemove }: Props) {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const result = calculateUnitPrice(price, quantity);
  const invalid = (price !== "" && Number(price) < 0) || (quantity !== "" && Number(quantity) <= 0);

  return (
    <div className="bg-foreground/3 grid gap-4 rounded p-4">
      <div className="flex items-end gap-2">
        <label className="grid min-w-0 flex-1 gap-2">
          <span>Product name (optional)</span>
          <input
            className="bg-foreground/3 hover:bg-foreground/6 min-w-0 rounded p-2 motion-safe:transition-colors"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button
          className="disabled:bg-foreground/3 disabled:text-foreground/50 dark:disabled:bg-foreground/3 dark:disabled:text-foreground/50 cursor-pointer rounded bg-red-100 px-4 py-2 text-red-900 disabled:cursor-not-allowed disabled:active:translate-y-0 motion-safe:transition motion-safe:active:translate-y-px dark:bg-red-900 dark:text-red-100"
          type="button"
          disabled={!canRemove}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <label className="grid min-w-0 gap-2">
          <span>Price</span>
          <input
            className="bg-foreground/3 hover:bg-foreground/6 min-w-0 rounded p-2 motion-safe:transition-colors"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label className="grid min-w-0 gap-2">
          <span>Quantity</span>
          <input
            className="bg-foreground/3 hover:bg-foreground/6 min-w-0 rounded p-2 motion-safe:transition-colors"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <div className="grid min-w-0 gap-2">
          <span>Unit price</span>
          <p className="bg-foreground/3 rounded p-2 break-all tabular-nums">
            {result === null ? "N/A" : result.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      <div role="alert" className="empty:absolute">
        {invalid && (
          <p className="text-red-500 motion-safe:transition-opacity motion-safe:starting:opacity-0">
            Price must be zero or greater. Quantity must be greater than zero.
          </p>
        )}
      </div>
    </div>
  );
}
