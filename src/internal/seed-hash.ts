/** Writers for the fields one derived seed hashes, little-endian. */
export interface SeedHashWriter {
  readonly byte: (value: number) => void;
  readonly bytes: (values: Uint8Array) => void;
  readonly uint32: (value: number) => void;
  readonly int64: (value: number) => void;
}

/**
 * Hash the fields `write` supplies with 32-bit FNV-1a, giving a stable uint32 seed.
 *
 * Callers write a versioned schedule name first, so each kind of derived seed has its own stream.
 */
export const fnv1aSeed = (write: (writer: SeedHashWriter) => void): number => {
  let hash = 2_166_136_261;

  const byte = (value: number): void => {
    hash = Math.imul(hash ^ value, 16_777_619) >>> 0;
  };

  const bytes = (values: Uint8Array): void => {
    for (const value of values) {
      byte(value);
    }
  };

  const uint32 = (value: number): void => {
    for (let index = 0; index < 4; index += 1) {
      byte((value >>> (8 * index)) & 0xff);
    }
  };

  const int64 = (value: number): void => {
    let remaining = BigInt(value);

    for (let index = 0; index < 8; index += 1) {
      byte(Number(remaining & 0xffn));
      remaining >>= 8n;
    }
  };

  write({ byte, bytes, uint32, int64 });

  return hash;
};
