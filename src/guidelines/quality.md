# 品質管理

以下のツールを利用してチェックを行ってください。

## HTML

### **W3C Markup Validation Service**

[Markup Validation Service](http://validator.w3.org/)

コンバージョンタグなど計測タグによるエラー及びサイトの構成上修正できないエラーは許容範囲とします。

## CSS

StyleLintが使える環境の場合は「StyleLint」による文法チェックを行ってください。

なお特に指定がない場合は以下のようなルールでチェックを行ってください。

```json
{
  "extends": [
    "stylelint-config-recommended-scss",
    "stylelint-config-property-sort-order-smacss",
    "stylelint-prettier/recommended"
  ],
  "plugins": ["stylelint-prettier", "stylelint-scss", "stylelint-order"],
  "ignoreFiles": ["**/node_modules/**"],
  "rules": {
    "prettier/prettier": true,
    "number-leading-zero": "always",
    "length-zero-no-unit": true,
    "unit-case": "lower",
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "font-family-name-quotes": "always-where-recommended",
    "string-quotes": "double",
    "shorthand-property-no-redundant-values": true,
    "value-keyword-case": "lower",
    "property-case": "lower"
  }
}
```

## JavaScript

ESLintが使える環境の場合は「ESLint」による文法チェックを行ってください。

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "globals": {
    "jQuery": "readonly",
    "$": "readonly"
  },
  "rules": {
    "prettier/prettier": "error",
    "semi": [
      "error",
      "always",
      {
        "omitLastInOneLineBlock": true
      }
    ]
  }
}
```
