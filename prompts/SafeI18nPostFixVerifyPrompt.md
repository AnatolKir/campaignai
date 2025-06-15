👉 Goal:
Verify and unblock current i18n implementation and layout stability.

👉 Scope:
	•	Verify LanguageSwitcher behavior in:
	•	/ (Landing page)
	•	/dashboard (App page)
	•	Verify correct URL prefix update.
	•	Verify correct <html lang> in layout.
	•	Verify correct middleware behavior → /fr, /de, /es, /en should load → no 404s.
	•	Verify that LanguageSwitcher is inline (not floating).
	•	Verify that translations display if present in public/locales.

👉 Constraints:
	•	Do not rewrite app routing.
	•	Do not change visual style of site.
	•	Do not break existing dashboard layout.
	•	Do not rewrap text.
	•	Do not re-introduce i18n.changeLanguage in LanguageSwitcher.
	•	Do not move LanguageSwitcher back to layout.tsx.
	•	Do not add new lint rules yet.

👉 Fixes allowed:
	•	Fix LanguageSwitcher import/export.
	•	Fix LanguageSwitcher URL logic if needed.
	•	Fix middleware if needed.
	•	Fix any blocking TypeScript errors in [locale]/layout.tsx.
	•	Create any missing minimal /public/locales/*/common.json files.
	•	Add missing next-intl.config.js if needed.

👉 Final output:
	•	Confirm if current i18n system is fully functional and ready for testing:
	•	URL prefix updates correctly.
	•	LanguageSwitcher behaves correctly.
	•	Translations show where present.
	•	No 404s on locale paths.
	•	No floating LanguageSwitcher.
	•	Layout stable.

👉 If broken:
	•	Suggest minimal diffs to unblock (do not break app further).

👉 Proceed now. Show clear diffs if changes are made.
