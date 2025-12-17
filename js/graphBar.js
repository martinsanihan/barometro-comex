

function graphBarRender() {

  const image = new Image();
  image.src = 'data:image/png;base64,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';
  const plugin = {
    id: 'custom_canvas_background_image',
    beforeDraw: (chart) => {
      if (image.complete) {
        const image_height = 40; // Or you can use image.naturalHeight;
        const image_width = 100; // Or you can use image.naturalWidth;
        const ctx = chart.ctx;
        const x = chart.chartArea.width - image_width + 35;
        const y = chart.chartArea.height + image_height + 65;
        ctx.globalAlpha = 1;
        ctx.drawImage(image, x, y, image_width, image_height);
        ctx.globalAlpha = 1;
      } else {
        image.onload = () => chart.draw();
      }
    }
  };


  const chartColors = {
    blue: '#2979FFCC',
    red: '#F44336CC'
  };

  if (window.myCharacterizationGraph) {
    window.myCharacterizationGraph.destroy();
    window.myCharacterizationGraph = null;
  }
  const ctx1 = document.getElementById('characterization-graph').getContext('2d');
  window.myCharacterizationGraph = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: window.labelsGraph,
      datasets: [
      ]
    },
    plugins: [ChartDataLabels],
    options: window.optionsPercentaje
    /*options: {
    aspectRatio: 15 / 3,
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: 'white',        
        font: {
          weight: 'bold'
        },
        formatter: Math.round
      },
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      },
    }
  }*/
  });


  /*
  
  {
          label: '# of Votes',
          data: window.dataGraph,
          backgroundColor: chartColors.blue,
          borderColor: chartColors.blue,
          borderWidth: 1,
          datalabels:{
            anchor: 'end',
            align: 'top',
            color: 'blue', 
            offset: -25
          }
        }
  
  
        */

  if (window.myBarometerGraph) {
    window.myBarometerGraph.destroy();
    window.myBarometerGraph = null;
  }

  if (window.myBarometerGraph2) {
    window.myBarometerGraph2.destroy();
    window.myBarometerGraph2 = null;
  }
  
  const ctx2 = document.getElementById('barometer-graph').getContext('2d');
  window.myBarometerGraph = new Chart(ctx2, {
    type: 'barWithErrorBars',
    data: {
      labels: window.labelsGraph,
      datasets: [ ]
    },
    plugins: [ChartDataLabels],
    options: {
      responsive: true,
      scales: {
        y: {
          max: 100,
          min: 0
          // display: false,
        }
      },
      plugins: {
        title: {
          display: true,
          text: ''
        },
        datalabels: {
          formatter: (value, ctx) => {

            if (value.y === null) {
                $('.no-preguntado').show();
                return 'NP'; 
            }
            const numericValue = parseFloat(value.y);

            if (isNaN(numericValue)) {
              console.error("valor final nan", value);
              return 'Error';
            }

            // return numericValue.toFixed(0) + '%';
            return '';
          },
          color: (context) => {
            if (context.dataset.data[context.dataIndex] === null) {
              return '#777';
            }
            else {
              return context.dataset.backgroundColor;
            }
          },
          anchor: 'end',
          align: 'top',
          offset: 4,
          display: 'auto'
        },
        tooltip: {
          callbacks: {
            title: (tooltipItem, data) => {
              // console.log(tooltipItem[0].label);
              let title = tooltipItem[0].label;
              return title.replace(/,/g, ' ').trim();
            },
            label: (tooltipItem, data) => {
              const value = tooltipItem.raw;
              const label = tooltipItem.dataset.label;
              
              return `${label}: ${value.y.toFixed(0)}% ± ${value.error}%`;
            },
          }
        },
        chartJsChartErrorBars: {
          color: '#666',
          width: '60%',
          lineWidth: 2,
        }
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10
        }
      },
    }


    /*options: {
    aspectRatio: 15 / 3,
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: 'white',        
        font: {
          weight: 'bold'
        },
        formatter: Math.round
      },
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      },
    }
  }*/
  });




}

function lolliGraphRender(dataset) {
    const ctx2 = document.getElementById('barometer-graph').getContext('2d');
    // Si ya existe, destruirla antes de crear una nueva (mantienes tu lógica original)
    if (window.myBarometerGraph) {
    window.myBarometerGraph.destroy();
    window.myBarometerGraph = null;
    }

    if (window.myBarometerGraph2) {
      window.myBarometerGraph2.destroy();
      window.myBarometerGraph2 = null;
    }
    
    window.myBarometerGraph = new Chart(ctx2, { // Usamos myBarometerGraph por conveniencia de la aplicación
        type: 'bar',
        data: {
            labels: dataset.labels,
            datasets: dataset.lolliDatasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Año' }
                },
                y: {
                    min: dataset.min, // Dejamos un límite inferior para percepción negativa
                    max: dataset.max,
                    title: { display: true, text: 'Valor' }
                }
            },
            plugins: {
                // 1. CONFIGURACIÓN DE LEYENDA (Oculta la barra de conexión)
                legend: {
                    display: true,
                    labels: {
                        filter: (item, chart) => item.datasetIndex !== 2 // Oculta el primer dataset (la barra delgada)
                    }
                },
                // 2. CONFIGURACIÓN DE DATALABELS (Muestra solo en los puntos)
                datalabels: {
                    formatter: (value, ctx) => {
                        // Solo mostramos el porcentaje para los datasets de puntos (índices 1 y 2)
                        if (ctx.dataset.type === 'bar') return ''; 
                        return value.toFixed(0);
                    },
                    color: 'black', 
                    anchor: 'end',
                    align: 'top',
                    offset: 4
                },
                // 3. CONFIGURACIÓN DE TOOLTIPS
                tooltip: {
                  callbacks: {
                    // Muestra la etiqueta del eje X (ej. "2023 vs 2024")
                    title: (tooltipItems, data) => {
                      // return tooltipItems[0].label; 
                      return '';
                    },
                    // Muestra el valor del punto específico
                    label: (tooltipItem, ctx) => {
                      const anio = tooltipItem.label;
                      const label = tooltipItem.dataset.label;
                      const value = tooltipItem.raw;
                      // console.log(tooltipItem)
                      if(tooltipItem.dataset.type === 'bar') return `${label}: ${value[1] - value[0]}`;
                      
                      // Formatea el valor y el nombre de la línea
                      if (label.includes('Expectativa Futura')) {
                        return `${label} (${parseInt(anio) - 1} para ${anio}): ${value.toFixed(0)}`;
                      }
                      else {
                        return `${label} (${anio}): ${value.toFixed(0)}`;
                      }
                    }
                  }
                },
                title: { display: true }
            }
        }
    });
}

// function OpUsLollipopChartRender(dataset) {

//   if (window.myBarometerGraph) {
//     window.myBarometerGraph.destroy();
//     window.myBarometerGraph = null;
//   }

//   const alignPointsPlugin = {
//     id: 'alignPointsToBars',
//     beforeDatasetsDraw: (chart) => {
//       // Definimos qué datasets (puntos) siguen a qué dataset (barra)
//       // Basado en tu orden: 0,1 (Puntos Op) -> 2 (Barra Op) | 3,4 (Puntos Usr) -> 5 (Barra Usr)
//       const map = [
//         { barIndex: 3, scatterIndices: [0, 1, 2] }, // Grupo Operador
//         { barIndex: 4, scatterIndices: [5, 6, 7] }  // Grupo Usuario
//       ];

//       map.forEach(group => {
//         const barMeta = chart.getDatasetMeta(group.barIndex);
//         if (barMeta.hidden) return;

//         group.scatterIndices.forEach(scatterIdx => {
//           const scatterMeta = chart.getDatasetMeta(scatterIdx);
//           if (scatterMeta.hidden) return;

//           // Recorremos cada punto y copiamos la coordenada X de la barra correspondiente
//           scatterMeta.data.forEach((point, index) => {
//             const bar = barMeta.data[index];
//             if (bar && point) {
//               point.x = bar.x; // <--- AQUÍ OCURRE LA MAGIA
//             }
//           });
//         });
//       });
//     }
//   };

//   const ctx2 = document.getElementById('barometer-graph');

//   console.log('inicializando render del gráfico', dataset);
//   console.log(dataset.labels, dataset.lolliDatasets);
//   window.myBarometerGraph = new Chart(ctx2, {
//     type: 'bar',
//     data: {
//       labels: dataset.labels,
//       datasets: dataset.lolliDatasets
//     },
//     plugins: [alignPointsPlugin],
//     options: {
//       responsive: true,
//       datasets: {
//         bar: {
//           barPercentage: 0.1,
//           categoryPercentage: 0.1
//         },
//       },
//       scales: {
//         x: {
//           type: 'category',
//           title: { display: false, text: 'Año' },
//           stacked: false,
//         },
//         y: {
//           type: 'linear',
//           title: { display: true, text: 'Valor' },
//           stacked: false,
//         },
//         x2: {
//           type: 'category',
//           stacked: false,
//           display: true,
//           labels: dataset.x2Labels,
//           title: { display: false, text: 'Año' }
//         }
//       },
//       plugins: {
//         legend: {
//           display: true,
//           labels: {
//             filter: (item, chart) => !item.text.includes('Diferencia') && !item.text.includes('separador')
//           }
//         },
//         datalabels: {
//           formatter: (value, ctx) => {
//             if (ctx.dataset.type === 'bar') return '';
//             return value.toFixed(0);
//           },
//           color: 'black',
//           anchor: 'end',
//           align: 'top',
//           offset: 4
//         },
//         tooltip: {
//           callbacks: {
//             title: (tooltipItems, data) => {
//               return '';
//             },
//             label: (tooltipItem, ctx) => {
//               const anio = tooltipItem.label;
//               const label = tooltipItem.dataset.label;
//               const value = tooltipItem.raw;

//               console.log(anio, label, value);

//               if (label.includes('Diferencia')) return `${label}: ${value[1] - value[0]}`;
//               if (label.includes('separador')) return null;

//               if (label.includes('Expectativa')) {
//                 return `${label} (${parseInt(anio) - 1} para ${anio}): ${value.toFixed(1)}`;
//               }
//               else {
//                 return `${label} (${anio}): ${value.toFixed(1)}`;
//               }
//             }
//           },
//         },
//         title: { display: true }
//       }
//     }
//   });
// }

function OpUsLollipopChartRender2(dataset) {

  if (window.myBarometerGraph) {
    window.myBarometerGraph.destroy();
    window.myBarometerGraph = null;
  }

  if (window.myBarometerGraph2) {
    window.myBarometerGraph2.destroy();
    window.myBarometerGraph2 = null;
  }
  console.log(dataset);

  const ctx1 = document.getElementById('barometer-graph').getContext('2d');

  window.myBarometerGraph = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: dataset.labels,
      datasets: dataset.datasetsOp
    },
    options: {
      // mantainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Año' },
        },
        y: {
          title: { display: true, text: 'Valor (Operador)' },
          min: dataset.min,
          max: dataset.max
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            filter: (item, chart) => !item.text.includes('Diferencia') && !item.text.includes('separador')
          }
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.dataset.type === 'bar') return '';
            return value.toFixed(0);
          },
          color: 'black',
          anchor: 'end',
          align: 'top',
          offset: 4
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems, data) => {
              return '';
            },
            label: (tooltipItem, ctx) => {
              const anio = tooltipItem.label;
              const label = tooltipItem.dataset.label;
              const value = tooltipItem.raw;

              console.log(anio, label, value);

              if (label.includes('Diferencia')) return `${label}: ${value[1] - value[0]}`;
              if (label.includes('separador')) return null;

              if (label.includes('Expectativa')) {
                return `${label} (${parseInt(anio) - 1} para ${anio}): ${value.toFixed(1)}`;
              }
              else {
                return `${label} (${anio}): ${value.toFixed(1)}`;
              }
            }
          },
        },
        title: { display: true }
      }
    }
  });

  const ctx2 = document.getElementById('barometer-graph2').getContext('2d');

  window.myBarometerGraph2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: dataset.labels,
      datasets: dataset.datasetsUsr
    },
    options: {
      // mantainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Año' },
        },
        y: {
          min: dataset.min,
          max: dataset.max,
          title: { display: true, text: 'Valor (Usuario)' },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            filter: (item, chart) => !item.text.includes('Diferencia') && !item.text.includes('separador')
          }
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.dataset.type === 'bar') return '';
            return value.toFixed(0);
          },
          color: 'black',
          anchor: 'end',
          align: 'top',
          offset: 4
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems, data) => {
              return '';
            },
            label: (tooltipItem, ctx) => {
              const anio = tooltipItem.label;
              const label = tooltipItem.dataset.label;
              const value = tooltipItem.raw;

              console.log(anio, label, value);

              if (label.includes('Diferencia')) return `${label}: ${value[1] - value[0]}`;
              if (label.includes('separador')) return null;

              if (label.includes('Expectativa')) {
                return `${label} (${parseInt(anio) - 1} para ${anio}): ${value.toFixed(1)}`;
              }
              else {
                return `${label} (${anio}): ${value.toFixed(1)}`;
              }
            }
          },
        },
        title: { display: true }
      }
    }
  });

}



function addData(labels, datasets, graph) {
  labels.forEach((label) => {
    graph.data.labels.push(label);//splitIntoLines(label, 25));
  });
  graph.data.datasets = datasets;
  graph.update();

  window.labelsGraph = graph.data.labels;
  window.dataGraph = graph.data.datasets;
  window.titleGraph = graph.options.plugins.title.text;

}

function removeData(graph) {
  graph.data.labels = [];
  graph.data.datasets = [];
  graph.update();
}



function splitIntoLines(input, len) {
  var i;
  var output = [];
  var lineSoFar = "";
  var temp;
  var words = [];

  try {
    words = input.split(' ');
    for (i = 0; i < words.length;) {
      // check if adding this word would exceed the len
      temp = addWordOntoLine(lineSoFar, words[i]);
      if (temp.length > len) {
        if (lineSoFar.length == 0) {
          lineSoFar = temp;     // force to put at least one word in each line
          i++;                  // skip past this word now
        }
        output.push(lineSoFar);   // put line into output
        lineSoFar = "";           // init back to empty
      } else {
        lineSoFar = temp;         // take the new word
        i++;                      // skip past this word now
      }
    }
    if (lineSoFar.length > 0) {
      output.push(lineSoFar);
    }
    return (output);
  }
  catch (e) { return input; }
}

function addWordOntoLine(line, word) {
  if (line.length != 0) {
    line += " ";
  }
  return (line += word);
}
