Change the first-visit idle redirect delay on `/bio` from **8 seconds** to **4 seconds**.

**Current behaviour (line 348, `src/pages/LinkInBio.tsx`)**
```typescript
const delay = visitNumber === 0 ? 8000 : 17500;
```
- First visit: 8 seconds idle → redirect
- Return visit: 17.5 seconds idle → redirect

**Proposed change**
```typescript
const delay = visitNumber === 0 ? 4000 : 17500;
```
- First visit: **4 seconds** idle → redirect
- Return visit: unchanged at 17.5 seconds