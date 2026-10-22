(function(){
var d=document,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var hd=d.querySelector('header'),bar=d.getElementById('prog');
d.querySelector('.burger').addEventListener('click',function(){d.body.classList.toggle('open')});
d.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){d.body.classList.remove('open')})});
var tick=false;
function onScroll(){if(tick)return;tick=true;requestAnimationFrame(function(){
 var y=scrollY,h=d.documentElement.scrollHeight-innerHeight;
 hd.classList.toggle('solid',y>60);
 bar.style.transform='scaleX('+(h>0?y/h:0)+')';tick=false})}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// hero title by letters
var h1=d.querySelector('.hero h1');
if(h1){var t=h1.textContent;h1.textContent='';h1.setAttribute('aria-label',t);
 var n=0;t.split(' ').forEach(function(wd,wi){var W=d.createElement('span');W.className='wd';W.setAttribute('aria-hidden','true');wd.split('').forEach(function(c){var s=d.createElement('span');s.className='l';s.textContent=c;s.style.animationDelay=(0.35+n++*0.09)+'s';W.appendChild(s)});h1.appendChild(W);if(wi<t.split(' ').length-1)h1.appendChild(d.createTextNode(' '))})}

// reading effect: words light up one by one
var rd=[].slice.call(d.querySelectorAll('[data-read]'));
rd.forEach(function(el){
 var words=el.textContent.trim().split(/\s+/);el.textContent='';
 words.forEach(function(w,i){var s=d.createElement('span');s.className='w';s.textContent=w;el.appendChild(s);if(i<words.length-1)el.appendChild(d.createTextNode(' '))});
});
if(reduce){d.body.classList.add('rd-off')}
var io=new IntersectionObserver(function(es){es.forEach(function(e){
 if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target;
 if(el.classList.contains('rv'))el.classList.add('in');
 if(el.hasAttribute('data-read')){var step=/^H/.test(el.tagName)?230:130;
  [].forEach.call(el.querySelectorAll('.w'),function(w,i){setTimeout(function(){w.classList.add('on')},i*step)})}
 if(el.hasAttribute('data-count'))count(el);
})},{threshold:.25,rootMargin:'0px 0px -6% 0px'});
d.querySelectorAll('.rv,[data-read],[data-count]').forEach(function(el){io.observe(el)});

function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
function count(el){var to=+el.getAttribute('data-count');if(reduce){el.textContent=fmt(to);return}
 var t0=performance.now(),dur=2200;(function f(t){var p=Math.min(1,(t-t0)/dur);p=1-Math.pow(1-p,4);el.textContent=fmt(Math.round(to*p));if(p<1)requestAnimationFrame(f)})(t0)}
})();
