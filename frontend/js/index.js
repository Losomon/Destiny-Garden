// LOADER
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('gone');
    document.getElementById('heroBg').classList.add('loaded');
  },2100);
});

// CURSOR (desktop only)
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
if(window.innerWidth>768){
  document.addEventListener('mousemove',e=>{
    cur.style.left=e.clientX+'px'; cur.style.top=e.clientY+'px';
    setTimeout(()=>{ring.style.left=e.clientX+'px'; ring.style.top=e.clientY+'px';},80);
  });
  document.querySelectorAll('a,button,.ec,.pkg,.gt').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.2)';ring.style.opacity='0';});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='.55';});
  });
}

// NAVBAR SCROLL
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>60));

// SCROLL REVEAL
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});},{threshold:.11});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));

// MOBILE MENU
function openMob(){document.getElementById('mobileMenu').classList.add('open');document.body.style.overflow='hidden';}
function closeMob(){document.getElementById('mobileMenu').classList.remove('open');document.body.style.overflow='';}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}}));

// BOOKING → WHATSAPP
function doBook(){
  const n=document.getElementById('fn').value.trim();
  const p=document.getElementById('fp').value.trim();
  const d=document.getElementById('fd').value;
  const t=document.getElementById('ft').value;
  const g=document.getElementById('fg2').value;
  const note=document.getElementById('fn2').value.trim();
  if(!n||!p||!d||!t){alert('Please fill in your name, phone, date, and visit type.');return;}
  const msg=`Hi! I'd like to book a visit to Destiny Gardens.%0A%0A👤 Name: ${encodeURIComponent(n)}%0A📞 Phone: ${encodeURIComponent(p)}%0A📅 Date: ${encodeURIComponent(d)}%0A👥 Guests: ${encodeURIComponent(g||'TBC')}%0A🎯 Type: ${encodeURIComponent(t)}${note?'%0A📝 Note: '+encodeURIComponent(note):''}`;
  window.open(`https://wa.me/254700000000?text=${msg}`,'_blank');
}

// MIN DATE
document.getElementById('fd').setAttribute('min',new Date().toISOString().split('T')[0]);
