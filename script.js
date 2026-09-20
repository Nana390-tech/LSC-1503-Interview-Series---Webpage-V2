const glossary=[
['punctual','ملتزم بالمواعيد'],['polite','مُهذّب'],['active listening','الإصغاء الفعّال'],['eye contact','التواصل البصري'],['posture','وضعية الجسم'],['gesture','إيماءة'],['self-correct','يُصحّح نفسه'],['follow-up question','سؤال متابعة'],['currently','حاليًا'],['graduate from','يتخرّج من'],['experience','خبرة / تجربة'],['strategy','استراتيجية / طريقة'],['prioritize','يُحدّد الأولويات'],['deadline','موعد نهائي'],['reliable source','مصدر موثوق'],['plagiarism','الانتحال'],['organized','منظّم'],['improve','يُحسّن / يتحسّن'],['independently','بشكل مستقل'],['challenge','تحدٍّ'],['conflict','خلاف / نزاع'],['deal with','يتعامل مع'],['compromise','حل وسط'],['career','مسيرة مهنية'],['work placement','تدريب عملي في جهة عمل'],['contribute to','يُساهم في']
];

const grid=document.querySelector('#glossary-grid');
const search=document.querySelector('#glossary-search');
const toggleArabic=document.querySelector('#toggle-arabic');
const emptyState=document.querySelector('#empty-state');
let arabicVisible=true;

function renderGlossary(){
  const query=(search.value||'').trim().toLowerCase();
  const matches=glossary.filter(([english,arabic])=>english.toLowerCase().includes(query)||arabic.includes(query));
  grid.innerHTML=matches.map(([english,arabic])=>`<article class="word-card ${arabicVisible?'':'hide-arabic'}"><strong>${english}</strong><span lang="ar" dir="rtl">${arabic}</span></article>`).join('');
  emptyState.hidden=matches.length!==0;
}
search.addEventListener('input',renderGlossary);
toggleArabic.addEventListener('click',()=>{
  arabicVisible=!arabicVisible;
  toggleArabic.textContent=arabicVisible?'Hide Arabic':'Show Arabic';
  toggleArabic.setAttribute('aria-pressed',String(arabicVisible));
  renderGlossary();
});
renderGlossary();

const boxes=[...document.querySelectorAll('.complete-box')];
const progressBar=document.querySelector('#progress-bar');
const progressText=document.querySelector('#progress-text');
function updateProgress(save=true){
  const state=boxes.map(box=>box.checked);
  const complete=state.filter(Boolean).length;
  progressBar.style.width=`${(complete/boxes.length)*100}%`;
  progressText.textContent=`${complete} of ${boxes.length} rooms complete`;
  boxes.forEach(box=>box.closest('.door-card').classList.toggle('completed',box.checked));
  if(save)localStorage.setItem('interview-ready-v2-progress',JSON.stringify(state));
}
function loadProgress(){
  let state=[];
  try{state=JSON.parse(localStorage.getItem('interview-ready-v2-progress')||'[]')}catch(error){state=[]}
  boxes.forEach((box,index)=>box.checked=Boolean(state[index]));
  updateProgress(false);
}
boxes.forEach(box=>box.addEventListener('change',()=>updateProgress()));
document.querySelector('#reset-progress').addEventListener('click',()=>{boxes.forEach(box=>box.checked=false);updateProgress();});
loadProgress();

const menuButton=document.querySelector('.menu-button');
const navLinks=document.querySelector('.nav-links');
menuButton.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const backTop=document.querySelector('.back-top');
window.addEventListener('scroll',()=>backTop.classList.toggle('show',window.scrollY>600),{passive:true});
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));