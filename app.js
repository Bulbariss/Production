console.clear();
// Menu
var app = function () {
  var body;
  var menu;
  var menuItems;
  var init = function init() {
    body = document.querySelector('body');
    menu = document.querySelector('.menu-icon');
    menuItems = document.querySelectorAll('.nav__list-item');
    applyListeners();
  };

  var applyListeners = function applyListeners() {
    menu.addEventListener('click', function () {
      return toggleClass(body, 'nav-active');
    });
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    }
  };

  var toggleClass = function toggleClass(element, stringClass) {
    if (element.classList.contains(stringClass)) element.classList.remove(stringClass);
    else element.classList.add(stringClass);
  };

  init();
}();

// ScrollTop Menu
$(document).ready(function () {

  'use strict';

  var c, currentScrollTop = 0,
    navbar = $('#navbar');

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = 45;

    currentScrollTop = a;

    if (!document.body.classList.contains("nav-active")) {
      if (c < currentScrollTop && a > b + b) {
        navbar.addClass("scrollUp");
      } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollUp");
      }
    }
    c = currentScrollTop;
  });

});

// Cubic-Bezier for jquery
(function (factory) {
  if (typeof exports === "object") {
    factory(require("jquery"));
  } else if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {
  $.extend({
    bez: function (encodedFuncName, coOrdArray) {
      if ($.isArray(encodedFuncName)) {
        coOrdArray = encodedFuncName;
        encodedFuncName = 'bez_' + coOrdArray.join('_').replace(/\./g, 'p');
      }
      if (typeof $.easing[encodedFuncName] !== "function") {
        var polyBez = function (p1, p2) {
          var A = [null, null],
            B = [null, null],
            C = [null, null],
            bezCoOrd = function (t, ax) {
              C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
              return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            xDeriv = function (t) {
              return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            xForT = function (t) {
              var x = t,
                i = 0,
                z;
              while (++i < 14) {
                z = bezCoOrd(x, 0) - t;
                if (Math.abs(z) < 1e-3) break;
                x -= z / xDeriv(x);
              }
              return x;
            };
          return function (t) {
            return bezCoOrd(xForT(t), 1);
          }
        };
        $.easing[encodedFuncName] = function (x, t, b, c, d) {
          return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t / d) + b;
        }
      }
      return encodedFuncName;
    }
  });
}));



// Get the current year for the copyright
$('#year').text(new Date().getFullYear());

// Init Scrollspy
$('body').scrollspy({
  target: '#main-nav'
});

// Smooth Scrolling
$("a.nav-link, a.smooth-scr").on('click', function (event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, $.bez([0.165, 0.84, 0.44, 1]), function () {

      window.location.hash = hash;

    });
  }
});

AOS.init({
  once: true,
});


// email

// (function () {
//   emailjs.init('user_Wu8lnXf7DyJRu3jNjcBxa');
// })();
window.onload = function () {

  // Variables
  let name = false;
  let email = false;
  let phone = false;
  let message = false;
  let IDs = {
    "nameID": document.getElementById("input-name"),
    "emailID": document.getElementById("input-email"),
    "phoneID": document.getElementById("input-phone"),
    "messageID": document.getElementById("input-message"),
    "name_P_ID": document.getElementById("input-name-p"),
    "email_P_ID": document.getElementById("input-email-p"),
    "phone_P_ID": document.getElementById("input-phone-p"),
    "message_P_ID": document.getElementById("input-message-p"),
    "modalID": document.getElementById('exampleModalCenter')
  }
  const regexName = /^[а-яА-ЯёЁa-zA-Z0-9]+$/i;
  const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  // Functions
  function invalidInput(id) {
    document.getElementById(`${id}`).classList.add("invalid-form");
    document.getElementById(`${id}-p`).classList.add("invalid-form-text");
  }

  function validInput(id) {
    document.getElementById(`${id}`).classList.remove("invalid-form");
    document.getElementById(`${id}-p`).classList.remove("invalid-form-text");
  }

  function clearForm() {
    IDs.nameID.value = null;
    IDs.emailID.value = null;
    IDs.phoneID.value = null;
    IDs.messageID.value = null;
  }

  function closeModal() {
    document.getElementById('close-modal').click();
  }

  function closedModal() {
    if (!IDs.modalID.classList.contains('show')) {
      clearInvalidInput();
      clearForm();
    }
  }

  function submitOnEnter(event) {
    if (event.keyCode == 13 && IDs.modalID.classList.contains('show')) {
      submitEmail(event);
    }
  }

  function clearInvalidInput() {
    IDs.nameID.classList.remove("invalid-form");
    IDs.emailID.classList.remove("invalid-form");
    IDs.phoneID.classList.remove("invalid-form");
    IDs.messageID.classList.remove("invalid-form");
    IDs.name_P_ID.classList.remove("invalid-form-text");
    IDs.email_P_ID.classList.remove("invalid-form-text");
    IDs.phone_P_ID.classList.remove("invalid-form-text");
    IDs.message_P_ID.classList.remove("invalid-form-text");
  }

  function validateName() {
    let from_name = document.querySelector("#input-name").value;
    if (regexName.test(from_name) || from_name === 0) {
      validInput("input-name");
      name = true;
    } else {
      invalidInput("input-name");
      name = false;
    }
  }

  function validateEmail() {
    let to_name = document.querySelector("#input-email").value;
    if (regexEmail.test(to_name) || !to_name.length === 0) {
      validInput("input-email");
      email = true;
    } else {
      invalidInput("input-email");
      email = false;
    }
  }

  function validatePhone() {
    let phone_number = document.querySelector("#input-phone").value;
    if (regexPhone.test(phone_number) || phone_number === 0) {
      validInput("input-phone");
      phone = true;
    } else {
      invalidInput("input-phone");
      phone = false;
    }
  }

  function validateMessage() {
    let message_html = document.querySelector("#input-message").value;
    if (!message_html.length === 0 || message_html.trim()) {
      validInput("input-message");
      message = true;
    } else {
      invalidInput("input-message");
      message = false;
    }
  }

  // Event Listeners
  IDs.nameID.addEventListener("focusout", validateName);
  IDs.emailID.addEventListener("focusout", validateEmail);
  IDs.phoneID.addEventListener("focusout", validatePhone);
  IDs.messageID.addEventListener("focusout", validateMessage);
  document.addEventListener('click', closedModal)
  document.getElementById('contact-form').addEventListener('submit', submitEmail);
  document.addEventListener("keypress", submitOnEnter(event));

  // Send email
  function submitEmail(event) {

    event.preventDefault();

    validateName();
    validateEmail();
    validatePhone();
    validateMessage();
    var data = {
      service_id: 'mail_ru',
      template_id: 'template_Eox7BLxl',
      user_id: 'user_Wu8lnXf7DyJRu3jNjcBxa',
      template_params: {
        "reply_to": "1",
        "from_name": IDs.nameID.value,
        "to_name": IDs.emailID.value,
        "phone_number": IDs.phoneID.value,
        "message_html": IDs.messageID.value
      }
    };

    if (name && email && phone && message) {
      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done(function () {
        alert('Your mail is sent!');
      }).fail(function (error) {
        alert('Oops... ' + JSON.stringify(error));
      });
      clearInvalidInput();
      clearForm();
      closeModal();
    } 
  }
}