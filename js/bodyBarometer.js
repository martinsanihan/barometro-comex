async function loadCsvData(filePath) {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length) {
            console.error(results.errors);
            reject(results.errors);
            return;
          }
          resolve(results.data);
        }
      });
    });
  } catch(error) {
    console.error(error);
    return [];
  }
}

function bodyBarometer(data, is_hash = false) {
  
  console.log("hash3", is_hash);


  if (!is_hash) $('.graph-charact').hide();
  else $('.graph-charact').show();

  if (!is_hash) window.labelsGraph = [];
  if (!is_hash) window.labelsGraph.push("Barómetro de la Logística del Comercio Exterior");

  if (!is_hash) window.myBarometerGraph.options.plugins.title.text = "Barómetro de la Logística del Comercio Exterior";


  const dimensiones = Object.keys(data).sort();

  let htmlText = '';
  htmlText += 'Se presenta el Barómetro de la Logística según la composición de sus diversos subíndices:';
  htmlText += '<ul>';
  dimensiones.forEach(dim => {
    htmlText += `<li>${dim}</li>`;
  });
  htmlText += '</ul>';


  if (!is_hash) $('#description-chart-barometer').html(htmlText);

  
  $('#barometer-items').empty();

  $.each(dimensiones, function (k1, dimen) {

    if (window.yearsCurrent) {;

      //const itemsList = ["", "", "", "", ""];

        // console.log(dimen);
        let newDimension = '<div class="panel-heading">';
        if (dimen === 'Percepción de la Logística') {
          newDimension += '<a style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" onclick="renderGraphBarometerFuturaVsActual(this)" data-color="' + window.colorIndicador[k1] + '" data-dimension="' + dimen + '" href="#dimension-' + k1 + '" data-toggle="collapse" data-parent="#accordion" class="col-center-block card-item card-items">';

        }
        else {
          newDimension += '<a style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" onclick="renderGraphBarometerDimension(this)" data-color="' + window.colorIndicador[k1] + '" data-dimension="' + dimen + '" href="#dimension-' + k1 + '" data-toggle="collapse" data-parent="#accordion" class="col-center-block card-item card-items">';
        }
        newDimension += dimen;
        newDimension += '<img src="svg/arrow-right.svg"></a></div>';
        newDimension += '<div id="dimension-' + k1 + '" class="panel-collapse collapse in collapse-custom">';
        //newDimension += '<div onclick="renderGraphBarometerParent(this)" data-dimension="'+dimen.dimension+'"  class="col-center-block card-item card-items">Total <img src="svg/arrow-right.svg"></div>';

        var is_satisfaccion = false;
        var subdims = data[dimen];
        const opUsGraphSD = 'Expectativa Futura vs Situación Actual Operadores y Usuarios'

        if (dimen === 'Percepción de la Logística') {
          // newDimension += '<div style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" data-color="' + window.colorIndicador[k1] + '" onclick="renderGraphBarometerFuturaVsActualOpUs(this)" data-dimension="' + dimen + '"  class="col-center-block card-item card-items">Expectativa Futura vs Situación Actual Operadores y Usuarios <img src="svg/arrow-right.svg"></div>';
          newDimension += '<div style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" data-color="' + window.colorIndicador[k1] + '" onclick="renderOpUsGraphApproach2(this)" data-dimension="' + dimen + '"  data-subdimension="' + opUsGraphSD + '"  class="col-center-block card-item card-items">Expectativa Futura vs Situación Actual Operadores y Usuarios<img src="svg/arrow-right.svg"></div>';
        }
        else {
          subdims.forEach(subdimen => {
            if (subdimen !== 'Total') {
              newDimension += '<div style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" data-color="' + window.colorIndicador[k1] + '" onclick="renderGraphBarometerSubDimension(this)" data-dimension="' + dimen + '"  data-subdimension="' + subdimen + '" class="col-center-block card-item card-items">' + subdimen + ' <img src="svg/arrow-right.svg"></div>';
            }
          });
        }

        // if (is_satisfaccion) {
        //   newDimension += '<div style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" data-color="' + window.colorIndicador[k1] + '" onclick="renderGraphBarometerSubDimension(this)" data-dimension="' + dimen.dimension + '"  data-subdimension="Satisfacción Sistema Logístico" class="col-center-block card-item card-items">Satisfacción Sistema Logístico <img src="svg/arrow-right.svg"></div>';
        // }


        newDimension += '</div>';





        // if (dimen.dimension == "Percepción de la Logística chilena") itemsList[0] = newDimension;
        // else if (dimen.dimension == "Desempeño de la Logística chilena") itemsList[1] = newDimension;
        // else if (dimen.dimension == "TI de la Logística chilena") itemsList[2] = newDimension;
        // else if (dimen.dimension == "Sostenibilidad de la Logística chilena") itemsList[3] = newDimension;
        // else if (dimen.dimension == "Satisfacción con Sistema Logístico chileno") itemsList[4] = newDimension;


        $('#barometer-items').append(newDimension);



      // $('#barometer-items').append(itemsList[0]);
      // $('#barometer-items').append(itemsList[1]);
      // $('#barometer-items').append(itemsList[2]);
      // $('#barometer-items').append(itemsList[3]);
      // $('#barometer-items').append(itemsList[4]);


      // let dataset = {
      //   label: String(year.anio),
      //   data: [year.valor],
      //   backgroundColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
      //   borderColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
      //   borderWidth: 1,
      //   maxBarThickness: 100,
      //   datalabels: {
      //     anchor: 'end',
      //     align: 'top',
      //     color: colors[window.yearsCurrent.indexOf(String(year.anio))],
      //     offset: 5
      //   }
      // };

      // datasets.push(dataset);
      // iterator++;



    }





  });


  // if (!is_hash) removeData(window.myBarometerGraph);
  // if (!is_hash) addData(window.labelsGraph, datasets, window.myBarometerGraph);





}

async function renderGraphBarometerDimension(ID, texto1 = false) {

  const descDimPath = 'raw_data/descripcion_dimension.csv';


  setGraphLayout('solo');
  $('.graph-charact').show();
  $('#container-graph-2').hide(); // <--- MUESTRA EL CONTENEDOR 2
  $('.error-bars').show();


  $('.panel-collapse').collapse('hide');


  let dimension = null;

  if (texto1 !== false) {
    dimension = texto1;
    // console.log(dimension);
  }
  else {
    dimension = $(ID).data('dimension');
    $('.card-items').removeClass("item-active");
    $('.card-items').css("background", "white");
    $(ID).addClass("item-active");
    $(".item-active").css("background", $(ID).data('color'));
  }

  const yearsSelected = window.yearsCurrent || [String(new Date().getFullYear())];
  await mainGraph(dimension, yearsSelected);



  window.myBarometerGraph.options.plugins.title.text = dimension;
  window.myBarometerGraph.update();

  $("#breadcrumbs-barometer").empty();
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerDimension(false,\'' + dimension + '\')">' + dimension + '</span> <img src="svg/arrow-right.svg">');


  console.log("DIMEN", dimension);
  // if (dimension == "Percepción de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presenta el resultado del porcentaje de empresas que cuentan con visión positiva (ni neutra ni negativa) sobre la situación actual y la situación futura de la logística del comercio exterior.");
  //   console.log("DIMEN2", dimension);
  // }
  // else if (dimension == "TI de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presentan los resultados a cada uno de los subindicadores que componen el índice TI de la Logística chilena.");
  // }
  // else if (dimension == "Desempeño de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presentan los resultados asociados a los subindicadores que componen el índice y representa el porcentaje de empresas que evaluó con altos niveles de satisfacción cada ítem.");
  // }
  // else if (dimension == "Sostenibilidad de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presenta el resultado de cada uno de los elementos que componen el subíndice, dando cuenta del porcentaje de empresas participantes que declaran niveles de accidentabilidad, de certificaciones, que cuentan con metodologías de medición de la huella de carbono y de aquellas que cuentan con relacionamiento con la comunidad.");
  // }
  // else if (dimension == "Satisfacción con Sistema Logístico chileno") {
  //   $('#description-chart-barometer').text("Se presenta el porcentaje de satisfacción con una serie de elementos asociados a la información disponible en el Observatorio Logístico.");
  // }
  // else {
  //   $('#description-chart-barometer').text(""); // las descripciones de los gráficos de la dimensión (total) deben estar hardcodeadas porque en la API no tienen una descripción como tal, solo las subdimensiones
  // }

  try {
    const descriptions = await loadCsvData(descDimPath);
    const correctDesc = descriptions.find(item => {
      return cleanString(item.dimension) === cleanString(dimension);
    });

    if (correctDesc) {
      // console.log(correctDesc);
      $('#description-chart-barometer').text(correctDesc.descripcion);
    }
  } catch(e) {
    console.error(e);
  }
}

async function renderGraphBarometerSubDimension(ID, texto1 = false, texto2 = false) {


  setGraphLayout('solo');
  $('.graph-charact').show();
  $('.error-bars').show();
  $('#container-graph-2').hide();


  let dimension = null;
  let subdimension = null;

  if (texto1 !== false && texto2 !== false) {
    dimension = texto1;
    subdimension = texto2;
  }
  else {
    dimension = $(ID).data('dimension');
    subdimension = $(ID).data('subdimension');

    $('.card-items').removeClass("item-active");
    $('.card-items').css("background", "white");
    $(ID).addClass("item-active");
    $(".item-active").css("background", $(ID).data('color'));

  }

  const yearsSelected = window.yearsCurrent || ['2024'];

  await subGraph(subdimension, yearsSelected);
  console.log('SUBDIMEN', subdimension);

  window.myBarometerGraph.options.plugins.title.text = dimension;
  window.currentSubdimension = subdimension;


  $("#breadcrumbs-barometer").empty();
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerDimension(false,\'' + dimension + '\')">' + dimension + '</span> <img src="svg/arrow-right.svg">');
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerSubDimension(false,\'' + dimension + '\',\'' + subdimension + '\')">' + subdimension + '</span> <img src="svg/arrow-right.svg">');


}

async function renderGraphBarometerFuturaVsActual(ID, texto1 = false) {

  setGraphLayout('solo');
  $('.graph-charact').show();
  $('#container-graph-2').hide();

  let dimension = null;

  // Si viene texto1 (desde el breadcrumb), lo usamos directamente
  if (texto1 !== false) {
      dimension = texto1;
  } 
  // Si no, lo sacamos del elemento HTML (ID) (desde el menú lateral)
  else {
      dimension = $(ID).data('dimension');
      
      // Movemos la lógica visual (activar item) aquí dentro, 
      // porque si ID es false, $(ID) fallará.
      $('.card-items').removeClass("item-active");
      $('.card-items').css("background", "white");
      $(ID).addClass("item-active");
      $(".item-active").css("background", $(ID).data('color'));
  }

  const data4render = await lolliPopGraph();
  lolliGraphRender(data4render);

  window.myBarometerGraph.options.plugins.title.text = dimension;
  window.myBarometerGraph.update();

  
  $('.error-bars').hide();
  $('.panel-collapse').collapse('hide');

  $('#breadcrumbs-barometer').empty();
  $('#breadcrumbs-barometer').append('<span style="cursor: pointer;" onclick="renderGraphBarometerFuturaVsActual(false,\'' + dimension + '\')">' + dimension + '</span> <img src="svg/arrow-right.svg">')

  $('.card-items').removeClass("item-active");
  $('.card-items').css("background", "white");
  $(ID).addClass("item-active");
  $(".item-active").css("background", $(ID).data('color'));

  console.log('SUBDIMEN', 'Expectativa vs Situación Actual')

  // const yearsSelected = window.yearsCurrent || ['2024'];

  // await expSitChart(yearsSelected);
  

  
}

// async function renderGraphBarometerFuturaVsActualOpUs(ID) {

//   setGraphLayout('solo');
//   $('.graph-charact').show();
//   $('#container-graph-2').hide(); // <--- MUESTRA EL CONTENEDOR 2

//   let dimension = $(ID).data('dimension');

//   const data4render = await OpUsLollipopGraph();

//   OpUsLollipopChartRender(data4render);

//   $('.error-bars').hide();

//   window.myBarometerGraph.options.plugins.title.text = 'Expectativa Futura v/s Situación Actual Operadores';
//   window.myBarometerGraph.update();



//   $('.card-items').removeClass("item-active");
//   $('.card-items').css("background", "white");
//   $(ID).addClass("item-active");
//   $(".item-active").css("background", $(ID).data('color'));

//   $("#breadcrumbs-barometer").empty();

//   console.log('SUBDIMEN', 'Expectativa vs Situación Actual Operadores/Usuarios');

//   // const yearsSelected = window.yearsCurrent || ['2024'];

//   // await expSitSubChart(yearsSelected);
// }

async function renderOpUsGraphApproach2(ID, texto1 = false, texto2 = false) {

  setGraphLayout('dual');
  $('.graph-charact').show();
  $('#container-graph-2').show(); // <--- MUESTRA EL CONTENEDOR 2

  let dimension = null;
  let subdimension = null;

  if (texto1 !== false && texto2 !== false) {
    dimension = texto1;
    subdimension = texto2;
  }
  else {
    dimension = $(ID).data('dimension');
    subdimension = $(ID).data('subdimension');

    $('.card-items').removeClass("item-active");
    $('.card-items').css("background", "white");
    $(ID).addClass("item-active");
    $(".item-active").css("background", $(ID).data('color'));

  }

  const data4render = await OpUsLollipopGraphAp2();

  OpUsLollipopChartRender2(data4render);

  $('.error-bars').hide();

  // window.myBarometerGraph.options.plugins.title.text = 'Expectativa Futura v/s Situación Actual Operadores';
  // window.myBarometerGraph.update();

  // window.myBarometerGraph2.options.plugins.title.text = 'Expectativa Futura v/s Situación Actual Usuarios';
  // window.myBarometerGraph2.update();
  console.log(dimension);
  console.log(subdimension);
  window.myBarometerGraph.options.plugins.title.text = dimension;
  window.myBarometerGraph2.options.plugins.title.text = dimension;
  window.currentSubdimension = null;




  $('.card-items').removeClass("item-active");
  $('.card-items').css("background", "white");
  $(ID).addClass("item-active");
  $(".item-active").css("background", $(ID).data('color'));

  $("#breadcrumbs-barometer").empty();
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerFuturaVsActual(false,\'' + dimension + '\')">' + dimension + '</span> <img src="svg/arrow-right.svg">');
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderOpUsGraphApproach2(false,\'' + dimension + '\',\'' + subdimension + '\')">' + subdimension + '</span> <img src="svg/arrow-right.svg">');

  console.log('SUBDIMEN', 'Expectativa vs Situación Actual Operadores/Usuarios');

  // const yearsSelected = window.yearsCurrent || ['2024'];

  // await expSitSubChart(yearsSelected);
}

function renderGraphBarometerParent(ID) {

  $('.graph-charact').show();

  let dimension = $(ID).data('dimension');
  $('.card-items').removeClass("item-active");
  $('.card-items').css("background", "white");
  $(ID).addClass("item-active");
  $(".item-active").css("background", $(ID).data('color'));



  let datasets = [];
  let iterator = 0;
  window.labelsGraph = [];

  window.labelsGraph.push("Barómetro: " + dimension);

  window.myBarometerGraph.options.plugins.title.text = "Barómetro: " + dimension;

  // if (dimension == "Indicador de Percepción del Barómetro logístico") {
  //   $('#description-chart-barometer').text("Se presenta el resultado del porcentaje de empresas que cuentan con visión positiva sobre la situación actual y la situación futura de la logística del comercio exterior.");
  // }
  // else if (dimension == "Indicador TI de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presenta el resultado alcanzado por el índice TI para cada medición.");
  // }
  // else if (dimension == "Indicador de Desempeño de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presenta el resultado del Indicador de Desempeño de la Logística chilena que corresponde al resultado de la evaluación de satisfacción de una serie de elementos relacionados con el Sistema Logístico nacional.");
  // }
  // else if (dimension == "Indicador de Sostenibilidad de la Logística chilena") {
  //   $('#description-chart-barometer').text("Se presenta el resultado asociado al índice de percepción de Sostenibilidad de la Logística chilena que comprende desde la dimensión ambiental a aquella referente al bienestar de los(as) trabajadores(as), mostrando su responsabilidad empresarial dentro y fuera de la empresa.");
  // }
  // else if (dimension == "Indicador de información para la competitividad del sector logístico") {
  //   $('#description-chart-barometer').text("Se presenta el resultado del índice de información para la competitividad del sector logístico que se entiende como el resultado del acceso a información que favorezca la actualización y la competitividad en el sistema logístico.");
  // }
  // else $('#description-chart-barometer').text("");


  $("#breadcrumbs-barometer").empty();
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerDimension(false,\'' + dimension + '\')">' + dimension + '</span> <img src="svg/arrow-right.svg">');



  // $.each(yearsBarometer, function (k, year) {

  //   if (window.yearsCurrent.includes(String(year.anio))) {

  //     let dataDimension = [];
  //     $.each(year.dimensiones, function (k1, dimen) {

  //       if (dimen.dimension == dimension) {

  //         dataDimension.push(dimen.valor);

  //       }


  //     });



  //     let dataset = {
  //       label: String(year.anio),
  //       data: dataDimension,
  //       backgroundColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
  //       borderColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
  //       borderWidth: 1,
  //       maxBarThickness: 100,
  //       datalabels: {
  //         anchor: 'end',
  //         align: 'top',
  //         color: colors[window.yearsCurrent.indexOf(String(year.anio))],
  //         offset: 5
  //       }
  //     };

  //     datasets.push(dataset);
  //     iterator++;



  //   }

  // });



  // removeData(window.myBarometerGraph);
  // addData(window.labelsGraph, datasets, window.myBarometerGraph);





}

function setGraphLayout(mode) {
  const container1 = $('#container-graph-1');
  const container2 = $('#container-graph-2');

  // 1. Limpiar todas las clases de columna para evitar conflictos
  container1.removeClass('col-12 col-md-12 col-lg-12 col-xl-12 col-xl-6');
  // container2 ya tiene sus clases base en el HTML, no necesitamos quitarlas dinámicamente siempre

  if (mode === 'dual') {
    // MODO DUAL
    // Pantallas XL (>1200px): Mitad (6)
    // Pantallas LG y menores (<1200px): Completo (12) -> Esto fuerza que se vea grande abajo
    container1.addClass('col-12 col-md-12 col-xl-6'); 
    
    // Aseguramos que el contenedor 2 también tenga esta lógica
    container2.removeClass('col-xl-12').addClass('col-12 col-md-12 col-xl-6');
    
    container2.show();
  } else {
    // MODO SIMPLE
    container2.hide();
    // Siempre ancho completo
    container1.addClass('col-12 col-md-12 col-xl-12');
  }
}