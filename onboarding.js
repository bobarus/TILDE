// Tilde · страница-приглашение, установка, опрос, тест уровня и экран выбора темы.
// Работает поверх приложения: полноэкранный слой #ob. Данные лендинга — в landing-data.js.
(function(){
const LIME='#c8f31d',LV=['A1','A2','B1','B2'];
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=window.LAND||{};
let ob=null,kf='',kn=0,styleEl=null;

// ---------- окружение
function inApp(){
 try{
  if(location.search.indexOf('app')>=0||location.hash==='#app')localStorage.setItem('tilde_dev','1');
  return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true||localStorage.getItem('tilde_dev')==='1';
 }catch(e){return false}
}
const isAndroid=()=>/Android/i.test(navigator.userAgent);
function hasProgress(){try{return (typeof KW!=='undefined'&&KW.size>0)||(typeof LW!=='undefined'&&LW.size>0)||(ST.xp||0)>0}catch(e){return false}}
function need(){
 if(!inApp())return true;
 if(ST.ob&&ST.ob.done)return false;
 if(!ST.ob&&hasProgress()){ST.ob={done:true,path:'legacy'};try{lsSet()}catch(e){}return false}
 return true;
}

// ---------- стили
const BASE=`
#ob{position:fixed;inset:0;z-index:1000;overflow-y:auto;-webkit-overflow-scrolling:touch;background:#e8eae4;color:#171716;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.25}
#ob *{box-sizing:border-box}
#ob::before{content:"";position:fixed;right:-90px;top:-60px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(200,243,29,.5),transparent 68%);pointer-events:none}
#ob::after{content:"";position:fixed;left:-110px;bottom:-60px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(255,190,120,.4),transparent 68%);pointer-events:none}
.ob-in{position:relative;z-index:1;max-width:480px;margin:0 auto;padding:26px 18px 44px;min-height:100%}
.lp{position:relative;z-index:1;max-width:480px;margin:0 auto;padding:26px 18px 12px}
.lm{display:block}.ld{display:none}
.lp .stp,.ob-in .stp{display:flex;flex-direction:column;gap:10px;margin-top:12px}
@media(min-width:900px){.lp{max-width:1280px;padding:34px 60px 20px}.lm{display:none}.ld{display:block}}
#ob [data-act],#ob [data-k],#ob [data-c],#ob [data-o]{cursor:pointer;-webkit-tap-highlight-color:transparent}
.obb{display:block;width:100%;text-align:center;padding:18px;border-radius:999px;background:${LIME};color:#111;font-size:17px;font-weight:700;border:0;font-family:inherit;box-shadow:0 12px 28px rgba(160,200,0,.35);cursor:pointer}
.obb.dis{opacity:.4;pointer-events:none;box-shadow:none}
.obl{display:block;margin-top:12px;text-align:center;font-size:14px;color:#5f5e5a;font-weight:600;cursor:pointer}
.obp{display:inline-block;padding:9px 16px;border-radius:999px;background:rgba(255,255,255,.62);font-size:14px;font-weight:700;cursor:pointer}
@keyframes rise{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:none}}
`;
function paint(){
 if(!styleEl){styleEl=document.createElement('style');styleEl.id='obcss';document.head.appendChild(styleEl)}
 styleEl.textContent=BASE+(L.css||'')+kf;
}

// ---------- анимация слов
const WORDS='hola gracias casa agua hablar buenos días por favor amigo tiempo comer vida luna mar ciudad familia viajar'.split(' ');
function wl(seed){
 let r=seed;const rnd=()=>(r=(r*9301+49297)%233280)/233280;
 let o='<span style="position:absolute;inset:0;overflow:hidden;pointer-events:none">';
 for(let k=0;k<8;k++){
  kn++;const name='obw'+kn;let fr='';
  for(let i=0;i<4;i++){const x=4+Math.floor(rnd()*66),y=4+Math.floor(rnd()*66),a=i*25;
   fr+=`${a}%{left:${x}%;top:${y}%;opacity:0;transform:scale(.34)}${a+9}%{opacity:.3}${a+17}%{left:${x}%;top:${y}%;opacity:0;transform:scale(1)}`}
  kf+=`@keyframes ${name}{${fr}100%{opacity:0}}`;
  const sz=[18,21,24,27,30,33][Math.floor(rnd()*6)],w=WORDS[Math.floor(rnd()*WORDS.length)],wt=[400,500,600][Math.floor(rnd()*3)];
  o+=`<i style="position:absolute;will-change:transform,opacity;transform-origin:50% 50%;left:5%;top:5%;font-style:normal;white-space:nowrap;font-size:${sz}px;font-weight:${wt};color:#f4f3ee;opacity:0;animation:${name} 20s linear -${(rnd()*20).toFixed(1)}s infinite">${w}</i>`;
 }
 return o+'</span>';
}

// ---------- каркас
function mount(){
 if(ob)return;
 ob=document.createElement('div');ob.id='ob';document.body.appendChild(ob);
 ob.addEventListener('click',onClick);
 ob.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button]')){e.preventDefault();e.target.click()}});
 document.documentElement.style.overflow='hidden';
}
function close(){
 if(!ob)return;ob.remove();ob=null;handlers={};document.documentElement.style.overflow='';
}
let handlers={};
function view(html,h){
 mount();paint();
 ob.innerHTML=html.startsWith('<div class="lp"')?html:`<div class="ob-in">${html}</div>`;handlers=h||{};ob.scrollTop=0;
 paint();
}
function onClick(e){
 const t=e.target.closest('[data-act],[data-k],[data-c],[data-o],[data-pl]');
 if(!t)return;
 const key=t.dataset.act!==undefined?'act':t.dataset.k!==undefined?'k':t.dataset.c!==undefined?'c':t.dataset.o!==undefined?'o':'pl';
 const f=handlers[key];if(f)f(t.dataset[key==='act'?'act':key],t,e);
}
const logo=(z,r)=>`<span style="position:relative;flex:none;display:inline-flex;align-items:center;justify-content:center;width:${z}px;height:${z}px;border-radius:${r}px;background:#171716;color:${LIME};font-size:${Math.round(z*.8)}px;font-weight:600;padding-bottom:${Math.round(z*.06)}px;box-shadow:0 0 0 1px rgba(200,243,29,.35),0 8px 24px rgba(160,200,0,.35)">~</span>`;
const prog=(n,t)=>`<div style="position:relative;display:flex;gap:6px;margin-bottom:18px">${Array.from({length:t},(_,i)=>`<i style="height:5px;flex:1;border-radius:3px;background:${i<n?LIME:'rgba(0,0,0,.12)'}"></i>`).join('')}</div>`;
const head=(a,b,c)=>`<div style="position:relative"><div style="font-size:13px;color:#5f5e5a">${a}</div><div style="font-size:30px;font-weight:800;letter-spacing:-.8px;line-height:1.08;margin-top:2px">${b}</div></div>${c?`<div style="position:relative;margin-top:8px;font-size:14px;color:#4a4943;line-height:1.45">${c}</div>`:''}`;
const btn=(t,act,dis)=>`<button class="obb${dis?' dis':''}" data-act="${act}" style="margin-top:18px">${t}</button>`;
const link=(t,act)=>`<span class="obl" data-act="${act}" role="button" tabindex="0">${t}</span>`;

// ---------- 1. лендинг и установка
function landing(){
 view(`<div class="lp"><div class="lm">${L.lm||''}</div><div class="ld">${L.ld||''}</div></div>`,{act:a=>{if(a==='install')install(isAndroid()?'and':'ios')}});
}
function install(pl){
 const tab=(k,t)=>`<span data-pl="${k}" style="padding:11px 18px;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;${pl===k?'background:#171716;color:'+LIME:'background:rgba(255,255,255,.62)'}">${t}</span>`;
 const m=`${L.back}${L.head_m}<div style="position:relative;margin-top:14px;display:flex;gap:8px">${tab('ios','iPhone')}${tab('and','Android')}</div><div class="stp" style="${pl==='ios'?'':'display:none'}">${L.ios}</div><div class="stp" style="${pl==='and'?'':'display:none'}">${L.andr}</div>${L.done_m}`;
 view(`<div class="lp"><div class="lm">${m}</div><div class="ld">${L.back}${L.ins_d}</div></div>`,{act:a=>{if(a==='back')landing()},pl:p=>install(p)});
}

// ---------- 2. опрос
const SURV=[['new','с нуля','Новичок','Только начинаю или знаю пару слов. Пойдём с нуля, уровни открываются по ходу.'],['mid','подтянуть','Средний','Что-то знаю, но есть пробелы. Выясним, что нужно именно вам.'],['adv','освежить','Продвинутый','Знаю хорошо. Хочу посмотреть все правила и освежить слова.']];
let P={path:'new',goals:[],pain:[],test:'test'};
function survey(){
 const cards=SURV.map(([k,a,t,d],i)=>{
  const on=P.path===k;
  return `<div data-k="${k}" style="position:relative;overflow:hidden;padding:18px 18px 17px;border-radius:26px;${on?'background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee;box-shadow:0 14px 30px rgba(0,0,0,.22)':'background:rgba(255,255,255,.62);color:#171716'};animation:rise .5s cubic-bezier(.2,.9,.25,1) ${i*.08}s both">${on?wl(30+i):''}`
   +`<span style="position:absolute;right:16px;top:16px;width:26px;height:26px;border-radius:50%;${on?`background:${LIME};color:#111;font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 14px rgba(200,243,29,.7)">✓`:'border:2px solid rgba(0,0,0,.15)">'}</span>`
   +`<div style="position:relative;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${on?LIME:'#7a7a72'};font-weight:700">${a}</div><div style="position:relative;margin-top:3px;font-size:22px;font-weight:800;letter-spacing:-.4px;padding-right:34px">${t}</div><div style="position:relative;margin-top:5px;font-size:14px;line-height:1.4;color:${on?'#a9a8a0':'#5f5e5a'}">${d}</div></div>`}).join('');
 view(`${prog(1,3)}${head('Добро пожаловать в Tilde','Как вы знаете испанский?','Мы подстроим обучение под вас. Это займёт минуту.')}<div style="position:relative;display:flex;flex-direction:column;gap:10px;margin-top:18px">${cards}</div>${btn('Продолжить','go')}${link('Пропустить — учить по порядку','skip')}`,
  {k:k=>{P.path=k;survey()},act:a=>{if(a==='go')P.path==='new'?newbie():P.path==='mid'?middle():advanced();else if(a==='skip')finish({path:'skip'})}});
}
function newbie(){
 const names=[['A1','Начальный','Начинаем здесь'],['A2','Базовый','Позже'],['B1','Средний','Позже'],['B2','Выше среднего','Позже']];
 const lv=names.map(([l,n,s],i)=>`<div style="position:relative;display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:22px;${i===0?'background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee;box-shadow:0 12px 26px rgba(0,0,0,.2)':'background:rgba(255,255,255,.62)'};animation:rise .5s cubic-bezier(.2,.9,.25,1) ${i*.08}s both"><b style="flex:none;width:46px;height:46px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:18px;${i===0?`background:${LIME};color:#111`:'background:rgba(0,0,0,.07)'}">${l}</b><div><b style="font-size:16px">${n}</b><div style="font-size:13px;margin-top:2px;color:${i===0?LIME:'#7a7a72'}">${s}</div></div></div>`).join('');
 let first=[];try{first=units('A1').slice(0,3)}catch(e){}
 const tp=first.map((u,i)=>`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.62);font-size:15px;font-weight:600"><span style="flex:none;width:22px;text-align:center;font-size:24px;font-weight:800;line-height:1;background:linear-gradient(transparent 62%,rgba(200,243,29,.9) 62%,rgba(200,243,29,.9) 88%,transparent 88%)">${i+1}</span>${E(u)}</div>`).join('');
 view(`${prog(2,3)}${head('Ваш путь','Начнём с самого начала','Другие уровни можно открыть в любой момент. Шкалы заполняются по мере изученных слов.')}<div style="position:relative;display:flex;flex-direction:column;gap:8px;margin-top:18px">${lv}</div><div style="position:relative;margin-top:18px;font-size:16px;font-weight:800">Первые темы</div><div style="position:relative;display:flex;flex-direction:column;gap:8px;margin-top:10px">${tp}</div>${btn('Начать с приветствий','go')}${link('Назад','back')}`,
  {act:a=>{if(a==='back')survey();else finish({path:'new',level:'A1',play:true})}});
}
const GOALS=['Работа и карьера','Жизнь в Испании','Документы и бюрократия','Путешествия','Друзья и общение','Учёба и экзамен','Семья и дети','Здоровье и врачи','Покупки и сервис','Жильё и аренда','Еда и рестораны','Технологии и интернет','Фильмы и музыка','Бизнес и переговоры'];
const PAIN=['Слова','Глаголы и времена','Понимать на слух','Говорить','Писать письма','Грамматика'];
const chip=(t,on,a)=>`<span data-c="${a}:${E(t)}" style="display:inline-block;padding:10px 15px;border-radius:999px;font-size:14px;font-weight:600;${on?`background:#171716;color:${LIME};box-shadow:0 0 14px rgba(200,243,29,.35)`:'background:rgba(255,255,255,.62)'}">${E(t)}</span>`;
function middle(){
 const tb=(k,a,t,d)=>`<div data-o="${k}" style="position:relative;overflow:hidden;padding:16px;border-radius:22px;${P.test===k?'background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee':'background:rgba(255,255,255,.62)'}">${P.test===k?wl(50+(k==='test'?0:1)):''}<div style="position:relative;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:${P.test===k?LIME:'#7a7a72'}">${a}</div><div style="position:relative;font-size:18px;font-weight:800;margin-top:2px">${t}</div><div style="position:relative;font-size:13px;margin-top:3px;color:${P.test===k?'#a9a8a0':'#5f5e5a'}">${d}</div></div>`;
 view(`${prog(2,3)}${head('Расскажите о себе','Зачем вам испанский?','Выберите всё, что подходит — подберём темы.')}<div style="position:relative;display:flex;flex-wrap:wrap;gap:8px;margin-top:16px">${GOALS.map(g=>chip(g,P.goals.includes(g),'g')).join('')}</div><div style="position:relative;margin-top:22px;font-size:18px;font-weight:800">Что даётся сложнее всего?</div><div style="position:relative;display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">${PAIN.map(g=>chip(g,P.pain.includes(g),'p')).join('')}</div><div style="position:relative;margin-top:22px;font-size:18px;font-weight:800">Хотите проверить уровень?</div><div style="position:relative;display:flex;flex-direction:column;gap:8px;margin-top:12px">${tb('test','1 минута','Быстрый тест','Несколько коротких вопросов — подберём уровень точнее.')}${tb('self','без теста','Выберу сам','Покажем все уровни, выбирайте любой.')}</div>${btn('Дальше','go')}${link('Назад','back')}`,
  {c:v=>{const [a,t]=[v.slice(0,1),v.slice(2)],arr=a==='g'?P.goals:P.pain,i=arr.indexOf(t);i<0?arr.push(t):arr.splice(i,1);const y=ob.scrollTop;middle();ob.scrollTop=y},
   o:k=>{P.test=k;const y=ob.scrollTop;middle();ob.scrollTop=y},
   act:a=>{if(a==='back')survey();else if(P.test==='test')startTest();else finish({path:'mid',goals:P.goals,pain:P.pain})}});
}
function advanced(){
 const it=[['справочник','Все правила испанского','Грамматика A1–B2: спряжения, исключения, схемы. Все открыты сразу.'],['тест','Проверить себя','Быстрый тест по правилам и словам: найдём слабые места.'],['словарь','Слова B1–B2','Редкие слова и фразы. Отмечайте то, что знаете, остальное учите.']];
 const cards=it.map(([a,t,d],i)=>`<div style="position:relative;overflow:hidden;padding:18px;border-radius:26px;${i===0?'background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee;box-shadow:0 14px 30px rgba(0,0,0,.22)':'background:rgba(255,255,255,.62)'};animation:rise .5s cubic-bezier(.2,.9,.25,1) ${i*.08}s both">${i===0?wl(70):''}<div style="position:relative;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:${i===0?LIME:'#7a7a72'}">${a}</div><div style="position:relative;margin-top:3px;font-size:21px;font-weight:800;letter-spacing:-.4px">${t}</div><div style="position:relative;margin-top:5px;font-size:14px;line-height:1.4;color:${i===0?'#a9a8a0':'#5f5e5a'}">${d}</div></div>`).join('');
 view(`${prog(2,3)}${head('Продвинутый уровень','Всё открыто','Все уровни и правила доступны сразу. Выберите, с чего начать.')}<div style="position:relative;display:flex;flex-direction:column;gap:10px;margin-top:18px">${cards}</div>${btn('Открыть правила','rules')}${link('Сначала пройти тест','test')}${link('Назад','back')}`,
  {act:a=>{if(a==='back')survey();else if(a==='test')startTest();else finish({path:'adv',screen:'gram'})}});
}

// ---------- 3. тест уровня
let S=null;
function startTest(){S=Placement.create();Placement.next(S);question(-2)}
function question(sel){
 const c=S.cur,n=(S.asked[c.lv]||[]).length;
 const lad=LV.map(l=>{const ok=(S.ok[l]||0)>=2,bad=(S.bad[l]||0)>=2,cur=c.lv===l;
  return `<span style="flex:1;text-align:center;padding:9px 0;border-radius:14px;font-size:13px;font-weight:800;${cur?`background:#171716;color:${LIME}`:ok?`background:${LIME};color:#111`:bad?'background:rgba(0,0,0,.1);color:#a32d2d':'background:rgba(255,255,255,.62);color:#7a7a72'}">${l}${ok?' ✓':bad?' ✗':cur?' …':''}</span>`}).join('');
 const ops=c.opts.concat(['Не знаю']).map((t,i)=>{const idx=i===c.opts.length?-1:i,on=sel===idx;
  return `<div data-o="${idx}" style="position:relative;padding:15px 16px;border-radius:20px;font-size:17px;font-weight:600;display:flex;align-items:center;gap:12px;${on?'background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee;box-shadow:0 10px 22px rgba(0,0,0,.2)':'background:rgba(255,255,255,.62)'};${idx===-1&&!on?'color:#7a7a72;font-weight:500':''}"><span style="flex:none;width:22px;height:22px;border-radius:50%;${on?`background:${LIME};box-shadow:0 0 10px rgba(200,243,29,.7)`:'border:2px solid rgba(0,0,0,.18)'}"></span>${E(t)}</div>`}).join('');
 view(`<div style="position:relative;display:flex;gap:6px;margin-bottom:18px">${lad}</div><div style="font-size:13px;color:#5f5e5a">Определяем уровень · ${c.lv}, вопрос ${n}</div><div style="margin-top:4px;font-size:26px;font-weight:800;letter-spacing:-.6px;line-height:1.15">${E(c.q)}</div><div style="position:relative;display:flex;flex-direction:column;gap:8px;margin-top:18px">${ops}</div>${btn('Ответить','ans',sel===-2)}<div style="position:relative;margin-top:12px;text-align:center;font-size:13px;color:#7a7a72">Всего 5–8 вопросов. Не угадывайте: «не знаю» тоже ответ.</div>`,
  {o:k=>question(+k),act:a=>{if(a!=='ans'||sel===-2)return;const r=Placement.answer(S,sel);if(r.end)result(r.res);else{Placement.next(S);question(-2)}}});
}

// ---------- 4. результат
const LNAME={A0:'с нуля',A1:'начальный',A2:'базовый',B1:'средний',B2:'выше среднего'};
const GM={'Работа и карьера':['Поиск работы','Работа и документы','Работа и карьера'],'Жизнь в Испании':['Фразы на каждый день','Быт и жильё'],'Документы и бюрократия':['Работа и документы'],'Путешествия':['Путешествия и транспорт','Направления и транспорт'],'Друзья и общение':['Знакомство','Фразы на каждый день'],'Учёба и экзамен':['Связки и формальная речь'],'Семья и дети':['Семья и люди'],'Здоровье и врачи':['Здоровье и аптека','Тело и здоровье'],'Покупки и сервис':['Покупки и банк','Магазин'],'Жильё и аренда':['Быт и жильё','Дом и вещи'],'Еда и рестораны':['Еда и продукты','Кафе и еда'],'Технологии и интернет':[],'Фильмы и музыка':['Разговорные выражения'],'Бизнес и переговоры':['Договоры и переговоры','Деловая переписка']};
function recTopics(level,weak,goals){
 const stat={};
 LV.forEach(l=>{try{uStat(l).forEach(x=>{if(x.t>0&&!(x.u in stat))stat[x.u]={t:x.t,k:x.k,l}})}catch(e){}});
 const lim=Math.min(LV.length-1,Math.max(0,LV.indexOf(level))+1);
 const out=[],seen={};
 const add=(u,why,mx)=>{if(u==='Глаголы основные')u='Глаголы 1';const s=stat[u];if(!s||seen[u]||s.k>=s.t||LV.indexOf(s.l)>(mx===undefined?lim:mx))return;seen[u]=1;out.push({u,why})};
 (weak||[]).forEach(u=>add(u,'ошибка в тесте',Math.max(0,LV.indexOf(level))));
 (goals||[]).forEach(g=>(GM[g]||[]).forEach(u=>add(u,'ваша цель')));
 if(out.length<3){try{uStat(level==='A0'?'A1':level).filter(x=>x.t>0&&x.k<x.t).slice(0,3-out.length).forEach(x=>add(x.u,'по порядку'))}catch(e){}}
 return out.slice(0,4);
}
function result(res){
 const level=res.level,start=level==='A0'?'A1':level,rec=recTopics(level,res.weak,P.goals);
 const rows=LV.filter(l=>(res.ok[l]||0)+(res.bad[l]||0)>0).map(l=>{const o=res.ok[l]||0,b=res.bad[l]||0,pass=o>=2;
  return `<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:16px;background:rgba(255,255,255,.62)"><b style="width:30px;font-size:15px">${l}</b><span style="flex:1;font-size:14px;color:#5f5e5a">${o} из ${o+b} верно</span><span style="font-weight:800;color:${pass?'#1d7a3c':'#a32d2d'}">${pass?'✓':'✗'}</span></div>`}).join('');
 const tp=rec.map(r=>`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.62)"><div style="flex:1;font-size:15px;font-weight:700">${E(r.u)}</div><span style="font-size:12px;color:#7a7a72;font-weight:600">${r.why}</span></div>`).join('');
 view(`<div style="position:relative;display:flex;gap:6px;margin-bottom:18px">${LV.map(l=>{const ok=(res.ok[l]||0)>=2,bad=(res.bad[l]||0)>=2;return `<span style="flex:1;text-align:center;padding:9px 0;border-radius:14px;font-size:13px;font-weight:800;${ok?`background:${LIME};color:#111`:bad?'background:rgba(0,0,0,.1);color:#a32d2d':'background:rgba(255,255,255,.62);color:#7a7a72'}">${l}${ok?' ✓':bad?' ✗':''}</span>`}).join('')}</div>
 ${head('Готово','Мы определили уровень')}
 <div style="position:relative;overflow:hidden;margin-top:16px;padding:22px;border-radius:28px;background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee;box-shadow:0 14px 30px rgba(0,0,0,.22)">${wl(90)}<div style="position:relative;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a9a8a0;font-weight:700">Ваш уровень</div><div style="position:relative;display:flex;align-items:baseline;gap:12px;margin-top:4px"><b style="font-size:72px;font-weight:800;letter-spacing:-3px;line-height:1;color:${LIME};text-shadow:0 0 10px rgba(200,243,29,.9),0 0 28px rgba(200,243,29,.55),0 0 2px #fff">${level}</b><span style="font-size:20px;font-weight:700">${LNAME[level]}</span></div></div>
 <div style="position:relative;display:flex;flex-direction:column;gap:6px;margin-top:12px">${rows}</div>
 ${rec.length?`<div style="position:relative;margin-top:20px;font-size:18px;font-weight:800">Начнём с этих тем</div><div style="position:relative;display:flex;flex-direction:column;gap:8px;margin-top:10px">${tp}</div>`:''}
 <div style="position:relative;margin-top:16px;padding:14px 16px;border-radius:18px;background:rgba(255,255,255,.62);font-size:14px;line-height:1.45;color:#4a4943"><b>Что откроется.</b> Все уровни доступны сразу: любой можно выбрать вручную. Шкалы заполняются по мере изученных слов.</div>
 ${btn('Начать','go')}${link('Пройти тест заново','redo')}`,
  {act:a=>{if(a==='redo')startTest();else finish({path:P.path,level:start,goals:P.goals,pain:P.pain,focus:rec[0]&&rec[0].u,tested:level,play:true})}});
}

// ---------- завершение
function finish(o){
 ST.ob={done:true,path:o.path||'skip',level:o.tested||o.level||null,goals:o.goals||[],pain:o.pain||[]};
 if(o.level)ST.lv=o.level;
 ST.focus=o.focus||null;
 try{lsSet()}catch(e){}
 close();
 if(o.screen)go(o.screen);else if(o.play)startPlay('feed');else go('home');
}

// ---------- экран выбора темы (из главной)
function topics(){
 const cl=curLv();let us=[];try{us=uStat(cl).filter(x=>x.t>0)}catch(e){}
 const T=us.reduce((a,x)=>a+x.t,0),K=us.reduce((a,x)=>a+x.k,0);
 const now=ST.focus||(us.find(x=>x.k<x.t)||{}).u;
 const rows=us.map(x=>{const done=x.k>=x.t,pc=Math.round(x.k/x.t*100),cur=x.u===now;
  return `<div data-k="${E(x.u)}" style="position:relative;padding:14px 16px;border-radius:22px;${cur?'background:linear-gradient(160deg,#1f1f1d,#111110);color:#f4f3ee;box-shadow:0 12px 26px rgba(0,0,0,.2)':'background:rgba(255,255,255,.62)'}"><div style="display:flex;align-items:center;gap:10px"><b style="flex:1;font-size:16px">${E(x.u)}</b>${cur?`<span style="padding:3px 10px;border-radius:999px;background:${LIME};color:#111;font-size:12px;font-weight:800">сейчас</span>`:''}<span style="font-size:13px;font-weight:700;color:${cur?'#a9a8a0':done?'#1d7a3c':'#7a7a72'}">${done?'✓ ':''}${x.k} из ${x.t}</span></div><div style="height:6px;border-radius:3px;margin-top:10px;background:${cur?'rgba(255,255,255,.14)':'rgba(0,0,0,.08)'};overflow:hidden"><i style="display:block;height:100%;width:${Math.max(pc,x.k?3:0)}%;border-radius:3px;background:linear-gradient(90deg,#d9ff4a,#b6e817);${cur?'box-shadow:0 0 10px rgba(200,243,29,.8)':''}"></i></div></div>`}).join('');
 view(`<span class="obp" data-act="back" role="button" tabindex="0">← Назад</span><div style="margin-top:18px;font-size:13px;color:#5f5e5a">Уровень ${cl} · ${K} из ${T} ${typeof plw==='function'?plw(T):'слов'}</div><div style="font-size:30px;font-weight:800;letter-spacing:-.8px;margin-top:2px">Что учим</div><div style="margin-top:8px;font-size:14px;color:#4a4943;line-height:1.45">Все темы уровня открыты — нажмите ту, с которой хотите учить слова.</div>
 <div style="display:flex;gap:8px;margin-top:14px"><span data-act="all" role="button" tabindex="0" style="padding:11px 16px;border-radius:999px;font-size:14px;font-weight:700;background:${ST.focus?'rgba(255,255,255,.62)':'#171716;color:'+LIME}">Все по порядку</span><span data-act="rep" role="button" tabindex="0" style="padding:11px 16px;border-radius:999px;font-size:14px;font-weight:700;background:rgba(255,255,255,.62)">Только повторение</span></div>
 <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">${rows}</div>`,
  {act:a=>{if(a==='back'){close()}else if(a==='all'){setFocus(null);close();startPlay('feed')}else if(a==='rep'){close();startPlay('rep')}},
   k:u=>{setFocus(u);close();startPlay('feed')}});
}

window.ONB={need,run(){return new Promise(res=>{if(!inApp())landing();else survey()})},topics,landing,survey,startTest,_S:()=>S,_P:()=>P};
})();
