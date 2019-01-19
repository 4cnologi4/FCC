/*var pikaSound = new Audio('http://www.chiptape.com/chiptape/sounds/short/wipeHi.wav');
var charSound = new Audio('http://www.chiptape.com/chiptape/sounds/short/boingShort.wav');
var bubaSound = new Audio('http://www.chiptape.com/chiptape/sounds/short/dinkMenu.wav');
var squSound = new Audio('http://www.chiptape.com/chiptape/sounds/short/horn.wav'); */
var t = 500,
  t2 = 500,
  clase;
var pikaSound = new Audio('sounds/pika.mp3');
var charSound = new Audio('sounds/char.mp3');
var bubaSound = new Audio('sounds/buba.mp3');
var squSound = new Audio('sounds/squi.mp3');
var sounds = [pikaSound, charSound, bubaSound, squSound],
  divs = ['pikachu', 'charmander', 'bulbasaur', 'squirtle'],
  secuencia = [],
  brilla = ['brillaPi', 'brillaChar', 'brillaBul', 'brillaSqu'],
  secuenciaClick = [];
var on = false;

$(document).ready(function () {
  var str = $('.start'),
    click = $('.click');

  str.on('click', function () {
    on = true;
    str.css('display', 'none');
    if (on) {
      newMov();
    }
  });

  function newMov() {
    secuenciaClick = Array();
    var rdm = Math.floor(Math.random() * 4);
    sounds[rdm].play();
    $('.' + divs[rdm]).addClass(brilla[rdm]);
    setTimeout(function () {
      $('.' + divs[rdm]).removeClass(brilla[rdm]);
    }, t2);
    secuencia.push($(this).index());
  }

  click.on('click', function () {
    if (on) {
      clase = $(this).data('class');
      switch (clase) {
        case divs[0]:
          $('.' + divs[0]).addClass(brilla[0]);
          sounds[0].play();
          time();
          break;
        case divs[1]:
          $('.' + divs[1]).addClass(brilla[1]);
          sounds[1].play();
          time();
          break;
        case divs[2]:
          $('.' + divs[2]).addClass(brilla[2]);
          sounds[2].play();
          time();
          break;
        case divs[3]:
          $('.' + divs[3]).addClass(brilla[3]);
          sounds[3].play();
          time();
          break;
      }
      secuenciaClick.push($(this).index());
    }
  });

  function time() {
    switch (clase) {
      case divs[0]:
        setTimeout(function () {
          $('.' + divs[0]).removeClass(brilla[0]);
        }, t);
        break;
      case divs[1]:
        setTimeout(function () {
          $('.' + divs[1]).removeClass(brilla[1]);
        }, t);
        break;
      case divs[2]:
        setTimeout(function () {
          $('.' + divs[2]).removeClass(brilla[2]);
        }, t);
        break;
      case divs[3]:
        setTimeout(function () {
          $('.' + divs[3]).removeClass(brilla[3]);
        }, t);
    }
    veri = validaClick();
    if (veri == 1) {
      newMov();
    } else if (veri == 0) {
      mostrarError();
    }
  }

});

function validaClick() {
  for (var i = 0; i < secuencia.length; i++) {
    if (secuenciaClick.length > i) {
      if (secuencia[i] != secuenciaClick[i]) {
        return 0;
      }
    } else {
      return 2;
    }
  }

  if (secuenciaClick.length == secuencia.length)
    return 1;
  return 2;
}

function mostrarError() {
  var divsSecuencia = ' | ';
  var divsSecuClick = ' | ';

  for (var i = 0; i < secuencia.length; i++) {
    divsSecuencia += divs[secuencia[i]] + ' | ';
  }
  for (var j = 0; j < secuenciaClick.length; j++) {
    divsSecuClick += divs[secuenciaClick[j]] + ' | ';
  }
  $('#mensaje').html('Te has equivocado, los colores eran:<br>' + divsSecuencia +
    '<br>y tu has Clickeado:<br>' + divsSecuClick);
  //$('#mensaje').html('Te has equivocado, los colores eran:<br>' + divsSecuencia +
  //'<br>y tu has secuenciaClick:<br>' + divsSecuClick);
}

for (var i = 0; i < secuencia.length; i++) {}
for (var j = 0; j < secuenciaClick.length; j++) {}

/* $arr = $('body > div').each(function (){
    alert($(this).attr('class'));
    console.log($(this).attr('class'));
  }); */

/**
 * https://www.w3schools.com/tags/av_met_load.asp
 * https://www.w3schools.com/js/js_htmldom_elements.asp
 * https://www.w3schools.com/js/js_arrays.asp
 * https://www.w3schools.com/js/js_htmldom_elements.asp
 * https://www.w3schools.com/jquery/jquery_selectors.asp
 */
