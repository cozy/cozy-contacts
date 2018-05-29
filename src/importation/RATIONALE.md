# vCard / VCF Parser

## Covy v2

For Cozy v2, the [cozy-vcard](https://github.com/cozy/cozy-vcard) was
developped, which mostly worked for our most important usecases.
But we didn't really have the time to maintain our own complete vCard/VCF
parser implementation.

## Existing third-party parsers

There are quite a lot of other vCard/VCF parsers on npmjs.org.

The following projects were dead (no commit during last year):

* vcard-js
  [NPM](https://www.npmjs.com/package/vcard-js) [GitHub](https://github.com/zuojiang/vcard-js)
* vcfparser
  [NPM](https://www.npmjs.com/package/vcfparser) [GitHub](https://github.com/comoyo/vcfparser)
* vcfparse
  [NPM](https://www.npmjs.com/package/vcfparse) [GitHub](https://github.com/sachinb94/vcfParse)
* vcardparser
  [NPM](https://www.npmjs.com/package/vcardparser) [GitHub](https://github.com/woutervroege/node-vcardparser)
* vdata-parser
  [NPM](https://www.npmjs.com/package/vdata-parser)
* android-vcf
  [NPM](https://www.npmjs.com/package/android-vcf)
* vcard-export
  [NPM](https://www.npmjs.com/package/vcardexport)
  (was supposed to import vcards too)

The following projects were still alive at the time of writing, but didn't seem
to support more vCard oddities, have more test or be more supported than our own
implementation:

* vcard
  [NPM](https://www.npmjs.com/package/vcard) [GitHub](https://github.com/jasperla/node-vcard)
  (last commit 2017-11, 6 open issues, a few unit tests, no dependant project
  known)
* oniyi-vcard-parser
  [NPM](https://www.npmjs.com/package/oniyi-vcard-parser) [GitHub](https://github.com/benkroeger/oniyi-vcard-parser)
  (last commit 2018-01-24, 1 closed issue, has some tests with a few
  real-world fixtures)
* vcf
  [NPM](https://www.npmjs.com/package/vcf) [GitHub](https://github.com/jhermsmeier/node-vcf)
  (no commit since 2017-08-01, a few issues open/closed, has tests,
  2-3 dependant projects)
* vcard-parser
  [NPM](https://www.npmjs.com/package/vcard-parser) [GitHub](https://github.com/Heymdall/vcard)
  (last commit 2018-02-19, a few unit tests, 2-3 issues)

### ical.js / jsical

The **most interesting** one is ical.js / jsical [NPM](https://www.npmjs.com/package/ical.js) [GitHub](https://github.com/mozilla-comm/ical.js) :

* last release 2 years ago, but regular & recent commits in master
* a few forks & wrappers
* has a low-level layer (AST-like, usable on vCard data) and a high-level one (iCal only
  for now)
* Many tests & samples on the iCal side, less on the vCard one (possibly because the
  high-level layer is not implemented yet)

While it would make sense to use and contribute to ical.js on the long term,
it would require quite a lot of work to implement the vCard high-level layer.
On the other side, cozy-vcard mostly works right now and althought not perfect
its limitations are better known.
Even if we decide to move to ical.js later, the cost of the current solution
is not so significant regarding the remaining work.

## Cozy v3

The [parsing implementation](./parser.js) will be using cozy-vcard for now,
including [conversion of the contact documents from v2 to v3](./v2to3.js).

A [reader](./reader.js) interface was introduced to isolate the FileReader
runtime dependency. No maintained Node.js polyfill could be found, and
introducing globals (or mocking them) is not so great anyway.

vCard oddities not yet handled by cozy-vcard are fixed in the
[v2 to v3 mapping](./v2tov3.js) since we don't even know wether or not we'll
continue to maintain cozy-vcard.

See also [known issues](./KNOWN_ISSUES.md).

## Useful links

* https://tools.ietf.org/html/rfc6350
* https://en.wikipedia.org/wiki/VCard
* https://github.com/cozy/cozy-doctypes/blob/master/docs/io.cozy.contacts.md
