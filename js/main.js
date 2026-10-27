const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let lang=localStorage.getItem('lang')||'uz',typeTimer;
function setLang(l){
  lang=l;localStorage.setItem('lang',l);document.documentElement.lang=l;
  $$('[data-i18n]').forEach(e=>e.textContent=I18N[l][e.dataset.i18n]);
  $$('[data-i18n-ph]').forEach(e=>e.placeholder=I18N[l][e.dataset.i18nPh]);
  $$('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===l));
  typeRoles();
}
function typeRoles(){
  clearTimeout(typeTimer);const r=I18N[lang].roles,el=$('#typed');let i=0,j=0,del=false;
  (function tick(){
    const w=r[i];el.textContent=w.slice(0,j);
    if(!del&&j===w.length){del=true;return typeTimer=setTimeout(tick,1400)}
    if(del&&j===0){del=false;i=(i+1)%r.length}
    j+=del?-1:1;typeTimer=setTimeout(tick,del?40:90);
  })();
}
$$('.lang button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
const root=document.documentElement;
root.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;localStorage.setItem('theme',t)};
addEventListener('pointermove',e=>{const g=$('#glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
$$('.tilt').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg)`});
  el.addEventListener('pointerleave',()=>el.style.transform='');
});
$$('.sec h2,.about,.card,.skill').forEach(e=>e.classList.add('reveal'));
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');
  if(x.target.dataset.v)x.target.querySelector('i').style.width=x.target.dataset.v+'%'}}),{threshold:.25});
$$('.reveal').forEach(e=>io.observe(e));
$('#form').onsubmit=e=>{e.preventDefault();
  location.href=`mailto:your@email.com?subject=${encodeURIComponent($('#n').value)}&body=${encodeURIComponent($('#m').value+'\n\n'+$('#e').value)}`};
setLang(lang);
