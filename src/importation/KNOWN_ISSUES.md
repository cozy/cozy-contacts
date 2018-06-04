## Cozy v2 fields that don't have an equivalent in v3 yet

* `{carddavuri: ...}`
* `{datapoints: [{name: "about"}]}`
* `{datapoints: [{name: "chat"}]}`
* `{datapoints: [{name: "relation"}]}`
* `{datapoints: [{name: "social"}]}`
* `{datapoints: [{name: "url"}]}`
* `{department: ...}`
* `{gender: ...}`
* `{geo: ...}`
* `{kind: ...}`
* `{lang: ...}`
* `{nickname: ...}`
* `{org: ...}`
* `{tags: ...}` (should be mapped to groups?)
* `{title: ...}` (may conflict with `name.namePrefix`?)
* `{tz: ...}`
* `{uid: ...}`

## Cozy v2 fields that should be handled in the v2 to v3 mapping

* `{datapoints: [{charset: ...}]}` (should content be reencoded to utf-8?)

## vCard data that should be handled by cozy-vcard (but is not)

* a few skype account representations, e.g.
  `IMPP;X-SERVICE-TYPE=Skype;type=HOME;type=pref:skype:joe.bloggs` or
  `IMPP;TYPE=home;PREF=1:skype:joe.bloggs`
* the following twitter account representation:
  `X-SOCIALPROFILE;TYPE=home;PREF=1:twitter:https://twitter.com/joebloggs`
  (ends up with `value: "twitter:https://..."`)
* some macOS contact identifier:
  `X-ABUID:5AD380FD-B2DE-4261-BA99-DE1D1DB52FBE\:ABPerson`
  (possibly not the same as `UID`?)

## vCard data that probably doesn't matter

* `EMAIL;TYPE=INTERNET` maps to a proper email row, the `INTERNET` type is
  ignored, which sounds just fine.

## Other issues

* An error in cozy-vcard (e.g. a vCard without a FN or a NAME) will prevent
  importing the whole file since the parser won't give us any contact at all.
* An unexpected error in the [v2 to v3 mapping](./v2tov3.js) will prevent the
  contact to be imported (POLA). Other contacts should still be imported.
* Broken contact properties may be silently ignored by cozy-vcard.
* A file corrupt in a very (rare) specific way may end up with a contact being
  imported 0 or 2 times.
* cozy-vcard tries to fill in the `n` proparty according to the `fn` one, but
  the result does not necessarily make sense.
