<h2 align='center'><img src='./public/tane-map.svg' width=120 /></h2>
<h1 align='center'>TANE Map</h1>

# 使用技術

## パッケージ一覧

<p align="left">
<img src='https://img.shields.io/badge/-React-333333.svg?logo=react&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-Typescript-333333.svg?logo=typescript&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-vite-333333.svg?logo=vite&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-swr-333333.svg?logo=swr&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-daisyui-333333.svg?logo=daisyui&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-firebase-333333.svg?logo=firebase&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-tailwindcss-333333.svg?logo=tailwindcss&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-autoprefixer-333333.svg?logo=autoprefixer&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-postcss-333333.svg?logo=postcss&style=for-the-badge'/>
<img src='https://img.shields.io/badge/-reactrouter-333333.svg?logo=reactrouter&style=for-the-badge'/>
</p>

## システム構成

<img src='./art/system.png' />

## その他

-   アイコン：Font Awesome 6

# 環境変数

.env ファイル

```
VITE_API_KEY="<>"
VITE_AUTH_DOMAIN="<>"
VITE_PROJECT_ID="<>"
VITE_STORAGE_BUCKET="<>"
VITE_MESSAGING_SENDER_ID="<>"
VITE_APP_ID="<>"
VITE_MEASUREMENT_ID="<>"
VITE_DATABASE_URL="<>"
VITE_RECAPTCHA_SITE_KEY="<>"
VITE_ANALYTICS_ID="<>"
```

# コマンド一覧

## 開発環境開始

```
npm run dev
```

## ビルド

```
npm run build
```

## デプロイ

```
firebase deploy --only hosting:map-tane
```
