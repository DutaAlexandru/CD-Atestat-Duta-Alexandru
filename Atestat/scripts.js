            

// $(".contact-form").submit(function(){
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzbS-oRHf8-LPZZKDQY7gZeywlzqiK8XWBkgAFUQs7k9AfMGD7buxFLIe7wOM1BxTqt/exec'

//   $.post(scriptURL, $(this).serialize(), function(response){
//     console.log(response);
//     return false;
//   })
// });

// header
$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  console.log(scroll);
  if (scroll == 0) {
      $("header").removeClass("small");
  } else if (scroll > 10) {
    $("header").addClass("small");
  }
}); 


// card slider
$(function() {
  
  var slideCount =  $(".slider ul li").length;
  var slideWidth =  $(".slider ul li").width();
  var slideHeight =  $(".slider ul li").height();
  var slideUlWidth =  slideCount * slideWidth;
  
  $(".slider").css({"max-width":slideWidth, "height": slideHeight});
  $(".slider ul").css({"width":slideUlWidth, "margin-left": - slideWidth });
  $(".slider ul li:last-child").prependTo($(".slider ul"));
  
  function moveLeft() {
    $(".slider ul").stop().animate({
      left: + slideWidth
    },700, function() {
      $(".slider ul li:last-child").prependTo($(".slider ul"));
      $(".slider ul").css("left","");
    });
  }
  
  function moveRight() {
    $(".slider ul").stop().animate({
      left: - slideWidth
    },700, function() {
      $(".slider ul li:first-child").appendTo($(".slider ul"));
      $(".slider ul").css("left","");
    });
  }
  
  
  $(".next").on("click",function(){
    moveRight();
  });
  
  $(".prev").on("click",function(){
    moveLeft();
  });
  
  
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Citim coșul

  let existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++; // Creștem cantitatea
  } else {
    cart.push({ ...product, quantity: 1 }); // Adăugăm produsul
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Salvăm în localStorage
  alert("Produsul a fost adăugat în coș!"); // Afișăm un mesaj
  renderCart(); // Reafișăm coșul
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity--; // Scade cantitatea
    } else {
      cart.splice(productIndex, 1); // Elimină produsul complet
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Salvăm modificările
  renderCart(); // Reafișăm coșul
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");

  cartContainer.innerHTML = ""; // Curățăm lista
  let total = 0;

  cart.forEach(product => {
    let item = document.createElement("li");
    item.innerHTML = `${product.name} x${product.quantity} - ${product.price * product.quantity} RON 
      <button onclick="removeFromCart('${product.id}')">➖</button>`;
    cartContainer.appendChild(item);
    total += product.price * product.quantity;
  });

  totalContainer.textContent = `Total: ${total} RON`;
  renderPaypal(total);
}
function renderPaypal(price) {
  if (price === 0) {
    document.getElementById("paypal-button-container").innerHTML = "";
    return;
  }
  paypal
    .Buttons({
      style: {
        shape: "rect",
        color: "gold",
        layout: "vertical",
        label: "paypal",
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{ amount: { currency_code: "EUR", value: price } }],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {

          localStorage.setItem("cart", JSON.stringify([]));
          renderCart(); // Reafișăm coșul gol


          const element = document.getElementById("paypal-button-container");
          element.innerHTML = "";
          element.innerHTML = "<h3>Thank you for your payment!</h3>";


        });
      },
      onError: function (err) {
        console.log(err);
      },
    })
    .render("#paypal-button-container");

}

renderCart();