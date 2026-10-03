---
layout: landing
title: RadioGAGA
description: ラジオの時間を、あなたの時間に。番組を探して、予約して、端末に録音。AndroidアプリRadioGAGAの先行テスト参加案内。
---
{% assign form_url = site.tester_form_url | default: '' | strip %}
{% if form_url != '' %}
{% assign join_url = form_url %}
{% assign join_label = 'テスターに申し込む' %}
{% else %}
{% assign join_url = '#testing' %}
{% assign join_label = 'テスター参加の案内を見る' %}
{% endif %}

<section class="lp-hero" aria-labelledby="hero-title">
<div class="lp-hero-copy">
<p class="lp-eyebrow">RADIO · RECORD · REPLAY</p>
<h1 id="hero-title"><span>ラジオの時間を、</span><span>あなたの時間に。</span></h1>
<p class="lp-lead">いつでも、どこでも、<br class="lp-mobile-break">好きなときに、続きから。</p>
<p>番組を探して、予約して、端末に録音。<br>Androidアプリ「RadioGAGA」</p>
<p class="lp-status">{% if form_url != '' %}先行テスター募集中{% else %}先行テスター受付準備中{% endif %}</p>
<a class="lp-button" href="{{ join_url | escape }}">{{ join_label }} <span aria-hidden="true">→</span></a>
<p class="lp-small">Android 8.0以降 · Google Playのアカウントが必要です</p>
</div>
<figure class="lp-hero-screen"><a href="{{ '/assets/screenshots/20261003/player.png' | relative_url }}" aria-label="プレーヤー画面を拡大する"><img src="{{ '/assets/screenshots/20261003/player.png' | relative_url }}" width="1080" height="2188" alt="RadioGAGAのプレーヤー。再生速度、15秒送り戻し、タイマーを表示" fetchpriority="high"></a><figcaption>聴きかけの続きから、あなたのペースで。</figcaption></figure>
</section>
<div class="lp-benefit-strip" aria-label="主な機能"><span>毎週の予約録音</span><span>オフライン再生</span><span>続きから再生</span></div>
<section class="lp-features" aria-label="RadioGAGAの楽しみ方">
<article class="lp-feature">
<div class="lp-feature-copy"><p class="lp-eyebrow">01 / RECORD</p><h2>毎週の楽しみを、<br>予約録音。</h2><p>番組表から好きな番組を予約。対応する番組を、放送終了後に自動で録音します。</p><p class="lp-small">番組表で探す → 予約する → 録音した番組を聴く</p></div>
<div class="lp-screen-pair">
<figure><a href="{{ '/assets/screenshots/20261003/timetable.png' | relative_url }}" aria-label="番組表画面を拡大する"><img src="{{ '/assets/screenshots/20261003/timetable.png' | relative_url }}" width="1080" height="2188" alt="放送予定を確認できる番組表" loading="lazy"></a><figcaption>番組表</figcaption></figure>
<figure><a href="{{ '/assets/screenshots/20261003/reservations.png' | relative_url }}" aria-label="予約画面を拡大する"><img src="{{ '/assets/screenshots/20261003/reservations.png' | relative_url }}" width="1080" height="2188" alt="毎週の番組と次回の予定を確認できる録音予約" loading="lazy"></a><figcaption>予約録音</figcaption></figure>
</div></article>
<article class="lp-feature lp-feature-reverse">
<div class="lp-feature-copy"><p class="lp-eyebrow">02 / REPLAY</p><h2>聴きかけの続きも、<br>あなたのペースで。</h2><p>録音した番組は、通信できない場所でも再生。続きから聴けて、再生速度も変えられます。</p><p class="lp-small">15秒の送り戻し・スリープタイマーにも対応。</p></div>
<div class="lp-screen-pair">
<figure><a href="{{ '/assets/screenshots/20261003/library.png' | relative_url }}" aria-label="ライブラリ画面を拡大する"><img src="{{ '/assets/screenshots/20261003/library.png' | relative_url }}" width="1080" height="2188" alt="録音した番組を新着順に並べたライブラリ" loading="lazy"></a><figcaption>ライブラリ</figcaption></figure>
<figure><a href="{{ '/assets/screenshots/20261003/player.png' | relative_url }}" aria-label="再生画面を拡大する"><img src="{{ '/assets/screenshots/20261003/player.png' | relative_url }}" width="1080" height="2188" alt="再生位置や速度を調整できるプレーヤー" loading="lazy"></a><figcaption>プレーヤー</figcaption></figure>
</div></article>
<article class="lp-feature">
<div class="lp-feature-copy"><p class="lp-eyebrow">03 / DISCOVER</p><h2>いつもの番組も、<br>新しい出会いも。</h2><p>番組名や出演者で検索。今放送中の番組から、そのまま聴き始めることもできます。</p><p class="lp-small">番組表と端末に録音した番組をまとめて検索。</p></div>
<div class="lp-screen-pair">
<figure><a href="{{ '/assets/screenshots/20261003/search.png' | relative_url }}" aria-label="検索画面を拡大する"><img src="{{ '/assets/screenshots/20261003/search.png' | relative_url }}" width="1080" height="2188" alt="JUNKの番組検索結果" loading="lazy"></a><figcaption>番組検索</figcaption></figure>
<figure><a href="{{ '/assets/screenshots/20261003/on-air.png' | relative_url }}" aria-label="放送中画面を拡大する"><img src="{{ '/assets/screenshots/20261003/on-air.png' | relative_url }}" width="1080" height="2188" alt="各局で今放送している番組の一覧" loading="lazy"></a><figcaption>放送中</figcaption></figure>
</div></article>
<p class="lp-small lp-image-note">画面は2026年10月3日時点の開発版です。画像はタップで拡大できます。</p>
</section>
<section id="testing" class="lp-testing" aria-labelledby="testing-title">
<p class="lp-eyebrow">JOIN THE EARLY TEST</p><h2 id="testing-title">いつものラジオ時間で、<br>試してください。</h2>
<p>好きな番組を探して、録音して、聴いてみる。<br>使いにくかったところや、うまく動かなかったところを教えてください。<br>あなたの声を、RadioGAGAの改善につなげます。</p>
<ol class="lp-steps">
<li><span class="lp-step-number" aria-hidden="true">01</span><h3>申し込む</h3><p>Google Playで使っているメールアドレスを登録。</p></li>
<li><span class="lp-step-number" aria-hidden="true">02</span><h3>インストールする</h3><p>参加案内に沿って、テスト版のアプリをインストール。</p></li>
<li><span class="lp-step-number" aria-hidden="true">03</span><h3>使ってみる</h3><p>いつもの番組で試して、気づいたことをフィードバック。</p></li>
</ol>
{% if form_url != '' %}
<a class="lp-button" href="{{ form_url | escape }}">テスターに申し込む <span aria-hidden="true">→</span></a><p class="lp-small">Google Playで使っているGoogleアカウントをご用意ください。</p>
{% else %}
<div class="lp-pending"><strong>ただいま参加受付を準備しています。</strong><p>受付開始後、このページに申込みフォームと参加案内を掲載します。</p></div>
{% endif %}
</section>
<section class="lp-faq" aria-labelledby="faq-title">
<p class="lp-eyebrow">QUESTIONS</p><h2 id="faq-title">参加前に、気になること。</h2>
<details><summary>どの端末で使えますか？</summary><p>Android 8.0以降の端末に対応しています。テスト参加には、端末のGoogle Playで使っているGoogleアカウントが必要です。</p></details>
<details><summary>どの番組を聴いたり、録音したりできますか？</summary><p>取得できる番組は、対応する放送局や配信期間によって異なります。すべての番組を録音できるわけではありません。番組情報・音源の取得にはインターネット接続が必要です。</p></details>
<details><summary>通信できない場所でも聴けますか？</summary><p>端末に録音済みの番組は、オフラインで再生できます。</p></details>
<details><summary>料金や広告について教えてください。</summary><p>アプリ内には広告があります。テスト参加に関する費用や利用条件は、受付開始時の参加案内でお知らせします。</p></details>
<details><summary>不具合や感想は、どこに送ればいいですか？</summary><p>現在は<a href="https://github.com/KxOxUxMxExI/RadioGAGA-Website/issues">GitHubの問い合わせ窓口</a>をご利用いただけます。テスト参加時のフィードバック方法は、参加案内に掲載します。</p></details>
</section>
<section class="lp-closing" aria-label="テスト参加案内"><h2>あなたのラジオ時間を、<br>RadioGAGAで。</h2><a class="lp-button" href="{{ join_url | escape }}">{{ join_label }} <span aria-hidden="true">→</span></a><p class="lp-small">{% if form_url != '' %}Android版 先行テスター募集中{% else %}Android版 先行テスター受付準備中{% endif %}</p></section>
