Create technical debt stories:
- upgrade Node v10.6.3 to new version
- fix the warnings (lots of different logs) while running yarn test
- upgrade browserslist
- fix scheduler dependency error while yarn install
- fix warnings of "Multiple versions" of some dependencies during yarn start

Questions to ask:
- why using Docker?
- why providing fixtures with needed ACH?

Onboarding improvement:
- after yarn install, yarn fixtures fail with "Could not connect to http://cozy.tools:8080 "
- yarn start succeeds, but it's only mentioned: "  Dev assets:        http://localhost:8888" but this page ends with: "{{.ThemeCSS}}"
- yarn watch does not show on which port, it is provided.
