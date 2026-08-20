Create a file named **`SETUP_FIXES.md`** in your project root (`habitly/`) and put this in it:

````md
# Habitly Setup Fixes

## Environment

- Expo SDK: 57
- Expo Router: 57
- NativeWind: v5
- Tailwind CSS: v4
- Gluestack UI: v5

---

## Android Bundling Error

### Error

```text
Unable to resolve "react-aria/private/utils/constants"
from "node_modules/@react-aria/utils/dist/import.mjs"
````

### Diagnosis

The first step was to check the Expo project:

```bash
npx expo-doctor
```

It reported:

```text
20/21 checks passed. 1 checks failed.
```

The mismatched packages were:

```text
react-native-safe-area-context
Expected: ~5.7.0
Found:    5.9.1

react-native-svg
Expected: 15.15.4
Found:    15.15.5
```

---

## Fix

Use Expo's package installer so it selects versions compatible with the current Expo SDK:

```bash
npx expo install react-native-safe-area-context react-native-svg
```

Then verify the project:

```bash
npx expo-doctor
```

Expected result:

```text
21/21 checks passed. No issues detected!
```

---

## Clear Metro Cache

After fixing the dependencies, restart Expo with a clean Metro cache:

```bash
npx expo start -c
```

Launch Android:

```text
Press "a"
```

The application should now bundle successfully.

---

## Important Lesson

When using Expo, don't immediately install or downgrade package versions manually when Expo reports a dependency mismatch.

Prefer:

```bash
npx expo install <package>
```

instead of:

```bash
npm install <package>
```

Expo will select the version compatible with the installed Expo SDK.

---

## Current Status

The issue has been fixed.

```text
Expo Doctor: 21/21 checks passed
Android bundling: Working
```

```
```
