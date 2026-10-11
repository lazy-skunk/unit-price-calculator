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
    <section className="space-y-3 rounded bg-gray-800/50 p-4">
      <div className="flex items-end gap-2">
        <label className="min-w-0 flex-1">
          <span className="mb-1 block text-sm">Product name (optional)</span>
          <input
            className="w-full min-w-0 rounded bg-gray-700/25 p-2"
            type="text"
            placeholder={`Product ${index + 1}`}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button
          className={[
            "rounded-full px-3 py-1 transition",
            canRemove
              ? "bg-red-900/50 hover:bg-red-900 active:scale-95"
              : "bg-gray-700/25 opacity-50",
          ].join(" ")}
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
            className="w-full min-w-0 rounded bg-gray-700/25 p-2"
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
            className="w-full min-w-0 rounded bg-gray-700/25 p-2"
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
          <p className="break-all rounded bg-gray-700/25 p-2 tabular-nums">
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
