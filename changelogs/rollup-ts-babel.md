<!--
 * @Author: ADI
 * @Date: 2021-01-22 22:46:46
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-22 23:10:28
-->

# rollup-ts-babel

## 配置 rollup

---

1. 安装依赖 `yarn add -D rollup rollup-plugin-node-resolve`
2. 添加 rollup.config.js 文件 `/rollup.config.js`

## 配置 typescript

---

1. 安装 typescript 依赖 `yarn add -D typescript`
2. 添加 tsconfig 配置文件 `/tsconfig.json`

## 配置 babel

---

1. 安装 babel 依赖 `yarn add -D rollup-plugin-babel@latest @babel/core @babel/preset-env @babel/preset-typescript`
2. 添加 .babelrc 配置文件

```javascript
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```

## 配置 package.json

---

1. 添加 package.json 配置文件 `/package.json`

## 配置 统一代码风格

---

1. 安装依赖

```zsh
# 安装 eslint
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 安装 prettier
yarn add -D prettier

# 安装 husky、lint-staged
yanr add -D husky lint-staged
```

2. 配置 eslint 规则 `/.eslintrc.js` `/.prettierrc`
3. 配置 husky 和 lint-staged

```
"scripts": {
  "lint": "eslint 'src/**/*.{js,ts}'"
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*./src/**/*.{js,ts,json,css,less,md}": [
    "prettier --write",
    "yarn lint"
  ]
}
```

## 配置 打包流程

---

- rimraf - 文件删除工具，用于每次编译前清空 lib 目录
- npm-run-all - npm 命令并行执行工具
- rollup-plugin-uglify - uglify js 压缩工具（rollup 版）
- lodash.merge - 配置合并工具
- cross-env - 跨平台设置环境变量

1. 安装依赖 `yarn add -D rimraf npm-run-all rollup-plugin-uglify lodash.merge` `yarn add cross-env`
2. 修改 package.json

```
"scripts": {
  "lint": "eslint 'src/**/*.{js,ts}'",
  "dev": "cross-env FORMAT=esm rollup -w -c",
  "build:esm": "cross-env FORMAT=esm rollup -c",
  "build:umd": "cross-env FORMAT=umd rollup -c",
  "build:min": "cross-env FORMAT=min rollup -c",
  "build": "rimraf lib/* && run-p build:esm build:umd build:min"
},

```
