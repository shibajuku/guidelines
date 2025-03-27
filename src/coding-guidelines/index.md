# 基本仕様

本ガイドラインは、[Shibajuku](http://shibajuku.net/) 内のプロジェクトや課題でコーディングする際の記述ルールなどを定めたものです。品質の確保や拡張性、メンテナンス性の向上を目的として、本ガイドラインに則ったコーディングを行ってください。

なお、プロジェクトに独自のガイドラインやコーディングの指示がある場合にはそちらを優先してください。

::: info 💡 学習目的のガイドライン
固く感じるかもしれませんが、あくまで学習目的のガイドラインのため気軽に取り組んでください。

また、本ガイドラインは Shibajuku 内でのガイドラインです。今後、従事される環境のガイドラインに柔軟に対応できるように依存しないでください。
なお、本ガイドラインは Shibajuku の講座内容に沿った内容となっているため、ガイドライン上わからない箇所は、該当講座を参照するか、Discord などでご質問ください。コードレビューもさせて頂きます。
:::

## 対応ブラウザ

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

::: info 🌍 対応バージョン
指示がない場合、サイト構築時点で 0.5% 以上シェアがある最新 2 バージョンに対応してください。
:::

## 開発環境

### テキストエディタ

原則、[Visual Studio Code](https://code.visualstudio.com/) または、[Cursor](https://www.cursor.com/ja) を使用し、以下の拡張機能をインストールしてください。

| 拡張機能                                                                                        | 利用用途                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Markuplint](https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint) | HTML の解析                                                                                                                        |
| [Prittier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)          | HTML のフォーマット                                                                                                                |
| [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)                      | CSS と JavaScript（TypeScript） の解析とフォーマット                                                                               |
| [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)     | CSS プロパティの並び替えなど、[Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) で対応できない CSS の解析 |
| [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)     | エディターの設定 |

### 必要ツール

以下のツールを事前に準備してください。

- [Node.js](https://nodejs.org/ja)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/ja-jp/products/docker-desktop/)（WordPress などの サーバーサイド開発の場合）

::: tip Node.js のバージョン管理とパッケージマネージャー
Node.js のバージョン管理には、[Volta](https://volta.sh/) 、パッケージマネージャーは pnpm を推奨します。
:::

### フロントエンドツール

「Orelop」を利用した開発を推奨します。

静的サイト構築のテンプレートは、[Astro](https://astro.build/) を推奨しますが、まだ [Astro](https://astro.build/) の学習が終わっていない場合は、「Static」 を選択してください。なお、WordPress テーマ開発の場合は「WP」を選択してください。

#### Orelop

開発用ディレクトリ内で、利用するパッケージマネージャー（pnpm 推奨）に合わせてインストールコマンドを実行し環境を構築します。


インストールコマンド実行後、プロジェクト名、テンプレート、各種フレームワークやライブラリを選択すると、依存関係のインストールと各種設定が完了します。

コマンドひとつで、本ガイドラインに対応した開発をすぐに開始できます。

<!--
##### ローカルサーバーの起動
::: code-group

```zsh [npm]
npm run dev
```

```zsh [Yarn]
yarn dev
```

```zsh [pnpm]
pnpm dev
```
:::

##### 本番データのビルド
::: code-group

```zsh [npm]
npm run build
```

```zsh [Yarn]
yarn build
```

```zsh [pnpm]
pnpm build
```
:::

##### 本番データのプレビュー
::: code-group

```zsh [npm]
npm run preview
```

```zsh [Yarn]
yarn preview
```

```zsh [pnpm]
pnpm preview
```
::: -->




::: info :open_book: Orelop のインストールと使い方
「Orelop」のインストールや使い方は、「静的サイト開発環境「Orelop」 講座」を参照してください。
:::

#### 独自のフロントエンド環境

独自の環境を利用する際は、[Vite](https://ja.vite.dev/) をベースとした環境を利用してください。

過去の成果物を修正または改訂する場合を除き、[webpack](https://webpack.js.org/) などのバンドルツールや、[Gulp](https://gulpjs.com/) などのタスクランナーで構築された環境は原則禁止とします。

##### CSS トランスフォーマー

CSS は、[Lightning CSS](https://lightningcss.dev/)（推奨）、または [Autoprefixer](https://www.npmjs.com/package/autoprefixer) と [PostCSS](https://postcss.org/) の [PostCSS Preset Env](https://www.npmjs.com/package/postcss-preset-env)などを利用し、ベンダープレフィックスの付与や `@import` の解決、CSSWG ドラフト（[CSS nesting](https://drafts.csswg.org/css-nesting-1/) など）のトランスパイルや圧縮を行ってください。

##### フォーマッターとリンター

以下のフォーマッターやリンターを用いて開発ができるようにしてください。

| 言語                    | フォーマッター                   | リンター                                 |
| ----------------------- | -------------------------------- | ---------------------------------------- |
| HTML                    | [Prettier](https://prettier.io/) | [Markuplint](https://markuplint.dev/ja/) |
| CSS                     | [Biome](https://biomejs.dev/ja/) | [Biome](https://biomejs.dev/ja/)、 [Stylelint](https://stylelint.io/)         |
| JavaScript / TypeScript | [Biome](https://biomejs.dev/ja/) | [Biome](https://biomejs.dev/ja/)         |

::: info コミット時のチェック
[husky](https://typicode.github.io/husky/) などを活用して、 `git commit` 時にチェックが走るようにしてください。
:::


##### テキストエディタの設定

[EditorConfig](https://editorconfig.org/)を用いて、以下の設定をしてください。

- 文字エンコーディング: UTF-8
- 改行コード: LF
- インデント: 半角スペース 2 つ

## ディレクトリ構造

プロジェクトのディレクトリ構造は以下の通りとします。

::: code-group

```[HTML]
📂 project-name                       # プロジェクトルート
├── 📂 dist                           # 本番ディレクトリ
├── 📂 public                         # dist にコピーされる静的アセット
│    ├── apple-touch-icon.png
│    ├── favicon.ico
│    ├── favicon.svg
│    ├── humans.txt
│    └── .htaccess
└── 📂 src                            # 開発ディレクトリ
     ├── 📂 assets                    # HTMLに埋め込むアセット
     │    ├── 📂 images               # 画像
     │    ├── 📂 scripts              # JavaScript / TypeScript
     │    │    ├── 📂 libs            # JavaScript ライブラリ / 独自のスクリプト
     │    │    └── main.ts
     │    └── 📂 styles               # CSS / Scss
     │         └── global.css
     ├── 📂 category-name             # 下層ページ
     │    └── index.html
     └── index.html
```

```[Astro]
📂 project-name                       # プロジェクトルート
├── 📂 dist                           # 本番ディレクトリ
├── 📂 public                         # dist にコピーされる静的アセット
│    ├── apple-touch-icon.png
│    ├── favicon.ico
│    ├── favicon.svg
│    └── humans.txt
└── 📂 src                            # 開発ディレクトリ
     ├── 📂 assets                    # アセット
     │    ├── 📂 images               # 画像
     ├── 📂 components                # コンポーネント
     │    ├── Header.astro
     │    ├── Footer.astro
     │    └── ComponentName.astro
     ├── 📂 layouts                   # レイアウト
     │    ├── Layout.astro
     │    └── LayoutName.astro
     │── 📂 pages                     # ページ
     │    ├── 📂 category-name        # 下層ページ
     │    │    └── index.astro
     │    └── index.astro
     ├── 📂 scripts                   # JavaScript / TypeScript
     │    ├── 📂 libs                 # JavaScript ライブラリや独自のスクリプト
     │    └── main.ts
     └── 📂 styles                    # CSS / Scss
           └── global.css
```

```[WordPress]
📂 project-name                       # プロジェクトルート
├── 📂 dist                           # 本番ディレクトリ
├── 📂 public                         # dist にコピーされる静的アセット
│    ├── apple-touch-icon.png
│    ├── favicon.ico
│    ├── favicon.svg
│    ├── humans.txt
│    └── .htaccess
└── 📂 src                            # 開発ディレクトリ
     ├── 📂 assets                    # HTMLに埋め込むアセット
     │    ├── 📂 images               # 画像
     │    ├── 📂 scripts              # JavaScript / TypeScript
     │    │    ├── 📂 libs            # JavaScript ライブラリ / 独自のスクリプト
     │    │    └── main.ts
     │    └── 📂 styles               # CSS / Scss
     │         └── global.css
     ├── 📂 libs                      # PHPライブラリ
     │    └── ViteHelper.php
     ├── 📂 templates                 # テンプレート
     ├── footer.php
     ├── functions.php
     ├── header.php
     ├── index.php
     ├── screenshot.png
     └── style.css
```

:::

### 本番ディレクトリ

ビルド処理後の本番ディレクトリの構造は以下の通りとします。

::: code-group

```[HTML]
📂 project-name                       # プロジェクトルート
└── 📂 dist                           # 本番ディレクトリ
     ├── 📂 assets                    # HTMLに埋め込むアセット
     │    ├── 📂 images               # 画像
     │    ├── 📂 scripts              # JavaScript
     │    │    └── main.hash.js
     │    └── 📂 styles               # CSS / Scss
     │         └── global.hash.css
     ├── 📂 category-name             # 下層ページ
     │    └── index.html
     ├── index.html
     ├── apple-touch-icon.png
     ├── favicon.ico
     ├── favicon.svg
     ├── humans.txt
     └── .htaccess
```

```[Astro]
📂 project-name                       # プロジェクトルート
└── 📂 dist                           # 本番ディレクトリ
     ├── 📂 _astro                    # アセット
     ├── 📂 category-name             # 下層ページ
     │    └── index.html
     ├── index.html
     ├── apple-touch-icon.png
     ├── favicon.ico
     ├── favicon.svg
     └── humans.txt
```

```[WordPress]
📂 project-name                       # プロジェクトルート
└── 📂 dist                           # 本番ディレクトリ
     ├── 📂 assets                    # HTMLに埋め込むアセット
     │    ├── 📂 images               # 画像
     │    ├── 📂 scripts              # JavaScript
     │    │    └── main.hash.js
     │    └── 📂 styles               # CSS / Scss
     │         └── global.hash.css
     ├── 📂 libs                      # PHPライブラリ
     │    └── ViteHelper.php
     ├── 📂 templates                 # テンプレート
     ├── footer.php
     ├── functions.php
     ├── header.php
     ├── index.php
     ├── screenshot.png
     ├── style.css
     ├── apple-touch-icon.png
     ├── favicon.ico
     ├── favicon.svg
     ├── humans.txt
     └── .htaccess
```

:::

## 開発

各ガイドラインに則った開発を行ってください。


### ガイドライン

- [HTML ガイドライン](./html.html)
- [CSS ガイドライン](./css.html)
- [JavaScript ガイドライン](./javascript.html)

## アクセシビリティ

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) の 4 つの基本原則（知覚可能、操作可能、理解可能、堅牢性）を意識したコーディングを行なってください。

また、可能な限り AA の準拠を目指し、必要に応じて「アクセシビリティポリシー」ページの作成も行なってください。

::: info :open_book: 教材
詳細は「Webディレクション講座」→「Lesson2 ユーザービリティとアクセシビリティ」 → Chapter2 アクセシビリティ」を参照してください。
:::

## バージョン管理

Git によるバージョン管理を行い、リモートリポジトリは [GitHub](https://github.com/) を利用します。

- [Git ガイドライン](./git.html)

## リリース

原則として GitHub Actions によるデプロイを行ってください。

なお、GitHub と連携するホスティングサービスを利用する場合は、そのサービスの機能を使用してください。

FTP クライアント（ [fileZilla](https://filezilla-project.org/) や [Cyberduck](https://cyberduck.io/) など）の利用も許容しますが、`main` ブランチとの整合性が担保できないため、なるべく利用しないようにしてください。

また、利用する場合においても、FTP による接続は禁止します。

SFTP（推奨） や FTPS を利用しくてださい。

::: info :open_book: 教材
詳細は「インターネット・アーキテクチャ 講座」 → 「Lesson6 アプリケーション層」を参照
:::
