# HTML ガイドライン

セマンティックで、アクセシブルなマークアップを行うことを目的に、以下のガイドラインに則ったコーディングを行ってください。


## 基本ルール

以下を基本ルールとして、[HTML Standard](https://html.spec.whatwg.org/multipage/) に則ったマークアップを行ってください。


1. タグ名や属性名は小文字で記述する
2. 終了タグは省略しない
3. エンプティ要素（`img`, `br`, `meta`, `link` など）は開始タグの末尾に `/` を記述する
4. `div` や `span` は、他に適切な要素がない場合にのみ利用する
5. 入れ子にした要素は、適切に改行、インデントを行う
6. 属性値の引用符はダブルクォート（`"`）を利用する
7. ブール型属性の属性値は省略し、属性名のみ記述する
8. 視覚表現（レイアウトや装飾、アニメーションなど）はHTMLで行わない
9. [Prettier](https://prettier.io/) によるコードフォーマットを行う
10. [Markuplint](https://markuplint.dev/ja/) によるコード解析を行いエラーに対応する



## ファイル構成


::: code-group
``` [HTML]
📂 src                            # 開発ディレクトリ
├── 📂 category-name              # 下層ページ
│    ├── page-name.html
│    └── index.html
└── index.html
```


``` [Astro]
📂 src                            # 開発ディレクトリ
├── 📂 components                 # コンポーネント
│    └── Component-name.astro
├── 📂 layouts                    # レイアウト
│    └── Layout-name.astro
└── 📂 pages                      # ページ
     ├── 📂 category-name         # 下層ページ
     │    └── index.astro
     └── index.astro
```
:::

トップページは、開発ディレクトリの直下に `index.html` （Astro 環境の場合は `page` ディレクトリの直下に `index.astro` ）として配置してください。

下層ページは、カテゴリー毎にディレクトリを作成し、その中に `index.html` （Astro 環境の場合は `index.astro` ）として配置してください。



## HTML の特殊文字

HTML の特殊文字は名前付き文字参照で記述してください。


```html
<!-- 🙅‍♂️ 悪い例 -->
&、<、>、"、'

<!-- 🙆‍♀️ 良い例 -->
&amp;、&lt;、&gt;、&quot;, &apos;
```

URL内の `&` も対象です。

```html
<!-- 🙅‍♂️ 悪い例 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">

<!-- 🙆‍♀️ 良い例 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;family=Noto+Sans+JP:wght@100..900&amp;display=swap" rel="stylesheet">
```

::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson3 テキスト関連の要素 – インライン編 –」→「Chapter2 特殊な記述が必要な要素」を参照してください。
:::




## DOCTYPE

特別な指示がない限り、必要最低限の DOCTYPE のみ記述します。

```html
<!DOCTYPE html>
```

::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson1 HTMLの基本」→「Chapter6 HTMLのバージョンとDOCTYPE」を参照してください。
:::


## head 要素

`head` 要素内は以下の順番で記述して下さい。

1. `meta` 要素
   1. `charset` 属性
   2. `http-equiv` 属性
   3. `name` 属性
   4. `property` 属性
   5. その他
2. `title` 要素
3. `link` 要素
   1. `stylesheet` 属性
   2. `canonical` 属性
   3. `icon` 属性
   4. `apple-touch-icon` 属性
   5. `alternate` 属性
   6. その他
4. `style` 要素
5. `script` 要素
6. その他

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width" />
  <meta name="description" content="DescriptionText…" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="author" content="/humans.txt" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@twitter" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="PageTitle | SiteName" />
  <meta property="og:description" content="DescriptionText…" />
  <meta property="og:url" content="https://example.com" />
  <meta property="og:site_name" content="SiteName" />
  <meta property="og:image" content="https://example.com/assets/images/ogp.png" />
  <meta property="fb:app_id" content="0123456" />
  <title>PageTitle | SiteName</title>
  <link rel="stylesheet" href="/assets/styles/global.css" />
  <link rel="canonical" href="https://example.com">
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
  <script type="module" src="/assets/scripts/main.ts"></script>
</head>
```

## titile 要素

ユーザビリティ、アクセシビリティ、SEO の観点から適切な内容を記述してください。

なお、特に指示がない限りセパレーターは `|`（半角縦棒）」を利用してください。

### トップページ

サイト名に加え、所在地や主要なサービスや商品を 32 文字程度で記述してください。


```html
<!-- 🙅‍♂️ 悪い例 -->
<title>Sample Company</title>

<!-- 🙆‍♀️ 良い例 -->
<title>Sample Company | 大阪にあるワクワクを創造するWeb制作会社</title>
```

::: info 教材
詳細は「Webディレクション講座」→「Lesson6 効果的なSEO」を参照してください。
:::

### 下層ページ

内容がわかる各ページ固有のページ名とカテゴリ名、サイト名を記述してください。


```html
<!-- 🙅‍♂️ 悪い例 -->
<title>Sample Company | レスポンシブWebデザイン</title>

<!-- 🙆‍♀️ 良い例 -->
<title>レスポンシブWebデザイン | 出来ること | Sample Company</title>
```

::: info 教材
詳細は「Webディレクション講座」→「Lesson6 効果的なSEO」を参照してください。
:::

## meta 要素

以下の `meta` 要素を配置してください。

### 文字エンコーディング

`UTF-8` を使用してください。また、ファイルは `UTF-8`（BOM 無し）で保存してください。

```html
<meta charset="UTF-8" />
```

::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson1 HTMLの基本」→「Chapter7 文字エンコーディングと文字化け」を参照してください。
:::

### ビューポート

モバイルデバイス対応のため `width=device-width` にしてください。

```html
<meta name="viewport" content="width=device-width" />
```


### 紹介文

ページの内容がわかる紹介文を 124 文字程度で記述してください。

ただし、本文中の文章をそのまま使うことは禁止します。

```html
<meta name="description" content="レスポンシブWebデザインとは様々なデバイスに最適なデザインを提供するサイト構築方法の一つです。レスポンシブWebデザインでWebサイトを構築することでWebサイトのメンテナンス性も向上します。さぁあなたのサイトもレスポンシブWebデザインで構築しよう。" />
```

::: info 教材
詳細は「Webディレクション講座」→「Lesson6 効果的なSEO」を参照してください。
:::

### 電話番号の自動リンク機能

連続した数値が電話番号としてリンクされるのを防ぐため、`telephone=no` を指定してください。

```html
<meta name="format-detection" content="telephone=no" />
```


### Twitter カード と OGP

SNSへのシェア時に表示される情報を設定してください。
なお、`og:type` は、ページの種類に応じて `website` または `article` などの種類を適切に指定し、`og:type` に合わせた追加情報（ `article:published_time` や `article:author` など）も設定してください。

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@twitter" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PageTitle | SiteName" />
<meta property="og:description" content="DescriptionText…" />
<meta property="og:image" content="https://example.com/assets/images/ogp.png" />
<meta property="og:site_name" content="SiteName" />
<meta property="og:image" content="/assets/images/ogp.png" />
```

::: warning OGP画像のURL
`og:image` は、相対URLでは認識しないSNSもあるため、絶対URLで指定してください。
:::

::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson14 ページの情報」→「Chapter2 SNSの共有情報を設定」を参照してください。
:::


### その他

以下は、基本的に必要ありませんが、指示があった場合などは、必要に応じて追加してください。


#### keywords

特別な理由で使用する場合はページの内容に関連したキーワードを 5 個程度で記述してください。

```html
<meta name="keywords" content="レスポンシブWebデザイン,スマートフォンサイト,Web制作,大阪,Sample Company" />
```

#### author

特別な理由で使用する場合は humans.txt を作成し、読み込ませてください。

```html
<meta name="author" content="/humans.txt" />
```


## CSS ファイルの読み込み

外部ファイル化したCSS（SCSS）を `<link>` で読み込んでください。

なお、`style` 属性にスタイルを記述する Inline CSS は、カスタムプロパティの定義を除き、原則禁止します。


::: code-group
```html [CSS]
<link rel="stylesheet" href="/assets/styles/global.css" />
```

```html [SCSS]
<link rel="stylesheet" href="/assets/styles/global.scss" />
```
:::

::: tip Astro環境の場合
[Astro](https://astro.build/) 環境の場合は、グローバルで利用するスタイルは外部ファイル化し、レイアウトファイルのフロントマターに `import` で読み込み、レイアウトやコンポーネント固有のスタイルは、`<style>` 要素にCSSを記述してください。


```astro [Astro]
---
import "@styles/global.css"; // SCSSの場合は .scss
---
```
:::












## JavaScript ファイルの読み込み
[Astro](https://astro.build/) 環境を除き、メインとなる JavaScript（TypeScript） ファイルを `type="module"` を指定した `<script>` で、読み込んでください。

::: code-group
```html [JavaScript]
<script type="module" src="/assets/scripts/main.js"></script>
```

```html [TypeScript]
<script type="module" src="/assets/scripts/main.ts"></script>
```
:::


原則、JavaScriptライブラリはHTMLに読み込まず、JavaScriptファイル内に `import` で読み込んでください。

`import` を利用せず直接HTMLにライブラリを読み込む必要がある場合は、依存関係の読み込み順に考慮しつつ、
 `head` 要素内に、`defer` 属性を利用し、非同期で読み込んでください。

```html
<script src="/assets/scripts/alpinejs.min.js" defer></script>
<script type="module" src="/assets/scripts/main.ts"></script>
```


::: warning CDNは利用せずセルフホスト可能にする
原則 jQuery やその他ライブラリなどを利用する際は、パッケージマネージャーでインストールするなど、セルフホストが可能な状態で利用してください。やむを得ずCDNで読み込む必要がある場合は、軽量化（ミニファイ）されたものを読み込んでください。
:::




::: tip トラッキングコードやSNSの埋め込みコード
アクセス解析のトラッキングコードや、SNSの埋め込みコードに関しては、インラインで記述しても構いません。

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", trackingId);
</script>
```

:::








## ページの構成
ページのヘッダー、ナビゲーション、主要コンテンツ、フッターは、それぞれ、`header`、`nav`、`main`、`footer` 要素を用いて、暗黙のランドマークロール（`banner`、`navigation`、`main`、`contentinfo`）を持たせるように配置してください。

また、複数のランドマーク要素を配置する場合は、 `aria-label`、`aria-labelledby`属性を用いてアクセシブルな名前を指定してください。

```html
<body>
  <header><!-- role banner -->
    <nav aria-label="メインメニュー">
      ...
    </nav>
    ...
  </header>
  <main><!-- role main -->
    <nav aria-labelledby="local-nav">
      <h2 id="local-nav">ページ内メニュー</h2>
      ...
    </nav>
    ...
  </main>
  <footer><!-- role contentinfo -->
    ...
  </footer>
</body>
```


::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson13 セクションとグルーピング」→「Chapter2 基本構造の要素」を参照してください。
:::

## アウトライン
CMSなどによる投稿されたコンテンツを除き、セクショニング・コンテンツ（`section`, `artcle`, `nav`, `aside`）と見出し要素 （`h1` – `h6`）を用いて、アウトラインを生成してください。

ページの見出しは `h1` から始まり、コンテンツの階層に合わせた見出しレベルを適切に利用してください。


```html
<!-- 🙅‍♂️ 悪い例 -->
<h2>中見出し</h2>
<div>見出しに対する内容</div>
<h1>大見出し</h1>
<div>見出しに対する内容</div>
<h3>小見出し</h3>
<div>見出しに対する内容</div>
<h2>中見出し</h2>
<div>見出しに対する内容</div>

<!-- 🙆‍♀️ 良い例 -->
<h1>大見出し</h1>
<div>見出しに対する内容</div>
<section>
  <h2>中見出し</h2>
  <div>見出しに対する内容</div>
  <section>
    <h3>小見出し</h3>
    <div>見出しに対する内容</div>
  </section>
</section>
<section>
  <h2>中見出し</h2>
  <div>見出しに対する内容</div>
</section>
```


::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson13 セクションとグルーピング」→「Chapter1 セクショニング関連の要素」を参照してください。
:::

## フォーム

コンタクトフォームのようなフォームには、`form` 要素にアクセシブルな名前を指定し、`form` ランドマークとして配置してください。フォームの内容が検索の場合は `search` 要素内にフォームを内包してください。

```html
<!-- コンタクトフォーム -->
<form action="confirm.php" method="post" aria-labelledby="contact-form">
  <h2 id="contact-form">お問い合わせフォーム</h2>
  <p>
    <label>
      お名前（必須項目）
      <input type="text" name="name" placeholder="架空 太郎" autocomplete="name" required>
    </label>
  </p>
  <p>
    <label>
      メールアドレス（必須項目）
      <input type="email" name="email" placeholder="taro@example.com" autocomplete="email" inputmode="email" required>
    </label>
  </p>
  <p>
    <label>
      お問合せ内容（必須項目）
      <textarea name="inquiry" cols="30" rows="10" placeholder="御社の架空の理念に共感しました" required></textarea>
    </label>
  </p>

  <p><button>送信</button></p>
</form>

<!-- 検索フォーム -->
<search>
  <form action="search.php">
    <label>
      サイト内検索
      <input type="search" name="q">
    </label>
    <button>検索</button>
  </form>
</search>
```



## 改行
文の分割が重要な箇所（詩など）を除き、`br` 要素による改行は原則禁止します。
視覚的な改行は、`wbr` 要素または、`span` 要素（`display` を `block flow` または `inline flow-root` などにする）を活用して改行してください。

```html
<!-- 🙅‍♂️ 悪い例 -->
<p>架空会社Dummy Creationsは、<time datetime="2023-04-01">2023年4月1日</time>に<br>架空 太郎によって設立されました。</p>

<!-- 🙆‍♀️ 良い例 -->
<p>架空会社Dummy Creationsは、<time datetime="2023-04-01">2023年4月1日</time>に<wbr>架空 太郎によって設立されました。</p>
```

::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson3 テキスト関連の要素 – インライン編 –」→「Chapter3 改行を表す」と、「本気で始めるCSS入門」→「Lesson5 縦書きと折り返し」を参照してください。
:::

## リンクとリソースの参照

### プロジェクト内のリンクやリソース

プロジェクト内のリンクや、リソースを参照する際の `href` や `src` 属性は、`/` から始まるパス絶対URL（ルートパス）で指定してください。

なお、各ディレクトリ内の「index.html」へのリンクは、ファイル名を省略してください。


```html
<!-- 🙅‍♂️ 悪い例 -->
<a href="../about/index.html">About</a>

<!-- 🙆‍♀️ 良い例 -->
<a href="/about/">About</a>
```

### 外部リンク
外部リンクの `href` 属性は、`http` や `https` から始まる絶対URLで指定してください。

原則、`//` から始まる。スキーム相対URLは禁止します。

```html
<!-- 🙅‍♂️ 悪い例 -->
<a href="//shibajuku.net/about/" target="_blank">Shibajuku（新しいタブで開きます）</a>

<!-- 🙆‍♀️ 良い例 -->
<a href="https://shibajuku.net/about/" target="_blank">Shibajuku（新しいタブで開きます）</a>
```

::: tip 外部リンクの注意点
必要に応じて `target="_blank"` や `rel="noreferrer"` 属性を指定してください。
`target="_blank"` を指定した際、`rel`属性に、`noopener` は不要です。
また、`target="_blank"` を指定した際は、新しいタブやウインドウで開かれることがユーザーに伝わるようにしてください。
:::


### 外部リソース
堅牢生を確保するため、WebフォントやGoogle Maps、YouTubeなどのセルフホストができないリソースを除き、外部リソースの読み込みは原則禁止します。


### ページ内リンク
ページ内リンクは、セクショニング・コンテンツ（`section`, `artcle`, `nav`, `aside`）、または ヘディング・コンテンツ（`h1` – `h6`, `hgroup`）、`figure` に `id` 属性を適切な固有名で指定しリンクしてください。


```html
<!-- 🙅‍♂️ 悪い例 -->
<a href="#abcdef">サービス</a>
...
<div id="abcdef">
 ...
</div>


<!-- 🙆‍♀️ 良い例 -->
<a href="#service">サービス</a>
...
<section id="service">
 ...
</section>
```

::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson5 ハイパーリンク」を参照してください。
:::

## 画像
パフォーマンスを考慮し、最適な画像形式、サイズで表示されるようにしてください。

### 画像形式

JPEG、PNG形式の画像は圧縮を行ってください。

また、AVIF ならびに WebP 形式の画像を生成し、`.htaccess` を用いて最適な画像形式がレスポンスされるようにしてください。

`.htaccess` が使えない環境や、[Astro](https://astro.build/) の `<Picture />` コンポーネントのように、`picture` 要素を自動で生成する場合は、`picture` 要素 と `source` 要素を用いて最適な形式で表示されるようにしてください。

```html
<!-- picture要素を使った例 -->
<picture>
  <source srcset="/assets/images/coffee.avif, /assets/images/coffee@2x.avif 2x" type="image/avif">
  <source srcset="/assets/images/coffee.webp, /assets/images/coffee@2x.webp 2x" type="image/webp">
  <img src="/assets/images/coffee.jpg" srcset="/assets/images/coffee@2x.jpg 2x" width="480" height="320" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー" loading="lazy">
</picture>
```

### レイアウトシフトへの対応

`img` 要素には、原則として `width` 属性と `height` 属性を指定してください。
ただし、CSS側でサイズや比率が明確な場合はこの限りではありません。

```html
<!-- 🙅‍♂️ 悪い例 -->
<img src="/assets/images/coffee.jpg" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー" loading="lazy">

<!-- 🙆‍♀️ 良い例 -->
<img src="/assets/images/coffee.jpg" srcset="images/coffee@2x.jpg 2x" width="480" height="320" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー" loading="lazy">
```

なお、`picture` と `source` 要素を複数のソースが指定されいており、それぞれのソースの画像のサイズや比率が異なる場合は、`source` 要素にも`width` 属性と `height` 属性を指定してください。

```html
<picture>
  <source srcset="images/pc.jpg, images/pc@2x.jpg 2x" width="400" height="400" media="(min-width: 992px)">
  <source srcset="images/tablet.jpg, images/tablet@2x.jpg 2x" width="768" height="420" media="(min-width: 768px)">
  <img src="images/sp.jpg" srcset="images/sp.jpg, images/sp@2x.jpg 2x" width="1024" height="768" alt="代替テキスト" loading="lazy">
</picture>
```


### 代替テキスト
`alt` 属性は必ず記述してください。

代替えテキストは画像自体を説明するのではなく、画像の代わりになるような文章を（画像から得られる情報を過不足なく）記述してください。
前後の文章との繋がりも考慮し、画像の代わりにその代替えテキストを読み上げてもページの内容が成り立つような文章にしてください。

ポイントは以下の４つです。

- そこに画像を配置できなかったら、何を書いていたかを考えて書く
- 画像のキャプションやタイトル、凡例のようなテキストを入れるわけではない
- 画像を補完するためのものではない（補足情報は title属性 を使う）
- 代替えテキストは、画像の横の文章で既に記述している情報を繰り返さない


```html
<p>
  焙煎時間が短いほど色が明るく、焙煎時間が長いほど色が黒っぽくなります。
  <img src="/assets/images/roast-level.jpg" alt="ライトローストは薄っすら焦げ目がついた小麦色で、シナモンロースト、ミディアムロースト、ハイロースト、シティロースト、フルシティロースト、フレンチロースト、イタリアンローストの順に色が黒に近づきます。">
  そして、焙煎時間が短いほど酸味が強く、焙煎時間が長いほど苦味が強くなります。
</p>
```


画像がアイコンなどの装飾目的の画像の場合であり、その横にあるテキストなどで同じ意味のテキストなどがある場合は、alt属性の内容を空にします。

```html
<p><a href="help/"><img src="/assets/images/icon-help.svg" alt=""> ヘルプ</a></p>
```


ロゴをページの見出しとして利用する場合は、alt属性にその会社やお店、サービスなどの名前を含めます。（「ロゴ」などのテキストは必要ありません）

```html
<h1><img src="images/logo-dummy-cafe.svg" alt="Dummy Cafe"></h1>
```

ただし、ロゴの横にその会社やお店、サービスなどの名前がテキストで表示されているような場合は、ロゴはその補足となるため、`alt`属性は空にします。

```html
<p>当店のコーヒー豆は、<img src="images/logo-dummy-company.svg" alt=""> Dummy Company さんから仕入れています。</p>
```

::: tip 代替テキストの考察
代替テキストは、デザイン時点で決定することが理想です。
:::

### 高解像ディスプレイへの対応

SVGなどのベクター形式の画像を除き、`srcset`属性を用いて、Retina Display などの高解像ディスプレイへの対応を行ってください。記述子は `size`属性 と組み合わせた幅記述子（`w`）を推奨しますが、ピクセル密度記述子（`x`） を使ったデバイスピクセル比ごとの対応でも構いません。

```html
<!-- 🙅‍♂️ 悪い例 -->
<img src="/assets/images/coffee.jpg" width="480" height="320" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー" loading="lazy">

<!-- 🙆‍♀️ 良い例 -->
<img src="/assets/images/coffee.jpg" srcset="images/coffee@2x.jpg 2x" width="480" height="320" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー" loading="lazy">
```


### 非同期デコードと遅延読み込み

画像のデコードはブラウザの最適化に任せるため、 `decoding` 属性の指定は行わないでください。
また、ファースビューやビューポート内に多くの画像が利用される箇所を除き、`loading="lazy"` を指定し、画像の遅延読み込みを行ってください。

```html
<!-- 🙅‍♂️ 悪い例 -->
<img src="/assets/images/coffee.jpg" srcset="images/coffee@2x.jpg 2x" width="480" height="320" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー">

<!-- 🙆‍♀️ 良い例 -->
<img src="/assets/images/coffee.jpg" srcset="images/coffee@2x.jpg 2x" width="480" height="320" alt="厳選したコーヒー豆を使った淹れたてのブレンドコーヒー" loading="lazy">
```


::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson6 画像関連の要素」を参照してください。
:::



## id属性

`id`属性は、コンテンツの内容を表した適切な固有名で指定してください。
可能であれば、セクショニング・コンテンツ（`section`, `artcle`, `nav`, `aside`）には、ページ内リンクを指定しない場合でも `id`属性を指定し、ユーザーがコンテンツにリンクを指定できるように備えてください。

なお、サイト公開後は、外部からコンテンツへのリンクさている可能性を考慮し、安易に `id`属性の値を変更または削除しないでください。



## コメント
`div` 要素は、終了タグの次の行にコメントを記述するようにしてください。

コメント内容は、`/` の後に、開始タグに付けられた `id` または `class` 属性の値を CSSセレクターの形式で記述してください。


```html
<div class="container">
・
・
・
</div>
<!-- /.container -->
```




## キーボード操作

ページ内の操作可能要素（リンクやボタン、フォームフォールドなど）は、キーボードのみで操作可能にしてください。

- タブキーで移動可能
- キーボードで実行可能（Enter など）

原則、アコーディオンメニューのような開閉式ウィジェットは、`details` 要素と `summary` 要素を用いて実装し、モーダルウインドウのようなダイアログボックスは、 `button` 要素と、`dialog` 要素を用いて実装してください。


::: tip popover属性
モーダレスのダイアログには `popover` 属性を活用してください。
:::


::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson12 インタラクティブ要素」を参照してください。
:::

## 状態管理

要素の状態管理は、原則 class属性（`is-*` など）で管理せず、以下の属性で管理してください。

### HTML標準の属性

HTML標準の属性で状態を示せる場合は標準の属性を使用してください。

フォームコントロール部品の無効化を表す `disabled` や、セレクトボックスの選択状態を表す `selected` 属性などが該当します。

```html
<label>
  希望勤務地
  <select name="area">
    <option value="">エリアを選択して下さい</option>
    <option value="北海道">北海道エリア</option>
    <option value="東北">東北エリア</option>
    <option value="関東" selected>関東エリア</option>
    <option value="中部">中部エリア</option>
    <option value="近畿">近畿エリア</option>
    <option value="中国">中国エリア</option>
    <option value="四国">四国エリア</option>
    <option value="九州">九州エリア</option>
  </select>
</label>

<button disabled>送信</button>
```


### ARIA 属性

標準の属性がない場合は、適切な ARIA属性（`aria-*`）がないか検討してください。
現在コンテンツが展開されているかどうかの状態を示す `aria-expanded` 属性や、トグルボタンの現在の押下状態を示す `aria-pressed` 属性、パンくずナビゲーションなどで現在のページを表す `aria-current="page"` などが該当します。


```html
<button type="button" aria-controls="panel" aria-expanded="false">パネルを開く</button>
<div id="panel" aria-hidden="true">
...
</div>
```

### data-* 属性

標準の属性、または ARIA 属性にも適切な属性がない場合は、、`data-*` 属性を利用してください。

```html
<div data-theme="dark">
...
</div>
```



::: info 教材
詳細は「本気で始めるHTML入門」→「Lesson10 フォーム関連の要素 – 前編 –」と「Lesson11 フォーム関連の要素 – 後編 –」を参照してください。
:::

## アクセシビリティ

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) の 4つの基本原則（知覚可能、操作可能、理解可能、堅牢性）をもとに、AA の準拠を目指したマークアップを心がけてください。

WAI-ARIA （`aria-*` や `role` 属性）は、HTML の標準仕様ではどうしても対応できない場合のみに利用してください。

主には以下のような場合です。

- 明示的にランドマークを上書きする必要がある場合
- 動的コンテンツの更新を通知する場合
- キーボード操作のアクセシビリティを向上する上で必要な場合
