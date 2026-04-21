// ===== エンチャント =====
const enchantRedList = Array.from({length:53}, (_,i)=>"赤エンチャ"+(i+1));
const enchantBlueList = Array.from({length:45}, (_,i)=>"青エンチャ"+(i+1));

// ===== オプション =====
const optionList = [
  "ダメージ+10%",
  "クリ率+5%",
  "攻撃速度+3%",
  "HP+1000",
  "防御+200"
];

// ===== アクセ =====
const accessoryList = [
  "力の指輪",
  "生命の指輪",
  "魔力の首飾り"
];

// ===== シジル =====
const sigilList = {
  "迅速の紋": ["攻撃速度UP", "回避率UP"],
  "守護の紋": ["防御UP", "HP増加"],
  "魔導の紋": ["魔力UP", "詠唱速度UP"]
};