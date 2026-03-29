# 開発者向けドキュメント

## 1. プロジェクト概要

TANE Map は桐光学園の校内マップアプリケーションです。
Vite + React（TypeScript）をベースに、Firebase をバックエンドとして利用し、オープンスクールや文化祭などのイベント情報を提供します。

## 2. 環境構築

1. Node.js（推奨 v16 以上）/ npm をインストール
2. リポジトリをクローン

```
git clone <リポジトリURL>
cd map
```

3. 依存パッケージをインストール

```
npm install
```

4. 環境変数ファイルを作成（`.env` を `.env.example` をもとに作成）

```.env
VITE_API_KEY="..."
VITE_AUTH_DOMAIN="..."
VITE_PROJECT_ID="..."
VITE_STORAGE_BUCKET="..."
VITE_MESSAGING_SENDER_ID="..."
VITE_APP_ID="..."
VITE_MEASUREMENT_ID="..."
VITE_DATABASE_URL="..."
VITE_RECAPTCHA_SITE_KEY="..."
VITE_ANALYTICS_ID="..."
VITE_USE_EMULATORS=false
```

## 3. 開発サーバー起動

```
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

## 4. Firebase 設定

-   `src/features/firebase.ts` で初期化
-   エミュレータ利用時は `.env` の `VITE_USE_EMULATORS` を `true` に設定
-   Firestore、App Check、Analytics を利用

## 5. フォルダ構成

```
src/
 ├─ main.tsx     # エントリーポイント
 ├─ App.tsx      # ルーティング
 ├─ pages/       # 各画面コンポーネント
 ├─ components/  # 再利用可能な UI コンポーネント
 ├─ hooks/       # カスタムフック（データ取得、ロジック）
 ├─ features/    # Firebase 初期化やユーティリティ関数
 ├─ router/      # カスタムルーター設定
 ├─ store/       # Jotai や Zustand ストア
 └─ types/       # TypeScript 型定義
```

## 6. 主な技術スタック

-   React 18 + TypeScript
-   Vite
-   Firebase (Firestore, AppCheck, Analytics)
-   SWR (データフェッチ)
-   NextUI (UI ライブラリ)
-   Day.js などユーティリティ

## 7. コーディング規約

-   コンポーネントは関数コンポーネント + FC 型
-   フックは `useXxx` プレフィックス
-   ファイル名はパスカルケースまたはケバブケース
-   Tailwind CSS クラス命名規則に準拠

## 8. Git ワークフロー

-   feature ブランチを切って開発
-   Pull Request でコードレビュー
-   main/master へのマージは CI 通過が条件

## 9. デプロイ

1. プロダクションビルド

```
npm run build
```

2. Firebase Hosting へデプロイ

```
firebase deploy --only hosting:map-tane
```

## 10. テスト・デバッグ

-   ローカルでエミュレータを起動しクエリ動作確認
-   Firestore ルールやインデックスは `firestore.rules`, `firestore.indexes.json` で管理

## 11. 参考資料

-   README.md（環境構築、コマンド一覧）
-   doc/for-developer.md（本ドキュメント）
-   public/ にあるシステム構成図 (art/system.png)
