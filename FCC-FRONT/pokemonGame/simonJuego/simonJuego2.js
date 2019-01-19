// secuencia contendra un array con los colores a pulsar
var secuencia = Array();

// secuenciaClick contendra un array con los valores secuenciaClicks por el usuario
var secuenciaClick = Array();

// esta variable define cuando el usuario puede empezar a jugar
var jugando = false;

$(document).ready(function () {

  // Evento que se ejecuta cuando se pulsa el botón para empezar a jugar
  $('input[type=button]').click(function () {

    // inicializamos el array del secuencia
    secuencia = Array();

    // Indicamos que inicie un nuevo movimiento
    nuevoMovimiento();
  });

  // Evento que se ejecuta cuando se pulsa sobre uno de los cuadros
  $('#simon div').click(function () {
    if (jugando) {

      // Añadimos la pulsacion al array secuenciaClick
      secuenciaClick.push($(this).index());

      // Verificamos que nuestra pulsacion sea correcta
      // Esta funcion nos devuelve:
      //  1 Todos los colores secuenciaClicks son correctos y hay que mostrar un nuevo color
      //  2 Todos los colores secuenciaClicks son correctos pero todavia falta pulsar mas colores
      //  0 Ha habido un error
      verificacion = verificarPulsacion();

      if (verificacion == 1) {

        // Todo va bien, añadimos un nuevo movimiento
        nuevoMovimiento();
      } else if (verificacion == 0) {

        // El usuario se ha equivocado, mostraremos el error
        mostrarError();
      }
    }
  });
});

/**
 * Esta funcion genera un nuevo color
 */
function nuevoMovimiento() {
  jugando = false;
  $('#mensaje').html('Mostrando los colores...');
  secuenciaClick = Array();
  var nuevoMovimiento = Math.floor(Math.random() * 4);
  secuencia.push(nuevoMovimiento);
  $('#movimientos').html(secuencia.length);
  mostrarColores(0);
}

/**
 * Esta funcion muestra todos los colores que el usuario tendra que pulsar
 * Recibe el indice del array de colores a mostrar
 */
function mostrarColores(indice) {
  $('#simon div').removeClass('showColor');
  if (secuencia[indice] >= 0) {
    $('#simon div:nth-child(' + (secuencia[indice] + 1) +
     ')').addClass('showColor');
    setTimeout(function () {
      ocultarColores(indice + 1);
    }, 800);
  } else {
    jugando = true;
    $('#mensaje').html('Ya puedes empezar...');
  }
}

/**
 * Esta funcion forma parte del proces de mostrar los colores mostrarColores()
 * Esconde el color
 */
function ocultarColores(indice) {
  $('#simon div').removeClass('showColor');
  setTimeout(function () {
    mostrarColores(indice);
  }, 500);
}

/**
 * Esta funcion verifica las pulsaciones del usuario
 * Devuelve:
 *  1 Todos los colores secuenciaClicks son correctos y hay que mostrar un nuevo color
 *  2 Todos los colores secuenciaClicks son correctos pero todavia falta pulsar mas colores
 *  0 Ha habido un error
 */
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

/**
 * Esta funcion muestra los colores que se tenia que haber secuenciaClick y los
 * colores que el usuario ha secuenciaClick
 */
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
