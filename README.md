<h2 align='center'><img src='./public/tane-map.png' width=120 /></h2>
<h1 align='center'>TANE Map</h1>

# 使用技術

## パッケージ一覧

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

## システム構成

<img src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2Fsystem-configuration-06.jpg?alt=media&token=7a9b5280-63a2-41d2-b4ea-17c64c7a3349' />

## その他

-   アイコン：Font Awesome 6

# 環境変数

.env ファイル

```
VITE_API_KEY="<FirebaseのapiKey>"
VITE_AUTH_DOMAIN="<FirebaseのauthDomain>"
VITE_PROJECT_ID="<FirebaseのprojectId>"
VITE_STORAGE_BUCKET="<FirebaseのstorageBucket>"
VITE_MESSAGING_SENDER_ID="<FirebaseのmessagingSenderId>"
VITE_APP_ID="<FirebaseのappId>"
VITE_MEASUREMENT_ID="<FirebaseのmeasurementId>"
```

# コマンド一覧

## 開発環境開始

```
yarn run dev
```

## ビルド

```
yarn run build
```

## デプロイ

```
firebase deploy --only hosting:map-tane
```
