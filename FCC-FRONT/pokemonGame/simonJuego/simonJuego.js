var secuencia = Array();

var secuenciaClick = Array();

var on = false;

$(document).ready(function () {

  $('input[type=button]').click(function () {
    secuencia = Array();
    nuevoMovimiento();
  });

  $('#simon div').click(function () {
    if (on) {
      secuenciaClick.push($(this).index());
      verificacion = verificarPulsacion();

      if (verificacion == 1) {
        nuevoMovimiento();
      } else if (verificacion == 0) {
        mostrarError();
      }
    }
  });
});

function nuevoMovimiento() {
  on = false;
  $('#mensaje').html('Mostrando los colores...');
  secuenciaClick = Array();
  var nuevoMovimiento = Math.floor(Math.random() * 4);
  secuencia.push(nuevoMovimiento);
  $('#movimientos').html(secuencia.length);
  mostrarColores(0);
}

function mostrarColores(indice) {
  $('#simon div').removeClass('showColor');
  if (secuencia[indice] >= 0) {
    $('#simon div:nth-child(' + (secuencia[indice] + 1) +
      ')').addClass('showColor');
    setTimeout(function () {
      ocultarColores(indice + 1);
    }, 800);
  } else {
    on = true;
    $('#mensaje').html('Ya puedes empezar...');
  }
}

function ocultarColores(indice) {
  $('#simon div').removeClass('showColor');
  setTimeout(function () {
    mostrarColores(indice);
  }, 500);
}

function verificarPulsacion() {
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
  var colores = ['verde', 'rojo', 'amarillo', 'azul'];
  var cadenaColores = ' | ';
  var cadenaColoressecuenciaClicks = ' | ';

  for (var i = 0; i < secuencia.length; i++) {
    cadenaColores += colores[secuencia[i]] + ' | ';
  }
  for (var j = 0; j < secuenciaClick.length; j++) {
    cadenaColoressecuenciaClicks += colores[secuenciaClick[j]] + ' | ';
  }
  $('#mensaje').html('Te has equivocado, los colores eran:<br>' + cadenaColores +
    '<br>y tu has secuenciaClick:<br>' + cadenaColoressecuenciaClicks);
}
