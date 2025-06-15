SafeI18nContentWrappingPrompt.md

👉 Goal:
Wrap all user-visible text in t() calls for proper i18n coverage.

👉 Scope:
Landing Page, Dashboard, 404 Page, components in src/components, any page.tsx and layout.tsx.

👉 Constraints:
	•	Follow existing conventions (t('key'))
	•	Only wrap text that should be localized
	•	Do not wrap:
	•	Dynamic data
	•	Brand names (“Campaign.ai”)
	•	Legal copy already covered
	•	Propose new keys if needed → add to common.json
	•	Avoid layout shifts or hydration errors
	•	Maintain responsiveness

👉 Testing:
	•	Verify text uses t()
	•	Ensure translations load from common.json
	•	Check that <html lang> updates on page change
	•	Preserve SEO attributes

👉 Output:
	•	Show full diff for each modified file
	•	Propose new keys for common.json
	•	Update CursorI18nChecklist.md
	•	Report which pages are I18n-ready

👉 Do NOT:
	•	Do not re-translate existing content
	•	Do not rewrite layout or component structure
	•	Do not touch CSS styles

👉 Ready?
Proceed now and output results step by step.
Ask if clarification is needed.