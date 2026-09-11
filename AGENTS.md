# effect-prophet

## Whitespace

Use whitespace to make the structure of code immediately apparent. Group related
statements together and separate distinct phases of control flow with blank lines.
Avoid both dense blocks and unnecessary blank lines.

Prefer formatting that makes operations, early returns, and side effects easy to scan.

## Testing

Files in `test/` should be at the same level as the file they're testing in `src/`. Example

- `src/internal/fitting-backend.ts` -> `test/internal/fitting-backend.test.ts`
-
