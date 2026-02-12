

## Fix Spelling: "Osteoperosis" to "Osteoporosis"

The word is misspelled as "Osteoperosis" in three files. All occurrences will be corrected to "Osteoporosis".

---

### Changes

#### 1. `src/pages/Tips.tsx` (line ~912)
- Change tip title from `"Learn One Word - Osteoperosis"` to `"Learn One Word - Osteoporosis"`

#### 2. `src/data/guideMapping.ts` (line ~75)
- Change key from `"Learn One Word - Osteoperosis"` to `"Learn One Word - Osteoporosis"`

#### 3. `src/data/tipKeywords.ts` (lines ~499-503)
- Update comment and all four keyword values to point to `"Learn One Word - Osteoporosis"`
- Keep all four keyword variants (Osteoperosis, osteoperosis, Osteoporosis, osteoporosis) so old URLs still work, but update their target title

All three files must match exactly for the "Download Guide" button and URL routing to function correctly.

