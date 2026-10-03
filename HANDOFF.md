# LP handoff — 2026-10-03

- Scope: tester recruitment landing page, branch `codex/lp-tester-recruitment`.
- Approved copy: ラジオの時間を、あなたの時間に。 / いつでも、どこでも、好きなときに、続きから。
- Reuses all six cropped screenshots. Player also appears in the hero. Original images are unchanged.
- Dedicated `landing` layout applies to the home page. Other pages retain the default theme layout.
- Registration form is not created yet (confirmed by user). `tester_form_url` in `_config.yml` stays empty; copy says registration is being prepared and links to `#testing`.
- When registration opens, set `tester_form_url` to the actual form URL. This switches the main buttons and recruitment status. Confirm fees, eligibility, onboarding and feedback instructions before opening applications.
- Local preview checks: 320 / 768 / 1024 / 1440 px, no horizontal overflow; participation anchor and FAQ expansion work. Screenshots link to the original cropped PNGs for enlargement.
- No Android code or device data changed.
- Deployment validation: Pages run 37128083850 succeeded for 33b1252. Live page: all seven image placements load (six unique screenshots), recruitment anchor and FAQ work, no horizontal overflow at 1280 / 390 px. Form remains unconfigured; applications are not open.
