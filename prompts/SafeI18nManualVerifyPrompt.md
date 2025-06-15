# Safe I18n Manual Verify Prompt

👉 Goal:

Manually verify that my current i18n and layout setup is safe and correct.  
**DO NOT make automatic changes yet — only analyze and show me findings.**

---

## What to verify:

### 1️⃣ Language Switcher:

✅ Is LanguageSwitcher correctly placed:
- In GlobalNavigation
- In AppNavigation
- Not floating / not duplicated

✅ Does LanguageSwitcher:
- Correctly update URL prefix (ex: `/fr`, `/de`, `/es`)
- Work from both Landing page and Dashboard

---

### 2️⃣ HTML lang attribute:

✅ Is `<html lang>` correctly set via `[locale]/layout.tsx`

---

### 3️⃣ Translations:

✅ Does the app load translations from `public/locales/*/common.json`  
✅ Are translated strings visible when switching language

---

### 4️⃣ Middleware:

✅ Does `middleware.ts` safely rewrite locale paths  
✅ Do `/fr`, `/de`, `/es`, `/en` routes load without 404

---

### 5️⃣ Manual Verify Pages:

✅ `/en` Landing → does it load + LanguageSwitcher work  
✅ `/en/dashboard` → does it load + LanguageSwitcher work  
✅ `/fr` → does it load → translations visible  
✅ `/fr/dashboard` → does it load → translations visible  
✅ `/non-existent-page` → 404 page → LanguageSwitcher visible + correct lang

---

## Constraints:

- DO NOT auto-create any new files
- DO NOT auto-delete anything
- DO NOT wrap new text in `t()` now
- Only show findings → I will decide what to change next

---

## Output:

✅ Clear report:
- For each checklist item → Pass / Needs Fix / Not Implemented
- List any required safe changes I should apply next