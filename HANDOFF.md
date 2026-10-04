# LP / tester onboarding handoff — 2026-10-04

- Scope: tester registration and mail onboarding; branch `codex/tester-onboarding`.
- LP retains approved copy and six cropped images, matched image heights and accessible motion from previous releases (main f43bd3b).
- Form published: https://docs.google.com/forms/d/e/1FAIpQLSfn0kD7TCHvduNACgLVEte65YFidq-AgtMtg2TS8UiEyHt9NA/viewform
- Form owner personal account, Kome Labs editor. Public page verified: required Play email with validation, optional device, required consent, Submit enabled. One clearly labelled operator test response submitted (Kome Labs); submit confirmation verified.
- Response Sheet: https://docs.google.com/spreadsheets/d/1AFlPsxl1XW81YgdmUaFEAAk0SJxx5S8Nhh1rv9n8BMY/edit ; Kome access not checked; backend reads Form directly.
- Group created as Kome Labs: radiogaga-testers@googlegroups.com. Public join button verified using a non-member account. Anyone can join; posting and member list restricted to owner; conversation viewing members only. Owner is the only current member.
- Play Console developer 8765225444809445453, app 4973507170012214823. Alpha track 4698242882166252585 now uses this group and feedback koumelabs@gmail.com; saved state verified after reload. No Alpha release; opt-in links disabled. Existing internal tester list (1 member) unchanged, internal release 12 / 0.1.11.
- Group access is supported for closed tests, not current internal test UI. Remaining distribution work: country selection, store listing completion, Alpha release and review. No release submitted.
- `_backend/Code.gs`: Form-bound Apps Script source, sender guard for koumelabs@gmail.com, receipt with group instructions, install/update notice gated by explicit published-release properties, individual mail, normalized deduplication, consent check, quota batches, held uncertain delivery, manual opt-out. No auto Play release detection.
- Google project deployed source (saved and functions recognized): https://script.google.com/u/1/home/projects/1FPzjNQAmK-kyfOiMkAlARH_xvCy8PlPefJ_NWx_WNPCCInmh-w2VkqXh/edit ; title RadioGAGA テスター案内. Kome authorization completed; setup execution successful, two triggers verified. Operator form submit triggered onRegistration, completed in 3.131s (2026-10-04 10:09:37 JST); Receipt received in Kome Gmail; From/Reply-To koumelabs@gmail.com and display name RadioGAGA / Kome Labs verified, correct group link and distribution-pending copy. A personal-account empty Apps Script project was also created while switching accounts; no code/trigger there, left intact.
- `_backend/README.md` has operational instructions. Source/tests under underscore directory are excluded from Jekyll public assets. Only templates and public IDs in Git; no response data or credentials.
- Local test: node _backend/backend.test.cjs PASS (sender, consent, malformed input, deduplication, release gate, mute, quota, uncertain send). Google setup and form-submit trigger execution passed; operator receipt received and sender/body verified.
- LP config connects published form; copy clearly says distribution preparation. Privacy policy adds tester registration purpose, services and contact/opt-out. Pages deployment 37167247300 succeeded for 91db43a. Live: all three signup buttons point to the public form, recruiting/pending-distribution copy verified, no horizontal overflow at current desktop viewport.
- No Android code, device or user data changed.
- Next: complete store listing/country selection and closed-test release before enabling install notices.

- Narrow independent read-only review (gpt-5.6-luna / low) found no contract violation; held uncertain-send state is intentional and documented. Main agent reviewed tests, quota/sender/consent/gate paths and LP diffs.

- Google runtime duplicate check: manually reran processPending (10:12:02–10:12:05 JST), completed; Gmail refreshed and still one receipt message. Operator test record/mail retained, no user registration data deleted.
