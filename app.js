document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  function initCookies() {
    let cookieConsent = getCookie('consent');
    if (cookieConsent !== 'true') {
      showCookieBanner();
    }
  }

  function allowCookies() {
    setCookie('consent', true, 365);
    hideCookieBanner();
  }

  document.getElementById('cookie-popup-btn').addEventListener('click', allowCookies);

  function showCookieBanner() {
    document.getElementById('cookie-popup').classList.add('d-block');
  }

  function hideCookieBanner() {
    document.getElementById('cookie-popup').classList.remove('d-block');
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  initCookies();

  setTimeout(() => {
    document.getElementsByTagName('BODY')[0].classList.remove('scrollLock');
    document.querySelector('#start-overlay').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('#start-overlay').style.display = 'none';
    }, 1000);
  }, 2500);

  // Menu
  (function () {
    const body = document.getElementsByTagName('BODY')[0];
    const menu = document.querySelector('.menu-icon');
    const menuItems = document.querySelectorAll('.nav__list-item');

    function toggleClass() {
      if (body.classList.contains('nav-active')) body.classList.remove('nav-active');
      else body.classList.add('nav-active');
    };
    menu.addEventListener('click', () => {
      toggleClass();
    });
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', () => {
        toggleClass();
      });
    }
  }());

  // ScrollTop Menu
  $(document).ready(function () {
    const x = window.matchMedia("(max-width: 575px)");
    const y = window.matchMedia("(max-height: 575px)");
    let c, currentScrollTop = 0,
      navbar = $('#navbar');

    $(window).scroll(function () {
      let a = $(window).scrollTop();
      let b = 45;

      currentScrollTop = a;

      if (!document.body.classList.contains("nav-active") && (x.matches || y.matches) && !(a <= b) && !document.getElementById('ModalCenterTitle').classList.contains('show')) {
        if (c < currentScrollTop && a > b + b) {
          navbar.addClass("scrollUp");
        } else if (c > currentScrollTop && !document.getElementsByTagName("BODY")[0].classList.contains("modal-open")) {
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
          let polyBez = function (p1, p2) {
            let A = [null, null],
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
                let x = t,
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
    target: '#main-nav',
  });

  // Smooth Scrolling
  function smoothScroll(event) {
    const x = window.matchMedia('(max-width: 767px)');
    if (this.hash !== '' && !x.matches) {
      event.preventDefault();
      const hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, $.bez([0.165, 0.84, 0.44, 1]),
        function () {
          window.location.hash = hash;
        });
    }
  }
  $('a.nav-link, a.smooth-scr').on('click', smoothScroll);
  $('a.to-top').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();
      const hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1200, $.bez([0.165, 0.84, 0.44, 1]), function () {
        window.location.hash = hash;
      });
    }
  });

  AOS.init({
    once: true,
  });

  // email
  window.onload = function () {
    // Variables
    let name = false;
    let email = false;
    let phone = false;
    let message = false;
    const IDs = {
      nameID: document.getElementById('input-name'),
      emailID: document.getElementById('input-email'),
      phoneID: document.getElementById('input-phone'),
      messageID: document.getElementById('input-message'),
      name_P_ID: document.getElementById('input-name-p'),
      email_P_ID: document.getElementById('input-email-p'),
      phone_P_ID: document.getElementById('input-phone-p'),
      message_P_ID: document.getElementById('input-message-p'),
      modalID: document.getElementById('ModalCenter')
    };
    // Regex for validating inputs
    const regexName = /^[а-яА-ЯёЁa-zA-Z0-9]+$/i;
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    // Functions
    // Clear invalid form propery from passed cell
    function invalidInput(id) {
      document.getElementById(`${id}`).classList.add('invalid-form');
      document.getElementById(`${id}-p`).classList.add('invalid-form-text');
    }
    // Set invalid form propery from passed cell
    function validInput(id) {
      document.getElementById(`${id}`).classList.remove('invalid-form');
      document.getElementById(`${id}-p`).classList.remove('invalid-form-text');
    }
    // Clear all input from cells
    function clearForm() {
      IDs.nameID.value = null;
      IDs.emailID.value = null;
      IDs.phoneID.value = null;
      IDs.messageID.value = null;
    }
    // Close modal by clicking on close button
    // function closeModal() {
    //   document.getElementById('close-modal').click();
    // }
    // If modal is closed clear inputs and remove invalid input property
    // Clear all invalid input properties
    function clearInvalidInput() {
      IDs.nameID.classList.remove('invalid-form');
      IDs.emailID.classList.remove('invalid-form');
      IDs.phoneID.classList.remove('invalid-form');
      IDs.messageID.classList.remove('invalid-form');
      IDs.name_P_ID.classList.remove('invalid-form-text');
      IDs.email_P_ID.classList.remove('invalid-form-text');
      IDs.phone_P_ID.classList.remove('invalid-form-text');
      IDs.message_P_ID.classList.remove('invalid-form-text');
    }
    // If modal on mobile is closed return navbar and body scroll
    function closedModal() {
      setTimeout(() => {
        if (!IDs.modalID.classList.contains('show')) {
          clearInvalidInput();
          clearForm();
          document.getElementById('navbar').classList.remove('scrollUp');
        }
      }, 100);
    }
    // If enter is pressed call for email submit
    function submitOnEnter(event) {
      if (event.keyCode === 13 && IDs.modalID.classList.contains('show')) {
        event.preventDefault();
        // submitEmail(event);
        document.querySelector('.btn-modal').click();
      }
    }
    // Check if cell input is valid
    function validateName() {
      let from_name = document.querySelector('#input-name').value;
      if (regexName.test(from_name) || from_name === 0) {
        validInput('input-name');
        name = true;
      } else {
        invalidInput('input-name');
        name = false;
      }
    }
    // Check if cell input is valid
    function validateEmail() {
      let to_name = document.querySelector('#input-email').value;
      if (regexEmail.test(to_name) || !to_name.length === 0) {
        validInput('input-email');
        email = true;
      } else {
        invalidInput('input-email');
        email = false;
      }
    }
    // Check if cell input is valid
    function validatePhone() {
      let phone_number = document.querySelector('#input-phone').value;
      if (regexPhone.test(phone_number) || phone_number === 0) {
        validInput('input-phone');
        phone = true;
      } else {
        invalidInput('input-phone');
        phone = false;
      }
    }
    // Check if cell input is valid
    function validateMessage() {
      let message_html = document.querySelector('#input-message').value;
      if (!message_html.length === 0 || message_html.trim()) {
        validInput('input-message');
        message = true;
      } else {
        invalidInput('input-message');
        message = false;
      }
    }
    // Show success message
    function showSuccess() {
      document.getElementById('modal-body').classList.add('visibility-hidden');
      document.getElementById('success').classList.remove('visibility-hidden');
      clearInvalidInput();
      clearForm();
      setTimeout(() => {
        // closeModal();
        document.getElementById('modal-body').classList.remove('visibility-hidden');
        document.getElementById('success').classList.add('visibility-hidden');
      }, 6000);
    }
    // Show error message
    function showError() {
      document.getElementById('failure').classList.remove('visibility-hidden');
      setTimeout(() => {
        document.getElementById('failure').classList.add('visibility-hidden');
      }, 4000);
    }
    // Hide navbar and lock scroll when modal opens on mobile
    function hideNavbar() {
      const x = window.matchMedia('(max-width: 575px)');
      const y = window.matchMedia('(max-height: 575px)');
      if (x.matches || y.matches) {
        document.getElementById('navbar').classList.add('scrollUp');
      }
    }
    // Send email
    function submitEmail(event) {
      event.preventDefault();
      // Check if all inputs are valid
      validateName();
      validateEmail();
      validatePhone();
      validateMessage();
      // Get all data for email
      const data = {
        service_id: 'mail_ru',
        template_id: 'template_Eox7BLxl',
        // user_id: 'user_Wu8lnXf7DyJRu3jNjcBxa',
        template_params: {
          "reply_to": "1",
          "from_name": IDs.nameID.value,
          "to_name": IDs.emailID.value,
          "phone_number": IDs.phoneID.value,
          "message_html": IDs.messageID.value
        },
      };

      // Send email if everything is valid
      if (name && email && phone && message) {
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
        }).done(() => {
          // alert('Your mail is sent!');
          showSuccess();
        }).fail(() => {
          // alert('Oops... ' + JSON.stringify(error));
          showError();
          // showSuccess();
        });
      }
    }

    // Event Listeners

    // Validate inputs on focus out
    IDs.nameID.addEventListener('focusout', validateName);
    IDs.emailID.addEventListener('focusout', validateEmail);
    IDs.phoneID.addEventListener('focusout', validatePhone);
    IDs.messageID.addEventListener('focusout', validateMessage);
    // When modal button is pressed hide navbar on phones
    document.getElementById('btn-trigger-modal').addEventListener('click', hideNavbar);

    // When modal closes show navbar on mobile and clear fields
    document.getElementById('ModalCenter').addEventListener('click', closedModal);
    // Send email on submit
    document.getElementById('contact-form').addEventListener('submit', submitEmail);
    // Submit on enter press
    document.addEventListener('keyup', submitOnEnter(event));
  };


  const svgPaths = {
    btn_2_01: "M91.05,311.52c-37.3,8.2-51.7-22.42-41.83-54.11,9.37-30.06,38-66,72.89-64.28,83.74,4.54,167.52,8.55,251.25,13.19,28.69,2.2,60.32,23,72.87,48.71,15,30.9-18.38,40-41.85,40C299.36,288.53,194.77,293.65,91.05,311.52Z",
    btn_2_02: "M373.5,206.71c28.43,2.18,60.09,21.95,72.23,48.28,15.83,30.93-18.23,39.68-41.49,39.66-104.92-6.5-209.41-1.43-313,16.35-36.93,8.08-51.33-22.2-41.47-53.65C58.92,227.47,87.46,192,122,193.66c83.84,4.43,167.7,8.4,251.53,13.05m-.27-.79c-83.65-4.63-167.33-8.68-251-13.31-35.11-1.82-64.13,34.5-73.52,64.85-8.1,31.82,3.13,63.2,42.18,54.58,103.79-18,208.5-23.14,313.61-16.6,23.64,0,58.36-8.9,42.21-40.37-12.39-26.72-44.6-46.92-73.5-49.15Z",
    btn_2_03: "M130.77,254.87l.24-.45c5.06-9.5,14.51-20,25.66-20.09,6.29,0,10.16,4.09,7.3,11.37l-4,.16c1.78-5.22.35-8-5.08-8-6.58,0-14.33,6.24-19.56,16.09l-.23.44c-5.29,10-3.79,15.12,4.11,13.84a22.39,22.39,0,0,0,15.24-10.13l4-.42a31.62,31.62,0,0,1-21.21,14.19C126.47,273.8,124.15,267.22,130.77,254.87Z",
    btn_2_04: "M175.18,235.33l5.3.12a158.7,158.7,0,0,0,0,23.4q9.66-11.39,19-23l5.26.11q-4.8,13.77-9.59,27.54l-4.55.46,8.7-23.64c-6.92,8.44-14,16.73-21.09,25l-1.41.17a149.75,149.75,0,0,1-.48-25.1l-12.3,26.77-4.17.6Z",
    btn_2_05: "M206.92,249.63l.09-.3c2.37-7.58,10.45-13.42,19.63-13.21s14.73,5.64,14.06,12.31l0,.27c-.66,6.7-8.5,12.33-19.42,13C210.18,262.44,204.58,257.1,206.92,249.63Zm29.43-.91,0-.26c.7-5.38-2.91-9.81-10.26-9.9s-13,4.34-14.78,10.58l-.08.29c-1.84,6.34,2.84,10.22,10.53,9.78C230,258.74,235.59,254.53,236.35,248.72Z",
    btn_2_06: "M253.11,239.28l-9.29-.14.19-2.34,22,.46c.09.9.14,1.35.24,2.25l-9.29-.17c.21,8.25.31,12.38.53,20.63l-4.56.09C253,251.75,253.05,247.59,253.11,239.28Z",
    btn_2_07: "M271.26,237.38l8.9.19c6,.14,11.56,2.14,13.08,6.83l0,.13c1.54,4.79-3.43,6.47-10.08,6.34-2.27-.05-3.4-.07-5.67-.1.68,3.66,1,5.48,1.69,9.14l-4.56,0ZM283,248.71c4.9.1,7.08-1.39,6.24-4.29l0-.12c-.93-3.17-3.95-4.43-8.28-4.53l-5.45-.11,1.65,8.94Z",
    btn_2_08: "M296.71,238l18.27.44,1.19,2.33c-5.9-.18-8.84-.26-14.74-.42l3.1,7.74c5.06.18,7.59.28,12.64.51.45.92.68,1.38,1.13,2.31-5.15-.25-7.72-.36-12.87-.56l3.3,8.25c7.17.33,10.75.54,17.9,1l1.2,2.33c-9.09-.65-13.64-.91-22.75-1.3C301.74,251.54,300.06,247,296.71,238Z",
    btn_2_09: "M329.38,241.14l-9.29-.3-1.25-2.35c8.81.22,13.22.34,22,.58l1.67,2.53-9.28-.33,13.62,22.2-4.54-.41Z",
    btn_2_10: "M346.08,239.22l3.81.11,7.55,10.77,5.46.39c6.41.48,13.43,3.11,18,9.17l.12.16c4.48,5.93.55,7.63-6.57,6.72-4.22-.54-6.33-.8-10.55-1.28Zm26.78,24.71c5,.59,6.8-.65,3.86-4.6l-.11-.15a15.41,15.41,0,0,0-11.54-6.05l-5.84-.48,7.39,10.55C369.11,263.48,370.36,263.63,372.86,263.93Z",
    btn_3_01: "M91.06,312.53C53.6,320.8,39.3,290.71,49.22,258.64c9.29-30,38-62.75,72.65-56.54,83.4,14.25,167.3,17.85,251.72,12.84,28.38-1.37,60.17,15.51,72.64,41.32,15.07,31.2-18,40.3-41.84,40.22C299.39,290.12,194.78,294.6,91.06,312.53Z",
    btn_3_02: "M373.72,215.3c28.12-1.34,59.95,14.58,72,40.95,15.86,31.23-17.9,39.94-41.47,39.87C299.35,289.81,194.84,294.25,91.2,312c-37.08,8.13-51.44-21.58-41.48-53.42,9.13-29.88,37.71-62.11,72-56,83.51,14.11,167.49,17.67,252,12.71m-.27-.72c-84.34,5.06-168.14,1.42-251.45-13-34.9-6.32-64,26.7-73.27,57-8.18,32.23,3,63.08,42.19,54.37,103.79-18.09,208.52-22.6,313.61-16.18,24,.09,58.37-8.79,42.2-40.57-12.3-26.8-44.67-43.09-73.28-41.69Z",
    btn_3_03: "M130.77,255.14l.24-.45c4.81-9.24,14.49-19.37,25.57-17.65,6.34,1,10.13,5.37,7.3,11.79l-4-.18c1.76-4.73.33-7.55-5.07-8.32-6.55-.93-14.27,4.55-19.49,14.23l-.24.43c-5.28,9.79-3.77,14.88,4.12,13.68a22.93,22.93,0,0,0,15.21-9.09l4-.26c-5,6.85-12.84,11.24-21.17,12.75C126.47,274,124.15,267.49,130.77,255.14Z",
    btn_3_04: "M175,240.54c2.11.31,3.17.45,5.29.74a105.14,105.14,0,0,0,.14,19.25c8.13-7.53,11.91-10.88,18.92-17l5.26.52-9.42,19.7-4.55.45,8.55-17.28q-10.64,9.12-20.94,18.65l-1.41.17c-1-7.24-1.07-11.28-.63-20.54l-12.15,22.21-4.18.59Z",
    btn_3_05: "M206.85,254l.09-.21c2.33-5.24,10.39-8.79,19.59-8.22s14.8,4,14.15,8l0,.16c-.64,4.06-8.47,7.54-19.38,8.22C210.19,262.61,204.55,259.13,206.85,254Zm29.47-.27,0-.16c.69-3.29-3-6.09-10.33-6.44s-13,2.39-14.74,6.6l-.08.2c-1.81,4.3,2.9,6.81,10.59,6.41C230,259.89,235.58,257.26,236.32,253.7Z",
    btn_3_06: "M253.1,248.15c-3.73-.06-5.6-.09-9.32-.19l.18-1.41c8.85.3,13.28.37,22.12.38.1.53.14.79.24,1.32-3.73,0-5.59,0-9.32-.05.21,4.87.32,7.3.54,12.17-1.82,0-2.74,0-4.56.08C253,255.53,253.05,253.07,253.1,248.15Z",
    btn_3_07: "M271.31,246.91c3.57,0,5.36,0,8.93-.12,6-.11,11.58.9,13.08,3.89l0,.08c1.53,3-3.46,4.17-10.12,4.13l-5.67,0c.66,2.19,1,3.29,1.66,5.48l-4.56-.05C273.33,255,272.66,252.27,271.31,246.91ZM283,253.57c4.91,0,7.11-1,6.28-2.77l0-.08c-.91-2-3.94-2.66-8.28-2.59l-5.46.06,1.63,5.38Z",
    btn_3_08: "M296.84,246.27c7.32-.31,11-.51,18.29-1L316.3,247c-5.89.31-8.84.44-14.75.66l3.06,5.16,12.65,0,1.11,1.65-12.87-.12,3.26,5.5c7.16.29,10.74.47,17.9.89l1.18,1.7c-9.09-.64-13.64-.9-22.74-1.29C301.8,255.16,300.14,252.2,296.84,246.27Z",
    btn_3_09: "M329.51,246.17c-3.71.25-5.57.36-9.28.57L319,245c8.81-.65,13.21-1,22-1.94l1.66,2.18c-3.7.29-5.55.42-9.26.68l13.5,18-4.54-.41C337.21,256.58,334.65,253.11,329.51,246.17Z",
    btn_3_10: "M346.19,242.5l3.79-.43c3,3.92,4.51,5.89,7.51,9.81l5.45-.06c6.39-.07,13.39,2.05,18,8.11l.12.16c4.48,5.93.55,7.67-6.57,6.8-4.21-.52-6.32-.77-10.55-1.24Q355,254.07,346.19,242.5Zm26.68,21.93c5,.51,6.8-.75,3.86-4.62l-.12-.16c-2.67-3.52-6.63-5.32-11.5-5.38l-5.84-.07c3,3.84,4.42,5.76,7.36,9.61C369.13,264.05,370.37,264.17,372.87,264.43Z",
    btn_4_01: "M91.37,323.38c-36.56,2.34-54-32.56-45-64.58,8.81-31,40.73-61.8,75.38-55.72a1106.09,1106.09,0,0,0,251.83,13.21c28.39-1.41,62.53,15.52,74.49,41.8,13.56,29.8-20.4,45.88-44,48.83C299.88,312.66,195.6,317.64,91.37,323.38Z",
    btn_4_02: "M373.79,216.64c28.14-1.36,62.48,14.11,73.82,41.47C462,287.28,427.89,305,404,306.5c-104.15,5.68-208.33,10.62-312.48,16.3-37.32,3.53-52.86-32.62-44.58-64,8.2-31.66,40.34-61.22,74.68-55.27a1123.78,1123.78,0,0,0,252.19,13.1m-.35-.69A1089.28,1089.28,0,0,1,122,202.63c-34.92-6.21-67.73,24-76.09,56.16C35.76,291.57,54.38,326.33,91.23,324c104.33-5.78,208.69-10.82,313-16.61,23.75-3,59.56-18.71,44.37-49.26C437,230.3,402.06,214.49,373.44,216Z",
    btn_4_03: "M129.92,255.15l.22-.45c4.78-9.79,15.16-19.16,26.44-17.45,6.33,1,9.46,4.72,6.7,11.66l-4-.19c1.71-5.05.58-7.63-4.85-8.35-6.6-.88-15.05,4.4-19.88,14.36l-.21.44c-4.86,10.08-3,16.29,5,16.11,6-.14,11.58-3.65,14.93-9.74l4,0c-4.6,8.57-12.49,13.49-20.86,13.72C126.53,275.54,123.83,267.56,129.92,255.15Z",
    btn_4_04: "M175,240.66c2.12.3,3.18.44,5.3.72-1.56,7.36-.7,12.59.27,24,5.32-7.62,10.72-16.64,18.81-21.8l5.26.52c-5.22,8.4-6.92,19.84-9.2,29.17l-4.54.11c2.18-8.82,4.29-18.45,8.1-26.77-8.16,7.66-14.24,17.91-20.48,27.06l-1.41,0c-.85-9.39-1.84-19.25-1.25-28.7-5,9.05-8.1,19.32-11.54,29l-4.18.11C164.25,262.81,167.77,250.56,175,240.66Z",
    btn_4_05: "M206.73,256c0-.14.05-.2.08-.34,2.14-8.61,10.5-10.56,19.71-10s14.69,2.33,14.11,10.14l0,.31c-.58,7.92-8.33,16.77-19.22,17S204.62,264.59,206.73,256Zm29.54.07c0-.13,0-.19,0-.32.62-6.26-3-8.57-10.37-8.95s-13.14,1.74-14.76,8.84c0,.14,0,.21-.08.34-1.65,7.3,3.14,13.7,10.82,13.57A14.77,14.77,0,0,0,236.27,256.11Z",
    btn_4_06: "M253.06,248c-3.73-.06-5.6-.11-9.34-.22a9.69,9.69,0,0,1,.22-1c8.85.32,13.28.4,22.13.43a6.19,6.19,0,0,1,.24,1c-3.73,0-5.6,0-9.34-.08.19,4.36.36,11.68.57,23.94l-4.54.1C253.05,259.72,253,252.36,253.06,248Z",
    btn_4_07: "M271.3,247.13c3.58,0,5.36,0,8.93-.1,6-.11,11.7-.2,13.17,4.05l0,.11c1.51,4.37-3.55,7.36-10.21,7.41l-5.68,0c.63,4.66.94,7.49,1.6,12.86l-4.54.1C273.28,258.3,272.73,250.13,271.3,247.13ZM283.06,256c4.91,0,7.15-2.11,6.33-4.72l0-.12c-.9-2.84-4-3.15-8.32-3.1l-5.47.06a40.42,40.42,0,0,1,1.61,7.91Z",
    btn_4_08: "M296.84,246.55c7.33-.3,11-.49,18.31-1a12.72,12.72,0,0,1,1.3,1.48c-5.92.26-8.88.37-14.81.55a24.57,24.57,0,0,1,3.06,6.74c5.08,0,7.62-.06,12.7-.12.43,1,.64,1.53,1.06,2.6l-12.92.11c1.23,3.91,1.82,6.21,3.08,10.76l17.88-.33c.46,1.22.69,1.83,1.16,3l-22.71.53C301.66,258.2,300.53,250.35,296.84,246.55Z",
    btn_4_09: "M329.71,246.35c-3.72.22-5.59.32-9.32.51A15.17,15.17,0,0,0,319,245.3c8.82-.63,13.23-1,22-1.92.78.8,1.16,1.22,1.89,2.09-3.72.27-5.58.4-9.31.64,5.9,7.08,7.73,13.13,13.1,23.83l-4.54.11C337.06,259.27,335.31,253.14,329.71,246.35Z",
    btn_4_10: "M346.23,242.82l3.8-.43A60.89,60.89,0,0,1,358,252.6l5.51-.16c6.47-.19,13.5,1.85,17.74,7.88l.11.16c4.16,5.91.2,8.54-6.95,8.74l-10.6.28C358.49,260.44,353.45,250.57,346.23,242.82Zm26.6,23.6c5-.12,6.89-1.84,4.17-5.86l-.11-.16c-2.48-3.65-6.4-5.4-11.33-5.29l-5.89.13c2.77,4.41,4.06,6.74,6.89,11.33Z",
    btn_5_01: "M91.35,295.35c-32.28,6.63-52.36.21-42.12-34.7,9-30.55,36-82.13,72.87-87.72,90-7.33,161.23,68.15,251.25,60.82,23.53-2.95,61.63.1,72.88,25.28,13.4,30-11,71.47-42.13,78.3C295.4,358.94,200.05,273.74,91.35,295.35Z",
    btn_5_02: "M373.49,234.21c23.37-2.94,61.28-.26,72.24,25.2,13.76,29.94-10.88,70.71-41.77,77.46C295.35,358.42,200.1,273.26,91.49,294.81c-32,6.55-51.07,1.47-41.76-34.54,10.15-31,35.68-81.24,72.23-86.8,90.1-7.39,161.42,68.13,251.53,60.74m-.27-.91c-89.94,7.26-161.05-68.18-251-60.92C85,178,59.07,229.56,48.73,261c-9.52,36.65,10,41.54,42.49,34.86,108.77-21.66,204.23,63.56,313,41.9,31.41-6.9,56.57-48.7,42.49-79.14-11.18-25.73-49.88-28.3-73.51-25.35Z",
    btn_5_03: "M130.77,255.68l.24-.45c5.78-10.29,14.48-22,25.66-25.38,6.13-1.86,10.18,1.79,7.35,9.75-1.6.24-2.4.37-4,.67,1.75-5.57.06-8.27-5.12-6.73-8.73,2.6-15.36,11.79-19.55,19.82l-.23.45c-5.29,10.09-3.74,14.05,4.19,11.69a26.08,26.08,0,0,0,15.25-12c1.6-.31,2.4-.46,4-.72a35.66,35.66,0,0,1-21.21,16.53C126.52,272.62,124.15,268,130.77,255.68Z",
    btn_5_04: "M175.18,227.35c2.12-.17,3.18-.23,5.3-.31a223.37,223.37,0,0,0,.17,27.87c6.45-9,12.73-18.1,18.89-27.33,2.1.19,3.15.3,5.25.54q-4.69,17.61-9.4,35.2c-1.81-.12-2.72-.18-4.54-.27q4.26-14.88,8.53-29.75c-6.7,10-13.7,19.85-20.91,29.52l-1.41,0a237.59,237.59,0,0,1-.66-29.95l-12.13,30.72c-1.67.16-2.51.26-4.18.47Z",
    btn_5_05: "M207,246.69l.09-.39c2.32-9.94,10.36-16.9,19.54-15s14.74,11.11,14.1,20.79l0,.38c-.64,9.74-8.55,15.92-19.32,14.38C211.5,265.41,204.43,256.75,207,246.69Zm29.38,4.82,0-.39c.68-7.71-2.95-15-10.3-16.45s-12.93,3.85-14.7,12.14l-.08.39c-1.8,8.45,2.89,14.9,10.57,16.14C230.09,264.65,235.65,259.86,236.38,251.51Z",
    btn_5_06: "M253.1,241.23c-3.71-.88-5.57-1.33-9.29-2.19l.19-3.42c8.82,2.1,13.22,3.24,22,5.31l.23,3.4c-3.71-.86-5.57-1.3-9.29-2.18q.28,15.45.55,30.89l-4.55-.89Z",
    btn_5_07: "M271.25,242.14c3.56.81,5.33,1.2,8.89,1.93,6,1.25,11.56,4.92,13.05,12l0,.18c1.52,7.19-3.45,9.2-10.09,8-2.26-.4-3.4-.61-5.66-1,.66,5.55,1,8.32,1.66,13.87-1.82-.31-2.73-.47-4.54-.8Q272.92,259.2,271.25,242.14ZM282.94,261c4.9.88,7.08-1.09,6.26-5.45l0-.19c-.91-4.78-3.92-7-8.25-7.91-2.18-.44-3.27-.67-5.45-1.13.65,5.43,1,8.15,1.63,13.58C279.43,260.36,280.6,260.59,282.94,261Z",
    btn_5_08: "M296.7,247A154.83,154.83,0,0,0,315,248.86l1.17,3.28c-5.9-.25-8.84-.52-14.74-1.24l3.05,11.39c5.06.53,7.58.73,12.64.94.44,1.32.66,2,1.11,3.29-5.14-.19-7.72-.38-12.86-.9l3.25,12.14a172.49,172.49,0,0,0,17.88.78l1.18,3.27a180.09,180.09,0,0,1-22.72-1.14Q300.82,263.85,296.7,247Z",
    btn_5_09: "M329.35,252.1c-3.71.18-5.57.21-9.29.15L318.83,249a105.27,105.27,0,0,0,22-1.37l1.66,3.1c-3.71.59-5.57.81-9.28,1.11l13.47,28.79c-1.82.22-2.73.32-4.55.49Z",
    btn_5_10: "M346.07,246.7c1.53-.31,2.29-.48,3.82-.85l7.5,12.37c2.19-.57,3.29-.88,5.48-1.57,6.42-2,13.46-2.24,18,3.82l.12.16c4.48,5.93.5,11.28-6.65,13.72-4.24,1.44-6.36,2.06-10.6,3.12Zm26.72,24.62c5-1.69,6.85-4.75,3.91-8.84l-.12-.16c-2.67-3.73-6.65-4.47-11.55-2.89-2.34.76-3.52,1.1-5.86,1.73l7.35,12.11C369,272.56,370.28,272.17,372.79,271.32Z",
    btn_6_01: "M91.35,289.91c-9.53,2.6-29.27,11-39,4.6C40.67,286.87,46,268,49.23,258,59.7,225.23,85.68,208.07,122.1,219c87.34,19.15,164-46.86,251.25-33.27,27.79,5.73,61,45.54,72.88,69.89,13.71,28.25-12.63,70.29-42.13,75.82C295.53,349.44,200,264.92,91.35,289.91Z",
    btn_6_02: "M373.49,186.41c27.58,5.7,60.39,45,72.24,69.28,13.42,28.21-12.38,69.68-41.77,75.14-108.42,17.81-204-66-312.47-41.24-9.34,2.51-29.32,11.19-38.9,4.7-11.65-7.9-5.41-25.85-2.86-36.39C63.07,224.15,86,208.62,122,219.34c87.36,18.95,164.21-46.38,251.53-32.93m-.27-1.29c-87.28-13.74-163.67,53-251,33.59-36.8-11.18-60,4.72-73.51,39.28-2.75,11.06-8.65,29.31,3.13,37,9.85,6.43,29.77-2.13,39.36-4.77,108.75-25.2,204.29,60,313,41.9,29.55-5.6,56.35-48,42.49-76.51-12.13-24.47-45.62-64.67-73.51-70.49Z",
    btn_6_03: "M130.77,254.89l.24-.45c4.67-9.41,14.48-18.22,25.66-14.57,6.49,2.12,10.18,5.51,7.35,10l-4-.24c1.75-3.44.31-5.71-5.12-7.08-6.58-1.66-14.33,2.56-19.55,11.69l-.23.4c-5.29,9.23-3.74,12.91,4.19,10.76,6-1.63,11.62-4.29,15.25-7.93,1.6-.15,2.4-.22,4-.34-5,4.78-12.84,8.31-21.21,11C126.52,271.66,124.15,267.24,130.77,254.89Z",
    btn_6_04: "M175.18,244.49c2.12.3,3.18.43,5.3.64a45.4,45.4,0,0,0,.17,12.62c8.11-4.88,11.89-7.09,18.89-12,2.1-.06,3.15-.1,5.25-.22l-9.4,15.9c-1.81-.11-2.72-.15-4.54-.22l8.53-13.06c-7.69,5.32-11.87,7.68-20.91,13l-1.41.05a42.9,42.9,0,0,1-.66-13.53l-12.13,14.48c-1.67.19-2.51.3-4.18.54Z",
    btn_6_05: "M207,253.63l.09-.19c2.32-4.8,10.36-9.09,19.54-10.46s14.74,3.35,14.1,10.8l0,.29c-.64,7.48-8.44,12-19.32,10.4C210.34,262.8,204.71,258.36,207,253.63Zm29.38.33,0-.28c.68-5.58-2.95-9.5-10.3-8.65s-12.93,4.2-14.7,8.42l-.08.2c-1.8,4.3,2.89,7.74,10.56,8.7C230.09,263.38,235.65,260,236.38,254Z",
    btn_6_06: "M253.1,241.75c-3.71.54-5.57.8-9.29,1.32l.19-2.71c8.82-1.6,13.22-2.5,22-4.11l.23,3.61L257,241.19q.28,14.7.55,29.41l-4.55-.87C253,258.54,253.05,252.94,253.1,241.75Z",
    btn_6_07: "M271.25,235.31c3.56-.63,5.33-.93,8.89-1.5,6-.95,11.56,2.23,13.05,11.66l0,.26c1.52,9.62-3.45,13.16-10.09,12.87l-5.66-.26c.66,6.5,1,9.75,1.66,16.26l-4.54-.8Q272.92,254.56,271.25,235.31Zm11.69,19.26c4.9.07,7.08-3,6.26-8.67l0-.25c-.91-6.24-3.92-8.31-8.25-7.78-2.18.27-3.27.4-5.45.69.65,6.37,1,9.55,1.63,15.92Z",
    btn_6_08: "M296.7,231.59A167.11,167.11,0,0,1,315,230.48c.47,2,.7,2.93,1.17,4.88-5.9,0-8.84.19-14.74.58l3.05,16.15,12.64,0c.44,2,.66,2.92,1.11,4.87-5.14,0-7.72-.05-12.86-.13L308.59,274c7.15.53,10.73.71,17.88.75.47,2,.71,2.93,1.18,4.89a194.54,194.54,0,0,1-22.72-1.36Q300.82,254.95,296.7,231.59Z",
    btn_6_09: "M329.35,235.66c-3.71-.21-5.57-.27-9.29-.3-.49-2-.74-2.93-1.23-4.89a114,114,0,0,1,22,2l1.66,4.45c-3.71-.5-5.57-.69-9.28-1l13.47,42.86c-1.82.19-2.73.27-4.55.41Z",
    btn_6_10: "M346.07,233.49c1.53.34,2.29.52,3.82.92l7.5,16.47c2.19.06,3.29.08,5.48.15,6.42.18,13.46,2.59,18,8.64l.12.16c4.48,5.94.5,11.09-6.65,13.32-4.24,1.33-6.36,1.89-10.6,2.85Q354.93,254.74,346.07,233.49Zm26.72,35.93c5-1.31,6.85-4.24,3.91-8.74l-.12-.18A12.55,12.55,0,0,0,365,254.62l-5.86.17,7.35,16.14C369,270.38,370.28,270.08,372.79,269.42Z",
  };


  // Btn path 1
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-01-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_01,
    }, "-=0")
      .to("#svg-btn-01-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_01,
      }, "-=0")
      .to("#svg-btn-01-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_01,
      }, "+=0")
      .to("#svg-btn-01-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_01,
      }, "  +=0")
      .to("#svg-btn-01-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_01,
      }, "+=0")
      .to("#svg-btn-01-" + i, 3.5, {
        morphSVG: "#svg-btn-01-" + i,
      }, "+=0");
  };
  // Btn path 3
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-03-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_03,
    }, "-=0")
      .to("#svg-btn-03-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_03,
      }, "-=0")
      .to("#svg-btn-03-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_03,
      }, "+=0")
      .to("#svg-btn-03-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_03,
      }, "+=0")
      .to("#svg-btn-03-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_03,
      }, "+=0")
      .to("#svg-btn-03-" + i, 3.5, {
        morphSVG: "#svg-btn-03-" + i,
      }, "+=0");
  };
  // Btn path 4
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-04-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_04,
    }, "-=0")
      .to("#svg-btn-04-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_04,
      }, "-=0")
      .to("#svg-btn-04-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_04,
      }, "+=0")
      .to("#svg-btn-04-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_04,
      }, "+=0")
      .to("#svg-btn-04-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_04,
      }, "+=0")
      .to("#svg-btn-04-" + i, 3.5, {
        morphSVG: "#svg-btn-04-" + i,
      }, "+=0");
  };

  // Btn path 5
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-05-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_05,
    }, "-=0")
      .to("#svg-btn-05-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_05,
      }, "-=0")
      .to("#svg-btn-05-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_05,
      }, "+=0")
      .to("#svg-btn-05-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_05,
      }, "+=0")
      .to("#svg-btn-05-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_05,
      }, "+=0")
      .to("#svg-btn-05-" + i, 3.5, {
        morphSVG: "#svg-btn-05-" + i,
      }, "+=0");
  };
  // Btn path 6
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-06-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_06,
    }, "-=0")
      .to("#svg-btn-06-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_06,
      }, "-=0")
      .to("#svg-btn-06-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_06,
      }, "+=0")
      .to("#svg-btn-06-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_06,
      }, "+=0")
      .to("#svg-btn-06-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_06,
      }, "+=0")
      .to("#svg-btn-06-" + i, 3.5, {
        morphSVG: "#svg-btn-06-" + i,
      }, "+=0");
  };
  // Btn path 7
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-07-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_07,
    }, "-=0")
      .to("#svg-btn-07-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_07,
      }, "-=0")
      .to("#svg-btn-07-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_07,
      }, "+=0")
      .to("#svg-btn-07-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_07,
      }, "+=0")
      .to("#svg-btn-07-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_07,
      }, "+=0")
      .to("#svg-btn-07-" + i, 3.5, {
        morphSVG: "#svg-btn-07-" + i,
      }, "+=0");
  };
  // Btn path 8
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-08-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_08,
    }, "-=0")
      .to("#svg-btn-08-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_08,
      }, "-=0")
      .to("#svg-btn-08-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_08,
      }, "+=0")
      .to("#svg-btn-08-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_08,
      }, "+=0")
      .to("#svg-btn-08-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_08,
      }, "+=0")
      .to("#svg-btn-08-" + i, 3.5, {
        morphSVG: "#svg-btn-08-" + i,
      }, "+=0");
  };
  // Btn path 9
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    });

    tl.to("#svg-btn-09-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_09,
    }, "-=0")
      .to("#svg-btn-09-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_09,
      }, "-=0")
      .to("#svg-btn-09-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_09,
      }, "+=0")
      .to("#svg-btn-09-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_09,
      }, "+=0")
      .to("#svg-btn-09-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_09,
      }, "+=0")
      .to("#svg-btn-09-" + i, 3.5, {
        morphSVG: "#svg-btn-09-" + i,
      }, "+=0");
  };
  // Btn path 10
  for (let i = 1; i < 10; i++) {
    let tl = new TimelineMax({
      paused: false,
      repeat: -1,
      yoyo: false,
      ease: "none",
    })

    tl.to("#svg-btn-10-" + i, 3.5, {
      morphSVG: svgPaths.btn_2_10,
    }, "-=0")
      .to("#svg-btn-10-" + i, 3.5, {
        morphSVG: svgPaths.btn_3_10,
      }, "-=0")
      .to("#svg-btn-10-" + i, 3.5, {
        morphSVG: svgPaths.btn_4_10,
      }, "+=0")
      .to("#svg-btn-10-" + i, 3.5, {
        morphSVG: svgPaths.btn_5_10,
      }, "+=0")
      .to("#svg-btn-10-" + i, 3.5, {
        morphSVG: svgPaths.btn_6_10,
      }, "+=0")
      .to("#svg-btn-10-" + i, 3.5, {
        morphSVG: "#svg-btn-10-" + i,
      }, "+=0");
  };




  // var initPhotoSwipeFromDOM = function (gallerySelector) {
  //   var parseThumbnailElements = function (el) {
  //     var thumbElements = el.childNodes,
  //       numNodes = thumbElements.length,
  //       items = [],
  //       figureEl,
  //       linkEl,
  //       size,
  //       item;
  //     for (var i = 0; i < numNodes; i++) {
  //       figureEl = thumbElements[i]; // <figure> element
  //       if (figureEl.nodeType !== 1) {
  //         continue;
  //       }
  //       linkEl = figureEl.children[0]; // <a> element
  //       size = linkEl.getAttribute('data-size').split('x');
  //       // create slide object
  //       item = {
  //         src: linkEl.getAttribute('href'),
  //         w: parseInt(size[0], 10),
  //         h: parseInt(size[1], 10)
  //       };
  //       if (figureEl.children.length > 1) {
  //         // <figcaption> content
  //         item.title = figureEl.children[1].innerHTML;
  //       }
  //       if (linkEl.children.length > 0) {
  //         // <img> thumbnail element, retrieving thumbnail url
  //         item.msrc = linkEl.children[0].getAttribute('src');
  //       }
  //       item.el = figureEl; // save link to element for getThumbBoundsFn
  //       items.push(item);
  //     }
  //     return items;
  //   };
  //   var closest = function closest(el, fn) {
  //     return el && (fn(el) ? el : closest(el.parentNode, fn));
  //   };
  //   var onThumbnailsClick = function (e) {
  //     e = e || window.event;
  //     e.preventDefault ? e.preventDefault() : e.returnValue = false;
  //     var eTarget = e.target || e.srcElement;
  //     var clickedListItem = closest(eTarget, function (el) {
  //       return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
  //     });
  //     if (!clickedListItem) {
  //       return;
  //     }
  //     var clickedGallery = clickedListItem.parentNode,
  //       childNodes = clickedListItem.parentNode.childNodes,
  //       numChildNodes = childNodes.length,
  //       nodeIndex = 0,
  //       index;
  //     for (var i = 0; i < numChildNodes; i++) {
  //       if (childNodes[i].nodeType !== 1) {
  //         continue;
  //       }
  //       if (childNodes[i] === clickedListItem) {
  //         index = nodeIndex;
  //         break;
  //       }
  //       nodeIndex++;
  //     }
  //     if (index >= 0) {
  //       // open PhotoSwipe if valid index found
  //       openPhotoSwipe(index, clickedGallery);
  //     }
  //     document.getElementById('navbar').classList.add('scrollUp');
  //     return false;
  //   };
  //   var photoswipeParseHash = function () {
  //     var hash = window.location.hash.substring(1),
  //       params = {};
  //     if (hash.length < 5) {
  //       return params;
  //     }
  //     var vars = hash.split('&');
  //     for (var i = 0; i < vars.length; i++) {
  //       if (!vars[i]) {
  //         continue;
  //       }
  //       var pair = vars[i].split('=');
  //       if (pair.length < 2) {
  //         continue;
  //       }
  //       params[pair[0]] = pair[1];
  //     }
  //     if (params.gid) {
  //       params.gid = parseInt(params.gid, 10);
  //     }
  //     return params;
  //   };

  //   var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
  //     var pswpElement = document.querySelectorAll('.pswp')[0],
  //       gallery,
  //       options,
  //       items;
  //     items = parseThumbnailElements(galleryElement);
  //     options = {
  //       galleryUID: galleryElement.getAttribute('data-pswp-uid'),
  //       getThumbBoundsFn: function (index) {
  //         // See Options -> getThumbBoundsFn section of documentation for more info
  //         var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
  //           pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
  //           rect = thumbnail.getBoundingClientRect();

  //         return {
  //           x: rect.left,
  //           y: rect.top + pageYScroll,
  //           w: rect.width
  //         };
  //       }

  //     };

  //     // PhotoSwipe opened from URL
  //     if (fromURL) {
  //       if (options.galleryPIDs) {
  //         // parse real index when custom PIDs are used 
  //         // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
  //         for (var j = 0; j < items.length; j++) {
  //           if (items[j].pid == index) {
  //             options.index = j;
  //             break;
  //           }
  //         }
  //       } else {
  //         // in URL indexes start from 1
  //         options.index = parseInt(index, 10) - 1;
  //       }
  //     } else {
  //       options.index = parseInt(index, 10);
  //     }

  //     // exit if index not found
  //     if (isNaN(options.index)) {
  //       return;
  //     }

  //     if (disableAnimation) {
  //       options.showAnimationDuration = 0;
  //     }

  //     // Pass data to PhotoSwipe and initialize it
  //     gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  //     gallery.init();
  //     gallery.listen('close', function () {
  //       document.getElementById('navbar').classList.remove('scrollUp');
  //     })
  //   };

  //   // loop through all gallery elements and bind events
  //   var galleryElements = document.querySelectorAll(gallerySelector);

  //   for (var i = 0, l = galleryElements.length; i < l; i++) {
  //     galleryElements[i].setAttribute('data-pswp-uid', i + 1);
  //     galleryElements[i].onclick = onThumbnailsClick;
  //   }

  //   // Parse URL and open gallery if it contains #&pid=3&gid=1
  //   var hashData = photoswipeParseHash();
  //   if (hashData.pid && hashData.gid) {
  //     openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  //   }

  // };

  // // execute above function
  // initPhotoSwipeFromDOM('.my-gallery');
  // let pageHeight = $("#lines").height();
  // $('#svg-lines').css({
  //   height: pageHeight
  // });


  var openPhotoSwipe = function () {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
      {
        html: '<div class="video-slide"><video autoplay loop muted playsinline id="myVideo2"><source src="video/mask1.mp4" type="video/mp4"></video></div>'
      },
      {
        html: '<div class="video-slide"><video autoplay loop muted playsinline id="myVideo2"><source src="video/mask2.mp4" type="video/mp4"></video></div>'
      },
      {
        html: '<div class="video-slide"><video autoplay loop muted playsinline id="myVideo2"><source src="video/mask1.mp4" type="video/mp4"></video></div>'
      }
    ];

    // define options (if needed)
    var options = {
      // history & focus options are disabled on CodePen        
      history: false,
      focus: false,

      showAnimationDuration: 0,
      hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // openPhotoSwipe();

  document.getElementById('AR-btn').onclick = openPhotoSwipe;



  $(window).resize(function () {
    $('#svg-lines').css({
      height: $("#lines").height()
    });
  });

  window.addEventListener('load', (event) => {
    var lazyVideos = [].slice.call(document.querySelectorAll("video#myVideo"));
    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (video) {
          if (video.isIntersecting) {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });

      lazyVideos.forEach(function (lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  });

  $(document).ready(function () {
    autoPlayYouTubeModal();
  });

  function autoPlayYouTubeModal() {
    var trigger = $('.trigger');
    trigger.click(function (e) {
      e.preventDefault();
      var theModal = $(this).data("target");
      var videoSRC = $(this).attr("src");
      var videoSRCauto = videoSRC + "?autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal).on('hidden.bs.modal', function (e) {
        $(theModal + ' iframe').attr('src', '');
      });
    });
  };
});