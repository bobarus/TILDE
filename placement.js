// Tilde · тест на определение уровня (A0 → B2).
// Адаптивный: по 2–3 вопроса на уровень, старт с A2. Уровень = самый высокий пройденный.
(function(root){
const LV=['A1','A2','B1','B2'];
// q — задание (по-русски), o — варианты (первый вариант всегда верный, порядок перемешивается при показе), t — тема для рекомендаций
const B={
A1:[
{q:'Как сказать «спасибо»?',o:['Gracias','Perdón','Adiós','Por favor'],t:'Приветствия и вежливость'},
{q:'Вставьте: «___ de Rusia.» (Я из России)',o:['Soy','Eres','Es','Estoy'],t:'Глаголы основные'},
{q:'Вставьте: «Mi madre ___ en Madrid.»',o:['vive','vivo','vives','viven'],t:'Глаголы основные'},
{q:'Как сказать «Мне 30 лет»?',o:['Tengo treinta años','Soy treinta años','Estoy treinta años','Hago treinta años'],t:'Числа 21–99'},
{q:'Вставьте: «¿Dónde ___ el baño?»',o:['está','es','hay','tiene'],t:'Глаголы основные'},
{q:'Вставьте: «Las casas son ___.»',o:['grandes','grande','grandas','grandos'],t:'Цвета и описание'},
{q:'Что значит «Hasta mañana»?',o:['До завтра','До свидания, утро','Доброе утро','До вечера'],t:'Дни, месяцы, время суток'},
{q:'Вставьте: «Yo ___ español.»',o:['hablo','hablas','habla','hablan'],t:'Знакомство'},
{q:'Какой день недели — «martes»?',o:['Вторник','Среда','Четверг','Понедельник'],t:'Дни, месяцы, время суток'},
{q:'Вставьте: «___ libro es mío.»',o:['El','La','Los','Las'],t:'Семья и люди'}],
A2:[
{q:'Вставьте: «Ayer yo ___ al cine.»',o:['fui','voy','iba','iré'],t:'Прошедшее время'},
{q:'Вставьте: «Mañana ___ llamar a mi madre.»',o:['voy a','voy','fui a','iba a'],t:'Глаголы основные'},
{q:'Вставьте: «Me ___ el café.»',o:['gusta','gustan','gusto','gustas'],t:'Эмоции и мнение'},
{q:'Вставьте: «Ella se ___ a las siete.»',o:['levanta','levantas','levanto','levantan'],t:'Быт и жильё'},
{q:'Вставьте: «Es más alto ___ yo.»',o:['que','de','como','ya'],t:'Цвета и описание'},
{q:'Вставьте: «Tengo que ___ temprano.»',o:['levantarme','levanto','levantando','levantado'],t:'Быт и жильё'},
{q:'Как сказать «Вчера я купил хлеб»?',o:['Ayer compré pan','Ayer compro pan','Ayer comprando pan','Ayer comprar pan'],t:'Прошедшее время'},
{q:'Вставьте: «No tengo ___.»',o:['nada','algo','nadie','todo'],t:'Вопросы и связки'},
{q:'Вставьте: «Ahora ___ comiendo.»',o:['estoy','soy','hago','tengo'],t:'Свободное время и дела'},
{q:'Вставьте: «¿Cuánto ___ este abrigo?»',o:['cuesta','cuestan','cuestas','cuesto'],t:'Покупки и банк'}],
B1:[
{q:'Вставьте: «Cuando era niño, ___ en el campo.»',o:['vivía','viví','vivo','viviré'],t:'Прошедшее время'},
{q:'Вставьте: «Esta mañana he ___ el informe.»',o:['terminado','terminó','terminando','termine'],t:'Прошедшее время'},
{q:'Вставьте: «Espero que ___ pronto.»',o:['vengas','vienes','venir','vendrás'],t:'Мнения и чувства'},
{q:'Вставьте: «Si tuviera dinero, ___ un coche.»',o:['compraría','compro','compré','compraba'],t:'Устойчивые выражения'},
{q:'Вставьте: «Llevo tres años ___ en Barcelona.»',o:['viviendo','vivir','vivido','vive'],t:'Работа и карьера'},
{q:'«¿Tienes el libro? — Sí, ___ tengo.»',o:['lo','le','la','se'],t:'Устойчивые выражения'},
{q:'Вставьте: «Gracias ___ tu ayuda.»',o:['por','para','de','a'],t:'Устойчивые выражения'},
{q:'Вставьте: «Mientras ___, sonó el teléfono.»',o:['cocinaba','cociné','cocino','cocinaré'],t:'Прошедшее время'},
{q:'Что значит «echar de menos»?',o:['скучать по','выбрасывать','терять','забывать'],t:'Устойчивые выражения'},
{q:'Вставьте: «Este regalo es ___ ti.»',o:['para','por','de','a'],t:'Устойчивые выражения'}],
B2:[
{q:'Вставьте: «Si hubiera sabido la verdad, no ___.»',o:['habría venido','vendría','vine','vendré'],t:'Связки и формальная речь'},
{q:'Вставьте: «Dudo que ___ la verdad.»',o:['sepa','sabe','sabrá','supo'],t:'Мнения и чувства'},
{q:'«El informe, ___ te hablé, ya está listo.»',o:['del que','que','lo que','cuyo'],t:'Связки и формальная речь'},
{q:'Вставьте: «Por mucho que ___, no lo conseguirás.»',o:['te esfuerces','te esfuerzas','te esforzarás','te esforzaste'],t:'Абстрактная лексика'},
{q:'Вставьте: «Me alegra que ___ aprobado.»',o:['hayas','has','habías','hubieras'],t:'Мнения и чувства'},
{q:'Вставьте: «Es la casa ___ ventanas son azules.»',o:['cuyas','cuya','que','donde'],t:'Связки и формальная речь'},
{q:'Вставьте: «___ llegar tarde, avísame.»',o:['De','Si','Que','Por'],t:'Связки и формальная речь'},
{q:'Деловое письмо: «Estimado señor: ___ comunicarle que…»',o:['Lamento','Lamentas','Lamentaron','Lamentando'],t:'Деловая переписка'},
{q:'Что значит «merecer la pena»?',o:['стоить усилий','получать штраф','терять время','жалеть'],t:'Разговорные выражения'},
{q:'Что значит «sin embargo»?',o:['однако','поэтому','сначала','всегда'],t:'Связки и формальная речь'}]};
function shuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
// состояние теста
function create(rnd){rnd=rnd||Math.random;
 return {r:rnd,li:1,dir:0,asked:{},ok:{},bad:{},best:-1,done:false,res:null,cur:null,weak:[]}}
function pickQ(S){const L=LV[S.li];const used=S.asked[L]||(S.asked[L]=[]);
 const pool=shuffle(B[L].map((_,i)=>i).filter(i=>!used.includes(i)),S.r);const i=pool[0];used.push(i);
 const q=B[L][i];const opts=shuffle(q.o.map((t,k)=>({t,ok:k===0})),S.r);
 S.cur={lv:L,i,q:q.q,opts:opts.map(o=>o.t),ans:opts.findIndex(o=>o.ok),t:q.t};return S.cur}
function next(S){if(S.done)return null;return pickQ(S)}
// ответ: idx — номер варианта; idx<0 — «не знаю»
function answer(S,idx){const c=S.cur,L=c.lv;const good=idx===c.ans;
 if(good)S.ok[L]=(S.ok[L]||0)+1;else{S.bad[L]=(S.bad[L]||0)+1;if(S.weak.indexOf(c.t)<0)S.weak.push(c.t)}
 const ok=S.ok[L]||0,bad=S.bad[L]||0;
 if(ok<2&&bad<2)return {end:false};
 const pass=ok>=2;
 if(pass){S.best=Math.max(S.best,S.li);
   if(S.dir===0)S.dir=1;
   if(S.dir===1&&S.li<LV.length-1){S.li++;return {end:false}}
   return finish(S)}
 // провал уровня
 if(S.dir===0)S.dir=-1;
 if(S.dir===-1&&S.li>0){S.li--;return {end:false}}
 return finish(S)}
function finish(S){S.done=true;const lv=S.best<0?'A0':LV[S.best];
 const asked=Object.keys(S.asked).reduce((n,k)=>n+S.asked[k].length,0);
 S.res={level:lv,asked,ok:Object.assign({},S.ok),bad:Object.assign({},S.bad),weak:S.weak.slice(0,4)};return {end:true,res:S.res}}
const api={LV,BANK:B,create,next,answer};
if(typeof module!=='undefined')module.exports=api;else root.Placement=api;
})(typeof window!=='undefined'?window:globalThis);
