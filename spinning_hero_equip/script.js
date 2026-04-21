// ===== 保存キー =====
const STORAGE_KEY = "build_";
const AUTO_SAVE_KEY = "build_autosave";

// データ収集関数
function collectData(){
  let data = {
    weapons: [],
    accessories: [],
    sigils: []
  };

  // 武器
  state.weapons.forEach((_,i)=>{
    data.weapons.push({
      name: getVal(`w_name_${i}`),

      r1: getVal(`w_r1_${i}`),
      r2: getVal(`w_r2_${i}`),
      rRemain: getVal(`w_r_remain_${i}`),

      b1: getVal(`w_b1_${i}`),
      b2: getVal(`w_b2_${i}`),
      bRemain: getVal(`w_b_remain_${i}`),

      op1: getVal(`w_op1_${i}`),
      op2: getVal(`w_op2_${i}`),
      op3: getVal(`w_op3_${i}`),

      opLv1: getVal(`w_oplv1_${i}`),
      opLv2: getVal(`w_oplv2_${i}`),
      opLv3: getVal(`w_oplv3_${i}`)
    });
  });

  // アクセ
  state.accessories.forEach((_,i)=>{
    data.accessories.push({
      name: getVal(`a_name_${i}`),
      op1: getVal(`a_op1_${i}`),
      op2: getVal(`a_op2_${i}`),
      op3: getVal(`a_op3_${i}`),
      opLv1: getVal(`a_oplv1_${i}`),
      opLv2: getVal(`a_oplv2_${i}`),
      opLv3: getVal(`a_oplv3_${i}`)
    });
  });

  // シジル
  state.sigils.forEach((_,i)=>{
    data.sigils.push({
      name: getVal(`s_name_${i}`)
    });
  });

  return data;
}

// ===== 保存 =====
function saveBuild(){
  const name = document.getElementById("buildName").value;
  if(!name) return alert("ビルド名を入力してください");

  const data = collectData();
  localStorage.setItem(STORAGE_KEY + name, JSON.stringify(data));

  saveStatus.textContent = "保存しました";
  renderBuildList(); // ←追加
}

// ===== 読み込み =====
function loadBuild(){
  const name = document.getElementById("buildName").value;
  if(!name) return alert("ビルド名を入力してください");

  const raw = localStorage.getItem(STORAGE_KEY + name);
  if(!raw) return alert("データがありません");

  const data = JSON.parse(raw);

  // 数を復元
  state.weapons = Array(data.weapons.length).fill({});
  state.accessories = Array(data.accessories.length).fill({});
  state.sigils = Array(data.sigils.length).fill({});

  renderInputs();

  // 値反映
  data.weapons.forEach((w,i)=>{
    setVal(`w_name_${i}`,w.name);

    setVal(`w_r1_${i}`,w.r1);
    setVal(`w_r2_${i}`,w.r2);
    setVal(`w_r_remain_${i}`,w.rRemain);

    setVal(`w_b1_${i}`,w.b1);
    setVal(`w_b2_${i}`,w.b2);
    setVal(`w_b_remain_${i}`,w.bRemain);

    setVal(`w_op1_${i}`,w.op1);
    setVal(`w_op2_${i}`,w.op2);
    setVal(`w_op3_${i}`,w.op3);
    setVal(`w_oplv1_${i}`,w.opLv1);
    setVal(`w_oplv2_${i}`,w.opLv2);
    setVal(`w_oplv3_${i}`,w.opLv3);
  });

  data.accessories.forEach((a,i)=>{
    setVal(`a_name_${i}`,a.name);
    setVal(`a_op1_${i}`,a.op1);
    setVal(`a_op2_${i}`,a.op2);
    setVal(`a_op3_${i}`,a.op3);
    setVal(`a_oplv1_${i}`,a.opLv1);
    setVal(`a_oplv2_${i}`,a.opLv2);
    setVal(`a_oplv3_${i}`,a.opLv3);
  });

  data.sigils.forEach((s,i)=>{
    setVal(`s_name_${i}`,s.name);
    document.getElementById(`s_name_${i}`).dispatchEvent(new Event("change"));
  });

  saveStatus.textContent = "読み込みました";
}

// ===== 削除 =====
function deleteBuild(){
  const name = document.getElementById("buildName").value;
  if(!name) return;

  localStorage.removeItem(STORAGE_KEY + name);
  saveStatus.textContent = "削除しました";
}

// ===== 値セット補助 =====
function setVal(id, value){
  const el = document.getElementById(id);
  if(el) el.value = value;
}

// ===== 自動保存（神機能） =====
function autoSave(){
  const data = collectData();
  localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
}

setInterval(autoSave, 3000);

// ===== 起動時復元 =====
function loadAuto(){
  const raw = localStorage.getItem(AUTO_SAVE_KEY);
  if(!raw) return;

  const data = JSON.parse(raw);

  state.weapons = Array(data.weapons.length).fill({});
  state.accessories = Array(data.accessories.length).fill({});
  state.sigils = Array(data.sigils.length).fill({});

  renderInputs();

  setTimeout(()=>{
    data.weapons.forEach((w,i)=>{
      setVal(`w_name_${i}`,w.name);
      setVal(`w_r1_${i}`,w.r1);
      setVal(`w_r2_${i}`,w.r2);
      setVal(`w_r_remain_${i}`,w.rRemain);

      setVal(`w_b1_${i}`,w.b1);
      setVal(`w_b2_${i}`,w.b2);
      setVal(`w_b_remain_${i}`,w.bRemain);
      setVal(`w_op1_${i}`,w.op1);
      setVal(`w_op2_${i}`,w.op2);
      setVal(`w_op3_${i}`,w.op3);
      setVal(`w_oplv1_${i}`,w.opLv1);
      setVal(`w_oplv2_${i}`,w.opLv2);
      setVal(`w_oplv3_${i}`,w.opLv3);
    });

    data.accessories.forEach((a,i)=>{
      setVal(`a_name_${i}`,a.name);
      setVal(`a_op1_${i}`,a.op1);
      setVal(`a_op2_${i}`,a.op2);
      setVal(`a_op3_${i}`,a.op3);
      setVal(`a_oplv1_${i}`,a.opLv1);
      setVal(`a_oplv2_${i}`,a.opLv2);
      setVal(`a_oplv3_${i}`,a.opLv3);
    });

    data.sigils.forEach((s,i)=>{
      setVal(`s_name_${i}`,s.name);
      document.getElementById(`s_name_${i}`).dispatchEvent(new Event("change"));
    });
  },100);
}

// ===== 状態 =====
let state = {
  weapons: [],
  accessories: [],
  sigils: []
};

// ===== 保存済みビルド一覧取得 =====
function getBuildList(){
  const list = [];

  for(let i=0;i<localStorage.length;i++){
    const key = localStorage.key(i);

    if(key.startsWith(STORAGE_KEY)){
      list.push(key.replace(STORAGE_KEY,""));
    }
  }

  return list.sort();
}

// ===== 初期化 =====
function init(){
  state.weapons = Array(2).fill({});
  state.accessories = Array(1).fill({});
  state.sigils = Array(2).fill({});
  renderInputs();
}

// ===== 保存済みビルド一覧表示 =====
function renderBuildList(){
  const list = getBuildList();

  let html = "";

  list.forEach(name=>{
    html += `
    <div>
      ${name}
      <button onclick="loadBuildByName('${name}')">読込</button>
      <button onclick="deleteBuildByName('${name}')">削除</button>
    </div>`;
  });

  document.getElementById("buildList").innerHTML = html;
}

// ===== 保存済みビルド名前指定ロード処理 =====
function loadBuildByName(name){
  document.getElementById("buildName").value = name;
  loadBuild();
}


// ===== 保存済みビルド名前指定削除時処理 =====
function deleteBuildByName(name){
  localStorage.removeItem(STORAGE_KEY + name);
  renderBuildList();
}

// ===== プルダウン生成 =====
function createSelect(list, id){
  let html = `<select id="${id}"><option value="">-</option>`;
  list.forEach(v=>{
    html += `<option value="${v}">${v}</option>`;
  });
  html += "</select>";
  return html;
}

// ===== 入力UI =====
function renderInputs(){

  // 武器
  wCount.textContent = `(${state.weapons.length}/9)`;
  weapons.innerHTML = "";
  state.weapons.forEach((w,i)=>{
    weapons.innerHTML += `
    <div class="card">
      武器${i+1}<br>

      武器名 ${createSelect(weaponList,`w_name_${i}`)}<br>

      赤 
      ${createSelect(enchantRedList,`w_r1_${i}`)}
      ${createSelect(enchantRedList,`w_r2_${i}`)}
      残留 <input id="w_r_remain_${i}" value="-" style="width:60px">%<br>

      青 
      ${createSelect(enchantBlueList,`w_b1_${i}`)}
      ${createSelect(enchantBlueList,`w_b2_${i}`)}
      残留 <input id="w_b_remain_${i}" value="-" style="width:60px">%<br>

      OP1 ${createSelect(optionList,`w_op1_${i}`)} 
      Lv <input id="w_oplv1_${i}" value="1" style="width:50px"><br>

      OP2 ${createSelect(optionList,`w_op2_${i}`)} 
      Lv <input id="w_oplv2_${i}" value="1" style="width:50px"><br>

      OP3 ${createSelect(optionList,`w_op3_${i}`)} 
      Lv <input id="w_oplv3_${i}" value="1" style="width:50px">
    </div>`;
  });

  // アクセ
  aCount.textContent = `(${state.accessories.length}/4)`;
  accessories.innerHTML = "";
  state.accessories.forEach((a,i)=>{
    accessories.innerHTML += `
    <div class="card">
      アクセ${i+1}<br>
      名前 ${createSelect(accessoryList,`a_name_${i}`)}<br>
      OP1 ${createSelect(optionList,`a_op1_${i}`)} 
      Lv <input id="a_oplv1_${i}" value="1" style="width:50px"><br>
      OP2 ${createSelect(optionList,`a_op2_${i}`)} 
      Lv <input id="a_oplv2_${i}" value="1" style="width:50px"><br>
      OP3 ${createSelect(optionList,`a_op3_${i}`)} 
      Lv <input id="a_oplv3_${i}" value="1" style="width:50px">
    </div>`;
  });

  // シジル
  sCount.textContent = `(${state.sigils.length}/4)`;
  sigils.innerHTML = "";
  state.sigils.forEach((s,i)=>{
    sigils.innerHTML += `
    <div class="card">
      シジル${i+1}<br>
      名前 ${createSelect(Object.keys(sigilList),`s_name_${i}`)}
      <div id="s_effect_${i}" class="small"></div>
    </div>`;
  });

  attachSigilEvents();
}

// ===== シジル効果表示 =====
function attachSigilEvents(){
  state.sigils.forEach((_,i)=>{
    document.getElementById(`s_name_${i}`).onchange = ()=>{
      let name = document.getElementById(`s_name_${i}`).value;
      let effects = sigilList[name] || ["-","-"];
      document.getElementById(`s_effect_${i}`).innerHTML =
        effects[0] + "<br>" + effects[1];
    };
  });
}

// ===== 値取得 =====
function getVal(id){
  let v = document.getElementById(id)?.value;
  return v ? v : "-";
}

// ===== プレビュー =====
function render(){
  let html = "";

  html += `<div class="title">装備一覧</div>`;

  // ===== 武器 =====
  html += `<div class="section"><div class="section-title">武器</div>`;
  html += `<div class="weapon-grid">`;

  state.weapons.forEach((_,i)=>{
    html += `
    <div class="box">
      ■${getVal(`w_name_${i}`)}<br>

      赤 ${getVal(`w_r1_${i}`)} / ${getVal(`w_r2_${i}`)} 
      (${getVal(`w_r_remain_${i}`)}%)<br>

      青 ${getVal(`w_b1_${i}`)} / ${getVal(`w_b2_${i}`)} 
      (${getVal(`w_b_remain_${i}`)}%)<br>

      ${getVal(`w_op1_${i}`)} Lv${getVal(`w_oplv1_${i}`)}<br>
      ${getVal(`w_op2_${i}`)} Lv${getVal(`w_oplv2_${i}`)}<br>
      ${getVal(`w_op3_${i}`)} Lv${getVal(`w_oplv3_${i}`)}
    </div>`;
  });

  html += `</div></div>`;

  // ===== アクセ =====
  html += `<div class="section"><div class="section-title">アクセサリ</div>`;
  html += `<div class="row-grid">`;

  state.accessories.forEach((_,i)=>{
    html += `
    <div class="box">
      ■${getVal(`a_name_${i}`)}<br>
      <span class="small">
      ${getVal(`a_op1_${i}`)} Lv${getVal(`a_oplv1_${i}`)}<br>
      ${getVal(`a_op2_${i}`)} Lv${getVal(`a_oplv2_${i}`)}<br>
      ${getVal(`a_op3_${i}`)} Lv${getVal(`a_oplv3_${i}`)}
      </span>
    </div>`;
  });

  html += `</div></div>`;

  // ===== シジル =====
  html += `<div class="section"><div class="section-title">シジル</div>`;
  html += `<div class="row-grid">`;

  state.sigils.forEach((_,i)=>{
    html += `
    <div class="box">
      ■${getVal(`s_name_${i}`)}<br>
      <span class="small">
      ${document.getElementById(`s_effect_${i}`)?.innerText || "-"}
      </span>
    </div>`;
  });

  html += `</div></div>`;

  document.getElementById("capture").innerHTML = html;
}
// ===== 追加削除 =====
function addWeapon(){ if(state.weapons.length<9){ state.weapons.push({}); renderInputs(); }}
function removeWeapon(){ if(state.weapons.length>2){ state.weapons.pop(); renderInputs(); }}

function addAcc(){ if(state.accessories.length<4){ state.accessories.push({}); renderInputs(); }}
function removeAcc(){ if(state.accessories.length>1){ state.accessories.pop(); renderInputs(); }}

function addSigil(){ if(state.sigils.length<4){ state.sigils.push({}); renderInputs(); }}
function removeSigil(){ if(state.sigils.length>2){ state.sigils.pop(); renderInputs(); }}

// ===== 画像 =====
function download(){
  html2canvas(document.getElementById("capture")).then(canvas=>{
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "build.png";
    a.click();
  });
}

// ===== エンコード =====
function encodeData(data){
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

// ===== デコード =====
function decodeData(str){
  return JSON.parse(decodeURIComponent(escape(atob(str))));
}

// ===== URL生成 =====
function generateURL(){
  const data = collectData();
  const encoded = encodeData(data);

  const url = location.origin + location.pathname + "?data=" + encoded;

  document.getElementById("shareURL").value = url;
}

// ===== URL読み込み処理 =====
function loadFromURL(){
  const params = new URLSearchParams(location.search);
  const dataStr = params.get("data");
  if(!dataStr) return;

  try{
    const data = decodeData(dataStr);

    state.weapons = Array(data.weapons.length).fill({});
    state.accessories = Array(data.accessories.length).fill({});
    state.sigils = Array(data.sigils.length).fill({});

    renderInputs();

    setTimeout(()=>{
      data.weapons.forEach((w,i)=>{
        setVal(`w_name_${i}`,w.name);
        setVal(`w_r1_${i}`,w.r1);
        setVal(`w_r2_${i}`,w.r2);
        setVal(`w_r_remain_${i}`,w.rRemain);
        setVal(`w_b1_${i}`,w.b1);
        setVal(`w_b2_${i}`,w.b2);
        setVal(`w_b_remain_${i}`,w.bRemain);
        setVal(`w_remain_${i}`,w.remain);
        setVal(`w_op1_${i}`,w.op1);
        setVal(`w_op2_${i}`,w.op2);
        setVal(`w_op3_${i}`,w.op3);
        setVal(`w_oplv1_${i}`,w.opLv1);
        setVal(`w_oplv2_${i}`,w.opLv2);
        setVal(`w_oplv3_${i}`,w.opLv3);
      });

      data.accessories.forEach((a,i)=>{
        setVal(`a_name_${i}`,a.name);
        setVal(`a_op1_${i}`,a.op1);
        setVal(`a_op2_${i}`,a.op2);
        setVal(`a_op3_${i}`,a.op3);
        setVal(`a_oplv1_${i}`,a.opLv1);
        setVal(`a_oplv2_${i}`,a.opLv2);
        setVal(`a_oplv3_${i}`,a.opLv3);
      });

      data.sigils.forEach((s,i)=>{
        setVal(`s_name_${i}`,s.name);
        document.getElementById(`s_name_${i}`).dispatchEvent(new Event("change"));
      });

    },100);

  }catch(e){
    console.error("URL読込失敗", e);
  }
}

// ===== 初期化 =====
window.onload = ()=>{
  init();
  loadFromURL();   // ← URL優先
  loadAuto();      // ← なければ自動保存
  renderBuildList(); // ←ビルドリスト表示
};

