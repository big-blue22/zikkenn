// ============================================================
// 食品マスタデータ（約200件）
// 日本食品標準成分表やコンビニ公表値を参考
// ============================================================

import type { Food } from '@/types';

export const foods: Food[] = [
    // ── ご飯・主食 ──
    { name: '白ご飯', nameKana: 'しろごはん', calories: 252, servingSize: '1杯(150g)' },
    { name: '白ご飯（大盛り）', nameKana: 'しろごはんおおもり', calories: 403, servingSize: '1杯(240g)' },
    { name: '白ご飯（小盛り）', nameKana: 'しろごはんこもり', calories: 168, servingSize: '1杯(100g)' },
    { name: '玄米ご飯', nameKana: 'げんまいごはん', calories: 248, servingSize: '1杯(150g)' },
    { name: 'おにぎり（鮭）', nameKana: 'おにぎりさけ', calories: 180, servingSize: '1個' },
    { name: 'おにぎり（ツナマヨ）', nameKana: 'おにぎりつなまよ', calories: 220, servingSize: '1個' },
    { name: 'おにぎり（梅）', nameKana: 'おにぎりうめ', calories: 170, servingSize: '1個' },
    { name: 'おにぎり（昆布）', nameKana: 'おにぎりこんぶ', calories: 175, servingSize: '1個' },
    { name: 'おにぎり（明太子）', nameKana: 'おにぎりめんたいこ', calories: 180, servingSize: '1個' },
    { name: '赤飯', nameKana: 'せきはん', calories: 284, servingSize: '1杯(150g)' },

    // ── パン ──
    { name: '食パン（6枚切り）', nameKana: 'しょくぱん', calories: 158, servingSize: '1枚' },
    { name: '食パン（4枚切り）', nameKana: 'しょくぱんあつぎり', calories: 237, servingSize: '1枚' },
    { name: 'クロワッサン', nameKana: 'くろわっさん', calories: 230, servingSize: '1個' },
    { name: 'バターロール', nameKana: 'ばたーろーる', calories: 95, servingSize: '1個' },
    { name: 'メロンパン', nameKana: 'めろんぱん', calories: 380, servingSize: '1個' },
    { name: 'あんぱん', nameKana: 'あんぱん', calories: 280, servingSize: '1個' },
    { name: 'カレーパン', nameKana: 'かれーぱん', calories: 340, servingSize: '1個' },
    { name: 'ホットドッグ', nameKana: 'ほっとどっぐ', calories: 320, servingSize: '1個' },
    { name: 'サンドイッチ（ハムチーズ）', nameKana: 'さんどいっちはむちーず', calories: 350, servingSize: '1個' },
    { name: 'サンドイッチ（たまご）', nameKana: 'さんどいっちたまご', calories: 300, servingSize: '1個' },

    // ── 麺類 ──
    { name: '醤油ラーメン', nameKana: 'しょうゆらーめん', calories: 470, servingSize: '1杯' },
    { name: '味噌ラーメン', nameKana: 'みそらーめん', calories: 510, servingSize: '1杯' },
    { name: '豚骨ラーメン', nameKana: 'とんこつらーめん', calories: 500, servingSize: '1杯' },
    { name: '塩ラーメン', nameKana: 'しおらーめん', calories: 440, servingSize: '1杯' },
    { name: 'つけ麺', nameKana: 'つけめん', calories: 650, servingSize: '1人前' },
    { name: 'かけうどん', nameKana: 'かけうどん', calories: 320, servingSize: '1杯' },
    { name: 'きつねうどん', nameKana: 'きつねうどん', calories: 400, servingSize: '1杯' },
    { name: '天ぷらうどん', nameKana: 'てんぷらうどん', calories: 480, servingSize: '1杯' },
    { name: 'ざるそば', nameKana: 'ざるそば', calories: 350, servingSize: '1人前' },
    { name: 'かけそば', nameKana: 'かけそば', calories: 320, servingSize: '1杯' },
    { name: '焼きそば', nameKana: 'やきそば', calories: 520, servingSize: '1人前' },
    { name: 'スパゲッティ（ミートソース）', nameKana: 'すぱげってぃみーとそーす', calories: 620, servingSize: '1人前' },
    { name: 'スパゲッティ（カルボナーラ）', nameKana: 'すぱげってぃかるぼなーら', calories: 700, servingSize: '1人前' },
    { name: 'スパゲッティ（ペペロンチーノ）', nameKana: 'すぱげってぃぺぺろんちーの', calories: 530, servingSize: '1人前' },
    { name: 'スパゲッティ（ナポリタン）', nameKana: 'すぱげってぃなぽりたん', calories: 590, servingSize: '1人前' },

    // ── 丼物・ご飯もの ──
    { name: 'カレーライス', nameKana: 'かれーらいす', calories: 760, servingSize: '1皿' },
    { name: '牛丼', nameKana: 'ぎゅうどん', calories: 650, servingSize: '1杯' },
    { name: '牛丼（並）', nameKana: 'ぎゅうどんなみ', calories: 650, servingSize: '並盛' },
    { name: '親子丼', nameKana: 'おやこどん', calories: 580, servingSize: '1杯' },
    { name: 'カツ丼', nameKana: 'かつどん', calories: 900, servingSize: '1杯' },
    { name: '天丼', nameKana: 'てんどん', calories: 750, servingSize: '1杯' },
    { name: '海鮮丼', nameKana: 'かいせんどん', calories: 550, servingSize: '1杯' },
    { name: 'チャーハン', nameKana: 'ちゃーはん', calories: 600, servingSize: '1人前' },
    { name: 'オムライス', nameKana: 'おむらいす', calories: 700, servingSize: '1人前' },
    { name: 'ハヤシライス', nameKana: 'はやしらいす', calories: 680, servingSize: '1皿' },

    // ── 肉料理 ──
    { name: '鶏むね肉（ゆで）', nameKana: 'とりむねにくゆで', calories: 195, servingSize: '100g' },
    { name: '鶏もも肉（焼き）', nameKana: 'とりもものくらき', calories: 250, servingSize: '100g' },
    { name: 'サラダチキン', nameKana: 'さらだちきん', calories: 110, servingSize: '1個(110g)' },
    { name: '豚しょうが焼き', nameKana: 'ぶたしょうがやき', calories: 380, servingSize: '1人前' },
    { name: 'とんかつ', nameKana: 'とんかつ', calories: 450, servingSize: '1枚' },
    { name: 'ハンバーグ', nameKana: 'はんばーぐ', calories: 420, servingSize: '1個' },
    { name: '唐揚げ', nameKana: 'からあげ', calories: 300, servingSize: '5個' },
    { name: 'チキン南蛮', nameKana: 'ちきんなんばん', calories: 550, servingSize: '1人前' },
    { name: '焼肉（カルビ）', nameKana: 'やきにくかるび', calories: 370, servingSize: '100g' },
    { name: '焼肉（ロース）', nameKana: 'やきにくろーす', calories: 290, servingSize: '100g' },
    { name: '焼き鳥（もも）', nameKana: 'やきとりもも', calories: 80, servingSize: '1本' },
    { name: '焼き鳥（つくね）', nameKana: 'やきとりつくね', calories: 90, servingSize: '1本' },
    { name: 'ウインナー', nameKana: 'ういんなー', calories: 95, servingSize: '2本' },
    { name: 'ベーコン', nameKana: 'べーこん', calories: 80, servingSize: '2枚' },
    { name: 'ステーキ（サーロイン）', nameKana: 'すてーきさーろいん', calories: 500, servingSize: '150g' },

    // ── 魚料理 ──
    { name: '焼き鮭', nameKana: 'やきざけ', calories: 180, servingSize: '1切れ' },
    { name: '刺身盛り合わせ', nameKana: 'さしみもりあわせ', calories: 200, servingSize: '1人前' },
    { name: 'マグロ刺身', nameKana: 'まぐろさしみ', calories: 125, servingSize: '5切れ' },
    { name: 'サバ味噌煮', nameKana: 'さばみそに', calories: 300, servingSize: '1切れ' },
    { name: 'アジフライ', nameKana: 'あじふらい', calories: 270, servingSize: '1枚' },
    { name: 'エビフライ', nameKana: 'えびふらい', calories: 210, servingSize: '3本' },
    { name: '鯖の塩焼き', nameKana: 'さばのしおやき', calories: 250, servingSize: '1切れ' },
    { name: 'ぶりの照り焼き', nameKana: 'ぶりのてりやき', calories: 280, servingSize: '1切れ' },
    { name: '煮魚', nameKana: 'にざかな', calories: 220, servingSize: '1切れ' },
    { name: 'ツナ缶（ノンオイル）', nameKana: 'つなかん', calories: 70, servingSize: '1缶(70g)' },

    // ── 野菜・サラダ ──
    { name: 'グリーンサラダ', nameKana: 'ぐりーんさらだ', calories: 50, servingSize: '1皿' },
    { name: 'ポテトサラダ', nameKana: 'ぽてとさらだ', calories: 180, servingSize: '1人前' },
    { name: 'コールスロー', nameKana: 'こーるすろー', calories: 120, servingSize: '1人前' },
    { name: '野菜炒め', nameKana: 'やさいいため', calories: 180, servingSize: '1人前' },
    { name: 'ほうれん草のおひたし', nameKana: 'ほうれんそうのおひたし', calories: 25, servingSize: '1人前' },
    { name: 'きんぴらごぼう', nameKana: 'きんぴらごぼう', calories: 80, servingSize: '1人前' },
    { name: '冷奴', nameKana: 'ひややっこ', calories: 80, servingSize: '1丁(150g)' },
    { name: '枝豆', nameKana: 'えだまめ', calories: 135, servingSize: '100g' },
    { name: 'トマト', nameKana: 'とまと', calories: 30, servingSize: '1個' },
    { name: 'きゅうり', nameKana: 'きゅうり', calories: 14, servingSize: '1本' },

    // ── 汁物 ──
    { name: '味噌汁', nameKana: 'みそしる', calories: 40, servingSize: '1杯' },
    { name: '味噌汁（豆腐・わかめ）', nameKana: 'みそしるとうふわかめ', calories: 50, servingSize: '1杯' },
    { name: '豚汁', nameKana: 'とんじる', calories: 120, servingSize: '1杯' },
    { name: 'けんちん汁', nameKana: 'けんちんじる', calories: 100, servingSize: '1杯' },
    { name: 'コーンスープ', nameKana: 'こーんすーぷ', calories: 85, servingSize: '1杯' },
    { name: 'ポタージュスープ', nameKana: 'ぽたーじゅすーぷ', calories: 100, servingSize: '1杯' },

    // ── 卵・豆腐 ──
    { name: 'ゆで卵', nameKana: 'ゆでたまご', calories: 80, servingSize: '1個' },
    { name: '目玉焼き', nameKana: 'めだまやき', calories: 110, servingSize: '1個' },
    { name: '卵焼き', nameKana: 'たまごやき', calories: 130, servingSize: '2切れ' },
    { name: 'スクランブルエッグ', nameKana: 'すくらんぶるえっぐ', calories: 150, servingSize: '2個分' },
    { name: '麻婆豆腐', nameKana: 'まーぼーどうふ', calories: 350, servingSize: '1人前' },
    { name: '豆腐（絹ごし）', nameKana: 'とうふきぬごし', calories: 55, servingSize: '1/2丁(150g)' },
    { name: '納豆', nameKana: 'なっとう', calories: 100, servingSize: '1パック' },

    // ── 果物 ──
    { name: 'バナナ', nameKana: 'ばなな', calories: 86, servingSize: '1本' },
    { name: 'りんご', nameKana: 'りんご', calories: 140, servingSize: '1個' },
    { name: 'みかん', nameKana: 'みかん', calories: 45, servingSize: '1個' },
    { name: 'いちご', nameKana: 'いちご', calories: 35, servingSize: '5個' },
    { name: 'ぶどう', nameKana: 'ぶどう', calories: 60, servingSize: '10粒' },
    { name: 'キウイ', nameKana: 'きうい', calories: 50, servingSize: '1個' },
    { name: 'グレープフルーツ', nameKana: 'ぐれーぷふるーつ', calories: 80, servingSize: '1/2個' },
    { name: 'オレンジ', nameKana: 'おれんじ', calories: 60, servingSize: '1個' },
    { name: '桃', nameKana: 'もも', calories: 85, servingSize: '1個' },
    { name: 'メロン', nameKana: 'めろん', calories: 42, servingSize: '1/8個' },

    // ── 乳製品 ──
    { name: '牛乳', nameKana: 'ぎゅうにゅう', calories: 138, servingSize: '200ml' },
    { name: '低脂肪乳', nameKana: 'ていしぼうにゅう', calories: 92, servingSize: '200ml' },
    { name: 'ヨーグルト（プレーン）', nameKana: 'よーぐると', calories: 62, servingSize: '100g' },
    { name: 'ヨーグルト（加糖）', nameKana: 'よーぐるとかとう', calories: 100, servingSize: '100g' },
    { name: 'チーズ（プロセス）', nameKana: 'ちーず', calories: 60, servingSize: '1枚(18g)' },
    { name: 'カマンベールチーズ', nameKana: 'かまんべーるちーず', calories: 95, servingSize: '30g' },

    // ── 飲料 ──
    { name: 'ブラックコーヒー', nameKana: 'ぶらっくこーひー', calories: 6, servingSize: '1杯' },
    { name: 'カフェラテ', nameKana: 'かふぇらて', calories: 120, servingSize: '1杯' },
    { name: 'カフェモカ', nameKana: 'かふぇもか', calories: 200, servingSize: '1杯' },
    { name: '緑茶', nameKana: 'りょくちゃ', calories: 2, servingSize: '1杯' },
    { name: 'ウーロン茶', nameKana: 'うーろんちゃ', calories: 0, servingSize: '1杯' },
    { name: 'オレンジジュース', nameKana: 'おれんじじゅーす', calories: 90, servingSize: '200ml' },
    { name: 'コーラ', nameKana: 'こーら', calories: 90, servingSize: '250ml' },
    { name: 'コーラゼロ', nameKana: 'こーらぜろ', calories: 0, servingSize: '250ml' },
    { name: 'スポーツドリンク', nameKana: 'すぽーつどりんく', calories: 50, servingSize: '250ml' },
    { name: '豆乳', nameKana: 'とうにゅう', calories: 90, servingSize: '200ml' },
    { name: 'ビール（350ml）', nameKana: 'びーる', calories: 140, servingSize: '1缶' },
    { name: 'ビール（500ml）', nameKana: 'びーる', calories: 200, servingSize: '1缶' },
    { name: 'ハイボール', nameKana: 'はいぼーる', calories: 70, servingSize: '1杯' },
    { name: 'チューハイ（レモン）', nameKana: 'ちゅーはいれもん', calories: 150, servingSize: '1缶(350ml)' },
    { name: '日本酒（1合）', nameKana: 'にほんしゅ', calories: 185, servingSize: '1合(180ml)' },
    { name: 'ワイン（赤）', nameKana: 'わいんあか', calories: 90, servingSize: '1杯(120ml)' },
    { name: 'ワイン（白）', nameKana: 'わいんしろ', calories: 88, servingSize: '1杯(120ml)' },

    // ── お菓子・スイーツ ──
    { name: 'ポテトチップス（小袋）', nameKana: 'ぽてとちっぷす', calories: 170, servingSize: '1袋(30g)' },
    { name: 'チョコレート', nameKana: 'ちょこれーと', calories: 280, servingSize: '板1/2枚(50g)' },
    { name: 'クッキー', nameKana: 'くっきー', calories: 50, servingSize: '1枚' },
    { name: 'ケーキ（ショートケーキ）', nameKana: 'けーきしょーとけーき', calories: 350, servingSize: '1切れ' },
    { name: 'シュークリーム', nameKana: 'しゅーくりーむ', calories: 230, servingSize: '1個' },
    { name: 'プリン', nameKana: 'ぷりん', calories: 120, servingSize: '1個' },
    { name: 'アイスクリーム（バニラ）', nameKana: 'あいすくりーむ', calories: 200, servingSize: '1個' },
    { name: 'どら焼き', nameKana: 'どらやき', calories: 280, servingSize: '1個' },
    { name: '大福', nameKana: 'だいふく', calories: 230, servingSize: '1個' },
    { name: 'せんべい', nameKana: 'せんべい', calories: 40, servingSize: '1枚' },
    { name: 'ゼリー', nameKana: 'ぜりー', calories: 70, servingSize: '1個' },
    { name: 'ドーナツ', nameKana: 'どーなつ', calories: 300, servingSize: '1個' },

    // ── コンビニ商品 ──
    { name: 'コンビニ弁当（幕の内）', nameKana: 'こんびにべんとうまくのうち', calories: 700, servingSize: '1個' },
    { name: 'コンビニ弁当（のり弁）', nameKana: 'こんびにべんとうのりべん', calories: 650, servingSize: '1個' },
    { name: 'コンビニ弁当（唐揚げ）', nameKana: 'こんびにべんとうからあげ', calories: 800, servingSize: '1個' },
    { name: 'フランクフルト', nameKana: 'ふらんくふると', calories: 240, servingSize: '1本' },
    { name: '肉まん', nameKana: 'にくまん', calories: 250, servingSize: '1個' },
    { name: 'おでん（大根）', nameKana: 'おでんだいこん', calories: 15, servingSize: '1個' },
    { name: 'おでん（たまご）', nameKana: 'おでんたまご', calories: 80, servingSize: '1個' },
    { name: 'おでん（ちくわ）', nameKana: 'おでんちくわ', calories: 55, servingSize: '1本' },
    { name: 'おでん（こんにゃく）', nameKana: 'おでんこんにゃく', calories: 10, servingSize: '1個' },
    { name: 'カップ麺（しょうゆ）', nameKana: 'かっぷめんしょうゆ', calories: 350, servingSize: '1個' },
    { name: 'カップ麺（カップヌードル）', nameKana: 'かっぷめんかっぷぬーどる', calories: 353, servingSize: '1個' },
    { name: 'サラダチキン（プレーン）', nameKana: 'さらだちきんぷれーん', calories: 110, servingSize: '1個' },
    { name: 'サラダチキン（スモーク）', nameKana: 'さらだちきんすもーく', calories: 120, servingSize: '1個' },
    { name: 'プロテインバー', nameKana: 'ぷろていんばー', calories: 180, servingSize: '1本' },

    // ── 外食メニュー ──
    { name: 'ハンバーガー', nameKana: 'はんばーがー', calories: 260, servingSize: '1個' },
    { name: 'チーズバーガー', nameKana: 'ちーずばーがー', calories: 310, servingSize: '1個' },
    { name: 'ビッグマック', nameKana: 'びっぐまっく', calories: 525, servingSize: '1個' },
    { name: 'フライドポテト（M）', nameKana: 'ふらいどぽてと', calories: 410, servingSize: '1個' },
    { name: 'チキンマックナゲット', nameKana: 'ちきんまっくなげっと', calories: 270, servingSize: '5個' },
    { name: '回転寿司（10貫）', nameKana: 'かいてんずし', calories: 650, servingSize: '10貫' },
    { name: '寿司（握り1貫）', nameKana: 'すしにぎり', calories: 60, servingSize: '1貫' },
    { name: 'ピザ（マルゲリータ）', nameKana: 'ぴざまるげりーた', calories: 220, servingSize: '1切れ' },
    { name: '餃子（焼き）', nameKana: 'ぎょうざやき', calories: 250, servingSize: '6個' },
    { name: '餃子（水）', nameKana: 'ぎょうざみず', calories: 200, servingSize: '6個' },
    { name: '麻婆丼', nameKana: 'まーぼーどん', calories: 600, servingSize: '1杯' },
    { name: 'エビチリ', nameKana: 'えびちり', calories: 300, servingSize: '1人前' },
    { name: '酢豚', nameKana: 'すぶた', calories: 400, servingSize: '1人前' },
    { name: '回鍋肉', nameKana: 'ほいこーろー', calories: 380, servingSize: '1人前' },
    { name: '青椒肉絲', nameKana: 'ちんじゃおろーす', calories: 350, servingSize: '1人前' },
    { name: 'タコス', nameKana: 'たこす', calories: 200, servingSize: '1個' },
    { name: 'フライドチキン', nameKana: 'ふらいどちきん', calories: 250, servingSize: '1個' },

    // ── 定食・定番 ──
    { name: '焼き魚定食', nameKana: 'やきざかなていしょく', calories: 600, servingSize: '1食' },
    { name: '生姜焼き定食', nameKana: 'しょうがやきていしょく', calories: 750, servingSize: '1食' },
    { name: 'とんかつ定食', nameKana: 'とんかつていしょく', calories: 900, servingSize: '1食' },
    { name: '唐揚げ定食', nameKana: 'からあげていしょく', calories: 850, servingSize: '1食' },
    { name: 'ハンバーグ定食', nameKana: 'はんばーぐていしょく', calories: 800, servingSize: '1食' },

    // ── その他 ──
    { name: 'カロリーメイト（2本）', nameKana: 'かろりーめいと', calories: 200, servingSize: '2本' },
    { name: 'ソイジョイ', nameKana: 'そいじょい', calories: 130, servingSize: '1本' },
    { name: 'グラノーラ', nameKana: 'ぐらのーら', calories: 220, servingSize: '50g' },
    { name: 'プロテインドリンク', nameKana: 'ぷろていんどりんく', calories: 120, servingSize: '1杯' },
    { name: 'スムージー（野菜）', nameKana: 'すむーじーやさい', calories: 80, servingSize: '200ml' },
    { name: 'フルーツスムージー', nameKana: 'ふるーつすむーじー', calories: 150, servingSize: '200ml' },
];

/** ひらがな・カタカナ・漢字の部分一致検索 */
export function searchFoods(query: string): Food[] {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    // カタカナ → ひらがな変換
    const qHira = q.replace(/[\u30A1-\u30FA]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60),
    );
    return foods.filter(
        (f) =>
            f.name.toLowerCase().includes(q) ||
            f.nameKana.includes(qHira) ||
            f.nameKana.includes(q),
    );
}
