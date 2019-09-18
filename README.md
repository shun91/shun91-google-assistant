# my-google-assistant-functions

Google Assistant で任意の処理を実行するための Functions。

## 使用技術

- Dialogflow (Fulfillment Webhook)
- Firebase Functions

## 環境変数の設定

```bash
# Nature Remo API の token
firebase functions:config:set remo.token="<TOKEN>"
```

## TODO

リネーム
eslint 入れる
husky入れる
dialogflow の依存を切る
action.json の自動生成
ts 化
readme書く

## メモ

gactions コマンドのインストール  
https://developers.google.com/actions/tools/gactions-cli

```
gactions update --action_package PACKAGE_NAME --project PROJECT_ID
gactions update --action_package action.json --project test-kawahara
```

yarn ga:update の projectId を書き換える
