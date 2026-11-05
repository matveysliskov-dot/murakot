document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
 if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
 const qty=document.getElementById('quantity'),total=document.getElementById('total');
 const update=()=>{if(qty&&total)total.textContent=(Number(qty.value)*199)+' ₽'};
 if(qty){qty.addEventListener('change',update);update()}
 const form=document.getElementById('orderForm');
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('name').value.trim(),c=document.getElementById('contact').value.trim(),q=Number(qty.value),s=document.getElementById('size').value,comment=document.getElementById('comment').value.trim();const msg=['Здравствуйте! Хочу заказать контурный 3D-брелок.',`Имя: ${n}`,`Для связи: ${c}`,`Количество: ${q}`,`Размер: ${s}`,`Предварительная стоимость: ${q*199} ₽`,comment?`Пожелания: ${comment}`:'','Фотографию отправлю следующим сообщением.'].filter(Boolean).join('\n');try{navigator.clipboard?.writeText(msg)}catch(_){}window.open('https://t.me/OwlRnD','_blank','noopener');const hint=form.querySelector('.formhint');if(hint)hint.textContent='Текст заявки подготовлен. Если он не скопировался автоматически, скопируйте его вручную и отправьте в Telegram вместе с фотографией.';});
});
