// ── LOADER
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('gone');
    document.getElementById('heroBg').classList.add('loaded');
  },2000);
});

// ── CURSOR (desktop only)
if(window.innerWidth>900){
  const cur=document.getElementById('cursor')||document.createElement('div'),ring=document.getElementById('cursorRing')||document.createElement('div');
  document.addEventListener('mousemove',e=>{
    cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
    setTimeout(()=>{ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';},80);
  });
  document.querySelectorAll('a,button,.ec,.pkg,.gt').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.2)';ring.style.opacity='0';});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='.5';});
  });
}

// ── NAVBAR SCROLL
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>55));

// ── SCROLL REVEAL
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}}),{threshold:.1});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));

// ── MOBILE MENU
function openMob(){const m=document.getElementById('mobileMenu');m.classList.add('open');document.body.style.overflow='hidden';document.querySelector('.hamburger').setAttribute('aria-expanded','true');}
function closeMob(){const m=document.getElementById('mobileMenu');m.classList.remove('open');document.body.style.overflow='';document.querySelector('.hamburger').setAttribute('aria-expanded','false');}

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}}));

// ── TODAY'S HOURS + BANNER
const hours={0:{open:'08:00',close:'20:00',label:'Sunday'},1:{open:'09:00',close:'19:00',label:'Monday'},2:{open:'09:00',close:'19:00',label:'Tuesday'},3:{open:'09:00',close:'19:00',label:'Wednesday'},4:{open:'09:00',close:'19:00',label:'Thursday'},5:{open:'09:00',close:'20:00',label:'Friday'},6:{open:'08:00',close:'21:00',label:'Saturday'}};
function initHours(){
  const now=new Date(),day=now.getDay(),h=now.getHours(),m=now.getMinutes();
  const info=hours[day];
  const [oh,om]=info.open.split(':').map(Number);
  const [ch,cm]=info.close.split(':').map(Number);
  const isOpen=(h*60+m>=oh*60+om)&&(h*60+m<ch*60+cm);
  const banner=document.getElementById('todayBanner');
  const dot=banner.querySelector('.tb-dot');
  document.getElementById('tbText').textContent=isOpen?`Open Now · ${info.label}`:`Closed · Opens ${info.open} ${info.label}`;
  document.getElementById('tbTime').textContent=isOpen?`Closes ${info.close}`:``;
  if(!isOpen){banner.classList.add('tb-closed');dot.style.background='#ef4444';}
  // Highlight today in hours table
  const rows=document.querySelectorAll('#hoursTable .hr-row[data-day]');
  rows.forEach(r=>{
    if(parseInt(r.dataset.day)===day){
      r.classList.add('today-row');
      const tag=document.createElement('span');tag.className='today-tag';tag.textContent='Today';
      r.querySelector('span').appendChild(tag);
    }
  });
}
initHours();

// ── LIGHTBOX
const lbImgs=['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=85','https://images.unsplash.com/photo-1566454825481-9c31d8fe0df5?w=1000&q=85','https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85','https://images.unsplash.com/photo-1531537571171-a707bf2683da?w=1000&q=85','https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1000&q=85','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85','https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=85'];
let lbIdx=0;
function openLb(i){lbIdx=i;document.getElementById('lb-img').src=lbImgs[i];document.getElementById('lb-counter').textContent=(i+1)+' / '+lbImgs.length;document.getElementById('lightbox').classList.add('open');document.body.style.overflow='hidden';}
function closeLb(){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';}
function lbNav(d){lbIdx=(lbIdx+d+lbImgs.length)%lbImgs.length;openLb(lbIdx);}
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target===e.currentTarget)closeLb();});
document.addEventListener('keydown',e=>{if(document.getElementById('lightbox').classList.contains('open')){if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')lbNav(-1);if(e.key==='ArrowRight')lbNav(1);}});

// ── PRICING CALCULATOR
const PRICES={adults:400,kids:200,bundle:{adults:2,kids:2,price:1200}};
let cAdults=2,cKids=2;
function adjustCalc(t,d){
  if(t==='adults'){cAdults=Math.max(0,cAdults+d);document.getElementById('c-adults').textContent=cAdults;}
  else{cKids=Math.max(0,cKids+d);document.getElementById('c-kids').textContent=cKids;}
  recalc();
}
function recalc(){
  let total=cAdults*PRICES.adults+cKids*PRICES.kids;
  // Check if bundle applies
  let savings=0,label='Estimated Total';
  if(cAdults>=2&&cKids>=2){
    const bundles=Math.min(Math.floor(cAdults/2),Math.floor(cKids/2));
    const bundleSave=bundles*(2*PRICES.adults+2*PRICES.kids-PRICES.bundle.price);
    if(bundleSave>0){savings=bundleSave;total-=bundleSave;label='With Family Bundle discount';}
  }
  document.getElementById('calc-total').textContent='KSh '+total.toLocaleString();
  document.getElementById('calc-label-text').textContent=label;
  document.getElementById('calc-savings').textContent=savings>0?'You save KSh '+savings.toLocaleString()+' with the Family Bundle! 🎉':'';
}
recalc();
function bookFromCalc(){
  const msg=`Hi! I'd like to book a visit to Destiny Gardens.%0A%0A👥 Adults: ${cAdults}%0A👶 Children: ${cKids}%0A💰 Estimated: KSh ${(cAdults*PRICES.adults+cKids*PRICES.kids).toLocaleString()}%0A%0APlease confirm availability.`;
  window.open(`https://wa.me/254721444144?text=${msg}`,'_blank');
}

// ── FAQ ACCORDION
function toggleFaq(el){
  const item=el.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-q').setAttribute('aria-expanded','false');});
  if(!isOpen){item.classList.add('open');el.setAttribute('aria-expanded','true');}
}

// ── FORM VALIDATION + BOOKING
document.getElementById('fd').setAttribute('min',new Date().toISOString().split('T')[0]);
function validateField(id,check){
  const el=document.getElementById(id);
  const fg=el.closest('.fg');
  if(!fg||!fg.id)return check(el.value);
  if(!check(el.value)){fg.classList.add('has-err');return false;}
  fg.classList.remove('has-err');return true;
}
function doBook(){
  const n=document.getElementById('fn').value.trim();
  const p=document.getElementById('fp').value.trim();
  const d=document.getElementById('fd').value;
  const t=document.getElementById('ft').value;
  const g=document.getElementById('fg2').value;
  const note=document.getElementById('fn2').value.trim();
  let valid=true;
  if(!n){document.getElementById('fg-name').classList.add('has-err');valid=false;}else{document.getElementById('fg-name').classList.remove('has-err');}
  if(!p||p.length<9){document.getElementById('fg-phone').classList.add('has-err');valid=false;}else{document.getElementById('fg-phone').classList.remove('has-err');}
  if(!d){document.getElementById('fg-date').classList.add('has-err');valid=false;}else{document.getElementById('fg-date').classList.remove('has-err');}
  if(!t){document.getElementById('fg-type').classList.add('has-err');valid=false;}else{document.getElementById('fg-type').classList.remove('has-err');}
  if(!valid)return;
  const msg=`Hi! I'd like to book a visit to Destiny Gardens.%0A%0A👤 Name: ${encodeURIComponent(n)}%0A📞 Phone: ${encodeURIComponent(p)}%0A📅 Date: ${encodeURIComponent(d)}%0A👥 Guests: ${encodeURIComponent(g||'TBC')}%0A🎯 Type: ${encodeURIComponent(t)}${note?'%0A📝 Note: '+encodeURIComponent(note):''}`;
  window.open(`https://wa.me/254721444144?text=${msg}`,'_blank');
  showToast('Booking sent! We\'ll confirm within 2 hours.');
}
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}
