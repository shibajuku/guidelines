# CSS ガイドライン

品質の確保と、予測性、再利用性、保守性、拡張性を向上することを目的に、以下のガイドラインに則ったコーディングを行ってください。

## 基本ルール

以下を基本ルールとして、[CSS の各仕様](https://www.w3.org/Style/CSS/current-work)に則ったコーディングを行ってください。

- `@charset` の記述は `UTF-8` を設定する
- Inline CSS は、原則としてカスタムプロパティの定義を除き禁止する
- `!important`は、緊急性がある時のみ許容する
- 引用符はダブルクォート（`"`）を使用する
- フォーカス可能な要素は、`:focus-visible` などを使用してフォーカスを可視化する
- 不必要なアニメーションは避け、ユーザビリティを考慮する。
- [Biome](https://biomejs.dev/ja/) によるコードフォーマットと解析を行いエラーに対応する

::: warning REC（Recommendation）以外の仕様
REC（Recommendation）以外の仕様は、[ブラウザの対応状況](https://caniuse.com/)や開発環境のトランスフォーマー（[Lightning CSS](https://lightningcss.dev/transpilation.html) や [PostCSS Preset Env](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md)）が対応しているかを確認して、問題ない場合にのみ使用してください。
:::

## CSS フレームワーク

[Tailwind CSS](https://tailwindcss.com/) や [Panda](https://panda-css.com/) などのユーティリティーファストなフレームワークは、許可がある場合か、指示がある時のみ使用してください。

なお、チームで開発する場合は、チームのコーディングメンバーが、これらの学習を終えているかを確認し、学習を終えていないメンバーがいる場合には、サポートをしながら使用するか、使用を控えてください。

また、ユーティリティーファストなフレームワークを使用する場合、フレームワークの仕様により本ガイドラインに適応できない箇所は、フレームワークの仕様を優先して構いません。

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、インストール時のオプションで「Tailwind CSS」を選択することで、Tailwind CSS のインストールと初期設定が完了します。
:::

## CSS プリプロセッサー

将来性を考慮し、[Lightning CSS](https://lightningcss.dev/)（推奨）、または [PostCSS](https://postcss.org/) を使い、CSSWG ドラフトに対応した、ピュアな CSS による開発を推奨します。
ただし、Sass（SCSS） を使用した制作環境に従事することにも考慮し、Sass（SCSS） を使った開発も許容します。

Sass（SCSS） を使用する場合は、 `sass-embedded` パッケージを使用してコンパイルしてください。

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、インストール時のオプションで「Sass」を選択することで、`sass-embedded` が使用できます。
:::

## ファイル構成

CSS ファイルは、モジュールや、要素名、コンポーネントごとに分割し、CSS レイヤー名と同名のディレクトリに保存してください。

### 開発ディレクトリ

```
📂 styles
├── 📂 settings
│    ├── valiables.css
│    └── keyframes.css
├── 📂 base
│    └── reset.css
├── 📂 general
│    ├── a.css
│    ├── li.css
│    └── generaname.css
├── 📂 vendors
│    └── vendor-name.css
├── 📂 components
│    ├── header.css
│    ├── footer.css
│    ├── nav-global.css
│    ├── container.css
│    ├── button.css
│    └── component-name.css
└── global.css
```

各ディレクトリ名や各ファイル名は [命名規則](./naming.html) を参照してください。

### 本番ディレクトリ

[Astro](https://astro.build/) 環境を除き、ビルド後の CSS ファイルは、`globaハッシュ値.css` にまとめてください。

```
📂 dist
└── 📂 assets
     └── 📂 styles
          └── globaハッシュ値.css
```

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、デフォルトで `globaハッシュ値.css` にまとめられます。
:::

[Astro](https://astro.build/) 環境の場合は、[Astro の構成](https://docs.astro.build/ja/guides/styling/#%E6%9C%AC%E7%95%AA%E7%92%B0%E5%A2%83) に従います。

## レイヤーとインポート

`@layer` を用いて、以下の CSS レイヤーを定義し、該当するレイヤーにスタイルを追加してください。

| レイヤー名   | 該当するスタイル                             |
| ------------ | -------------------------------------------- |
| `settings`   | グローバルなカスタムプロパティやキーフレームの設定         |
| `base`       | ブラウザの CSS 調整やベースのスタイル        |
| `general`    | 要素のスタイル                   |
| `vendors`    | ライブラリやフレームワークのスタイル         |
| `components` | ページを構成する再利用可能なパーツのスタイル |

なお、`global.css` には直接スタイルを記述せず、各役割ごとに分割した CSS ファイルを、レイヤーごとに `@import` で読み込んでください。

```css
@layer settings, base, general, vendors, components;

/* ============================================
  1.0 - Settings
============================================ */
@import "settings/variables.css" layer(settings);
@import "settings/keyframes.css" layer(settings);

/* ============================================
  2.0 - Base
============================================ */
@import "base/reset.css" layer(base);

/* ============================================
  3.0 - General
============================================ */
@import "general/a.css" layer(general);
@import "general/li.css" layer(general);

/* ============================================
  4.0 - Vendors
============================================ */
@import "vendors/splide.css" layer(vendors);

/* ============================================
  5.0 - Components
============================================ */
@import "components/header.css" layer(components);
@import "components/footer.css" layer(components);
@import "components/nav-global.css" layer(components);
@import "components/nav-local.css" layer(components);
@import "components/container.css" layer(components);
@import "components/button.css" layer(components);
```

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson 26 インポートとカスケードレイヤー」を参照
:::

[Astro](https://astro.build/) 環境においての、レイアウト や コンポーネントのスタイルは、 `.astro` ファイル内の `style` 要素にスコープして記述してください。ただし、グローバルに利用するスタイルに関しては、上記のように CSS ファイルで管理し `global.css` に読み込んでください。

```astro
<style>
@layer components {
 .button {
  /* ボタンのスタイル */
 }
}
</style>
```

::: info :open_book: 教材
詳細は「静的サイトジェネレーター Astro 講座」を参照
:::

## セレクタの選定

セレクタは予測性、再利用性、保守性、拡張性を意識し、以下のルールで指定してください。

1. セレクタは原則としてクラスセレクタを使用する。
2. ID セレクタは使用しない。
3. 状態の管理は動的擬似クラスや UI 要素状態擬似クラス、または属性セレクタを使用する。
4. ユニバーサルセレクタ（ `*` ）やタイプセレクタ（ `p`, `div` など ）は必要性がなければ安易に使わない。
5. 詳細度は不必要に上げず、低く保つ。
6. 再利用できる用に不必要なネスト化はしない。

### ユニバーサルセレクタ

ユニバーサルセレクタ（ `*` ）は、パフォーマンスの低下や、予期せぬスタイルの適用を招くため、原則として使用しないでください。
ただし、以下の場合の使用は許可します。

- ブラウザのデフォルトスタイルのリセットなど、ベースとなるスタイルを定義する場合
- 特定のブロックの子要素のみ（ `>` ）に共通のスタイルを適用する場合

```css
/* ベースとなるスタイルを定義する例 */
*,
::before,
::after,
::backdrop {
  box-sizing: border-box;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 特定のブロックの子要素のみに共通のスタイルを適用する例 */
.stack {
  display: block grid;

  & > * {
    grid-area: 1 / -1;
  }
}
```

### タイプセレクタ

タイプセレクタ（ `p`, `div` など ）は、予期せぬスタイルの適用を招くため、原則として使用しないでください。
ただし、以下の場合の使用は許可します。

- ブラウザのデフォルトスタイルのリセットなど、ベースとなるスタイルを定義する場合
- `li` や `th`、`td` など、特定のブロック内の子孫で、配置できる要素が明確な場合

タイプセレクタを使用する場合は、`:where()` 擬似クラスなどを用いて詳細度が不用意に上がらないようにしてください。

```css
/* ベースとなるスタイルを定義する例 */
:where(html) {
  color: var(--color-dark);
}

/* 特定のブロック内の子孫で、配置できる要素が明確な場合 */
.nav-global {
  & :where(li) {
    border: 1px solid;
  }
}
```

### 状態管理

状態管理は クラスセレクタ（ `is-*` など）を使用せず、動的擬似クラス（`:hover` や `:focus-visble` など）、UI 要素状態擬似クラス（`:checked` や `:disabled` など）、属性セレクタ（ `[open]` や `[aria-*]` 、`[data-*]` など）を使用してください。

```css
.button:hover,
.button:focus-visible {
  background-color: var(--color-blue);
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.button[aria-expanded="true"] {
  background-color: var(--color-blue);
}
```

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson9 セレクタと詳細度」を参照
:::

## クラス名

クラス名は BEM システムのシンタックスである、Block、Element、Modifier に分類して構成される [MindBEMding](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) のアイデアを基本的に採用します。

```css
.card {
  display: block grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}

.card__body {
  padding: calc(24 * var(--torem));
}

.card__title {
  font-size: calc(24 * var(--torem));
}
```

ただし、Modifier には原則クラスセレクタを使用せず、[状態管理](#%E7%8A%B6%E6%85%8B%E7%AE%A1%E7%90%86) のルールに基づいて、動的擬似クラスや UI 要素状態擬似クラス、または属性セレクタを使用してください。

また、影響範囲が明確な場合は、親 Block または、親 Element に定義されたカスタムプロパティの継承によって、スタイルを変化させる方法も許容します。

```css
.card {
  --button-background-color: var(--color-blue);
}

.media__button {
  --button-background-color: var(--color-red);
}

.button {
  background-color: var(--button-background-color, var(--color-dark));
}
```

やむを得ず、クラスセレクタを使用する場合は、Block、Element を省略し「`-modifier`」のようにハイフンひとつを接頭辞としても構いません。

ただし、プロジェクト内で統一してください。

```css
.button.-large { … }
.button.-medium { … }
.button.-small { … }
```

### 接頭辞

一般的なCSS設計で用いられる接頭辞は必要ありません。

ただし、接頭辞を設けないことを強制するわけではありません。
プロジェクトごとに「つける」「つけない」を選択し、ルールを統一してください。
なお、接頭辞を設ける場合はレイヤーに合わせてることを推奨します。

| 種類                | 接頭辞 |
| :------------------ | :----- |
| General レイヤー    | `g-`   |
| Components レイヤー | `c-`   |
| Utilities レイヤー  | `u-`   |



### ブロック名、エレメント名、モディファイア名

ブロック名やエレメント名は、[コンポーネント名](./naming.html#コンポーネント名)の命名規則を参考に[ケバブケース](./glossary.html#ケバブケース)で指定してください。

```css
/* ブロック名（種類） */
.hero {
  ...
}

/* エレメント名（種類__種類） */
.hero__cover {
  ...
}

/* ブロック名（種類+詳細） */
.nav-global {
  ...
}

/* エレメント名（種類+詳細__種類） */
.nav-global__title {
  ...
}

```


モディファイアは、基本的にクラスを使いませんが、どうしても使う必要がある場合には、[コンポーネント名](./naming.html#コンポーネント名)の[状態](./naming.html#状態) の命名規則を参考に[ケバブケース](./glossary.html#ケバブケース)で指定してください。

```css
/* モディファイア名（種類--状態） */
.button--large { … }
.button--medium { … }
.button--small { … }

/* モディファイア名（状態） */
.button.-large { … }
.button.-medium { … }
.button.-small { … }
```

::: info :open_book: 教材
詳細は「カオスにならない CSS を書くための CSS 設計 講座」 を参照
:::

## プロパティの指定順序

CSS のプロパティの記述順を以下の順番になるようにしてください。

1. カスタムプロパティの定義

   `--container-max-size`、`--grid-cols` など

2. ボックスの表示とポジションに関わるプロパティ

   `display`、`position`、`inset`、`z-index`、`inline-size`、`block-size` など

3. ボーダーに関わるプロパティ

   `border`、`border-image`、`border-radius` など

4. 背景関係に関わるプロパティ

   `background-color`、`background-image`、`background-size`、`background-position` など

5. 文字の体裁やフォントに関わるプロパティ

   `font-family`、`color`、`text-align`、`text-decoration`、`verticaalign`、`white-space` など

6. その他のプロパティ

   `animation`、`transition` など

※上記 6 つのブロックが確立されていれば、その中でのプロパティの順番は問いません。

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、[stylelint](https://stylelint.io/) によって自動で並び変わります。
:::

## ベンダープレフィックス

ベンダープレフィックスは、[Lightning CSS](https://lightningcss.dev/)、または [autoprefixer](https://www.npmjs.com/package/autoprefixer) によって自動で付与するため手動で記述しないでください。

ただし、CSS の標準ではないプロパティにおいては手動でベンダープレフィックスを付与する必要があります。

その際、ベンダープレフィックスは以下の順番で記述してください。

1. `-webkit-`
2. `-moz-`
3. `-ms-`
4. `-o-`
5. ベンダープレフィックスなしのプロパティ

```css
:where(html) {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## ショートハンドの使い方

ショートハンドによる指定も許容しますが、以下のルールに従って使用してください。

- 親要素のスタイルが継承されるプロパティでは使用しない
- `font` のショートハンドは使用しない

```css
.button {
  border: 1px solid;
}
```

## 値の指定

### 単位の省略

値が `0` の場合は単位を省略してください。

```css
.spacer {
  margin-block-start: 0;
}
```

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、[stylelint](https://stylelint.io/) によって自動で省略されます。
:::

### 文字サイズに応じて可変

ブラウザの文字サイズ変更機能などによって文字サイズに応じて可変した方が良い箇所では、文字サイズによる相対的な長さの単位（`rem` や `em` など）を使用してください。

- `font-size`
- `leter-spacing` (`em` を推奨)
- テキストコンテンツを子孫に含む要素の`margin`、`padding` や `boder-radius`

などがこれに該当します。

なお、`clamp()` を使用する場合の推奨値にも、`rem` を組みわせて指定してください。

```css
.spacer {
  margin-block-start: clamp(2.5rem, 1.9718rem + 2.2535vi, 4rem);
}

.heading {
  font-size: clamp(2rem, 1.6479rem + 1.5023cqi, 3rem);
  letter-spacing: 0.25em;
}
```

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、`fluid()` というオリジナル関数を使用して推奨値の自動計算ができます。

```css
/* 開発時 */
.spacer {
  margin-block-start: fluid(40px, 64px);
}

/* ビルド時 */
.spacer {
  margin-block-start: clamp(2.5rem, 1.9718rem + 2.2535vi, 4rem);
}
```

:::

また、予測性をや保守性を考慮して、可能な限り、`rem` 値などを直接指定せず、`calc()` を使って `px` を `rem` に変換する式で指定してください。

```css
:root {
  --torem: calc(1rem / 16);
}

.heading {
  font-size: calc(24 * var(--torem));
}
```

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson2 フォント関連のプロパティ – 前編 –」と「Lesson24 関数」を参照
:::

### line-height

`line-height` は原則単位なしの数値で指定してください。
ただし、子孫に要素が配置されないことが明確な場合は、この限りではありません。

```css
.heading {
  line-height: 1.5;
}
```

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson3 フォント関連のプロパティ – 後編 –」 → 「Chapter3 行の高さ」を参照
:::

### font-weight

`font-weight` は数値で指定してください。

```css
.heading {
  font-weight: 700;
}
```

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、[stylelint](https://stylelint.io/) によって自動で数値に変更されます。
:::

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson2 フォント関連のプロパティ – 前編 –」 → 「Chapter3 文字の太さ」を参照
:::

### background-image と border-image

JPEG、または PNG 形式の画像を使用する場合は、 `image-set()` 関数を使って Retina Display™ などの高解像ディスプレイ（High DPI Display）への対応を行ってください。

```css
:where(body) {
  background-image: image-set(url("/assets/images/bg-noize.png") 1x, url("/assets/images/bg-noize@2x.png") 2x);
}
```

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson7 背景画像と背景の一括指定」 → 「Chapter1 背景画像」を参照
:::

## レスポンシブ対応

モバイルデバイス対応についてはレスポンシブ Web デザインを採用します。

### コンテナークエリ

対応ブラウザに問題がない場合は、コンテナークエリーによるレスポンシブ対応を推奨します。

各コンポーネントのブロックには、`container` プロパティを定義し、コンテナー名も指定してください。

また、各エレメントのレイアウトや文字サイズなどには、`cqi`（`cqw`） などのコンテナークエリーの単位を活用してください。

```css
.container {
  container: container / inline-size;
}

.grid {
  container: grid / inline-size;
  display: block grid;
  grid-template-columns: repeat(var(--grid-cols, 1), minmax(0, 1fr));

  @container container (inline-size >= 40rem) {
    --grid-cols: 2;
  }

  @container container (inline-size >= 60rem) {
    --grid-cols: 3;
  }
}

.card {
  container: card / inline-size;
}

.card__title {
  font-size: clamp(1.5rem, 1.6479rem + 1.5023cqi, 2rem);
}
```

::: warning subgridとの併用
`container` と `subgrid` を併用すると `subgrid` として認識されないため注意してください。
:::

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson 27 コンテナークエリ」を参照
:::


### メディアクエリ

メディアクエリを使ってレスポンシブ対応を行う場合は、以下のブレークポイントを基本とした、カスタムメディアクエリを定義し、ビューポート幅が、`375px` 〜 `1920px` までの間でレイアウトが崩れないように調整してください。

| サイズ  | 値               | ブレークポイント |
| :------ | :--------------- | :--------------- |
| `--sm`  | `width >= 36rem` | `576px`          |
| `--md`  | `width >= 48rem` | `768px`          |
| `--lg`  | `width >= 64rem` | `1024px`         |
| `--xl`  | `width >= 80rem` | `1280px`         |
| `--xxl` | `width >= 96rem` | `1536px`         |

```css
@custom-media --sm (width >= 36rem);
@custom-media --md (width >= 48rem);
@custom-media --lg (width >= 64rem);
@custom-media --xl (width >= 80rem);
@custom-media --xxl (width >= 96rem);

@media (--md) {
  /* md サイズ以上のスタイル  */
}

@media (--lg) {
  /* lg サイズ以上のスタイル  */
}
```

ビルド後は [Lightning CSS](https://lightningcss.dev/)、または [PostCSS](https://postcss.org/) によって、以下の CSS が出力されます。

```css
@media (min-width: 768px) {
  /* md サイズ以上のスタイル  */
}

@media (min-width: 1024px) {
  /* lg サイズ以上のスタイル  */
}
```

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、上記のカスタムメディアクエリがあらかじめ定義されています。
:::

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson 23 メディアクエリ」を参照
:::


## スタイルのネスト

スタイルは、[CSS nesting](https://drafts.csswg.org/css-nesting-1/) を活用して記述してください。

ビルド時に、[Lightning CSS](https://lightningcss.dev/)、または [PostCSS](https://postcss.org/) によって、ネスト構造を必要に応じて解除します。

ネストする際の記述順序は以下の通りです。

1. 要素のスタイル
2. 要素のコンテナークエリ および、メディアクエリ
3. 擬似要素
4. 擬似クラス
   1. 動的擬似クラス
   2. UI 要素状態擬似クラス
   3. 構造擬似クラス
5. 結合子
   1. 次兄弟（`+`）
   2. 後続兄弟（`~`）
   3. 子（`>`）
   4. 子孫

上記、3 以降のセレクタ内にも、コンテナークエリ および、メディアクエリのネストを許容しますが、ネストが深くなりすぎないように注意してください。

```css
.button {
  /* 1. 要素のスタイル */
  display: block grid;

  /* 2. 要素のコンテナークエリ および、メディアクエリ */
  @container (inline-size >= 40rem) {
    justify-content: center;
  }

  /* 3. 擬似要素 */
  &::after {
    content: "";
  }

  /* 4. 擬似クラス */
  /*   4-1. 動的擬似クラス */
  &:hover,
  &:focus-visible {
    background-color: var(--color-blue);
  }

  /*   4-2. UI要素状態擬似クラス */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /*   4-3. 構造擬似クラス */
  &:last-child {
    justify-content: end;
  }

  /* 5. 結合子 */
  /*   5-1. 次兄弟 */
  & + & {
    margin-block-start: calc(24 * var(--torem));
  }

  /*   5-2. 後続兄弟 */
  & ~ & {
    color: var(--color-green);
  }

  /*   5-3. 子 */
  & > * {
    grid-area: 1 / -1;
  }

  /*   5-4. 子孫 */
  small {
    font-size: 0.8em;
  }
}
```

詳細度は低い順に並べ、詳細度が高いセレクターが詳細度の低いセレクターより上に記述されないようにしてください。

::: info :open_book: 教材
詳細は「本気で始める CSS 入門」 → 「Lesson9 セレクタと詳細度」と「Lesson 25 ネスティングルール」を参照
:::

## スクリーンリーダー用のテキスト

スクリーンリーダー用のテキストを視覚的に非表示にする場合は、以下の CSS を活用してください。
`display: none` や `visibility: hidden` は、アクセシビリティツリーから削除されます。

```css
:where(.visually-hidden:not(:focus-within, :active)) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
  user-select: none !important;
  border: 0 !important;
}
```

::: tip 👨‍💻 Orelop の場合
Orelop 環境の場合は、内包しているリセット用の CSS に上記のクラスが含まれています。
:::

## 視差効果

ユーザーの中には、OS の「視差効果を減らす」オプションを有効にしている方もいます。

このオプションを有効にしているユーザーに過度なアニメーションを提供しないようにしてください。

以下のような CSS で、「視差効果を減らす」オプションを有効にしているユーザーにアニメーションを実行しないようにできます。

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *:before,
  *:after,
  ::backdrop {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    animation-delay: unset !important;
    transition-delay: unset !important;
    transition-duration: 0.01ms !important;
    scrolbehavior: auto !important;
    view-transition-name: none !important;
  }
}
```

::: tip 👨‍💻 Orelop の場合
Orelop 環境の場合は、内包しているリセット用の CSS に上記の CSS が含まれています。
:::

## コメント

必要に応じて、コードの意図や構造を説明するコメントを記述してください。

コメントは、検索性を考慮し、Block、Element、Modifier に対して、それぞれ異なる装飾のルールでコメントを記述してください。

```css
/* ============================================
  Block
============================================ */

/*
  Element
————————————————————————————————————————— */

/* Modifire */
```
