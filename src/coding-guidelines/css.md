# CSS ガイドライン

品質の確保と、予測性、再利用性、保守性、拡張性を向上することを目的に、以下のガイドラインに則ったコーディングを行ってください

## 基本ルール

1. CSS の定義は原則として外部 CSS に記述して `class` で呼び出す。
2. HTML に直接記述する Inline CSS は原則として禁止する。
3. Charset の記述は `UTF-8` を設定する。
4. フォーカス可能な要素は、`:focus-visible` を利用してフォーカスを可視化する。
5. 不必要なアニメーションは避け、ユーザビリティを考慮する。
6. OSの「視差効果を減らす」オプションを有効にしてるユーザーには、`prefers-reduced-motion` を利用し、アニメーションを制御する。
7. [Biome](https://biomejs.dev/ja/) によるコードフォーマットと検証を行う。



## CSS プリプロセッサー
将来性を考慮し、[Lightning CSS](https://lightningcss.dev/)（推奨）、または [PostCSS](https://postcss.org/) を使い、CSSWG ドラフトに対応した、ピュアな CSS による開発を推奨します。
ただし、Sass を利用した制作環境に従事することにも考慮し、Sass を使った開発も許容します。

Sass を利用する場合は、 `sass-embedded` パッケージを利用してコンパイルしてください。

::: info
Orelop 環境の場合は、インストール時のオプションで「Sass」を選択することで、`sass-embedded` が利用できます。
:::


## ファイル構成

CSS ファイルは、各役割ごとに分割し、CSSレイヤーごとのディレクトリに保存してください。

### 開発ディレクトリ
```txt
📂 styles
├── 📂 settings
│    └── valiables.css
├── 📂 base
│    └── reset.css
├── 📂 layouts
│    ├── container.css
│    ├── grid.css
│    └── [layout name].css
├── 📂 vendors
│    └── [vendor name].css
├── 📂 components
│    ├── button.css
│    └── [component name].css
├── 📂 utilities
│    └── [utilitie name].css
└── global.css
```

### 本番ディレクトリ

[Astro](https://astro.build/) 環境を除き、ビルド後の CSS ファイルは、`global-ハッシュ値.css` にまとめてください。

```txt
📂 dist
└── 📂 assets
     └── 📂 styles
          └── global-ハッシュ値.css
```

::: info
Orelop 環境の場合は、デフォルトで `global-ハッシュ値.css` にまとめられます。
:::

[Astro](https://astro.build/) 環境の場合は、[Astro の構成](https://docs.astro.build/ja/guides/styling/#%E6%9C%AC%E7%95%AA%E7%92%B0%E5%A2%83) に従います。

## レイヤーとインポート

`@layer` を用いて、以下のCSSレイヤーを定義し、該当するレイヤーにスタイルを追加してください。

1. `settings` - カスタムプロパティの設定
2. `base` - リセットCSSやベーススタイル
3. `layouts` - レイアウトに関するスタイル
4. `vendors` - ライブラリやフレームワークのスタイル
5. `components` - ページを構成する再利用可能なパーツのスタイル
6. `utilities` - 僅かなスタイル調整用のスタイル




なお、`global.css` には直接スタイルを記述せず、各役割ごとに分割したCSSファイルを、レイヤーごとに `@import` で読み込んでください。

```css
@layer settings, base, layouts, vendors, components, utilities;

/* ============================================
  1.0 - Settings
============================================ */
@import "settings/variables.css" layer(settings);

/* ============================================
  2.0 - Base
============================================ */
@import "base/reset.css" layer(base);

/* ============================================
  3.0 - Layouts
============================================ */
@import "layouts/container.css" layer(layouts);
@import "layouts/grid.css" layer(layouts);

/* ============================================
  4.0 - Vendors
============================================ */
@import "vendors/splide.css" layer(vendors);

/* ============================================
  5.0 - Components
============================================ */
@import "components/button.css" layer(components);

/* ============================================
  6.0 - Utilities
============================================ */
@import "utilities/display.css" layer(utilities);
```


::: info
詳細は「本気で始めるCSS入門」 → 「Lesson 26 インポートとカスケードレイヤー」を参照してください。
:::

[Astro](https://astro.build/) 環境においての、レイアウト や コンポーネントのスタイルは、 `.astro` ファイル内の `style` 要素にスコープして記述してください。ただし、グローバルに利用するスタイルに関しては、上記のようにCSSファイルで管理し `global.css` に読み込んでください。

```astro
<style>
@layer components {
 .c-button {
  /* ボタンのスタイル */
 }
}
</style>
```


::: info
詳細は「静的サイトジェネレーター Astro 講座」を参照してください。
:::



## セレクタの選定

セレクタは予測性、再利用性、保守性、拡張性を意識し、以下のルールで指定してください。

1. セレクタは原則としてクラスセレクタを使用する。
2. IDセレクタは使用しない。
3. 状態の管理は動的擬似クラスやUI要素状態擬似クラス、または属性セレクタを使用する。
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
.c-stack {
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
.c-nav-global {
  & :where(li) {
    border: 1px solid;
  }
}
```

### 状態管理

状態管理は クラスセレクタ（ `is-*` など）を使用せず、動的擬似クラス（`:hover` や `:focus-visble` など）、UI要素状態擬似クラス（`:checked` や `:disabled` など）、属性セレクタ（ `[open]` や `[aria-*]` 、`[data-*]` など）を使用してください。

```css
.c-button:hover,
.c-button:focus-visible {
  background-color: var(--color-blue);
}

.c-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.c-button[aria-expanded="true"] {
  background-color: var(--color-blue);
}
```

::: info
詳細は「本気で始めるCSS入門」 → 「Lesson9 セレクタと詳細度」を参照してください。
:::


## クラス名の命名規則

クラス名は BEM システムのシンタックスである、Block、Element、Modifier に分類して構成される [MindBEMding](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) のアイデアを基本的に採用します。


```css
.c-card {
  display: block grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
 }

.c-card__body {
  padding: calc(24 * var(--torem));
}

.c-card__title {
  font-size: calc(24 * var(--torem));
}
```


ただし、Modifier には原則クラスセレクタを利用せず、[状態管理](#%E7%8A%B6%E6%85%8B%E7%AE%A1%E7%90%86) のルールに基づいて、動的擬似クラスやUI要素状態擬似クラス、または属性セレクタを使用してください。

また、影響範囲が明確な場合は、親 Block または、親 Element に定義されたカスタムプロパティの継承によって、スタイルを変化させる方法も許容します。

```css
.c-card {
  --button-background-color: var(--color-blue);
}

.c-media__button {
  --button-background-color: var(--color-red);
}

.c-button {
  background-color: var(--button-background-color, var(--color-dark));
}
```




やむを得ず、クラスセレクタを利用する場合は、Block、Element を省略し「`-modifier`」のようにハイフンひとつを接頭辞としても構いません。

ただし、プロジェクト内で統一してください。

```css
.c-button.-large { … }
.c-button.-medium { … }
.c-button.-small { … }
```


### 接頭辞

各スタイルは役割を明確にするために、レイヤーに合わせて接頭辞を設けることを推奨します。

| 種類                  | 接頭辞 |
| :-------------------- | :----- |
| Layouts レイヤー       | `l-`   |
| Components レイヤー    | `c-`   |
| Utilities レイヤー      | `u-`   |


なお、ブロック名やエレメント名、モディファイア名はケバブケースでの命名を行ってください。



```html
<!-- 🙅‍♂️ 悪い例 -->
<nav class="c-nav_global">...</nav>

<!-- 🙆‍♀️ 良い例 -->
<nav class="c-nav-global">...</nav>
```

::: info
詳細は「カオスにならないCSSを書くためのCSS設計 講座」 を参照してください。
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

    `font-family`、`color`、`text-align`、`text-decoration`、`vertical-align`、`white-space` など

6. その他のプロパティ

    `animation`、`transition` など

※上記 6 つのブロックが確立されていれば、その中でのプロパティの順番は問いません。


::: info
Orelop 環境の場合は、[stylelint](https://stylelint.io/) によって自動で並び変わります。
:::

## ベンダープレフィックスの順序

ベンダープレフィックスは、[Lightning CSS](https://lightningcss.dev/)（推奨）、または [autoprefixer](https://www.npmjs.com/package/autoprefixer) を利用し自動で付与するため手動で記述しないでください。

なお、ベンダープレフィックスは以下の順番で宣言されます。

1. `-webkit-`
2. `-moz-`
3. `-ms-`
4. `-o-`
5. ベンダープレフィックスなしのプロパティ

::: info
Orelop 環境の場合は、自動で付与され並び順も変わります。
:::

ただし、CSSの標準ではないプロパティにおいては手動でベンダープレフィックスを付与してください。

```css
:where(html) {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```



## ショートハンドの使い方

ショートハンドによる指定は許容しますが、以下のルールに従って使用してください。

- 親要素のスタイルが継承されるプロパティでは使用しない。
- 値が一つの場合は使用しない。
- `font` のショートハンドは使用しない。


## 値の指定




### 単位の省略

値が `0` の場合は単位を省略してください。

```css
.l-spacer {
  margin-block-start: 0;
}
```

ただし、`0.5` などのように、小数点以下の値が存在する場合は `0` を省略しないでください。

```css
.c-heading {
  letter-spacing: 0.5em;
}
```

::: info
Orelop 環境の場合は、[Biome](https://biomejs.dev/ja/) によって自動で解決します。
:::

### 文字サイズに応じて可変
ブラウザの文字サイズ変更機能などによって文字サイズに応じて可変した方が良い箇所では、文字サイズによる相対的な長さの単位（`rem` や `em` など）を利用してください。

- `font-size`
- `leter-spacing` (`em` を推奨)
- テキストコンテンツを子孫に含む要素の`margin`、`padding` や `boder-radius`

などがこれに該当します。

なお、`clamp()` を利用する場合の推奨値にも、`rem` を組みわせて指定してください。


```css
.l-spacer {
  margin-block-start: clamp(2.5rem, 1.9718rem + 2.2535vi, 4rem);;
}

.c-heading {
  font-size: clamp(2rem, 1.6479rem + 1.5023cqi, 3rem);
  letter-spacing: 0.25em;
}
```

また、予測性をや保守性を考慮して、可能な限り、`rem` 値などを直接指定せず、`calc()` を使って `px` を `rem` に変換する式で指定してください。

```css
:root {
  --torem: calc(1rem / 16);
}

.c-heading {
  font-size: calc(24 * var(--torem));
}
```


::: info
詳細は「本気で始めるCSS入門」 → 「Lesson2 フォント関連のプロパティ – 前編 –」と「Lesson24 関数」を参照してください。
:::

### line-height

`line-height` は原則単位なしの数値でしてください。


```css
.c-heading {
  line-height: 1.5;
}
```

::: info
詳細は「本気で始めるCSS入門」 → 「Lesson3 フォント関連のプロパティ – 後編 –」 → 「Chapter3 行の高さ」を参照してください。
:::

### font-weight

`font-weight` は数値で指定してください。

```css
.c-heading {
  font-weight: 700;
}
```
::: info
詳細は「本気で始めるCSS入門」 → 「Lesson2 フォント関連のプロパティ – 前編 –」 → 「Chapter3 文字の太さ」を参照してください。
:::

### background-image と border-image


JPEG、または PNG 形式の画像を利用する場合は、 `image-set()` 関数を使ってRetina Display などの高解像ディスプレイへの対応を行ってください。


```css
:where(body) {
  background-image: image-set(
    url("/assets/images/bg-noize.png") 1x,
    url(("/assets/images/bg-noize@2x.png") 2x
  );
}
```

::: info
詳細は「本気で始めるCSS入門」 → 「Lesson7 背景画像と背景の一括指定」 → 「Chapter1 背景画像」を参照してください。
:::


## レスポンシブ対応

モバイルデバイス対応についてはレスポンシブ Web デザインを採用します。




### メディアクエリ

メディアクエリを使ってレスポンシブ対応を行う場合は、以下のブレークポイントを基本とした、カスタムメディアクエリを定義し、ビューポート幅が、`375px` 〜 `1920px` までの間でレイアウトが崩れないように調整してください。



| サイズ | 値 | ブレークポイント |
| :----- | :--- | :--------------- |
| `--sm`  | `width >= 36rem`   | `576px`          |
| `--md`  | `width >= 48rem`   | `768px`          |
| `--lg`   | `width >= 64rem`  | `1024px`          |
| `--xl`  | `width >= 80rem`   | `1280px`         |
| `--xxl`  | `width >= 96rem`  | `1536px`         |


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

ビルド後は以下のCSSが出力されます。

```css
@media (min-width: 576px) {
  /* md サイズ以上のスタイル  */
}

@media (min-width: 768px) {
  /* lg サイズ以上のスタイル  */
}
```

::: info
Orelop 環境の場合は、上記のカスタムメディアクエリがあらかじめ定義されています。
:::

::: info
詳細は「本気で始めるCSS入門」 → 「Lesson 23 メディアクエリ」を参照してください。
:::

### コンテナークエリ

対応ブラウザに問題がない場合は、コンテナークエリーによるレスポンシブ対応を推奨します。

```css
.l-container {
  container: container / inline-size
}

.l-grid {
  display: block grid;
  grid-template-columns: repeat(var(--grid-cols, 1), minmax(0, 1fr));

  @container container (inline-size >= 40rem) {
    --grid-cols: 2;
  }

  @container container (inline-size >= 60rem) {
    --grid-cols: 3;
  }
}

.c-heading {
  font-size: clamp(1.5rem, 1.6479rem + 1.5023cqi, 2rem);
}
```

::: info
詳細は「本気で始めるCSS入門」 → 「Lesson 27 コンテナークエリ」を参照してください。
:::

## スタイルのネスト

スタイルは、[CSS nesting](https://drafts.csswg.org/css-nesting-1/) を活用して記述してください。

ネストする際の記述順序は以下の通りです。

1. 要素のスタイル
2. 要素のメディアクエリ または、コンテナークエリ
3. 擬似要素
4. 擬似クラス
    1. 動的擬似クラス
    2. UI要素状態擬似クラス
    3. 構造擬似クラス
5. 結合子
    1. 次兄弟（`+`）
    2. 後続兄弟（`~`）
    3. 子（`>`）
    4. 子孫


上記、3以降のセレクタ内にも、メディアクエリ または、コンテナークエリのネストを許容しますが、ネストが深くなりすぎないように注意してください。

```css
.c-button {
  /* 1. 要素のスタイル */
  display: block grid;

  /* 2. 要素のメディアクエリ または、コンテナークエリ */
  @container container (inline-size >= 40rem) {
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

::: info
詳細は「本気で始めるCSS入門」 → 「Lesson9 セレクタと詳細度」と「Lesson 25 ネスティングルール」を参照してください。
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
