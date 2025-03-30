// header
$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  if (scroll == 0) {
      $("header").removeClass("small");
  } else if (scroll > 30) {
    $("header").addClass("small");
  }
}); 



// product slider
$(document).ready( function() {
  
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

function addToCart(product, confirmation=true) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Citim coșul

  let existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++; // Creștem cantitatea
  } else {
    cart.push({ ...product, quantity: 1 }); // Adăugăm produsul
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Salvăm în localStorage
  if ( confirmation )
     alert("Produsul a fost adăugat în coș!"); // Afișăm un mesaj
  renderCart(); // Reafișăm coșul
  renderCartCount();
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
  renderCartCount();
}

function renderCartCount() {
  console.log("RenderCartCount");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementsByClassName("cart-counter");

  if ( cartContainer === null ) 
    return;

  let cartCount = 0;

  cart.forEach(product => {
    cartCount += product.quantity;
  });

  cartContainer[0].innerHTML = cartCount;
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");

  if ( cartContainer === null ) return;

  let totalContainer = document.getElementById("cart-total");

  cartContainer.innerHTML = ""; // Curățăm lista
  let total = 0;

  cart.forEach(product => {
    let item = document.createElement("tr");

    item.innerHTML = `<tr>
                    <td>${product.name}</td>
                    <td>${product.price} RON</td>
                    <td>
                      <button class="add-qty" onclick="removeFromCart('${product.id}')">-</button>
                      ${product.quantity}
                      <button class="decrease-qty" onclick="addToCart({ id: '${product.id}', name: '${product.name}', price: ${product.price} }, false)">+</button>
                    </td>
                    <td> ${product.price * product.quantity} RON</td>
                </tr>`;

    cartContainer.appendChild(item);
    total += product.price * product.quantity;
  });

  totalContainer.textContent = `Total: ${total} RON / ${total/5}€ `;
  renderPaypal(total/5);
}

function renderPaypal(price) {
  document.getElementById("paypal-button-container").innerHTML = "";
  if (price === 0) {
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
          element.innerHTML = "<h3>Va multumim pentru comanda!</h3>";


        });
      },
      onError: function (err) {
        alert("Eroare! Ceva nu a functionat...");
        console.log(err);
      },
    })
    .render("#paypal-button-container");

}

function clearCart(){
  localStorage.removeItem("cart");
  renderCart();
  renderCartCount();
}

addEventListener("DOMContentLoaded", (event) => {
  renderCart();
  renderCartCount();
});

$(document).ready(function(){
	let containerHeight = $(window).height() - $("header").height() - $("footer").height() - 81;

	$(".container").css("min-height", containerHeight);
});