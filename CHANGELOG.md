## [1.6.2](https://github.com/quackops/caramelo/compare/v1.6.1...v1.6.2) (2026-08-25)

### Bug Fixes

* **button:** make hover and active share --color-brand-pressed, drop the separate hover token ([31ab136](https://github.com/quackops/caramelo/commit/31ab1365d90ec3693c5a047d8ef2da0a76695cd1))

## [1.6.1](https://github.com/quackops/caramelo/compare/v1.6.0...v1.6.1) (2026-08-25)

### Bug Fixes

* **style:** darken --color-brand-hover to sit between brand and brand-pressed ([58ad555](https://github.com/quackops/caramelo/commit/58ad5553557d0f57762dceb45009b38e34059f92))

## [1.6.0](https://github.com/quackops/caramelo/compare/v1.5.3...v1.6.0) (2026-08-25)

### Features

* **style:** add dedicated --color-brand-hover token ([268f57f](https://github.com/quackops/caramelo/commit/268f57f8ebc74572ecc975a218f79a30125187f1))

### Bug Fixes

* **button:** use --color-brand-hover instead of reusing link, transition background and transform together ([5475770](https://github.com/quackops/caramelo/commit/54757708a5a7e9fc69fba948865c458e6296693c))

## [1.5.3](https://github.com/quackops/caramelo/compare/v1.5.2...v1.5.3) (2026-08-25)

### Bug Fixes

* **style:** restate every semantic alias directly under [data-theme=pawee] ([7ab321c](https://github.com/quackops/caramelo/commit/7ab321c8fbfaffcc8a94272db1aa7f3ea3826e5d))

## [1.5.2](https://github.com/quackops/caramelo/compare/v1.5.1...v1.5.2) (2026-08-25)

### Bug Fixes

* **caramelo-provider:** remount on theme change instead of mutating data-theme in place ([fd8961b](https://github.com/quackops/caramelo/commit/fd8961bb165982f2209abf33e4c09a30833802cd))

## [1.5.1](https://github.com/quackops/caramelo/compare/v1.5.0...v1.5.1) (2026-08-25)

### Bug Fixes

* **storybook:** stop forcing a transparent canvas in the theme decorator ([85e0681](https://github.com/quackops/caramelo/commit/85e068144c4515fb73ddb7327e32010aae5f59f2))

## [1.5.0](https://github.com/quackops/caramelo/compare/v1.4.1...v1.5.0) (2026-08-25)

### Features

* **caramelo-provider:** add CarameloProvider theme wrapper ([cc4817a](https://github.com/quackops/caramelo/commit/cc4817a79aa3206f9f56c67a44e4f3aebc1d8111))

### Bug Fixes

* **badge:** theme urgent variant through --color-warning instead of hardcoded brand/link ([5472a9a](https://github.com/quackops/caramelo/commit/5472a9a41f4b33e7cfcae4e0848d3ea79fa0fd18))
* **tag:** vertically center label with inline-flex items-center ([a79eee6](https://github.com/quackops/caramelo/commit/a79eee6e3f97534fb41d6310f3eea32660447eef))

## [1.4.1](https://github.com/quackops/caramelo/compare/v1.4.0...v1.4.1) (2026-08-25)

### Bug Fixes

* **animal-card:** correct name size and details font to match the type scale ([e022f1b](https://github.com/quackops/caramelo/commit/e022f1bcd2ae2414328531731486899bc50bce5f))
* **animal-card:** use Badge's compact size instead of an ineffective className override ([64bb8e2](https://github.com/quackops/caramelo/commit/64bb8e2a1c8594b4f1ebbde94dfa6e5469b67438))
* **application-card:** correct applicant name text size to 14px ([6abb589](https://github.com/quackops/caramelo/commit/6abb589fa52f26520d14f3c9306e5a378df05db5))
* **application-card:** correct card padding to 16px ([91fe72f](https://github.com/quackops/caramelo/commit/91fe72f4f06dca49f9d7f8dde9ead9a12b237fb9))
* **application-card:** set font-poppins on the status pill ([83b74de](https://github.com/quackops/caramelo/commit/83b74de88b3e05391b8d57906ad423ddf1b1c2fa))
* **avatar:** correct medium/small sizes to 48px/32px ([e6abaf5](https://github.com/quackops/caramelo/commit/e6abaf55948e76174370f17db6f5916250717c5a))
* **badge:** add size variant so consumers can shrink the label ([a9e818f](https://github.com/quackops/caramelo/commit/a9e818f759a8aca7bae8a8329d0a4a807b5649e5))
* **button:** add visible keyboard focus ring ([206b524](https://github.com/quackops/caramelo/commit/206b524399afef61569def0f081cac923c008260))
* **button:** correct primary disabled background to gray-3 ([1d6d11e](https://github.com/quackops/caramelo/commit/1d6d11ec05a37264ca2176f720493f2a7416ed4d))
* **button:** guard press-scale transition behind motion-safe ([6f1c6ee](https://github.com/quackops/caramelo/commit/6f1c6eee76fb204a57cc39178e2de30f8a6ea96e))
* **button:** use caramelo-11 for primary hover, reserve caramelo-10 for active ([8ec6ea5](https://github.com/quackops/caramelo/commit/8ec6ea59968e283d66121e9d42b8e993efe71a8a))
* **chip:** add cursor-pointer ([f693c8c](https://github.com/quackops/caramelo/commit/f693c8cf103978ad48225465b8acb9b75391f22b))
* **chip:** add visible keyboard focus ring ([948601d](https://github.com/quackops/caramelo/commit/948601de65e888ca7e8f036d264d4c1293ae1ead))
* **empty-state:** correct error-variant padding to uniform 18px ([6e8ff87](https://github.com/quackops/caramelo/commit/6e8ff877035e2286f02e080e091ab406bbd0818d))
* **empty-state:** correct illustration and description margins to 16px ([f57c690](https://github.com/quackops/caramelo/commit/f57c690bac2b6ddb885e04af721231eedccaae1f))
* **empty-state:** correct title size and description font to match the type scale ([0beba6b](https://github.com/quackops/caramelo/commit/0beba6b794e46c0c80541e311cd31fce7a511036))
* **fab:** add visible keyboard focus ring ([ae4e297](https://github.com/quackops/caramelo/commit/ae4e2977b9e97474d0219266a78b75cc4b04fdfd))
* **fab:** guard press-scale transition behind motion-safe ([4bc3cb0](https://github.com/quackops/caramelo/commit/4bc3cb0f72199264a987dafa3ae95b17aaf18917))
* **icon-button:** add visible keyboard focus ring ([220d55a](https://github.com/quackops/caramelo/commit/220d55a563a6ca99e19b42988ced09d2ceae4216))
* **icon-button:** guard press-scale transition behind motion-safe ([f5cda68](https://github.com/quackops/caramelo/commit/f5cda68db4b2fc335502ac5aa4c08accfe02b7a8))
* **input:** correct field padding to 16px scale ([88b6d80](https://github.com/quackops/caramelo/commit/88b6d803f6881be6506ac3b9ea91033e57bd89d8))
* **input:** correct label size and error-message font to match the type scale ([f3aa1e7](https://github.com/quackops/caramelo/commit/f3aa1e71595cf01106646d62008164fe481df296))
* **input:** replace suppressed outline with the spec's brand focus ring ([a4ed6b2](https://github.com/quackops/caramelo/commit/a4ed6b2acde86d0cbcf9be964c00474fc5cdd5e7))
* **loading-skeleton:** use spec's gradient shimmer sweep and correct durations ([a2d9858](https://github.com/quackops/caramelo/commit/a2d9858157a1e6eb7170f0372202ae63f41ab241))
* **notice-row:** correct message size and font to match the type scale ([058d4d9](https://github.com/quackops/caramelo/commit/058d4d96b5e31252037eb1b4df363d4527647456))
* **notice-row:** correct row padding to spec ([7f2f93d](https://github.com/quackops/caramelo/commit/7f2f93d82fd07eb21d3bac8eacfa1a8e4e12b007))
* **photo-upload:** add cursor-pointer to remove and add buttons ([a0c81fa](https://github.com/quackops/caramelo/commit/a0c81fa6239395ef9b87f6aa027e352b2bc63e24))
* **photo-upload:** correct CAPA badge, remove button and dropzone padding to exact spec pixels ([6a9abb9](https://github.com/quackops/caramelo/commit/6a9abb91eb3cf9494e0e8adcd97a7188bb6d45b3))
* **photo-upload:** correct photo-counter text size to 10px ([fe6dc45](https://github.com/quackops/caramelo/commit/fe6dc45b1a0fc051b1963706d31e1ea54717c6c2))
* **search-bar:** add cursor-pointer to clear button ([7ca2e1a](https://github.com/quackops/caramelo/commit/7ca2e1ac96442abcf1b3e9e839af267ae4114ab9))
* **search-bar:** correct icon size and field padding to 16px scale ([5e5649d](https://github.com/quackops/caramelo/commit/5e5649dca29a76f1945fd39f1d6a2c85e9270930))
* **search-bar:** replace suppressed outline with the spec's brand focus ring ([c617394](https://github.com/quackops/caramelo/commit/c61739431600c043c00d885427ce64aa1e609486))
* **segmented-control:** add visible keyboard focus ring ([90e9289](https://github.com/quackops/caramelo/commit/90e92890126930e59a475af1da643be013cf2034))
* **segmented-control:** correct option label text size to 13px ([9598a96](https://github.com/quackops/caramelo/commit/9598a964262e4a30097247c4a2cf9a23808b803c))
* **select:** correct field padding and chevron offset to 16px scale ([353dcd1](https://github.com/quackops/caramelo/commit/353dcd1e8b4c88f82c42f4cd3ada940933a73b84))
* **select:** replace suppressed outline with the spec's brand focus ring ([1162a18](https://github.com/quackops/caramelo/commit/1162a188d9e4cf6d361e5ad35966cce63567bd9e))
* **sidebar:** add cursor-pointer to nav row buttons ([49a8b7a](https://github.com/quackops/caramelo/commit/49a8b7a06968bc8fadc5b4e4a049d57c5ea5faeb))
* **sidebar:** add visible keyboard focus ring to nav row buttons ([1cf83ab](https://github.com/quackops/caramelo/commit/1cf83ab66827fad9b9bcc5877b7c3217486dfde7))
* **sidebar:** correct container padding to asymmetric 16px/12px ([8bc04ae](https://github.com/quackops/caramelo/commit/8bc04ae4ab990594a9f6c07822c37fabdba1c154))
* **sidebar:** correct logo-row and publish-button margins to 16px ([a27930f](https://github.com/quackops/caramelo/commit/a27930ff0a6596ca947077edcaa59ed232bffc8e))
* **sidebar:** stretch publish button to full width ([c02219b](https://github.com/quackops/caramelo/commit/c02219be72a70e679faa3ea01afa7d2058120966))
* **switch:** correct track height to 32px ([834072e](https://github.com/quackops/caramelo/commit/834072e64316529fb5548a7dba91d7d2a61b7fd6))
* **tab-bar:** add cursor-pointer to tab buttons ([53226d3](https://github.com/quackops/caramelo/commit/53226d392d8c2f73c2eb9545ca8224e48e577acf))
* **tab-bar:** add visible keyboard focus ring to tab buttons ([31bf780](https://github.com/quackops/caramelo/commit/31bf780e006d4fe9f96d9a53967cdaee8b559214))
* **tab-bar:** correct raised-tab offset and notification badge size to 16px scale ([535d1ba](https://github.com/quackops/caramelo/commit/535d1ba4a93387f59e0635a89ef05559122e675c))
* **toast:** correct description text size to 13px ([004e0e7](https://github.com/quackops/caramelo/commit/004e0e7fa623e1652c7f4b420f38abe606cee350))
* **toast:** correct title size and description font to match the type scale ([12cb64e](https://github.com/quackops/caramelo/commit/12cb64ef1d71b221fd64c1771616a1d4257551e3))

## [1.4.0](https://github.com/quackops/caramelo/compare/v1.3.2...v1.4.0) (2026-08-25)

### Features

* **tag:** add Tag component ([9361ffc](https://github.com/quackops/caramelo/commit/9361ffc3755ed7420ba0b58fe6a88789e7c4a17c))

## [1.3.2](https://github.com/quackops/caramelo/compare/v1.3.1...v1.3.2) (2026-08-25)

### Bug Fixes

* **button:** merge consumer className instead of overwriting variant classes ([e14d262](https://github.com/quackops/caramelo/commit/e14d2621b2331231e14c46fe4d04b8baaccd95ef))
* **text:** merge consumer className instead of overwriting variant classes ([77d17cd](https://github.com/quackops/caramelo/commit/77d17cdd5627f219b7371ab075647fa68f3328a9))

## [1.3.1](https://github.com/quackops/caramelo/compare/v1.3.0...v1.3.1) (2026-08-25)

### Bug Fixes

* **fab:** use --shadow-raised token instead of hardcoded oklch shadow ([d748f53](https://github.com/quackops/caramelo/commit/d748f53f6666f5ed1b70080237feab248fe15d72))

## [1.3.0](https://github.com/quackops/caramelo/compare/v1.2.0...v1.3.0) (2026-08-24)

### Features

* **animal-card:** add AnimalCard component ([1ea4cc7](https://github.com/quackops/caramelo/commit/1ea4cc77e6342ea5ac3a0fd67d021fc91a0c995f))
* **avatar:** add Avatar component ([75be666](https://github.com/quackops/caramelo/commit/75be666417c045991a8f3f241d80bd50e6859017))
* **button:** align Button variants with Caramelo design spec ([28f980a](https://github.com/quackops/caramelo/commit/28f980a4693a1589ae237cd99ee806c99d93211f))
* **chip,badge:** add Chip and Badge components ([f38bf86](https://github.com/quackops/caramelo/commit/f38bf866edd48155651aba1cb312e61f3df78402))
* **empty-state,loading-skeleton,photo-upload:** add feedback/upload components ([494d589](https://github.com/quackops/caramelo/commit/494d589af30a6c6b224c2dd149132555f6016d5a))
* **icon-button,fab:** add IconButton and Fab components ([3e1a90b](https://github.com/quackops/caramelo/commit/3e1a90bb64a2def42330af437dd4689f37c7a83c))
* **input,switch,select:** add Campos form field components ([7f11ff0](https://github.com/quackops/caramelo/commit/7f11ff0717efa780980fd8809326995869eecc6c))
* **notice-row,application-card:** add LINHA DE AVISO E DE CANDIDATURA ([fbdbe00](https://github.com/quackops/caramelo/commit/fbdbe001f562c642067a3ffe8c1faf593f2da987))
* **search-bar:** add SearchBar component ([546e6b1](https://github.com/quackops/caramelo/commit/546e6b148f93753c965f8ce15992217290591c75))
* **segmented-control:** add SegmentedControl component ([6a3267e](https://github.com/quackops/caramelo/commit/6a3267e46aac6748d1a5ca93044b0870a2288083))
* **tab-bar,sidebar:** add mobile TabBar and web Sidebar ([63eadc5](https://github.com/quackops/caramelo/commit/63eadc518ecc9e6e2522f87da58ad1509fc96324))
* **toast:** add Toast component ([16e3cc2](https://github.com/quackops/caramelo/commit/16e3cc2767d36aee62773e03f6a5406abcdbd1dc))
* **tokens:** add Caramelo design system tokens to style.css ([3570205](https://github.com/quackops/caramelo/commit/3570205910836f7484c9819ddd1e6ca378724502))

## [1.2.0](https://github.com/quackops/caramelo/compare/v1.1.0...v1.2.0) (2026-02-17)

### Features

* polymorphic button ([4242354](https://github.com/quackops/caramelo/commit/424235478a7db0b6beaa3e67cf520614cabb1bf4))
* trigger release ([0869b37](https://github.com/quackops/caramelo/commit/0869b3772c61d83f8dcfcd549558fa10d12761bd))

## [1.1.0](https://github.com/quackops/caramelo/compare/v1.0.1...v1.1.0) (2026-02-17)

### Features

* implement slot component ([cca81fc](https://github.com/quackops/caramelo/commit/cca81fcc5749d9fc3efc9842aef521584691e747))
* implement text component ([a8bfaf9](https://github.com/quackops/caramelo/commit/a8bfaf93fbc7ae898a7190a3b8d376c538090528))
* use text on button ([5c321ef](https://github.com/quackops/caramelo/commit/5c321ef946e3269eb458a5221fcfce944432ff66))

## [1.0.1](https://github.com/quackops/caramelo/compare/v1.0.0...v1.0.1) (2026-02-16)

### Bug Fixes

* add package.json repository ([8b9b5f5](https://github.com/quackops/caramelo/commit/8b9b5f53b2d5444ed0841dfd0214c2fb92dde3e6))

## 1.0.0 (2026-02-16)

### Features

* **button:** add scale animation ([511a752](https://github.com/quackops/caramelo/commit/511a75235a45c8fbfe085e5cec42e14206dd430e))
* **button:** use theme colors ([83135b6](https://github.com/quackops/caramelo/commit/83135b69b6c59533ac463e20fc925c40d97011d6))
* implement button component ([578f48e](https://github.com/quackops/caramelo/commit/578f48e53708fa5c2c23b6a7de84f7147bfcfa63))

### Bug Fixes

* publish including new dist ([17be36b](https://github.com/quackops/caramelo/commit/17be36be3fed2e14d1e1e7b1fdeefbb0dbf2f6db))
* use cjs instead of umd ([eafbca4](https://github.com/quackops/caramelo/commit/eafbca488455c500e84327adff45f8a82278e3cc))
