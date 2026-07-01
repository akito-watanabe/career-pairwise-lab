# キャリア比較ツール v0.4 — 会社員/個人事業分岐版 実装プロンプト

## あなたの役割

あなたは、プロダクトマネージャー、UX設計者、キャリア支援者、データ設計者、フロントエンドエンジニアを兼ねる実装パートナーです。

これから、就活生・若手社会人・転職検討者・フリーランス志向・個人事業志向・クリエイター志向の人が、自分のキャリアの方向性を比較しながら整理できるスマホ向けWebアプリを作ってください。

このツールは適職診断ではありません。
2択比較と理由入力を通じて、本人の判断軸・優先順位・避けたい要素を可視化する意思決定補助ツールです。

結果は断定せず、必ず「傾向」「仮説」「次に調べること」として扱ってください。

---

## 実装ゴール

単一HTMLファイルで動くスマホファーストWebアプリを作成してください。

### 必須条件

* 単一HTMLファイルで完結する
* 外部APIは使わない
* 外部ライブラリは使わない
* HTML/CSS/JavaScriptを1ファイル内に含める
* スマホファーストのレスポンシブUI
* localStorageに診断ログを保存する
* 保存件数は最大30件
* AI分析用プロンプトを結果画面で生成する
* プロンプトをコピーできるボタンを付ける
* 履歴画面で過去の結果を参照できる
* 友人にHTMLファイルとして渡しても動く
* GitHub Pagesに置いても動く

---

## プロダクト名

仮で以下にしてください。

**Career Pairwise Lab**

日本語表示名：

**キャリア比較ラボ**

---

## 設計思想

このアプリで大事なのは、網羅的な職業図鑑を作ることではありません。

目的は、ユーザーが以下を整理できることです。

* 会社員として働きたいのか、個人で生きたいのか
* 何に興味があるのか
* どの業界や活動領域に惹かれるのか
* どんな職種や仕事の中身が合いそうか
* どんな仕事の進め方が好きか
* 何を避けたいのか
* 次に何を調べるべきか

絶対に、業界・職種・会社フェーズ・仕事スタイル・避けたい要素・個人事業の収益モデルを同じ階層に混ぜないでください。

---

## 全体フロー

### 共通フロー

1. トップ画面
2. L0：現在地選択
3. L0.5：キャリア形態選択
4. L1：興味軸ペアワイズ比較
5. キャリア形態に応じて分岐

---

## L0：現在地

比較ではなく選択形式。

以下を用意してください。

```json
[
  {
    "id": "student_humanities",
    "label": "文系学生",
    "description": "就活中またはこれから就活する文系学生"
  },
  {
    "id": "student_science",
    "label": "理系学生",
    "description": "理系・情報系・専門領域を学ぶ学生"
  },
  {
    "id": "junior_worker",
    "label": "若手社会人",
    "description": "社会人1〜3年目で今後の方向性を考えている"
  },
  {
    "id": "mid_worker",
    "label": "中堅手前",
    "description": "社会人4〜7年目で専門性や働き方を見直したい"
  },
  {
    "id": "career_change",
    "label": "未経験転向",
    "description": "別職種や別業界への転向を考えている"
  },
  {
    "id": "current_mismatch",
    "label": "現職に違和感",
    "description": "今の仕事に違和感があり、次の方向性を探している"
  },
  {
    "id": "side_project",
    "label": "副業検討",
    "description": "本業以外の活動や収入源を作りたい"
  },
  {
    "id": "independent_hope",
    "label": "独立志向",
    "description": "会社に頼らず個人で生きる方法を考えたい"
  }
]
```

---

## L0.5：キャリア形態

比較または選択形式。
MVPでは複数選択ではなく、最も近いものを1つ選ばせてください。

```json
[
  {
    "id": "company_employee",
    "label": "会社員",
    "description": "企業に所属し、給与を得ながら働く"
  },
  {
    "id": "public_org",
    "label": "公務員・団体",
    "description": "行政、学校、医療法人、NPOなど安定した組織で働く"
  },
  {
    "id": "freelance",
    "label": "フリーランス",
    "description": "会社に所属せず、案件ごとに仕事を受ける"
  },
  {
    "id": "small_business",
    "label": "個人事業",
    "description": "店舗、教室、キッチンカーなど自分の商売を持つ"
  },
  {
    "id": "creator",
    "label": "クリエイター",
    "description": "音楽、絵、動画、文章、配信など作品や発信で生きる"
  },
  {
    "id": "startup_founder",
    "label": "起業",
    "description": "新しい事業やサービスを作り、組織や事業を育てる"
  },
  {
    "id": "hybrid",
    "label": "複業・副業",
    "description": "会社員をしながら個人活動や副業も育てる"
  }
]
```

---

## L1：興味軸

ペアワイズ比較。
業界名でも職種名でもなく、「何に触れていると面白そうか」を比較してください。

```json
[
  {
    "id": "talk_solve",
    "label": "人の課題解決",
    "description": "人と話し、困りごとを聞いて解決する"
  },
  {
    "id": "structure_design",
    "label": "仕組み作り",
    "description": "業務、組織、サービスの構造を整える"
  },
  {
    "id": "data_thinking",
    "label": "数字で考える",
    "description": "データや数字から仮説や答えを見つける"
  },
  {
    "id": "make_product",
    "label": "ものを作る",
    "description": "商品、サービス、作品、体験を作って届ける"
  },
  {
    "id": "team_growth",
    "label": "チーム改善",
    "description": "人や組織がうまく動く状態を作る"
  },
  {
    "id": "social_value",
    "label": "社会貢献",
    "description": "人や社会の役に立つ領域で働く"
  },
  {
    "id": "deep_expertise",
    "label": "専門追求",
    "description": "技術、知識、技能を深く磨く"
  },
  {
    "id": "new_business",
    "label": "事業づくり",
    "description": "新しい市場、商売、収益の形を作る"
  },
  {
    "id": "creative_expression",
    "label": "表現・創作",
    "description": "音楽、絵、文章、映像、デザインなどで表現する"
  },
  {
    "id": "stable_support",
    "label": "安定支援",
    "description": "暮らしや事業が安定して回るよう支える"
  }
]
```

---

# 分岐A：会社員・組織所属モード

対象 career_mode：

* company_employee
* public_org
* hybrid のうち会社員寄り

---

## A-L2：業界マスタ

業界はマスタとして多めに持ち、UIではL1結果に応じて上位8〜10件だけ比較してください。

以下の業界を含めてください。

```json
[
  {"id": "it_software", "label": "IT・ソフト", "category": "tech"},
  {"id": "web_service", "label": "Webサービス", "category": "tech"},
  {"id": "ai_data", "label": "AI・データ", "category": "tech"},
  {"id": "security", "label": "セキュリティ", "category": "tech"},
  {"id": "finance", "label": "金融・保険", "category": "finance"},
  {"id": "fintech", "label": "Fintech", "category": "finance"},
  {"id": "consulting", "label": "コンサル", "category": "business"},
  {"id": "hr", "label": "人材・HR", "category": "business"},
  {"id": "legal_service", "label": "法務・士業", "category": "business"},
  {"id": "bpo", "label": "業務支援", "category": "business"},
  {"id": "retail_ec", "label": "小売・EC", "category": "consumer"},
  {"id": "food_beverage", "label": "食品・飲料", "category": "consumer"},
  {"id": "beauty_fashion", "label": "美容・服飾", "category": "consumer"},
  {"id": "travel_hotel", "label": "旅行・宿泊", "category": "consumer"},
  {"id": "restaurant", "label": "外食", "category": "consumer"},
  {"id": "manufacturing", "label": "メーカー", "category": "industry"},
  {"id": "mobility", "label": "モビリティ", "category": "industry"},
  {"id": "logistics", "label": "物流・運輸", "category": "industry"},
  {"id": "real_estate", "label": "不動産・建設", "category": "industry"},
  {"id": "energy", "label": "エネルギー", "category": "industry"},
  {"id": "healthcare", "label": "医療・健康", "category": "social"},
  {"id": "welfare", "label": "介護・福祉", "category": "social"},
  {"id": "education", "label": "教育", "category": "social"},
  {"id": "public_admin", "label": "公共・行政", "category": "social"},
  {"id": "agriculture", "label": "農業・食流通", "category": "social"},
  {"id": "advertising", "label": "広告・マーケ", "category": "creative"},
  {"id": "media_publish", "label": "メディア出版", "category": "creative"},
  {"id": "music_live", "label": "音楽・ライブ", "category": "creative"},
  {"id": "art_culture", "label": "芸術・文化", "category": "creative"},
  {"id": "movie_video", "label": "映像・映画", "category": "creative"},
  {"id": "manga_anime", "label": "漫画・アニメ", "category": "creative"},
  {"id": "game_entertainment", "label": "ゲーム", "category": "creative"},
  {"id": "event_stage", "label": "イベント・舞台", "category": "creative"}
]
```

各業界には、実装時に以下を持たせてください。

* id
* label
* category
* description
* related_interest_areas
* typical_job_types

---

## A-L3：職種マスタ

職種もマスタは多めに持ち、UIではL1・L2結果に応じて上位8〜10件だけ比較してください。

以下を含めてください。

```json
[
  {"id": "sales", "label": "営業", "category": "sales_customer"},
  {"id": "inside_sales", "label": "内勤営業", "category": "sales_customer"},
  {"id": "customer_success", "label": "CS", "category": "sales_customer"},
  {"id": "store_service", "label": "店舗運営", "category": "sales_customer"},
  {"id": "customer_service", "label": "接客サービス", "category": "sales_customer"},
  {"id": "business_planning", "label": "事業企画", "category": "planning"},
  {"id": "business_development", "label": "事業開発", "category": "planning"},
  {"id": "product_planning", "label": "商品企画", "category": "planning"},
  {"id": "product_manager", "label": "PdM・企画", "category": "planning"},
  {"id": "corporate_planning", "label": "経営企画", "category": "planning"},
  {"id": "new_business", "label": "新規事業", "category": "planning"},
  {"id": "marketing", "label": "マーケ", "category": "marketing_pr"},
  {"id": "ad_operation", "label": "広告運用", "category": "marketing_pr"},
  {"id": "content_planning", "label": "コンテンツ企画", "category": "marketing_pr"},
  {"id": "public_relations", "label": "広報PR", "category": "marketing_pr"},
  {"id": "brand_planning", "label": "ブランド", "category": "marketing_pr"},
  {"id": "research", "label": "リサーチ", "category": "marketing_pr"},
  {"id": "engineering", "label": "開発", "category": "tech_data"},
  {"id": "data_analysis", "label": "データ分析", "category": "tech_data"},
  {"id": "ai_ml", "label": "AI・機械学習", "category": "tech_data"},
  {"id": "information_systems", "label": "情シス", "category": "tech_data"},
  {"id": "qa_quality", "label": "品質管理", "category": "tech_data"},
  {"id": "rd", "label": "研究R&D", "category": "tech_data"},
  {"id": "recruiting", "label": "人事・採用", "category": "corporate"},
  {"id": "org_development", "label": "組織開発", "category": "corporate"},
  {"id": "accounting_finance", "label": "経理財務", "category": "corporate"},
  {"id": "legal_compliance", "label": "法務", "category": "corporate"},
  {"id": "general_affairs", "label": "総務", "category": "corporate"},
  {"id": "assistant", "label": "秘書補佐", "category": "corporate"},
  {"id": "office_work", "label": "一般事務", "category": "operations"},
  {"id": "sales_admin", "label": "営業事務", "category": "operations"},
  {"id": "operation_planning", "label": "業務企画", "category": "operations"},
  {"id": "production_control", "label": "生産管理", "category": "operations"},
  {"id": "logistics_control", "label": "物流管理", "category": "operations"},
  {"id": "support_center", "label": "サポート", "category": "operations"},
  {"id": "design", "label": "デザイン", "category": "creative"},
  {"id": "ux_ui", "label": "UX/UI", "category": "creative"},
  {"id": "writing_editing", "label": "編集・文章", "category": "creative"},
  {"id": "video_music", "label": "映像・音楽", "category": "creative"},
  {"id": "illustration_art", "label": "イラスト", "category": "creative"},
  {"id": "event_production", "label": "イベント制作", "category": "creative"},
  {"id": "consultant", "label": "コンサル", "category": "professional"},
  {"id": "career_support", "label": "キャリア支援", "category": "professional"},
  {"id": "training_education", "label": "教育研修", "category": "professional"},
  {"id": "medical_welfare", "label": "医療福祉職", "category": "professional"},
  {"id": "architecture", "label": "建築設計", "category": "professional"},
  {"id": "licensed_professional", "label": "士業専門職", "category": "professional"}
]
```

各職種には、実装時に以下を持たせてください。

* id
* label
* category
* description
* related_interest_areas
* related_industries

---

# 分岐B：個人で生きるモード

対象 career_mode：

* freelance
* small_business
* creator
* startup_founder
* hybrid のうち個人活動寄り

会社員向けの「業界」「職種」ではなく、以下を比較してください。

---

## B-L2：個人活動ジャンル

```json
[
  {
    "id": "kitchen_car",
    "label": "キッチンカー",
    "description": "移動販売で飲食を提供し、出店場所やメニューで勝負する"
  },
  {
    "id": "small_restaurant",
    "label": "小さな飲食店",
    "description": "自分の店や間借り営業で飲食を提供する"
  },
  {
    "id": "handmade_goods",
    "label": "ハンドメイド",
    "description": "アクセサリー、雑貨、服などを作って販売する"
  },
  {
    "id": "online_shop",
    "label": "ネット物販",
    "description": "ECやフリマで商品を仕入れ・販売する"
  },
  {
    "id": "music_live",
    "label": "音楽活動",
    "description": "作曲、演奏、歌、ライブ、音源販売などで活動する"
  },
  {
    "id": "illustration_art",
    "label": "イラスト",
    "description": "絵、漫画、アート作品を制作して販売・受託する"
  },
  {
    "id": "video_streaming",
    "label": "動画・配信",
    "description": "動画制作、配信、SNS発信で人を集める"
  },
  {
    "id": "writing_editing",
    "label": "文章・編集",
    "description": "記事、note、書籍、編集、コピー制作を行う"
  },
  {
    "id": "photo_movie",
    "label": "写真・映像",
    "description": "撮影、編集、映像制作を仕事にする"
  },
  {
    "id": "beauty_bodycare",
    "label": "美容・整体",
    "description": "美容、整体、マッサージ、パーソナルケアを提供する"
  },
  {
    "id": "teaching_coaching",
    "label": "教室・コーチ",
    "description": "勉強、運動、音楽、キャリアなどを教える"
  },
  {
    "id": "it_freelance",
    "label": "IT受託",
    "description": "Web制作、開発、データ、業務改善などを案件で受ける"
  },
  {
    "id": "consulting_advisor",
    "label": "コンサル顧問",
    "description": "経験や専門知識を使って企業や個人を支援する"
  },
  {
    "id": "local_farming",
    "label": "農業・地域商売",
    "description": "農産物、地域資源、観光、体験を商売にする"
  }
]
```

---

## B-L3：収益モデル

```json
[
  {
    "id": "product_sales",
    "label": "商品販売",
    "description": "物や作品を売って収益を得る"
  },
  {
    "id": "service_sales",
    "label": "サービス提供",
    "description": "施術、相談、作業代行などを提供して収益を得る"
  },
  {
    "id": "contract_work",
    "label": "受託制作",
    "description": "依頼を受けて制作や開発を行い報酬を得る"
  },
  {
    "id": "subscription",
    "label": "月額契約",
    "description": "継続契約や会員制で安定収益を得る"
  },
  {
    "id": "lesson_course",
    "label": "講座・教室",
    "description": "知識や技術を教えて収益を得る"
  },
  {
    "id": "event_live",
    "label": "イベント収益",
    "description": "ライブ、出店、展示、体験イベントで収益を得る"
  },
  {
    "id": "ad_sns",
    "label": "広告・SNS",
    "description": "発信やメディア運営で広告収益を得る"
  },
  {
    "id": "fan_support",
    "label": "ファン課金",
    "description": "投げ銭、支援、コミュニティ課金で収益を得る"
  },
  {
    "id": "store_sales",
    "label": "店舗・出店",
    "description": "店舗や出店場所で直接販売して収益を得る"
  },
  {
    "id": "license_rights",
    "label": "権利収入",
    "description": "著作権、楽曲、素材、ライセンスで収益を得る"
  }
]
```

---

## B-L4：個人活動スタイル

```json
[
  {
    "id": "solo_create",
    "label": "黙々と作る",
    "description": "一人で集中して作品や商品を作る"
  },
  {
    "id": "front_person",
    "label": "人前に立つ",
    "description": "ライブ、講座、接客、配信など表に出る"
  },
  {
    "id": "direct_customer",
    "label": "直接接客",
    "description": "お客さんと直接話しながら価値を届ける"
  },
  {
    "id": "sns_growth",
    "label": "SNS発信",
    "description": "SNSや動画で人を集めて広げる"
  },
  {
    "id": "local_field",
    "label": "現場に立つ",
    "description": "店舗、イベント、地域などリアルな場所で働く"
  },
  {
    "id": "behind_support",
    "label": "裏方支援",
    "description": "表に出る人や事業を裏側から支える"
  },
  {
    "id": "build_assets",
    "label": "資産を積む",
    "description": "作品、記事、商品、教材などを積み上げる"
  },
  {
    "id": "project_work",
    "label": "案件を回す",
    "description": "複数の依頼や案件を管理して収益を作る"
  },
  {
    "id": "community_based",
    "label": "地域密着",
    "description": "地域や常連との関係を大切にする"
  },
  {
    "id": "online_based",
    "label": "オンライン完結",
    "description": "場所に縛られずオンライン中心で働く"
  }
]
```

---

## B-L5：個人活動リスク

チェック形式。

```json
[
  {
    "id": "unstable_income",
    "label": "収入不安定",
    "description": "月ごとの売上や収入が大きく変わる"
  },
  {
    "id": "high_initial_cost",
    "label": "初期費用大",
    "description": "開業や機材購入にまとまった資金が必要"
  },
  {
    "id": "inventory_risk",
    "label": "在庫リスク",
    "description": "売れ残りや仕入れ負担が発生する"
  },
  {
    "id": "hard_to_acquire",
    "label": "集客が難しい",
    "description": "お客さんや案件を自分で集める必要がある"
  },
  {
    "id": "sns_pressure",
    "label": "SNS負荷",
    "description": "発信を続けることが心理的負担になる"
  },
  {
    "id": "too_much_customer",
    "label": "接客が多い",
    "description": "顧客対応やクレーム対応が多くなる"
  },
  {
    "id": "physical_dependency",
    "label": "体力依存",
    "description": "体調を崩すと売上や活動が止まりやすい"
  },
  {
    "id": "location_dependency",
    "label": "場所依存",
    "description": "出店場所や立地に成果が左右される"
  },
  {
    "id": "high_competition",
    "label": "競合が多い",
    "description": "似た活動をする人が多く差別化が必要"
  },
  {
    "id": "low_unit_price",
    "label": "単価が低い",
    "description": "努力の割に単価を上げにくい"
  },
  {
    "id": "legal_permission",
    "label": "許認可が必要",
    "description": "保健所、契約、税務、法律対応が必要になる"
  },
  {
    "id": "lonely_work",
    "label": "孤独になりやすい",
    "description": "相談相手や仲間が少なくなりやすい"
  }
]
```

---

# 共通：仕事スタイル

会社員モードにも個人モードにも使えるペアワイズ比較です。

```json
[
  {
    "id": "fast_trial",
    "label": "早く試す",
    "description": "まず動いて、反応を見ながら改善したい"
  },
  {
    "id": "deep_plan",
    "label": "深く考える",
    "description": "事前に構造や計画を整理してから動きたい"
  },
  {
    "id": "solo_focus",
    "label": "一人で集中",
    "description": "一人で考えたり作業したりする時間が大事"
  },
  {
    "id": "team_talk",
    "label": "人と進める",
    "description": "会話や協力を通じて仕事を進めたい"
  },
  {
    "id": "visible_result",
    "label": "成果が見える",
    "description": "数字や反応が見える仕事にやりがいを感じる"
  },
  {
    "id": "deep_specialty",
    "label": "専門を深める",
    "description": "一つの技能や知識を深く磨きたい"
  },
  {
    "id": "wide_range",
    "label": "幅広く関わる",
    "description": "一つに閉じず、いろいろな領域に関わりたい"
  },
  {
    "id": "zero_to_one",
    "label": "0から作る",
    "description": "まだないものを考えて形にしたい"
  },
  {
    "id": "stable_operation",
    "label": "安定運用",
    "description": "日々安定して回る仕組みを支えたい"
  },
  {
    "id": "change_action",
    "label": "変化が多い",
    "description": "変化の大きい環境で動く方が刺激がある"
  }
]
```

---

# 結果画面

結果画面では、キャリア形態に応じて表示を変えてください。

## 会社員モード

表示項目：

* 興味軸ランキング
* 業界ランキング
* 職種ランキング
* 仕事スタイル上位
* 避けたい要素
* 次に調べるべきこと
* 誰に話を聞くとよいか
* AI分析用プロンプト

## 個人モード

表示項目：

* 興味軸ランキング
* 個人活動ジャンルランキング
* 収益モデルランキング
* 個人活動スタイル上位
* 避けたいリスク
* 小さく始めるなら何を試すか
* 誰に話を聞くとよいか
* AI分析用プロンプト

---

# AI分析用プロンプト

結果画面で、以下の情報を含むプロンプトを生成してください。

* ユーザーの現在地
* キャリア形態
* L1興味軸ランキング
* 会社員モードの場合：業界ランキング、職種ランキング
* 個人モードの場合：活動ジャンルランキング、収益モデルランキング
* 仕事スタイルランキング
* 避けたい要素/リスク
* 各比較で入力された理由
* 「断定せず、仮説として分析する」指示
* 次に調べること
* 追加で比較すべき選択肢
* 相談で深掘りすべき質問

---

# UI要件

* スマホで片手操作しやすいこと
* ボタンは大きめ
* 進捗を表示する
* 1画面1質問を基本にする
* 比較カードは左右または上下に並べる
* 「どちらもあり」「どちらも微妙」「わからない」を用意する
* 理由入力は任意。ただし入力しやすい一言欄を付ける
* 戻るボタンを付ける
* 最初からやり直すボタンを付ける
* 結果画面にコピー用ボタンを付ける
* 履歴タブを付ける

---

# スコアリング仕様

ペアワイズ比較のスコアは以下で処理してください。

* Aを選択：A +1
* Bを選択：B +1
* どちらもあり：A +0.5、B +0.5
* どちらも微妙：A +0、B +0
* わからない：スコアなし

理由入力がある場合は、比較ログに保存してください。

---

# 比較候補の絞り込み

全件を比較しないでください。

## 会社員モード

* L1：全10件を比較してよい
* 業界：L1の上位結果に応じて8〜10件に絞る
* 職種：L1と業界上位結果に応じて8〜10件に絞る
* 仕事スタイル：全10件を比較してよい

## 個人モード

* L1：全10件を比較してよい
* 個人活動ジャンル：L1結果とcareer_modeに応じて8〜10件に絞る
* 収益モデル：活動ジャンル上位結果に応じて6〜8件に絞る
* 個人活動スタイル：全10件を比較してよい

---

# localStorage仕様

診断完了時に、以下を保存してください。

```json
{
  "id": "timestamp_based_id",
  "created_at": "ISO8601",
  "user_status": {},
  "career_mode": {},
  "mode": "company_or_solo",
  "rankings": {},
  "avoid_factors": [],
  "comparison_logs": [],
  "ai_prompt": "string"
}
```

保存件数は最大30件。
31件目以降は古いものから削除してください。

---

# ファイル出力

最終成果物として以下を出してください。

1. `index.html`
2. `README.md`
3. `career_taxonomy_v0_4.json` 相当のデータ構造をHTML内に埋め込む
4. 変更点の簡単な説明

ただし、最初のMVPでは実際の配布用に `index.html` 単体で動くようにしてください。

---

# 実装時の注意

* 適職診断のように断定しない
* 「向いている」ではなく「関心が寄っている可能性」「追加で調べるとよい」と表現する
* 会社員向け分類と個人事業向け分類を混ぜない
* 音楽・芸術・創作を薄く扱わない
* キッチンカーは業界ではなく、個人活動ジャンルとして扱う
* 業界マスタ・職種マスタは多めに持つが、UI比較では絞る
* スマホで重くならないようにする
* 外部通信しない
* 個人情報を入力させない
* 友人にそのまま渡して動くことを重視する

---

# 最終的に実現したい体験

ユーザーが10〜15分程度で、以下を得られる状態にしてください。

* 自分が会社員寄りか、個人活動寄りか
* 何に興味があるか
* どの業界/活動ジャンルに惹かれるか
* どの職種/収益モデルに関心があるか
* どんな仕事スタイルが合いそうか
* 何を避けたいか
* 次に何を調べればよいか
* キャリア相談や友人相談で何を話せばよいか
