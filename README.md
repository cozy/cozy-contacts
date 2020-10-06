[![Travis build status shield](https://img.shields.io/travis/cozy/cozy-contacts/master.svg)](https://travis-ci.org/cozy/cozy-contacts)
[![NPM release version shield](https://img.shields.io/npm/v/cozy-contacts.svg)](https://www.npmjs.com/package/cozy-contacts)
[![Github Release version shield](https://img.shields.io/github/tag/cozy/cozy-contacts.svg)](https://github.com/cozy/cozy-contacts/releases)
[![NPM Licence shield](https://img.shields.io/npm/l/cozy-contacts.svg)](https://github.com/cozy/cozy-contacts/blob/master/LICENSE)


# cozy-contacts


## What's Cozy?

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.


## What's cozy-contacts?

Contact manager for Cozy Cloud


## Hack

_:pushpin: Note:_ we recommend to use [Yarn] instead of NPM for package management. Don't hesitate to [install][yarn-install] and use it for your Cozy projects, it's now our main node packages tool for Cozy official apps.

### Install and run in dev mode

Hacking the Cozy cozy-contacts app requires you to [setup a dev environment][setup].

You can then clone the app repository and install dependencies:

```sh
$ git clone https://github.com/cozy/cozy-contacts.git
$ cd cozy-contacts
$ yarn install
```

:pushpin: If you use a node environment wrapper like [nvm] or [ndenv], don't forget to set your local node version before doing a `yarn install`.

Cozy's apps use a standard set of _npm scripts_ to run common tasks, like watch, lint, test, build…

### Fixtures

:warn: To import fixtures, `ach` must be available globally (see [the doc here][ach]).

A fixture file is available, you can import its data with :

```
$ yarn fixtures
```

You can also import more than 2000 contacts in one batch with this other command :

```
$ yarn fixtures:massive
```

### Services

Services can be triggered (and tested manually) by running `yarn services:[ServiceName]`. Otherwise, the application must be installed (by cozy-stack or store) for the services to work. You can take a look to the [service documentation][service] and [cozy-konnector-dev documentation][cozy-konnector-dev] for more informations.

### Run it inside the VM

First, you need to install `docker` and our `cozy-app-dev` image. See how to in our [install the development environment documentation][setup]

Then, you need to build at least once the `Contacts` app before running the docker image:

```sh
$ yarn start
```

Then, in an other process, you can run the docker image: 

```sh
$ yarn stack:docker:dev
```

Your app is now available at http://app.cozy.tools:8080.

Password is `cozy` by default.

This command uses the [cozy-stack docker image][cozy-stack-docker].

By launching this `stack:docker:dev` command, you disable our Content Security Policy (CSP) (which are very restrictive by default) to have access to the HMR. Don't forget to test your builded application (not watched) using `stack:docker:prod` to activate them.

### Living on the edge

[Cozy-ui] is our frontend stack library that provides common styles and components accross the whole Cozy's apps. You can use it for you own application to follow the official Cozy's guidelines and styles. If you need to develop / hack cozy-ui, it's sometimes more useful to develop on it through another app. You can do it by cloning cozy-ui locally and link it to yarn local index:

```sh
git clone https://github.com/cozy/cozy-ui.git
cd cozy-ui
yarn install
yarn transpile
yarn link
```

then go back to your app project and replace the distributed cozy-ui module with the linked one:

```sh
cd cozy-contacts
yarn link cozy-ui
```

[Cozy-client-js] is our API library that provides an unified API on top of the cozy-stack. If you need to develop / hack cozy-client-js in parallel of your application, you can use the same trick that we used with [cozy-ui]: yarn linking.


### Tests

Tests are run by [jest] under the hood. You can easily run the tests suite with:

```sh
$ cd cozy-contacts
$ yarn test
```

:pushpin: Don't forget to update / create new tests when you contribute to code to keep the app the consistent.


## Models

The Cozy datastore stores documents, which can be seen as JSON objects. A `doctype` is simply a declaration of the fields in a given JSON object, to store similar objects in an homogeneous fashion.

Cozy ships a [built-in list of `doctypes`][doctypes] for representation of most of the common documents (Bills, Contacts, Files, ...).

Whenever your app needs to use a given `doctype`, you should:

- Check if this is a standard `doctype` defined in Cozy itself. If this is the case, you should add a model declaration in your app containing at least the fields listed in the [main fields list for this `doctype`][doctypes]. Note that you can extend the Cozy-provided `doctype` with your own customs fields. This is typically what is done in [Konnectors] for the [Bill `doctype`][bill-doctype].
- If no standards `doctypes` fit your needs, you should define your own `doctype` in your app. In this case, you do not have to put any field you want in your model, but you should crosscheck other cozy apps to try to homogeneize the names of your fields, so that your `doctype` data could be reused by other apps. This is typically the case for the [Konnector `doctype`][konnector-doctype] in [Konnectors].


### Open a Pull-Request

If you want to work on cozy-contacts and submit code modifications, feel free to open pull-requests! See the [contributing guide][contribute] for more information about how to properly open pull-requests.


## Community

### Localization

Localization and translations are handled by [Transifex][tx], which is used by all Cozy's apps.

As a _translator_, you can login to [Transifex][tx-signin] (using your Github account) and claim an access to the [app repository][tx-app]. Transifex will then create pull request on the repository, and the locales are merged after validating the pull request.

As a _developer_, you just have to modify json in `/src/locales`.


### Maintainer

The lead maintainer for cozy-contacts is [cozy](https://github.com/cozy), send him/her a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


## License

cozy-contacts is developed by cozy and distributed under the [AGPL v3 license][agpl-3.0].



[cozy]: https://cozy.io "Cozy Cloud"
[setup]: https://docs.cozy.io/en/tutorials/app/#install-the-development-environment "Cozy dev docs: Set up the Development Environment"
[yarn]: https://yarnpkg.com/
[yarn-install]: https://yarnpkg.com/en/docs/install
[cozy-ui]: https://github.com/cozy/cozy-ui
[cozy-client-js]: https://github.com/cozy/cozy-client-js/
[cozy-stack-docker]: https://github.com/cozy/cozy-stack/blob/master/docs/client-app-dev.md#with-docker
[doctypes]: https://cozy.github.io/cozy-doctypes/
[bill-doctype]: https://github.com/cozy/cozy-konnector-libs/blob/master/models/bill.js
[konnector-doctype]: https://github.com/cozy/cozy-konnector-libs/blob/master/models/base_model.js
[konnectors]: https://github.com/cozy/cozy-konnector-libs
[cozy-konnector-dev]: https://github.com/konnectors/libs/tree/master/packages/cozy-jobs-cli#cozy-konnector-dev
[agpl-3.0]: https://www.gnu.org/licenses/agpl-3.0.html
[contribute]: CONTRIBUTING.md
[tx]: https://www.transifex.com/cozy/
[tx-signin]: https://www.transifex.com/signin/
[tx-app]: https://www.transifex.com/cozy/<SLUG_TX>/dashboard/
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
[nvm]: https://github.com/creationix/nvm
[ndenv]: https://github.com/riywo/ndenv
[jest]: https://facebook.github.io/jest/
[ach]: https://docs.cozy.io/en/ach/
[service]: https://docs.cozy.io/en/cozy-stack/apps/#services
