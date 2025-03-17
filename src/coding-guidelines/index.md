# 基本仕様

本ガイドラインは、Shibajuku 内のプロジェクトや課題でコーディングする際の記述ルールなどを定めたものです。

品質の確保と拡張性やメンテナンス性の向上を目的として、本ガイドラインに則ったコーディングを行ってください。

なお、プロジェクトに独自のガイドラインやコーディングの指示がある場合にはそちらを優先してください。


## 対応ブラウザとデバイス

### Windows
- Microsoft Edge
- Mozilla Firefox
- Google Chrome

### Mac
- Safari
- Mozilla Firefox
- Google Chrome

### スマートフォン・タブレット
- iOS Safari
- Android Chrome

::: info
バージョン番号の記載が無いブラウザに関しては、サイト構築時点で 0.5% 以上シェアがある最新 2 バージョンに対応します。
:::


## 開発環境

### テキストエディタ

原則、[Visual Studio Code](https://code.visualstudio.com/) または、[Cursor](https://www.cursor.com/ja) を使用し、以下の拡張機能をインストールしてください。

- [Markuplint](https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [Prittier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

### 事前準備

以下のツールを事前に準備してください。

- Node.js（Volta推奨）
- Git
- Docker（WordPressの場合）


### 環境構築

可能な限り、「Orelop」を利用した開発を推奨します。
静的サイト構築のテンプレートは、[Astro](https://astro.build/)を推奨しますが、まだ[Astro](https://astro.build/)の学習が終わっていない場合は、「Static」 を選択してください。なお、WordPressテーマ開発の場合は「WP」を選択してください。


#### Orelop
開発用ディレクトリ内で、利用するパッケージマネージャ（pnpm 推奨）に合わせて以下のコマンドを実行し環境を構築します。

```zsh
# NPM
npm create orelop@latest

# Yarn
yarn create orelop@latest

# pnpm
pnpm create orelop@latest
```

#### 独自の環境
独自の環境を利用する際は、[Vite](https://ja.vite.dev/)をベースとした環境を利用してください。

過去の成果物を修正または改訂する場合を除き、[webpack](https://webpack.js.org/) などのバンドルツールや、[Gulp](https://gulpjs.com/) などのタスクランナーで構築された環境は原則禁止とします。

##### CSSトランスフォーマー

CSSは、[Lightning CSS](https://lightningcss.dev/)（推奨）、または [PostCSS](https://postcss.org/) を利用し、ベンダープレフィックスの付与や `@import` の解決、CSSWGドラフト（[CSS nesting](https://drafts.csswg.org/css-nesting-1/) など）のトランスパイルや圧縮を行ってください。


##### フォーマッターとリンター

以下のフォーマッターやリンターを用いて開発ができるようにしてください。

| 言語 | フォーマッター | リンター |
| --- | --- | --- |
| HTML | [Prettier](https://prettier.io/) | [Markuplint](https://markuplint.dev/ja/) |
| CSS | [Biome](https://biomejs.dev/ja/) | [Biome](https://biomejs.dev/ja/) |
| JavaScript / TypeScript | [Biome](https://biomejs.dev/ja/) | [Biome](https://biomejs.dev/ja/) |

## ディレクトリ構造


### Static
```txt
📂 [project name]                 # サイトのルートフォルダ
├── 📂 dist                        # 納品用データ
├── 📂 public                      # distにコピーされるファイル群
│    ├── apple-touch-icon.png     # iOS用アイコン
│    ├── favicon.ico              # ファビコン
│    ├── favicon.svg              # ファビコン
│    ├── humans.txt               # サイト情報を記載したファイル
│    └── .htaccess                # リダイレクなどを記載したファイル
└── 📂 src                        # 開発用データ
     ├── 📂 assets                # HTMLに埋め込む素材
     │    ├── 📂 images           # 画像
     │    ├── 📂 scripts          # JavaScript
     │    │    ├── 📂 libs        # JavaScriptのライブラリや独自のスクリプト
     │    │    └── main.ts       # メインのJavaScriptファイル
     │    └── 📂 styles           # CSS
     │         └── global.css    # メインのCSSファイル
     ├── 📂 [category-name]      # 各コンテンツ毎のHTML
     │    └── index.html         # 各コンテンツごとの一覧ページ
     └── index.html              # トップページ
```

## テキストファイル基本ルール

テキストファイルは以下のルールで作成してください。

- 文字エンコーディング: UTF-8
- 改行コード: LF
- インデント: 半角スペース2つ
