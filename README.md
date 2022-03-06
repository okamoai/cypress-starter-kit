# Cypress Starter Kit

## 目次

- [特徴](#特徴)
- [セットアップ](#セットアップ)
- [テストの実行](#テストの実行)
- [レポートの出力](#レポートの出力)
- [カスタマイズ](#カスタマイズ)

---

## 特徴

- まだ E2E テストを実施していない環境にアドオンで導入するケースを想定。
- TypeScript, ESLint, husky, lint-staged, testing-library の初期導入・設定済み。
- `develop`, `staging`, `production` 毎の環境別設定ファイルを持ち、実行時に環境が選択が可能。
- ローカル環境上の開発、コンテナ環境上の開発（VSCode Remote Containers 対応）の両方をサポート。
- GitHub Actions に対応。コンテナのキャッシュ対応、テストの並列稼働で実行時間を短縮。
- 動画・スクリーンショット付きのテストレポートを GitHub Pages に自動でデプロイ。
- 実行結果の概要とレポートへのリンクを Slack で通知。
- 予め動画の記録をスキップしてテスト実行時間を短縮するオプション機能。
- 手動実行と Web Hook による実行の両方に対応。別リポジトリのデプロイをフックに E2E テストの自動実行が可能。

---

## セットアップ

### 1. リポジトリをクローンしてプロジェクトディレクトリに移動

```sh
git clone https://github.com/okamoai/cypress-starter-kit.git
cd cypress-starter-kit
```

### 2-a. ローカル環境開発の場合

- 事前にホスト PC に Node.js のバージョン（v16.13.0）を用意した上でパッケージインストールを実行する。

```sh
npm install
```

### 2-b. コンテナ環境開発（マニュアル）の場合

- docker イメージをビルドする。ビルドと同時に `npm install` も実行されるため、構成に変更がある場合は改めてビルドし直す必要がある。

```sh
docker build -t cypress:develop -f Dockerfile.development .
```

- ビルドしたイメージを実行する。ホスト PC の `cypress` ディレクトリをマウントするため、ローカルのファイル変更がそのままコンテナ環境に反映される。

```sh
docker run -it --mount type=bind,source="$(pwd)"/cypress,target=/home/node/app/cypress -e LOCAL_UID=$(id -u $USER) -e LOCAL_GID=$(id -g $USER) cypress:develop bash
```

- マウントされるのは `cypress` ディレクトリのみであり、それ以外のファイルに変更があった場合は改めてイメージをビルドし直す必要がある。

### 2-c. コンテナ環境開発（VSCode Remote Containers）の場合

- [VSCode Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) が入っていない場合はインストールして有効にしておく。
- VSCode の左下にある緑色のボタンからリモートウィンドウを開き、`Reopen in Container` を選択する。

---

## テストの実行

以下のコマンドを実行するとヘッドレスモードで `cypress/integration` 配下の `*.spec.ts` ファイルを全て実行する。

```sh
# 本番環境
npm run test:production
# テスト環境
npm run test:staging
# 開発環境
npm run test:development
```

テスト対象を絞って実行したいときは `spec` オプションで対象を指定する。

```sh
npm run test:production -- --spec cypress/integration/test1/**/*.ts
```

動画の記録が不要な場合は `config` オプションで設定する。

```sh
npm run test:production -- --config video=false
```

[2-a. ローカル環境開発の場合](#2-a.-ローカル環境開発の場合) で実行している場合、以下のコマンドでテストランナーを起動することができる。

```sh
# 本番環境
npm run open:production
# テスト環境
npm run open:staging
# 開発環境
npm run open:development
```

---

## レポートの出力

[テストの実行](#テストの実行) 後、`cypress/result` にテスト結果データが出力されている状態で以下のコマンドを実行することで整形された HTML レポートを `cypress/rport` に出力する。

```sh
npm run report
```

---

## カスタマイズ

### 環境別の設定

- `cypress/config` 配下の `development.json`, `staging.json`, `production.json` で、それぞれの環境の設定を変更できる。

### Slack の設定

- 事前に Slack の Incoming Webhook で払い出された URL を GitHub の Repository secrets に `SLACK_WEBHOOK` の名称で登録する必要がある。
- 通知のカスタマイズは [GitHub Actions の設定ファイル](./.github/config.json) で行う。
  - `slack_channel` …通知する Slack のチャンネル名
  - `slack_icon` …通知するときのアイコン URL
  - `slack_title` …通知するときのタイトル
  - `slack_username` …通知するときのユーザー名

### テストの追加

#### テストケースの追加

- 基本は `cypress/integration` 配下の `*.spec.ts` ファイルを増やせば自動的にテストの対象となる。
- GitHub Actions 上の実行対象に変更があった場合、[GitHub Actions の設定ファイル](./.github/config.json)の `test_targets` も修正の対象となる。
- `test_targets` は `cypress/integration` 配下のディレクトリを示し、指定されたディレクトリ配下の `*.spec.ts` ファイルが GitHub Actions 上のテスト実行対象となる。
- `test_targets` の配列が並列実行の単位となるため、テストの実行時間に極端な偏りがでないようにバランス良く `test_targets` の設定すると良い。

#### コマンドの追加

- テストファイルをまたいで再利用されるアクションやアサーションは `cypress/support/commands` 配下に以下の区分で定義する。
  - 共通のユーザーアクションは `cypress/support/commands/actions` 配下
  - 共通の検証は `cypress/support/commands/assertions` 配下
  - 共通のユーティリティは `cypress/support/commands/utils`
- 上記で追加したアクションやアサーションの型情報は `cypress/support/types.d.ts` に定義する。
- これにより `cypress/integration` 配下の `*.spec.ts` 内で `cy` 経由で型情報付きで追加したコマンド呼び出すことができる。

### GitHub Actions の実行

#### 手動実行

- GitHub の Actions タブを開き、`Cypress run (Manual)` ワークフローを選択する。
- `Run Workflow` ボタンを押下する。オプションは必要に応じて変更する。
  - `Use workflow from` …実行するブランチを指定する。
  - `Target environment` …テスト対象環境を `production`, `staging`, `development` から指定する。
  - `Record a video` …テスト失敗時の動画を保存する。
  - `Publish a report in GitHub Pages` …GitHub Pages にテスト結果のレポートをデプロイする。
  - `Notify in Slack` …テスト実行結果を Slack で通知する。

#### Web hook 実行

- 事前にトークンの払い出しが必要になる。
- メニュー `Settings` > `Developer settings` > `Personal access tokens` から `repo` 権限を付与したトークンを生成しておく。
- 以下を実行することで Web hook 経由で GitHub Actions を実行できる。

```sh
curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token <Personal access tokens>" \
  https://api.github.com/repos/<user name>/<repository name>/dispatches \
  -d '{ "event_type":"CypressRun" }'
```

- `client_payload` を指定することで手動実行時と同じオプションを指定できる
  - `env` … テスト対象環境の指定。 `production`, `staging`, `development` のいずれかを指定。省略時には `production` として実行される。
  - `video` … テスト失敗時の動画保存を Boolean で指定。省略時には true として実行される。
  - `report`… GitHub Pages へテスト結果のレポートを Boolean で指定。省略時には true として実行される。
  - `notify`… …テスト実行結果の Slack 通知を Boolean で指定。省略時には true として実行される。
- `client_payload` を加えた送信例は以下の通り。

```sh
curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token <Personal access tokens>" \
  https://api.github.com/repos/<user name>/<repository name>/dispatches \
  -d '{ "event_type":"CypressRun", "client_payload": { "env": "staging", "video": false, "report": true, "notify": false } }'
```

- repository dispatch の詳細は公式のドキュメント [Create a repository dispatch event](https://docs.github.com/ja/rest/reference/repos#create-a-repository-dispatch-event) を参照のこと。
