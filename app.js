//set initail counter
let count = 0;

const qty = document.querySelector('#qty');
const btns = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal-overlay');
const clickCart = document.querySelector('.cart-Icon');


btns.forEach(function (btn){
 btn.addEventListener('click', function(e){
  const style = e.currentTarget.classList;
  if (style.contains('decrease')){
   if (count > 0){
   count--;
   }
  } else if (style.contains('increase')){
   count++;
  }
  qty.textContent = count;
 });
});


clickCart.addEventListener('click', function(){
 modal.classList.toggle('open-modal');
});
