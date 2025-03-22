# JavaScript ガイドライン

品質の確保と、予測性、再利用性、保守性、拡張性を向上することを目的に、以下のガイドラインに則ったコーディングを行ってください。

## 基本ルール

- 変数名（プロパティ名）や関数名（メソッド名）は[キャメルケース](./glossary.html#キャメルケース)を使用する
- クラス名は[パスカルケース](./glossary.html#パスカルケース)を使用する
- 引用符はダブルクォート（`"`）を使用する
- ステートメントの末尾には `;` を付ける
- パフォーマンスに考慮する
- [Biome](https://biomejs.dev/ja/) によるコードフォーマットと解析を行いエラーに対応する

## altJS

[TypeScript](https://www.typescriptlang.org/) による型定義を行った開発を推奨します。

TypeScript は、[Vite](https://ja.vite.dev/) の [esbuild](https://esbuild.github.io/) によって、JavaScript にコンパイル（トランスパイル）されます。

ただし、チームのコーディングメンバーに TypeScript の学習が終わっていない方がいる場合は、Vanila JS で開発を行なってください。

[jQuery](https://jquery.com/) は原則として利用しませんが、既存のプロジェクトで利用している場合など、利用する必要がある場合には、jQuery を使った開発も許容します。

## ファイル構成

JavaScript（TypeScript） ファイルは、機能ごとに分割し、該当するディレクトリに保存してください。

### 開発ディレクトリ

```
📂 scripts
├── 📂 libs
│    ├── animations.ts
│    ├── Loading.ts
│    ├── Toggle.ts
│    └── [library name].ts
├── 📂 utils
│    └── [utilitie name].css
└── main.ts
```



各ディレクトリ名や各ファイル名は [命名規則](./naming.html) を参照してください。

### 本番ディレクトリ

[Astro](https://astro.build/) 環境を除き、ビルド後の JavaScript ファイルは、`main-ハッシュ値.js` にまとめてください。

```
📂 dist
└── 📂 assets
     └── 📂 scripts
          └── main-ハッシュ値.js
```

::: tip 👨‍💻 Orelop 環境の場合
Orelop 環境の場合は、デフォルトで `main-ハッシュ値.js` にまとめられます。
:::

[Astro](https://astro.build/) 環境の場合は、Astro の構成に従います。

## ライブラリとフレームワーク

必要に応じて NPM などに公開されているライブラリを利用してください。

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

::: tip jQuery の利用
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

プロジェクトによっては、[Vue.js](https://ja.vuejs.org/) などの部分的に(HTML や CSS がそのまま)利用できるフレームワークも許容します。

ただし、チームのコーディングメンバーに、これらの学習を終えていないメンバーがいる場合には、サポート可能な範囲で利用するか、利用を控えてください。

また、比較的シンプルで学習コストの低い、[Alpine.js](https://alpinejs.dev/) の利用を検討してください。

なお、これらのフレームワークでの開発は、本ガイドラインの範囲を超えているため各フレームワークの仕様に沿って実装してください。

::: info Orelop 環境インストール時に選択できるライブラリやフレームワーク
Orelop 環境の場合は、インストール時のオプションで以下のライブラリやフレームワークをインストールできます。

- [GSAP](https://greensock.com/gsap/)
- [Splide](https://splidejs.com/)
- [Rola](https://hilosiva.github.io/rola/)
- [htmx](https://htmx.org/)
- [Alpine.js](https://alpinejs.dev/)

:::

## モジュール化

JavaScript（TypeScript） は、機能ごとにファイルを分割し、ESModules でモジュール化してください。

### エクスポート

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

### インポート

HTML 環境の場合は、`main.ts` に `import` して利用してください。

```js
// main.ts
// クラスのインポート
import ClassName from "./libs/ClassName";
import { funcName } from "./libs/funcName";

new ClassName();

funcName();
```

[Astro](https://astro.build/) 環境においては、レイアウト全体で利用する場合は、レイアウトの `.astro` ファイル、各コンポーネント固有のスクリプトは、コンポーネントの `.astro` ファイルの `script` 要素内で `import` してください。

::: code-group

```astro [Layout.astro]
<script>
import ClassName from "./libs/ClassName";

new ClassName();
</script>
```

```astro [Component.astro]
<script>
import { funcName } from "./libs/funcName";

funcName();
</script>
```

:::

## 変数と定数

再代入を行わない場合は `const` を利用し、再代入を行う場合は `let` を使って宣言してください。
原則、`var` による宣言は禁止とします。

```js
// 🙅‍♂️ 悪い例
let projectName = "Sample Company";

// 🙆‍♀️ 良い例
const projectName = "Sample Company";
```

## 文字列

変数の値を他のデータと一緒に代入、または出力する際は文字列連結演算子を使用せず、テンプレートリテラルを使用してください。

```js
// 🙅‍♂️ 悪い例
console.log("私たちは" + projectName + "です。");

// 🙆‍♀️ 良い例
console.log(`私たちは${projectName}です。`);
```

## 配列

配列は、コンストラクターではなくリテラルを使用して作成してください。

```js
// 🙅‍♂️ 悪い例
const lists = new Array();

// 🙆‍♀️ 良い例
const lists = [];
```

また、値の重複を禁止する場合は、`Set` の使用を検討してください。

```js
const completeIds = new Set();
```

## オブジェクト

一般的なオブジェクトは、コンストラクターではなくリテラルを使用して作成してください。

```js
// 🙅‍♂️ 悪い例
const props = new Object();

// 🙆‍♀️ 良い例
const props = {};
```

また、値の重複を禁止する場合は、`Map` の使用を検討してください。

```js
const users = new Map();
```

## クラス

クラスは、コンストラクター関数やプロトタイプを使用せず、クラス構文を使用してください。

```js
// 🙅‍♂️ 悪い例
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.greeting = function () {
    console.log(`こんにちは。${this.name}です。`);
  };
}

// 🙆‍♀️ 良い例
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`こんにちは。${this.name}です。`);
  }
}
```

## 関数

関数の宣言は、意図しない再代入や巻き上げを防ぐために関数式を推奨します。

```js
// 🙅‍♂️ 悪い例
function sum(a, b) {
  return a + b;
}

// 🙆‍♀️ 良い例
const sum = function (a, b) {
  return a + b;
};
```

なお、ユーティリティ関数や無名関数をコールバックとして渡す場合で、`this` にアクセスしないケースにおいては、アロー関数を使用してください。

```js
button.addEventListener("click", () => {
  console.log('クリックされたよ')；
});
```

## 条件分岐

### 等値演算子

「等しい」、「等しくない」を評価する際は、厳密等値演算子（`===`）および、厳密不等価演算子（`!==`）の使用を原則とします。

```js
// 🙅‍♂️ 悪い例
if (target == "_blank") {
  console.log("新しいウインドウで開きます");
}

// 🙆‍♀️ 良い例
if (target === "_blank") {
  console.log("新しいウインドウで開きます");
}
```

なお、論理値の評価は等価演算子は使わず省略形式を使用してください。

```js
// 🙅‍♂️ 悪い例
if (isOpen === true) {
  console.log("開いています。");
}

// 🙆‍♀️ 良い例
if (isOpen) {
  console.log("開いています。");
}
```

### 三項演算子

条件に応じて変数に値を格納するためだけのシンプルな条件分岐には三項演算子を使用してください。

```js
// 🙅‍♂️ 悪い例
if (isFlag) {
  const message = "正しいです";
} else {
  const message = "正しくないです";
}

// 🙆‍♀️ 良い例
const message = isFlag ? "正しいです" : "正しくないです";
```

### 早期 return

`else` 文や ネストを減らすため、早期`return` を意識してください。

```js
// 🙅‍♂️ 悪い例
const getDiscount = (price) => {
  if (price >= 10000) {
    if (price >= 50000) {
      return 20;
    } else {
      return 10;
    }
  } else {
    return 0;
  }
};

// 🙆‍♀️ 良い例
const getDiscount = (price) => {
  if (price >= 50000) return 20;
  if (price >= 10000) return 10;
  return 0;
};
```

## 反復

コレクションの全ての要素を反復処理するような場合は、`for...of` または `forEach()` を使用してください。

```js
// 🙅‍♂️ 悪い例
for (let i = 0; i < todos.length; i++) {
  console.log(todos[i]);
}

// 🙆‍♀️ 良い例
todos.forEach((todo) => {
  console.log(todo);
});
```

ただし、`forEach()` は、大量のコレクションを反復する場合にパフォーマンスに影響が出る可能性があるため、可能な限り `for...of` を使用することを推奨します。

また、`for...of` を使うことで、反復処理内で `await` を使った非同期処理も扱いやすくなります。

```js
for (const todo of todos) {
  console.log(todo);
}
```

## タイマー処理

アニメーションのためのタイマー処理は、`setTimeout()` や `setInterval()` より、`requestAnimationFrame` を優先してください。

ブラウザのフレームレートに合わせて最適に描画処理が行われるため、パフォーマンスの向上が期待できます。

```js
// 🙅‍♂️ 悪い例
let position = 0;

const move = function () {
  position += 1;
  element.style.setProperty("--move", `${position}px`);
};

setInterval(move, 16);

// 🙆‍♀️ 良い例
let position = 0;
let rafid;

const move = function () {
  position += 1;
  element.style.setProperty("--move", `${position}px`);

  cancelAnimationFrame(rafid);
  rafid = requestAnimationFrame(move);
};

rafid = requestAnimationFrame(move);
```

## 非同期処理

非同期処理には、原則、 `async` / `await` 構文を使用し、コールバック地獄にはならないようにしてください。

また、非同期通信を行う際には、`XMLHttpRequest` や外部ライブラリの [axios](https://github.com/axios/axios) は使用せず、`fetch()` を使用してください。

```js
// 🙅‍♂️ 悪い例
function getData(url) {
  return new Promise((resolve, reject) => {
    const XHR = new XMLHttpRequest();
    XHR.open("GET", url);
    XHR.onload = function () {
      if (XHR.status === 200) {
        resolve(JSON.parse(XHR.responseText));
      } else {
        reject(new Error(`リクエスト失敗: ${XHR.status}`));
      }
    };
    XHR.onerror = function () {
      reject(new Error("ネットワークエラー"));
    };
    XHR.send();
  });
}

getData("sample.json")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// 🙆‍♀️ 良い例
async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`リクエスト失敗: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

try {
  const data = await getData("sample.json");
  console.log(data);
} catch (error) {
  console.error(error);
}
```

## エラーハンドリング

非同期処理（`Promise` が `reject` された）や、ローカルストレージやセッションストレージへのアクセス（ストレージが存在しない）など、予期しないエラーが発生する可能性がある場合は、`try...catch` を使用してエラーハンドリグを行なってください。

```js
// 🙅‍♂️ 悪い例
const user = JSON.parse(localStorage.getItem("users"));

// 🙆‍♀️ 良い例
try {
  const user = JSON.parse(localStorage.getItem("users"));
} catch (error) {
  console.error("ローカルストレージの読み込みエラー:", error);
}
```

## イベント

### スクロールイベント

`scroll` イベントは、ユーザーがスクロールする度にイベントが発生しパフォーマンスに影響が出る可能性があります。

ビューポート内の要素にスクロール関連のイベントを使う場合は、`IntersectionObserver` で対応できないかを検討してください。

### リサイズイベント

`resize` イベントは、ユーザーがリサイズする度にイベントが発生しパフォーマンスに影響が出る可能性があります。

特定の要素のサイズ変更に応じたイベントを使う場合は、`ResizeObserver` で対応できないかを検討してください。

また、`window.matchMedia()` を使えば、JavaScript でメディアクエリが使えます。

## HTML テキストの挿入

HTML の要素にテキストコンテンツを挿入する場合は、`textContent` を使用してください。

HTML のタグをテキストとして挿入する必要がある場合は `innerText` も許容します。

ただし、`innerHTML` は、挿入するコンテンツに安全性が確保できない場合（ユーザーが投稿したコンテンツなど）は、セキュリティの観点から使用しないでください。

```js
// 🙅‍♂️ 悪い例
const container = document.querySelector("[data-container]");
container.innerHTML = text;

// 🙆‍♀️ 良い例
const container = document.querySelector("[data-container]");
container.textContent = text;
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

buttonDarkTheme?.addEventListener("click", () => {
  document.body.setAttribute("data-theme", "dark");
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

buttonMove?.addEventListener("click", () => {
  targetMove?.style.setProperty("--move", "50%");
});
```

::: tip Vue.js などのフレームワークの場合
[Vue.js](https://ja.vuejs.org/) などのフレームワークを使っている場合は、それぞれのフレームワークの機能（ `ref`、`v-bind`、`v-on` など ）を使ってデータの受け渡しをしてください。
:::

## 視差効果

ユーザーの中には、OS の「視差効果を減らす」オプションを有効にしている方もいます。

このオプションを有効にしているユーザーに過度なアニメーションを提供しないようにしてください。

`window.matchMedia()` を活用することで、ユーザーが「視差効果を減らす」オプションを有効にしているかを判断することができます。

```js
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let isReduceMotion = prefersReducedMotion.matches;

prefersReducedMotion.addEventListener("change", () => {
  isReduceMotion = prefersReducedMotion.matches;
});

if (!isReduceMotion) {
  animation();
}
```
