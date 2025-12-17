// ---------------------- Implementación API Nueva ----------------------------- //


let usedColors = {}; // variable para que no hayan incoherencias entre años y colores

// const env = 'prod';
function checkDataForNulls(datasets) { // función para chequear si hay un dato null, para implementar los "no preguntado"
    if (!datasets || datasets.length === 0) return false; // si no existen datos retorna false

    // iterar sobre todos los datasets (años)
    return datasets.some(dataset => {
        // chequear si algún valor dentro del array de 'data' es null
        if (!dataset.data) return false;
        return dataset.data.some(value => value === null);
    });
}

async function getBaromData() { // llamado a la api/datos locales
  const baromURL = 'https://www.observatoriologistico.cl/api/v1/datastreams/C072/data';

  try {
    if (window.env === 'dev') {
      return getBarometerJson();
    } else if (window.env === 'prod') {
      const response = await fetch(baromURL);
      const baromJSON = await response.json();
      return baromJSON.data;

    }
  }
  catch (error) {
    console.error(error);
    return[];
  }
}

function cleanString(str) { // normaliza textos para comparar así no afectan las mayusculas, tíldes, etc.
    if(!str) return '';
    return normalizeString(str).toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function mainGraph(dim, years) { // se encarga de llamar a los datos, agruparlos y hacer la lógica para que su presentación sea ordenada
  try {
    // const datosBarometer = await getBaromData();
    const datosBarometer = yearsBarometerOriginal;

    const yearsSelected = (years ||[]).map(String);
    yearsSelected.sort((a,b) => {
      return parseInt(a) - parseInt(b);
    })
    
    if(!Array.isArray(datosBarometer)) return;
    const dimToFind = cleanString(dim);

    let realDimension = null;

    const allDimKeys = [...new Set(datosBarometer.map(item => item.dimension))];

    for (const realKey of allDimKeys) {
      if (cleanString(realKey).includes(dimToFind) || dimToFind.includes(cleanString(realKey))) {
        realDimension = realKey;
        break;
      }
    }

    if (!realDimension) {
      console.error(`No se encontró la dimensión ${dim}`);
    }

    const dataForDim = datosBarometer.filter(item =>
      item.dimension === realDimension &&
      item.actor_logistico === 'Total'
    );

    const groupDimension = dataForDim.reduce((acumulador, item) => {
      const subdimKey = item.subdimension;

      if(!acumulador[subdimKey]) {
        acumulador[subdimKey] = [];
      }
      acumulador[subdimKey].push(item);
      return acumulador;
    }, {});

    const chartData = genChartData(realDimension, yearsSelected, { [realDimension]: groupDimension });
    console.log('data for main graph', chartData);

    graphBarRender();

    if (checkDataForNulls(chartData.datasets)) {
      $('.no-preguntado').show();
    }
    else {
      $('.no-preguntado').hide();
    }

    if(window.myBarometerGraph) {
      removeData(window.myBarometerGraph);
      addData(chartData.labels, chartData.datasets, window.myBarometerGraph);

      window.myBarometerGraph.options.plugins.title.text = dim;
      window.myBarometerGraph.update();
    } else {
      console.error();
    }
  }
  catch (error) {
    console.error(error);
  }
}

function genChartData(dim, aniosSelected, datosAgrupados) { //Función para formatear los datos para la viz principal de una dimensión
  
  const subdimObjs = datosAgrupados[dim]; //En el JSON, entra a una dimensión para poder ver las subdimensiones
  // console.log(subdimObjs);
  const xLabels = Object.keys(subdimObjs); //Almacena los nombres de las subdimensiones en una lista
  const xla = xLabels.map(label => {
    return splitIntoLines(label,25)
  });
  
  // console.log(xLabels, xla);
  const dataSets = aniosSelected.map((anioSel, i) => {
    const valoresAnio = xLabels.map(subdimension => {
      const registrosSubdim = subdimObjs[subdimension]; //Almacena los objetos dentro de una subdimensión en una constante

      const registroAnio = registrosSubdim.find(registro => {
        return registro.anio === anioSel && registro.actor_logistico === 'Total'; //Filtra los objetos que tienen como propiedad año uno de los que han sido seleccionados
      });

      const valor =  registroAnio ? registroAnio.valor : null; //La constante valoresAnio almacena los objetos de los años seleccionados
      const error = registroAnio ? registroAnio.margen_error : 0;

      if (valor === null) {
        return {
          y: null,
          yMin: null,
          yMax: null,
          error: null
        };
      }

      return {
        y: valor,
        yMin: valor - error,
        yMax: valor + error,
        error: error
      };

    });

    usedColors[`${anioSel}`] = colors[i];

    return {
      label: anioSel,
      data: valoresAnio,
      backgroundColor: colors[i]
    }; //En la constante dataSets se guarda en el formato correcto los datos para el gráfico (para cada dataset)
  });

  return {
    labels: xla,
    datasets: dataSets
  }; //La función finalmente retorna la config principal de cada chart
}

async function subGraph(subdim, years) {
  try {
    const yearsSelected = (years ||[]).map(String);
    yearsSelected.sort((a,b) => {
      return parseInt(a) - parseInt(b);
    })

    // const datosBarometer = await getBaromData();
    const datosBarometer = window.yearsBarometerOriginal;
    if(!Array.isArray(datosBarometer)) return;

    const sdToFind = cleanString(subdim);

    let realSubdim = null;

    const allSubdimKeys = [... new Set(datosBarometer.map(item => item.subdimension))];

    for (const realKey of allSubdimKeys) {
      if (cleanString(realKey).includes(sdToFind) || sdToFind.includes(cleanString(realKey))) {
        realSubdim = realKey;
        break;
      }
    }

    for (const realKey of allSubdimKeys) {
      if (cleanString(realKey) === sdToFind) {
        realSubdim = realKey;
        break;
      }
    }

    if (!realSubdim) {
      console.error(`No se encontró la subdimensión ${subdim}`);
    }

    const datosSubdim = datosBarometer.filter(item =>
      item.actor_logistico !== 'Total' &&
      item.subdimension === realSubdim
    );
    //console.log(datosFiltrados);

    const groupSubdim = datosSubdim.reduce((acumulador, item) => {
      const subdimKey = item.subdimension;
      const actorKey = item.actor_logistico;

      if(!acumulador[subdimKey]) {
        acumulador[subdimKey] = {};
      }
      if(!acumulador[subdimKey][actorKey]) {
        acumulador[subdimKey][actorKey] = []
      }
      acumulador[subdimKey][actorKey].push(item);
      return acumulador;
    }, {});
    // console.log(groupSubdim);

    $('#description-chart-barometer').text(groupSubdim[realSubdim]['Usuario'][0].comentario);


    const chartData = genSubChartData(realSubdim, yearsSelected, groupSubdim);
    console.log('data for subgraph', chartData);

    graphBarRender();

     if (checkDataForNulls(chartData.datasets)) {
      $('.no-preguntado').show();
    }
    else {
      $('.no-preguntado').hide();
    }

    if(window.myBarometerGraph) {
      removeData(window.myBarometerGraph);
      addData(chartData.labels, chartData.datasets, window.myBarometerGraph);

      window.myBarometerGraph.options.plugins.title.text = realSubdim;
      window.myBarometerGraph.update();
    } else {
      console.error();
    }
  }
  catch (error) {
    console.error(error);
  }
}

function genSubChartData(subdim, aniosSelected, datosAgrupados) {
  const actorObjs = datosAgrupados[subdim];
  //console.log(actorObjs);
  const xLabels = Object.keys(actorObjs);
  const dataSets = aniosSelected.map((anioSel, i) => {
    const valoresAnio = xLabels.map(actor => {
      const registrosActor = actorObjs[actor];

      const registroAnio = registrosActor.find(registro => {
        return registro.anio === anioSel;
      });

      const valor = registroAnio ? registroAnio.valor : null;
      const error = registroAnio ? registroAnio.margen_error : 0;

      if (valor === null) {
        return {
          y: null,
          yMin: null,
          yMax: null,
          error: null
        };
      }

      return {
        y: valor,
        yMin: valor - error,
        yMax: valor + error,
        error: error
      }
    });

    usedColors[`${anioSel}`] = colors[i];
    
    return {
      label: anioSel,
      data: valoresAnio,
      backgroundColor: colors[i]
    };
  });
  //console.log(dataSets)
  if (subdim === 'Entregas de productos a tiempo y en forma') {
    return {
      labels: ['Entregas de productos a tiempo y en forma'],
      datasets: dataSets
    };
  }
  else {
    return {
      labels: xLabels,
      datasets: dataSets
    };
  }
}

async function expSitChart(years) {
  const maxYear = Math.max(...years);
  const maxYearStr = `${maxYear}`;
  const prevYear = maxYear - 1;
  const prevYearStr = `${prevYear}`;

  let titleTemp = "Expectativa futura expresada el año anterior con respecto al siguiente ";

  window.labelsGraph.push(titleTemp);
  window.myBarometerGraph.options.plugins.title.text = titleTemp;

  $("#breadcrumbs-barometer").empty();
  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerDimension(false,\'' + 'Percepción de la Logística chilena' + '\')">' + 'Percepción de la Logística chilena' + '</span> <img src="svg/arrow-right.svg"> <span>' + titleTemp + '</span> <img src="svg/arrow-right.svg">');


  const datosBarometer = await getBaromData();
  const datosFiltradosMax = datosBarometer.find(item =>
    (item.anio === maxYearStr && item.subdimension === 'Situación Actual' && item.actor_logistico === 'Total')
  );
  var datosFiltradosPrev = datosBarometer.find(item =>
    (item.anio === prevYearStr && item.subdimension === 'Expectativa Futura' && item.actor_logistico === 'Total')
  );



  const dataMax = {
    label: datosFiltradosMax.anio,
    data: [datosFiltradosMax.valor],
    backgroundColor: usedColors[`${datosFiltradosMax.anio}`]
  };

  if (!datosFiltradosPrev) {
    datosFiltradosPrev = {
      anio: prevYearStr,
      actor_logistico: 'Total',
      subdimension: 'Expectativa Futura',
      dimension: 'Percepción de la Logística chilena',
      valor: null,
      comentario: `Se elabora a partir de un conjunto de preguntas que caracterizan la situación de los actores logísticos respecto al año anterior. Nota: La métrica de este indicador de percepción puede tomar valores entre -100 y 100 y se obtiene como la diferencia entre la cantidad de respuestas positiva y negativa, respecto al total de respuestas, multiplicado por 100.`
    }
  }
  const dataPrev = {
    label: datosFiltradosPrev.anio,
    data: [datosFiltradosPrev.valor],
    backgroundColor: usedColors[`${datosFiltradosPrev.anio}`]
  }

  console.log([dataPrev, dataMax]);

  console.log(datosFiltradosMax);
  $('#description-chart-barometer').text(datosFiltradosMax.comentario);

   if (checkDataForNulls([dataPrev, dataMax])) {
      $('.no-preguntado').show();
    }
    else {
      $('.no-preguntado').hide();
    }

  removeData(window.myBarometerGraph);
  addData(["Expectativa futura expresada el año anterior " + prevYear + " vs Situación real del año " + maxYear], [dataPrev, dataMax], window.myBarometerGraph);

}

async function expSitSubChart(years) {
  const maxYear = Math.max(...years);
  const maxYearStr = `${maxYear}`;
  const prevYear = maxYear - 1;
  const prevYearStr = `${prevYear}`;

  let titleTemp = "Expectativa futura expresada el " + prevYear + " vs Situación real del año " + maxYear + " por Operadores y Usuarios";
  window.myBarometerGraph.options.plugins.title.text = titleTemp;

  $("#breadcrumbs-barometer").append('<span style="cursor: pointer;" onclick="renderGraphBarometerDimension(false,\'' + 'Percepción de la Logística chilena' + '\')">' + 'Percepción de la Logística chilena' + '</span> <img src="svg/arrow-right.svg"> <span>' + titleTemp + '</span> <img src="svg/arrow-right.svg">');

  const datosBarometer = await getBaromData();
  const datosFiltrados = datosBarometer.filter(item =>
    ((item.anio === maxYearStr && item.subdimension === 'Situación Actual') ||
    (item.anio === prevYearStr && item.subdimension === 'Expectativa Futura')) &&
    item.actor_logistico !== 'Total'
  );
  //console.log(datosFiltrados);

  const pivotData = datosFiltrados.reduce((acumulador, item) => {

    const actor = item.actor_logistico;
    const subdim = item.subdimension;

    if(!acumulador[actor]) {
      acumulador[actor] = {};
    }

    acumulador[actor][subdim] = item.valor;
    return acumulador;
  }, {});


  const dataSets = genExpSitSubData(pivotData, prevYearStr, maxYearStr);

  console.log(datosFiltrados);
  $('#description-chart-barometer').text(datosFiltrados[1].comentario);

  const chartData = {
    labels: Object.keys(pivotData),
    datasets: dataSets
  }


    if (checkDataForNulls(chartData.datasets)) {
      $('.no-preguntado').show();
    }
    else {
      $('.no-preguntado').hide();
    }

    removeData(window.myBarometerGraph);
    addData(chartData.labels, chartData.datasets, window.myBarometerGraph);
}

function genExpSitSubData(pivotData, prev, max) {
  console.log(pivotData);

  const exFutura = {
    label: `Expectativa Futura el año ${prev}`,
    backgroundColor: usedColors[`${prev}`],
    data: []
  };

  const sitActual = {
    label: `Situación Actual año ${max}`,
    backgroundColor: usedColors[`${max}`],
    data: []
  };

  Object.keys(pivotData).forEach(actor => {
    const dataActor = pivotData[actor];
    // console.log(actor, dataActor);

    if (!dataActor['Expectativa Futura']) {
      exFutura.data.push(null);
      sitActual.data.push(dataActor['Situación Actual']);
    }
    else if (!dataActor['Situación Actual']){
      exFutura.data.push(dataActor['Expectativa Futura']);
      sitActual.data.push(null);
    }
    else {
      exFutura.data.push(dataActor['Expectativa Futura']);
      sitActual.data.push(dataActor['Situación Actual']);
    }

  });


  console.log([exFutura, sitActual]);
  return [exFutura, sitActual];
}

function genLollipopData(datosBarometer) {
  const lolliData = [];
  const datosFiltrados = datosBarometer.filter(d => d.dimension === 'Percepción de la Logística chilena' &&
    d.actor_logistico === 'Total'
  );

  // const uniqueYears = [...new Set(datosFiltrados.map(d => parseInt(d.anio)))].sort((a,b) => a - b);
  const selectedYears = window.yearsCurrent;

  const values = datosFiltrados.map(d => d.valor);
  const roundMin = roundBase10(Math.min(...values));
  const roundMax = roundBase10(Math.max(...values));

  for (let i = 0; i < selectedYears.length; i++) {

    const yearN_1 = String(selectedYears[i] - 1);
    const yearN = String(selectedYears[i]);

    // console.log(yearN);

    const expectativa = datosFiltrados.find(d => d.anio === yearN_1 &&
      d.subdimension === 'Expectativa Futura' &&
      d.actor_logistico === 'Total'
    );

    const sitActual = datosFiltrados.find(d => d.anio === yearN &&
      d.subdimension === 'Situación Actual' &&
      d.actor_logistico === 'Total'
    );

    

    if (!expectativa) {
      lolliData.push({
        xLabel: `${yearN}`,
        expectativa: null,
        situacion: sitActual.valor,
        diffBar: false,
        comentario: sitActual.comentario,
        min: roundMin,
        max: roundMax
      });
    }
    else {
      lolliData.push({
        xLabel: `${yearN}`,
        expectativa: expectativa.valor,
        situacion: sitActual.valor,
        diffBar: true,
        comentario: sitActual.comentario,
        min: roundMin,
        max: roundMax
      });
    }
  }

  
  const yearFin = String(selectedYears[selectedYears.length - 1]);
  const yearFin1 = String(parseInt(yearFin) + 1);

  const expecFin = datosFiltrados.find(d => d.anio === yearFin &&
    d.subdimension === 'Expectativa Futura' &&
    d.actor_logistico === 'Total'
  );
  const sitFin1 = datosFiltrados.find(d => d.anio === yearFin1 &&
    d.subdimension === 'Situación Actual' &&
    d.actor_logistico === 'Total'
  );

  if (expecFin && sitFin1 && yearFin === '2024') {
    lolliData.push({
      xLabel: `${yearFin1}`,
      expectativa: expecFin.valor,
      situacion: sitFin1.valor,
      diffBar: true,
      comentario: sitFin1.comentario,
      min: roundMin,
      max: roundMax
    });
  }
  else if (expecFin && !sitFin1 && yearFin === '2024') {
    lolliData.push({
      xLabel: `${yearFin1}`,
      expectativa: expecFin.valor,
      situacion: null,
      diffBar: false,
      min: roundMin,
      max: roundMax
    });
  }

  // console.log('data for lollipop chart', lolliData);

  return lolliData;
}

async function lolliPopGraph() {
  const chartData = genLollipopData(window.yearsBarometerOriginal);
  const labels = chartData.map(d => d.xLabel);
  const expectativas = chartData.map(d => d.expectativa);
  const situaciones = chartData.map(d => d.situacion);
  const comentario = chartData[0].comentario;

  const min = chartData[0].min;
  const max = chartData[0].max;


  const barsData = chartData.map(d => {
    if (!d.diffBar) {
      return [0, 0];
    }
    const menor = Math.min(d.situacion, d.expectativa).toFixed(0);
    const mayor = Math.max(d.situacion, d.expectativa).toFixed(0);

    return [menor, mayor];
  });

  

  const lolliDatasets = [
    {
      type: 'scatter',
      label: 'Expectativa Futura',
      data: expectativas,
      pointBackgroundColor: '#ff6363ff',
      backgroundColor: '#ff6363ff',
      pointRadius: 7
    },
    {
      type: 'scatter',
      label: 'Situación Actual',
      data: situaciones,
      pointBackgroundColor: '#636dffff',
      backgroundColor: '#636dffff',
      pointRadius: 7
    },
    {
      type: 'bar',
      label: 'Diferencia',
      data: barsData,
      barThickness: 2,
      barPercentage: 1.0,
    },
    
  ];
  console.log('data for lollipop chart', lolliDatasets, labels);

  $('#description-chart-barometer').text(comentario);


  return {lolliDatasets, labels, min, max};
}

function genOpUsLollipopData(datosBarometer) {
  const actors = ['Operador', 'Usuario'];
  const finalData = [];

  const selectedYears = window.yearsCurrent;

  const datosFiltrados = datosBarometer.filter(d => d.dimension === 'Percepción de la Logística chilena' &&
    d.actor_logistico !== 'Total'
  );

  console.log(datosFiltrados);

  const values = datosFiltrados.map(d => d.valor);
  const roundMin = roundBase10(Math.min(...values));
  const roundMax = roundBase10(Math.max(...values));
  console.log(roundMin,roundMax);

  actors.forEach(actor => {
    for (let i = 0; i < selectedYears.length; i++) {
      const yearN_1 = String(selectedYears[i] - 1);
      const yearN = String(selectedYears[i]);

      const expectativa = datosFiltrados.find(d => 
        d.anio === yearN_1 &&
        d.subdimension === 'Expectativa Futura' &&
        d.actor_logistico === actor
      );

      const sitActual = datosFiltrados.find(d =>
        d.anio === yearN &&
        d.subdimension === 'Situación Actual' &&
        d.actor_logistico === actor
      )

      if (!expectativa) {
        finalData.push({
          xLabel: `${yearN}`,
          actor: actor,
          expectativa: null,
          situacion: sitActual.valor,
          diffBar: false,
          comentario: sitActual.comentario,
          min: roundMin,
          max: roundMax
        });
      }
      else {
        finalData.push({
          xLabel: `${yearN}`,
          actor: actor,
          expectativa: expectativa.valor,
          situacion: sitActual.valor,
          diffBar: true,
          comentario: sitActual.comentario,
          min: roundMin,
          max: roundMax
        });
      }
    }

    const yearFin = String(selectedYears[selectedYears.length - 1]);
    const yearFin1 = String(parseInt(yearFin) + 1);

    const expecFin = datosFiltrados.find(d => d.anio === yearFin &&
      d.subdimension === 'Expectativa Futura' &&
      d.actor_logistico === actor
    );
    const sitFin1 = datosFiltrados.find(d => d.anio === yearFin1 &&
      d.subdimension === 'Situación Actual' &&
      d.actor_logistico === actor
    );

    if (expecFin && sitFin1 && yearFin === '2024') {
      finalData.push({
        xLabel: `${yearFin1}`,
        actor: actor,
        expectativa: expecFin.valor,
        situacion: sitFin1.valor,
        diffBar: true,
        comentario: sitFin1.comentario,
        min: roundMin,
        max: roundMax
      });
    }
    else if (expecFin && !sitFin1 && yearFin === '2024') {
      finalData.push({
        xLabel: `${yearFin1}`,
        actor: actor,
        expectativa: expecFin.valor,
        situacion: null,
        diffBar: false,
        min: roundMin,
        max: roundMax
      });
    }
  });

  console.log('data for lollipop OpUs', finalData);
  return finalData
}

// async function OpUsLollipopGraph() {
//   const chartData = genOpUsLollipopData(await getBaromData());


//   const dataOp = chartData.filter(d => d.actor === 'Operador');
//   const dataUsr = chartData.filter(d => d.actor === 'Usuario');
//   const labels = dataOp.map(d => d.xLabel);
//   // const labelsUsr = dataUsr.map(d => d.xLabel);
//   // const labels = labelsOp.concat(labelsUsr);

//   // console.log(dataOp, dataUsr);

//   const comentario = chartData[0].comentario;

//   // console.log(comentario);

//   const barsDataOp = dataOp.map(d => {
//     const menor = Math.min(d.situacion, d.expectativa).toFixed(0);
//     const mayor = Math.max(d.situacion, d.expectativa).toFixed(0);
//     // const xIndex = window.yearsCurrent.indexOf(d.xLabel);

//     if (d.diffBar === false) {
//       return [0, 0];
//     }

//     return [menor, mayor];
//   });

  

//   const barsDataUsr = dataUsr.map(d => {
//     if (!d.diffBar) {
//       return [0, 0];
//     }
//     const menor = Math.min(d.situacion, d.expectativa).toFixed(0);
//     const mayor = Math.max(d.situacion, d.expectativa).toFixed(0);
//     // const xIndex = window.yearsCurrent.indexOf(d.xLabel);


//     return [menor, mayor];
//   });

//   const x2Labels = [];
//   // const auxDatasets = [];
//   for (i = 0; i < window.yearsCurrent.length; i++) {
//     if (String(window.yearsCurrent[i]) === '2024') {
//       x2Labels.push('Operador');
//       x2Labels.push('Usuario');
//     }

//     x2Labels.push('Operador');
//     x2Labels.push('Usuario');
//   }



//   const lolliDatasets = [
//     {
//       type: 'scatter',
//       label: 'Op. Expectativa',
//       data: dataOp.map(d => d.expectativa),
//       pointBackgroundColor: '#f263ffff',
//       backgroundColor: '#f263ffff',
//       pointRadius: 7,
//       stack: 'stack-operador',
//     },
//     {
//       type: 'scatter',
//       label: 'Op. Situación Actual',
//       data: dataOp.map(d => d.situacion),
//       pointBackgroundColor: '#78ff63ff',
//       backgroundColor: '#78ff63ff',
//       pointRadius: 7,
//       stack: 'stack-operador',
//     },
//     {
//       type: 'bar',
//       label: 'Op. Diferencia',
//       data: barsDataOp,
//       barThickness: 2,
//       stack: 'stack-operador',
//       // backgroundColor: 'transparent'
//     },
//     {
//       type: 'bar',
//       label: 'separador1',
//       data: dataOp.map(() => 50),
//       barThickness: 30,
//       stack: 'stack-operador',
//       backgroundColor: 'transparent'
//     },
//     {
//       type: 'bar',
//       label: 'separador2',
//       data: dataOp.map(() => 50),
//       barThickness: 50,
//       stack: 'stack-usuario',
//       backgroundColor: 'transparent'
//     },
//     {
//       type: 'scatter',
//       label: 'Usr. Expectativa',
//       data: dataUsr.map(d => d.expectativa),
//       pointBackgroundColor: '#ff6363ff',
//       backgroundColor: '#ff6363ff',
//       pointRadius: 7,
//       stack: 'stack-usuario',
//     },
//     {
//       type: 'scatter',
//       label: 'Usr. Situación Actual',
//       data: dataUsr.map(d => d.situacion),
//       pointBackgroundColor: '#636dffff',
//       backgroundColor: '#636dffff',
//       pointRadius: 7,
//       stack: 'stack-usuario',
//     },
//     {
//       type: 'bar',
//       label: 'Usr. Diferencia',
//       data: barsDataUsr,
//       barThickness: 2,
//       stack: 'stack-usuario',
//       // backgroundColor: 'transparent'
//     },
//   ]

//   $('#description-chart-barometer').text(comentario);


//   return {lolliDatasets, labels, x2Labels};

// }

async function OpUsLollipopGraphAp2() {
  const chartData = genOpUsLollipopData(window.yearsBarometerOriginal);



  const dataOp = chartData.filter(d => d.actor === 'Operador');
  const dataUsr = chartData.filter(d => d.actor === 'Usuario');
  const labels = dataOp.map(d => d.xLabel);

  const min = chartData[0].min;
  const max = chartData[0].max;

  const comentario = chartData[0].comentario;

  const barsDataOp = dataOp.map(d => {
    const menor = Math.min(d.situacion, d.expectativa).toFixed(0);
    const mayor = Math.max(d.situacion, d.expectativa).toFixed(0);
    // const xIndex = window.yearsCurrent.indexOf(d.xLabel);

    if (d.diffBar === false) {
      return [0, 0];
    }

    return [menor, mayor];
  });


  

  const barsDataUsr = dataUsr.map(d => {
    if (!d.diffBar) {
      return [0, 0];
    }
    const menor = Math.min(d.situacion, d.expectativa).toFixed(0);
    const mayor = Math.max(d.situacion, d.expectativa).toFixed(0);
    // const xIndex = window.yearsCurrent.indexOf(d.xLabel);


    return [menor, mayor];
  });

  const datasetsOp = [
    {
      type: 'scatter',
      label: 'Op. Expectativa',
      data: dataOp.map(d => d.expectativa),
      pointBackgroundColor: '#f263ffff',
      backgroundColor: '#f263ffff',
      pointRadius: 7,
      // stack: 'stack-operador',
    },
    {
      type: 'scatter',
      label: 'Op. Situación Actual',
      data: dataOp.map(d => d.situacion),
      pointBackgroundColor: '#78ff63ff',
      backgroundColor: '#78ff63ff',
      pointRadius: 7,
      // stack: 'stack-operador',
    },
    {
      type: 'bar',
      label: 'Op. Diferencia',
      data: barsDataOp,
      barThickness: 2,
      // stack: 'stack-operador',
      // backgroundColor: 'transparent'
    },
  ]

  const datasetsUsr = [
    {
      type: 'scatter',
      label: 'Usr. Expectativa',
      data: dataUsr.map(d => d.expectativa),
      pointBackgroundColor: '#ff6363ff',
      backgroundColor: '#ff6363ff',
      pointRadius: 7,
      // stack: 'stack-usuario',
    },
    {
      type: 'scatter',
      label: 'Usr. Situación Actual',
      data: dataUsr.map(d => d.situacion),
      pointBackgroundColor: '#636dffff',
      backgroundColor: '#636dffff',
      pointRadius: 7,
      // stack: 'stack-usuario',
    },
    {
      type: 'bar',
      label: 'Usr. Diferencia',
      data: barsDataUsr,
      barThickness: 2,
      // stack: 'stack-usuario',
      // backgroundColor: 'transparent'
    },
  ]

  const dataTotal = datasetsOp.concat(datasetsUsr);
  console.log(dataTotal)

  
  const minMax = dataTotal.forEach((dato) => {
    const values = dato.data;
    const max = Math.max(...values);
    const min = Math.min(...values);
    return {
      max: max,
      min: min
    }
  });
  console.log(minMax);

  $('#description-chart-barometer').text(comentario);

  return {datasetsOp, datasetsUsr, labels, min, max};

}