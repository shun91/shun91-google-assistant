# shun91-google-assistant

Google Assistant for shun91.

## 使用技術

- Dialogflow (Fulfillment Webhook)
- Firebase Functions

## 環境変数の設定

```bash
# Nature Remo API の token
firebase functions:config:set remo.token="<TOKEN>"
```

## TODO

依存パッケージのバージョン上げる
fb:build でバンドルしたい
firebase functions も export default にしたい
readme 書く

## メモ

gactions コマンドのインストール  
https://developers.google.com/actions/tools/gactions-cli

```
gactions update --action_package PACKAGE_NAME --project shun91-assistant
gactions update --action_package action.json --project test-kawahara
```

yarn ga:update の projectId を書き換える
