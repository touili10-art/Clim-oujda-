
const CONFIG={"businessName": "Clim Auto", "phone": "06 60 05 97 77", "phoneHref": "+212660059777", "whatsapp": "212660059777", "whatsappText": "Bonjour, je souhaite prendre rendez-vous pour la climatisation de ma voiture.", "city": "Oujda", "serviceArea": "Oujda et ses environs", "address": "73 Rue de Casablanca, Oujda 60000, Maroc", "hours": "Lun–Sam, 09h00–19h00", "googleReviews": "https://search.google.com/local/reviews?placeid=ChIJsakRiItjeA0RLRdZXCGWxIU&q=car%2C+Oujda%2C+Oriental%2C+Morocco&authuser=0&hl=fr&gl=MA", "googleMaps": "https://www.google.com/maps/search/?api=1&query=Clim%20Auto%2C%2073%20Rue%20de%20Casablanca%2C%20Oujda%2060000"};
document.querySelectorAll('[data-business]').forEach(e=>e.textContent=CONFIG.businessName);
document.querySelectorAll('[data-phone]').forEach(e=>e.textContent=CONFIG.phone);
document.querySelectorAll('[data-phone-link]').forEach(e=>e.href=`tel:${CONFIG.phoneHref}`);
document.querySelectorAll('[data-wa]').forEach(e=>e.href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappText)}`);
document.querySelectorAll('[data-city]').forEach(e=>e.textContent=CONFIG.city);
document.querySelectorAll('[data-area]').forEach(e=>e.textContent=CONFIG.serviceArea);
document.querySelectorAll('[data-address]').forEach(e=>e.textContent=CONFIG.address);
document.querySelectorAll('[data-hours]').forEach(e=>e.textContent=CONFIG.hours);
document.querySelectorAll('[data-google-reviews]').forEach(e=>e.href=CONFIG.googleReviews);
document.querySelectorAll('[data-google-maps]').forEach(e=>e.href=CONFIG.googleMaps);
const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
if(menu && links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)})}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links?.classList.remove('open')));
function showNotice(n,kind,msg){if(!n)return;n.hidden=false;n.textContent=msg;n.classList.remove('notice-success','notice-error');n.classList.add(kind==='success'?'notice-success':'notice-error');n.setAttribute('tabindex','-1');n.focus();}
document.querySelectorAll('form[data-netlify]').forEach(f=>{
  f.addEventListener('submit', async e=>{
    e.preventDefault();
    const notice=f.querySelector('.notice');
    const btn=f.querySelector('button[type=submit]');
    const label=btn?btn.textContent:'';
    if(btn){btn.disabled=true;btn.textContent='Envoi en cours…';}
    try{
      const res=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()});
      if(!res.ok) throw new Error('bad status');
      f.reset();
      const type=f.getAttribute('name');
      const msg = type==='avis'
        ? 'Merci ! Votre avis a bien été envoyé. Nous le recevrons via Netlify.'
        : 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.';
      showNotice(notice,'success',msg);
    }catch(err){
      const type=f.getAttribute('name');
      const msg = type==='avis'
        ? "Une erreur s'est produite. Vous pouvez aussi laisser votre avis directement sur Google."
        : "Une erreur s'est produite lors de l'envoi. Merci de nous appeler ou de nous écrire sur WhatsApp.";
      showNotice(notice,'error',msg);
    }finally{if(btn){btn.disabled=false;btn.textContent=label;}}
  })
});
