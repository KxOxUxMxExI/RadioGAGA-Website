// Google Form-bound Apps Script. Install triggers as Kome Labs only.
const SETTINGS = {
  sender: 'koumelabs@gmail.com',
  formId: '1-NCjplZAP7wRKWVcLIct1MUKQFQfqU1XKmzxmlJjlEQ',
  groupUrl: 'https://groups.google.com/g/radiogaga-testers',
  website: 'https://kxoxuxmxexi.github.io/RadioGAGA-Website/',
  emailQuestion: 'Google Playで使用しているメールアドレス',
  consentQuestion: 'テスト参加登録と案内メールへの同意',
  consent: '登録したメールアドレスをGoogle Playのテスト参加登録、インストール案内、テストに関する更新連絡に使用することに同意します。'
};

function setup() {
  assertSender_();
  const triggers = ScriptApp.getProjectTriggers();
  if (!triggers.some(t => t.getHandlerFunction() === 'onRegistration')) {
    ScriptApp.newTrigger('onRegistration').forForm(SETTINGS.formId).onFormSubmit().create();
  }
  if (!triggers.some(t => t.getHandlerFunction() === 'processPending')) {
    ScriptApp.newTrigger('processPending').timeBased().everyHours(1).create();
  }
}

function onRegistration() {
  processPending();
}

function processPending() {
  assertSender_();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    const props = PropertiesService.getScriptProperties();
    const campaign = currentCampaign_(props);
    let remaining = Math.min(20, MailApp.getRemainingDailyQuota());
    for (const response of FormApp.openById(SETTINGS.formId).getResponses()) {
      const email = recipient_(response);
      if (!email) continue;
      const id = hash_(email);
      if (props.getProperty('muted:' + id)) continue;
      for (const notice of [receipt_(), campaign].filter(Boolean)) {
        const key = 'mail:' + id + ':' + notice.id;
        if (props.getProperty(key)) continue;
        if (remaining <= 0) return;
        // Reserve before sending. If interrupted, leave uncertain for manual review.
        props.setProperty(key, 'sending');
        try {
          MailApp.sendEmail({to: email, subject: notice.subject, body: notice.body,
            name: 'RadioGAGA / Kome Labs', replyTo: SETTINGS.sender});
          props.setProperty(key, 'sent:' + new Date().toISOString());
          remaining--;
        } catch (error) {
          props.setProperty(key, 'uncertain');
          console.error('Mail delivery requires review; campaign=' + notice.id);
          throw new Error('送信結果が不明です。実行履歴と送信済みメールを確認してください。');
        }
      }
    }
  } finally {
    lock.releaseLock();
  }
}

function assertSender_() {
  if (Session.getEffectiveUser().getEmail().toLowerCase() !== SETTINGS.sender) {
    throw new Error('koumelabs@gmail.com で実行してください。トリガーも同アカウントで作成します。');
  }
}

function normalizeEmail_(value) {
  const email = String(value || '').trim().toLowerCase();
  return email.length <= 254 && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(email) ? email : '';
}

function recipient_(response) {
  const fields = {};
  response.getItemResponses().forEach(r => { fields[r.getItem().getTitle()] = r.getResponse(); });
  const consent = fields[SETTINGS.consentQuestion];
  if (!Array.isArray(consent) || !consent.includes(SETTINGS.consent)) return '';
  return normalizeEmail_(fields[SETTINGS.emailQuestion]);
}

function hash_(email) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email)
    .map(b => ('0' + (b & 255).toString(16)).slice(-2)).join('');
}

function footer_() {
  return '\n\nRadioGAGA / Kome Labs\n' + SETTINGS.website +
    '\n配信停止・登録情報の訂正をご希望の場合は、このメールに返信してください。';
}

function receipt_() {
  return {id: 'receipt-v1', subject: '【RadioGAGA】先行テスター登録を受け付けました',
    body: 'ご登録ありがとうございます。\n\nまず、Google Playで使用するGoogleアカウントで、次のグループに参加してください。\n' +
      SETTINGS.groupUrl + '\n\n「グループに参加」を選んで参加を完了してください。\n' +
      'アプリの配信準備が整い次第、インストール手順をご案内します。現時点では登録やグループ参加だけでインストールはできません。' + footer_()};
}

function currentCampaign_(props) {
  // Set these private Script Properties only after checking the live Play release.
  if (props.getProperty('RELEASE_READY') !== 'yes') return null;
  const version = props.getProperty('RELEASE_VERSION') || '';
  const url = props.getProperty('TEST_OPTIN_URL') || '';
  const notes = props.getProperty('RELEASE_NOTES') || '';
  if (!/^[0-9A-Za-z._-]{1,40}$/.test(version) ||
      !/^https:\/\/play\.google\.com\/apps\/testing\/jp\.komelabs\.radiogaga$/.test(url) ||
      notes.length > 4000) throw new Error('公開済みクローズドテストのURL、バージョン、更新内容を確認してください。');
  return {id: 'release-' + version, subject: '【RadioGAGA】テスト版 ' + version + ' のご案内',
    body: 'RadioGAGA のテスト版 ' + version + ' を配信しました。\n\n' + notes +
      '\n\n1. Google Playのアカウントでグループに参加\n' + SETTINGS.groupUrl +
      '\n\n2. 同じアカウントでテスト参加ページを開き、「テスターになる」を選択\n' + url +
      '\n\n3. 参加ページ内のGoogle Playリンクからインストール・更新\n' +
      '参加直後は反映に時間がかかる場合があります。\n不具合や感想は、このメールへの返信でお知らせください。' + footer_()};
}

function preview() {
  // No outbound mail and no recipient data in logs.
  assertSender_();
  console.log(receipt_().body);
  const notice = currentCampaign_(PropertiesService.getScriptProperties());
  console.log(notice ? notice.body : 'インストール案内は無効（配信準備中）');
}

function muteRecipient_(email) {
  assertSender_();
  const normalized = normalizeEmail_(email);
  if (!normalized) throw new Error('有効なメールアドレスが必要です。');
  PropertiesService.getScriptProperties().setProperty('muted:' + hash_(normalized), 'yes');
}
