# JavaScript ガイドライン

JavaScript は動的な表現が必要な際と、外部 API などを利用する際に使用します。


## 基本ルール
1. HTML や CSS で出来ないかを考えてから使用してください。
2. ユーザビリティを考慮し、動作が遅くならないように注意する。
3. 動作チェックの他に、見ただけでは分からないようなエラーがないかコンソールで確認する。
4. JavaScriptが無効になっている場合にも、コンテンツが正常に表示されるように注意する。
5. OSの「視差効果を減らす」オプションを有効にしてるユーザーには、`matchMedia` を使って、アニメーションを制御する。
6. [Biome](https://biomejs.dev/ja/) によるコードフォーマットと検証を行う。

## コンパイルとトランスパイル

[TypeScript](https://www.typescriptlang.org/)（推奨） または、JavaScript を使って、新たしい構文にも対応した、Vanila JS による開発を推奨します。


[jQuery](https://jquery.com/) は原則として利用しませんが、既存のプロジェクトで利用している場合など、利用する必要がある場合には、jQuery を使った開発も許容します。





## ファイル構成

JavaScript（TypeScript） ファイルは、機能ごとに分割し、該当するディレクトリに保存してください。


### 開発ディレクトリ
```txt
📂 scripts
├── 📂 libs
│    ├── Loading.ts
│    ├── Toggle.ts
│    └── [library name].ts
├── 📂 utils
│    └── [utilitie name].css
└── main.ts
```

### 本番ディレクトリ

[Astro](https://astro.build/) 環境を除き、ビルド後の JavaScript ファイルは、`main-ハッシュ値.js` にまとめてください。

```txt
📂 dist
└── 📂 assets
     └── 📂 scripts
          └── main-ハッシュ値.js
```

::: tip Orelop 環境の場合
Orelop 環境の場合は、デフォルトで `main-ハッシュ値.js` にまとめられます。
:::

[Astro](https://astro.build/) 環境の場合は、Astro の構成に従います。


## ライブラリの利用

必要に応じて NPMなどに公開されているライブラリやモジュールを利用してください。

堅牢性を考慮して、ライブラリは原則 CDN で読み込むことはせず、パッケージマネージャー（ pnpm 推奨） でインストールし、`import` して利用してください。


::: code-group
```zsh [npm]
npm install [library name] - D
```

```zsh [Yarn]
yarn add [library name] - D
```

```zsh [pnpm]
pnpm add [library name] - D
```
:::



::: info Orelop 環境インストール時に選択できるライブラリ
Orelop 環境の場合は、インストール時のオプションで以下のライブラリをインストールできます。

- [GSAP](https://greensock.com/gsap/)
- [Splide](https://splidejs.com/)
- [Rola](https://hilosiva.github.io/rola/)
- [htmx](https://htmx.org/)
- [Alpine.js](https://alpinejs.dev/)
:::




::: tip jQueryの利用
jQuery は原則利用しませんが、利用する場合はパッケージマネージャーでインストールし、`import` して利用してください。


::: code-group
```zsh [npm]
npm install jquery - D
```

```zsh [Yarn]
yarn add jquery - D
```

```zsh [pnpm]
pnpm add jquery - D
```
:::


## モジュール化

JavaScript（TypeScript） は、機能ごとにファイルを分割し、ESModules でモジュール化してください。

エクスポートは、名前付きエクスポートを推奨しますが、デフォルトエクスポートでも構いません。

```js
// libs/ClassName.js

// クラスのエクスポート（デフォルトエクスポート）
export default class ClassName {
  constructor() {
    // コンストラクタ
  }

  method() {
    // メソッド
  }
}
```


```js
// libs/funcName.js

// クラスのエクスポート（名前付きエクスポート）
export function funcName {
  // 処理内容
}
```

```js
// main.ts
// クラスのインポート
import ClassName from './libs/ClassName';
import { funcName } from './libs/funcName';

new ClassName();

funcName();
```


## データの受け渡し

HTML と JavaScript（TypeScript） のデータの受け渡しは、`data-*` 属性を利用してください。

```html
<button type="button" data-action="dark">Dark Mode</button>
```

```css
:where(body) {
  &[data-theme="dark"] {
    background-color: var(--color-dark);
  }
}
```

```js
const buttonDarkTheme = document.querySelector('[data-action="dark"]');

buttonDarkTheme?.addEventListener('click', () => {
  document.body.setAttribute('data-theme', 'dark');
});
```



また、JavaScript（TypeScript） から 直接的なスタイルをセットする場合は、`style` 属性に直接プロパティをセットするのではなく、カスタムプロパティを利用してください。

```html
<div class="c-box" data-target="move">Box</div>

<button type="button" data-action="move">Move</button>
```

```css
.c-box {
  translate: var(--move, 0);
}
```

```js
const targetMove = document.querySelector('[data-target="move"]');
const buttonMove = document.querySelector('[data-action="move"]');

buttonMove?.addEventListener('click', () => {
  targetMove?.style.setProperty('--move', '50%');
});
```
