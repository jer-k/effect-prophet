import { Predicate } from "effect";

/** Freeze a copied, schema-parsed JSON-compatible object tree before publishing it. */
export const freezeOwned = <T>(owned: T): T => {
  // oxlint-disable-next-line anti-slop/no-object-parameters -- Schema-parsed objects/arrays are closed owned trees; only the caller-owned copy is traversed.
  const freeze = (value: object): void => {
    for (const child of Object.values(value)) {
      if (Predicate.isObjectKeyword(child)) freeze(child);
    }

    Object.freeze(value);
  };

  if (Predicate.isObjectKeyword(owned)) freeze(owned);

  return owned;
};

/** Clone validated caller input before freezing so the caller's original is untouched. */
export const copyFrozen = <T>(input: T): T => freezeOwned(structuredClone(input));
