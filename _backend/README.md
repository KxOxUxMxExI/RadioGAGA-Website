# RadioGAGA テスター案内（フォーム紐付けApps Script）

`Code.gs` をフォームの「その他 → Apps Script」へ配置する。Webアプリの公開は不要。

1. **koumelabs@gmail.com** でプロジェクトを開く。`preview` で文面を確認する。
2. `setup` を実行し、フォーム読み取り・メール送信・トリガー作成を承認する。個人アカウントでの実行はコードで拒否する。
3. フォーム送信時に受付メールを送る。未処理分は毎時再処理する。1回20通まで、残りの送信枠を超えない。
4. 公開済み**クローズドテスト**を実際に確認してから、プロジェクト設定のスクリプトプロパティに `TEST_OPTIN_URL`、`RELEASE_VERSION`、`RELEASE_NOTES` を設定し、最後に `RELEASE_READY=yes` を設定する。`preview` で確認後、`processPending` を実行する。以降は毎時未送信分を処理する。Playの公開を自動検出する仕組みではない。
5. 更新のたびに公開済みバージョンと更新内容を設定する。同じバージョンは同じ宛先へ再送しない。新規登録者にも現在の最新版だけ案内する。

インストール案内は初期状態で無効。内部テストのURLはグループ用案内に使わない。内部テスター設定の既存1名は変更しない。

メールは宛先ごとに送り、他の参加者のメールを載せない。送信履歴はメールのSHA-256値とキャンペーンIDで記録し、生のメールはForm/回答Sheetだけで管理する。SHA-256値もアクセス制限の対象。実行ログに回答・宛先を出さない。

送信処理中の中断やメールエラーは `sending` / `uncertain` を残す。自動再送はしない。Kome Labsの送信済みメールと実行履歴を確認して、未送信と確認できたキーだけ手動で解除する。完全な一度限りの配送は外部メールサービスとの原子的処理がないため保証できない。

配信停止は返信で受け付ける。対象アドレスを `muteRecipient_` に渡す管理用の一時関数をエディタで実行する（アドレスをGitへ保存しない）。フォーム再送信では停止を解除しない。登録情報の訂正・削除はFormsと回答Sheetの双方、該当ハッシュのスクリプトプロパティを確認し、本人の依頼に基づいて処理する。テスト終了時は送信を停止し、保存期限・削除対象を運営者が確定する。現在は自動削除を行わない。

検証: `node _backend/backend.test.cjs`。Google上の認可・実際のメール受信は別途確認が必要。

公式資料:
- https://developers.google.com/apps-script/guides/triggers/installable
- https://developers.google.com/apps-script/reference/mail/mail-app
- https://developers.google.com/apps-script/guides/services/quotas
- https://support.google.com/googleplay/android-developer/answer/9845334
