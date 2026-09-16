# UX video review — Boraden

Date: 2026-09-17. Status: proposals for discussion, not approved implementation.

Source: [UX (Kullanıcı Deneyimi) ve İnsan Psikolojisi — Nureddin Gokbey Inac](https://www.youtube.com/watch?v=ObA-Yyuqfxw), 4:24:22.

## Review scope

The team read the complete available Turkish automatic transcript, from 0:01 through the closing remarks at 4:24:16. Two independent agents covered 0:00–1:24:55 and 1:24:55–2:45:52; the supervisor covered 2:45:52–the end and synthesized all findings. The initial transcript export stopped at 3:45:13; the missing portion was obtained from YouTube's rendered transcript panel.

This was not continuous audiovisual viewing. The supervisor separately inspected ten video frames/slides through the browser: 17:17, 1:09:25, 1:44:45, 1:48:12, 2:20:50, 2:51:58, 3:51:05, 3:55:36, 4:16:27 and 4:21:48. These covered strategy, familiar interaction, prioritization, a Netflix layout example, numerical labels, first impressions, input states, navigation, carousel continuity and simultaneous changes.

The active Boraden homepage structure, shared navigation/search code, and the rendered Bireysel Vergi Danışmanlığı page were also reviewed. No application files were changed for this review.

## Chapter coverage

All twenty chapter ranges were covered in the transcript. Times below use the video's chapter labels; speech can begin a few seconds later.

| Start | Subject |
|---|---|
| 0:00 | Introduction |
| 2:43 | UX qualities and purpose |
| 15:45 | Strategy, scope, structure, skeleton, surface |
| 28:05 | Iterative UX process |
| 32:39 | Human-centered problem discovery |
| 48:16 | Perception, memory, interaction feedback |
| 57:01 | Visual perception and familiar controls |
| 1:15:48 | Memory and interface metaphors |
| 1:24:55 | Attention and cognitive load |
| 1:33:53 | Hierarchy, grouping, whitespace |
| 1:53:08 | Visual flow and context |
| 2:04:24 | Signals, interference and labels |
| 2:16:03 | Graphic encoding and context |
| 2:35:35 | Expectations and consistency |
| 2:45:52 | First impressions and system performance |
| 2:59:38 | Expectations, interruptions, error handling |
| 3:13:25 | Hierarchy and composition |
| 3:27:32 | Language, meaning and semantic markup |
| 3:48:32 | Feedback states and navigation |
| 4:00:12 | Gestalt grouping, continuity and simultaneous motion |

## Interpretation limits

The lecture is one practitioner's perspective. Its numerical attention claims, broad neurological explanations and categorical statements about creativity are not independently established by this review. The speaker identifies the T-shaped scanning pattern as his hypothesis around 1:41:17. Do not turn these claims into universal design rules or promised conversion results.

The useful design distinction for Boraden is between a distinctive visual identity and predictable task behavior. Original composition is compatible with recognizable menus, links and controls. Proposed improvements below are design judgments to test, not findings from a Boraden user study.

## Observed Boraden issues

- Navigation, site search, a six-area service selector, blog, tools and service detail navigation already exist. Do not propose rebuilding these as missing features.
- The opening film carries company identity within its sequence. The activity description should also be available as readable HTML immediately, independent of video loading/playback.
- The expertise selector previews on desktop hover and pins on click. It needs a clearly distinguishable preview/selected state; its selection control and destination link should not appear to perform the same action.
- On `/hizmetler/bireysel-danismanlik-hizmetleri/`, the hero definition is repeated verbatim in the first summary card. The approach sentence appears twice consecutively. The preparation list repeats scope descriptions instead of providing distinct preparation guidance.
- The large abstract service hero occupies substantial space but does not explain the service. Its artistic treatment can remain a brand element while becoming more closely connected to the content.
- Expert identity/contact placeholders and career submission are still prototype states. They should not look like operational services in a public release; Wagtail integration remains a separate stage.

## Recommended decisions

1. **Keep the opening, clarify the identity.** Preserve the silent portrait film and three brand-derived windows. Display the actual company name/activity and a clear service path without waiting for the film. Let the next section become readable before starting another attention-demanding movement.

2. **Use the existing discovery infrastructure.** Keep the familiar service menu and search. Make search easier to recognize with a text label where space permits. Group results by service, publication and tool. Test real queries before expanding search logic. A compact visible route back to navigation is worth testing when the main header is hidden.

3. **Pilot a service-specific visual explanation.** On Bireysel Vergi Danışmanlığı, replace duplicate summary content with a clear choice between existing contexts: multiple income sources, declaration preparation, cross-border income. A controlled transition can reveal relevant existing scope and a direct detail link. This should navigate information, not make a legal determination. Any new factual guidance needs separate verification.

4. **Give detail pages a readable rhythm.** Proposed order: service definition → who/which circumstances → scope → process/preparation → questions → contact. Use a restrained sticky diagram beside scrolling content on suitable desktop screens; keep mobile in a normal vertical flow. Avoid forcing an animation to finish before content becomes usable.

5. **Make reading and action states deliberate.** Keep distinctive blog covers and consistent article metadata. Leave text stationary while it is being read; offer explicit carousel controls. For tools/forms, design understandable input, focus, processing, result, error and unavailable states around the actual functionality.

6. **Use a small motion vocabulary.** Brand-window transition for opening; a short image/outline response for selected services; a single reveal for editorial cards. Avoid a persistent cursor follower, independent moving bands and auto-changing text competing in the same viewport. Respect reduced motion and keyboard/touch use.

## First implementation slice proposed

One pilot service page, not a new site-wide redesign: Bireysel Vergi Danışmanlığı. Remove content duplication, establish the information order, connect a purposeful diagram to the three existing user situations, and test its navigation and reading flow. Reuse the proven pattern elsewhere only after visual and task review.

Evaluate with a short first-impression check and separate tasks: identify what Boraden does; find the relevant service scope; find a calculator; find the service contact route. Record misunderstandings and wrong turns as well as completion. No user-test outcomes are claimed yet.
