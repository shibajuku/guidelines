# 用語集


## 命名規則

### キャメルケース

単語をつなげる際に、2 つ目以降の単語の頭文字を大文字にする命名です。
本ガイドラインの中では、JavaScript の変数名（プロパティ名）や関数名（メソッド名）で使います。

```js
const getUserData = await fetch("https://api.example.com/v1/users/");
```

### パスカルケース

[キャメルケース](./glossary.html#キャメルケース)と似ていますが、最初の単語も大文字にする書き方です。
本ガイドラインの中では、JavaScript のクラス名や、Astro のレイアウト名やコンポーネント名で使います。

```js
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

### ケバブケース

単語をハイフン（ `-` ）でつなげる書き方です。
本ガイドラインの中では、HTML や CSS のファイル名や、HTML の属性の値、CSS のクラス名などで使います。

```css
.c-nav-global {
  display: block flex;
}
```

### スネークケース

単語をアンダースコア（ `_` ）でつなげる書き方です。
本ガイドラインの中では利用していませんが、PHP などの変数名や関数名などで使われています。

```php
function get_user_data() {
  return $users;
}
```

## 固有名詞

### Shibajuku

Web クリエイターを養成するオンラインサロンの名前です。
ライブ授業や録画授業を中心にさまざまな Web 制作の学習を行えます。

[Shibajuku](http://shibajuku.net/)
