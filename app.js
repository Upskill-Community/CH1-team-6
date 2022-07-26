const closeMenuBtn = document.querySelector('#closeMenu');
const openMenuBtn = document.querySelector('#openMenu');
const navPanelContainer = document.querySelector('.nav__panel-container');
const qty = document.querySelector('#qty');
const btns = document.querySelectorAll('.btn');
const clickCart = document.querySelector('.cart-Icon');
const checkoutBtn = document.querySelector('#checkout');
const cartBody = document.querySelector('#cart__body');
const cartPanel = document.querySelector('#cartPanel');
const trashBtn = document.querySelector('#trash');
const round = document.querySelector('#round');
const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.hero');
const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');
//set initial counter
let count = 0;


function toggleMenu(){
    navPanelContainer.classList.toggle('expanded');
}


// function for increasing and decreasing
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
  updateCartState(count);
  round.textContent = count;
 });
});

//removing the cart barge
    if (parseInt(qty.textContent) === 0 && count === 0){
    round.style.display = "none";
  }
  // adding the cart barge
function cartBarge(){
  if (parseInt(round.textContent) > 0) {
  round.style.display = "block";
  round.style.color = "white";
  round.style.fontSize = "0.7rem";
  round.style.alignContent = "center";
  round.style.textAlign = "center";
  qty.textContent = 0;
}
}

//Object containing the details about product added to cart
const checkoutState = {
 'default' : ` <div></div>
        <p class="empty">Your cart is empty.</p>
        <div></div>`,
  'items' : `
      <div class="cart__body--content">
        <div class="cart__body-description">
            <img class="cart__img" src="/CH1-team-6/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg" alt="shoes">
           <div class="text-trash">
            <div class="prod-content">
              <p class="product--name">Fall Limited Edition Sneakers</p>
              <p class="product--amt">
                <span>$125</span>
                <span>&times;</span>
                <span id="Amt">3</span>
                <span id="total" class="total">$375</span>
              </p>
            
            </div>
             <button  class="trash" aria-label="Remove product from cart">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <path
            d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
            id="a" />
          </defs>
          <use id="trash" fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
          </svg>
        </button>
         </div>
        </div>
      </div>
        <button class="cart__body--btn" id="cart__checkout" >Checkout
        </button>`
}

// function for toggling cart
function togglecart(){
 clickCart.getAttribute('aria-expanded') === 'false' ? clickCart.setAttribute('aria-expanded', 'true') :  clickCart.setAttribute('aria-expanded', 'false');

clickCart.getAttribute('aria-expanded') === 'false' ? cartPanel.setAttribute('disabled', 'true') : cartPanel.removeAttribute('disabled');
  count = 0;
}

//function used to toggle the product added to cart
function updateCartState(num){
 if(num === 0){
  cartBody.innerHTML = checkoutState.default;
   round.style.display = "none";
   
 } else {
  cartBody.innerHTML = checkoutState.items;
  const PRICE = 125;
  const amt = document.querySelector('#Amt');
  const total = document.querySelector('#total');
  amt.textContent = num;
  total.textContent = `$${num * PRICE}.00`;
 }
}

function onThumbClick(event) {
  gallery.forEach(img => {
    img.classList.remove('active');
  });

  event.target.parentElement.classList.add('active');

  heroImg.src = event.target.src.replace('-thumbnail', '');
}

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}


function getCurrentImageIndex() {
  const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
   return imageIndex;
}

function setHeroImage(imageIndex) {
    heroImg.src = `/CH1-team-6/ecommerce-product-page-main/images/image-product-${imageIndex}.jpg`;
    //images are not sync
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    gallery[imageIndex-1].classList.add('active');
}

gallery.forEach(img => {
  img.addEventListener('click', onThumbClick);
});


/*   EVENT LISTNERS */
checkoutBtn.addEventListener('click', () => {
  togglecart();
  cartBarge();
});
clickCart.addEventListener('click', togglecart);

cartPanel.addEventListener('click', (e) => {
  e.currentTarget === e.target && togglecart();
  e.target === document.querySelector('#trash') && updateCartState(0);
 //checkout button
 e.target === document.querySelector('#cart__checkout') && updateCartState(0);
});

openMenuBtn.addEventListener('click',toggleMenu);
closeMenuBtn.addEventListener('click',toggleMenu);


btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);



const overLay = document.querySelector('.overlay');
const lightBox = document.querySelector('.img-text');
const btnclose = document.querySelector('.btnClose');

let lightboxGallery;
let lightboxHero;

heroImg.addEventListener('click', onHeroImgClick);

function onHeroImgClick(){
      if (window.innerWidth >= 1200){
          if (overLay.childElementCount == 1){

            const newNode = lightBox.cloneNode(true);
            overLay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            lightboxGallery = overLay.querySelectorAll('.pic')
            lightboxHero = overLay.querySelector('.hero');
            lightboxGallery.forEach(img => {
              img.addEventListener('click', onThumbClickLightbox);
            });

            const btnOverlayNext = overLay.querySelector('.next');
            const btnOverlayPrevious = overLay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
          }
          overLay.classList.remove('hidden');
      }
}

function onBtnOverlayClose(){
  btnclose.parentElement.classList.add('hidden');
}

function onThumbClickLightbox(event) {
 lightboxGallery.forEach(img => {
    img.classList.remove('active');
  });
  event.target.parentElement.classList.add('active');
  lightboxHero.src = event.target.src.replace('-thumbnail', '');
}


function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}


function getOverlayCurrentImageIndex() {
  const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
   return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `/CH1-team-6/ecommerce-product-page-main/images/image-product-${imageIndex}.jpg`;
    //images are not sync
   lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    lightboxGallery[imageIndex-1].classList.add('active');
}

