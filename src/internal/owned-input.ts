import { Predicate } from "effect";

// Roots this module has deeply frozen. A deeply frozen tree can never change again, so a later
// traversal that reaches one, such as a trusted calendar snapshot inside a model, can skip it.
const deeplyFrozen = new WeakSet<object>();

/** Freeze a copied, schema-parsed JSON-compatible object tree before publishing it. */
export const freezeOwned = <T>(owned: T): T => {
  // oxlint-disable-next-line anti-slop/no-object-parameters -- Schema-parsed objects/arrays are closed owned trees; only the caller-owned copy is traversed.
  const freeze = (value: object): void => {
    if (deeplyFrozen.has(value)) return;

    for (const child of Object.values(value)) {
      if (Predicate.isObjectKeyword(child)) freeze(child);
    }

    Object.freeze(value);
  };

  if (Predicate.isObjectKeyword(owned)) {
    freeze(owned);
    deeplyFrozen.add(owned);
  }

  return owned;
};

/**
 * Copy a schema-parsed JSON-compatible tree into fresh mutable arrays and plain objects. Much faster
 * than `structuredClone` for large owned payloads such as embedded calendar snapshots.
 */
export const copyOwned = <T>(owned: T): T => {
  // oxlint-disable-next-line anti-slop/no-unknown-parameters, anti-slop/no-unknown-returns -- Schema-parsed trees contain only arrays, plain objects and primitives.
  const copy = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(copy);

    if (Predicate.isObjectKeyword(value)) {
      return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, copy(child)]));
    }

    return value;
  };

  // SAFETY: copy rebuilds arrays and plain objects with the same keys and primitive leaves, so the
  // result has the input's type.
  return copy(owned) as T;
};

/** Clone validated caller input before freezing so the caller's original is untouched. */
export const copyFrozen = <T>(input: T): T => freezeOwned(structuredClone(input));
