const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
const source = fs.readFileSync(__dirname + '/Code.gs', 'utf8');
let sender = 'koumelabs@gmail.com', quota = 100, fail = false;
let values = {}, responses = [], mails = [], triggers = [];
const props = {getProperty: k => values[k] || null, setProperty: (k,v) => {values[k]=v;}};
const context = vm.createContext({console: {log() {}, error() {}},
  Session: {getEffectiveUser: () => ({getEmail: () => sender})},
  PropertiesService: {getScriptProperties: () => props},
  Utilities: {DigestAlgorithm: {SHA_256: 'sha256'}, computeDigest: (_, v) => [...crypto.createHash('sha256').update(v).digest()]},
  LockService: {getScriptLock: () => ({tryLock: () => true, releaseLock() {}})},
  FormApp: {openById: () => ({getResponses: () => responses})},
  MailApp: {getRemainingDailyQuota: () => quota, sendEmail: m => {if(fail) throw Error('unknown'); mails.push(m); quota--; }},
  ScriptApp: {getProjectTriggers: () => triggers, newTrigger: name => {
    const builder = {forForm: () => builder, onFormSubmit: () => builder, timeBased: () => builder,
      everyHours: () => builder, create: () => triggers.push({getHandlerFunction: () => name})}; return builder;
  }}
});
vm.runInContext(source, context);
const run = code => vm.runInContext(code, context);
function response(email, consent=true) {
  return {getItemResponses: () => [
    {getItem: () => ({getTitle: () => 'Google Playで使用しているメールアドレス'}), getResponse: () => email},
    {getItem: () => ({getTitle: () => 'テスト参加登録と案内メールへの同意'}), getResponse: () => consent ? ['登録したメールアドレスをGoogle Playのテスト参加登録、インストール案内、テストに関する更新連絡に使用することに同意します。'] : []}
  ]};
}
run('setup(); setup()'); assert.equal(triggers.length, 2);
sender = 'personal@example.com'; assert.throws(() => run('processPending()')); assert.equal(mails.length, 0);
sender = 'koumelabs@gmail.com';
responses = [response(' USER@example.com '), response('user@example.com'), response('nobody@example.com',false), response('x@example.com,b@example.com'), response('x@example.com\nBcc: victim@example.com')];
run('processPending(); processPending()'); assert.equal(mails.length,1); assert.equal(mails[0].to,'user@example.com');
assert.ok(mails[0].body.includes('現時点では')); assert.ok(!mails[0].body.includes('apps/internaltest'));
values.RELEASE_READY='yes'; values.RELEASE_VERSION='0.1.11'; values.TEST_OPTIN_URL='https://evil.example.com';
assert.throws(() => run('processPending()')); assert.equal(mails.length,1);
values.TEST_OPTIN_URL='https://play.google.com/apps/testing/jp.komelabs.radiogaga'; values.RELEASE_NOTES='更新内容';
run('processPending(); processPending()'); assert.equal(mails.length,2);
run("muteRecipient_('USER@example.com')"); values.RELEASE_VERSION='0.1.12'; run('processPending()'); assert.equal(mails.length,2);
responses.push(response('second@example.com')); quota=0; run('processPending()'); assert.equal(mails.length,2);
quota=100; fail=true; assert.throws(() => run('processPending()')); fail=false; run('processPending()');
assert.equal(mails.length,3); // Uncertain receipt held; release succeeds once.
assert.ok(Object.values(values).includes('uncertain'));
assert.ok(mails.every(m => !m.cc && !m.bcc && m.replyTo === 'koumelabs@gmail.com'));
console.log('PASS: sender guard, consent, input, deduplication, quota, release gate, mute, uncertain-send handling');
