function bodyCharacterization(yearsCharacterization,is_hash=false){

  if(!is_hash) $('.graph-charact').hide();
  else $('.graph-charact').show();
  let datasets = [];
  let iterator = 0;
  if(!is_hash) window.labelsGraph = [];
  if(!is_hash) window.labelsGraph.push("Caracterización de las empresas participantes");

  if(!is_hash) window.myCharacterizationGraph.options.plugins.title.text = "Caracterización de las empresas participantes";

  if(!is_hash) $('#description-chart-characterization').text("Caracterización de las empresas (usuarios/operadores) que participaron del estudio del Barómetro del comercio exterior.");


  $.each(yearsCharacterization, function(k,year) { 

    if(window.yearsCurrent.includes(String(year.anio))){
      $('#characterization-items').empty();
      $.each(year.caracteristicas, function(k1,carac) {


        let newCaracteristica = '<div class="panel-heading">';
        newCaracteristica += '<a style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" onclick="renderGraphCharacterizationCaracteristica(this)" data-caracteristica="'+carac.caracteristica+'" href="#caracteristica-'+k1+'" data-toggle="collapse" data-parent="#accordion" class="col-center-block card-item card-items" id="caract-'+k1+'">';
        newCaracteristica += carac.caracteristica;
        newCaracteristica += '<img src="svg/arrow-right.svg"></a></div>';
        newCaracteristica += '<div id="caracteristica-'+k1+'" class="panel-collapse collapse in collapse-custom">';

        if(carac.caracteristica=="Principal Producto Comerciado" || carac.caracteristica=="Principal modo utilizado"){

          $.each(carac.actorlogisticos, function(k2,actor) {
            $.each(actor.actorlogisticodesagrupados, function(k3,actordes) {
              if(actordes.actorlogisticodesagrupado!="Operador") newCaracteristica += '<div style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" onclick="renderGraphCharacterizationActor(this)" data-caracteristica="'+carac.caracteristica+'"  data-actorlogistico="'+actordes.actorlogisticodesagrupado+'" class="col-center-block card-item card-items">'+actordes.actorlogisticodesagrupado+' <img src="svg/arrow-right.svg"></div>';
            }
            );
            return;
          });

        }
        else{
          $.each(carac.actorlogisticos, function(k2,actor) {
            if(actor.actorlogistico!="Total") newCaracteristica += '<div style="border-left: 4px solid ' + window.colorIndicador[k1] + ' !important;" onclick="renderGraphCharacterizationActor(this)" data-caracteristica="'+carac.caracteristica+'"  data-actorlogistico="'+actor.actorlogistico+'" class="col-center-block card-item card-items">'+actor.actorlogistico+' <img src="svg/arrow-right.svg"></div>';
          });
        }

        newCaracteristica += '</div>';
        $('#characterization-items').append(newCaracteristica);



      });




      
      // return;



      // renderGraphCharacterizationCaracteristica('#caract-0');



      let dataset = {
        label: String(year.anio),
        data: [year.valor],
        backgroundColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
        borderColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
        borderWidth: 1,
        maxBarThickness: 100,
        datalabels:{
          anchor: 'end',
          align: 'top',
          color: colors[window.yearsCurrent.indexOf(String(year.anio))], 
          offset: 5
        }
      };

      datasets.push(dataset);
      iterator++;


    }

  });



  // if(!is_hash) removeData(window.myCharacterizationGraph);
  // if(!is_hash) addData(window.labelsGraph,datasets,window.myCharacterizationGraph);


}


function renderGraphCharacterizationCaracteristica(ID,texto1=false){

  $('.graph-charact').show();
  $('.panel-collapse').collapse('hide');

  
  let caracteristica = null;

  if(texto1!==false){
    caracteristica = texto1;
  }
  else{
    caracteristica = $(ID).data('caracteristica');

    $('.card-items').removeClass("item-active");
    $(ID).addClass("item-active");
    $('.card-items').css("background", "white");
    $('.item-active').css("background", "#2979ff");

  }



  

  if(caracteristica=="Cantidad Empresas"){
    window.myCharacterizationGraph.options = window.optionsNumbers;
  }
  else{
    window.myCharacterizationGraph.options = window.optionsNumbers;
  }

  window.myCharacterizationGraph.update();



  
  if(caracteristica=="Cantidad Empresas"){
    $('#description-chart-characterization').text("Se presenta el número total de empresas que participaron según operadores logísticos y usuarios (exportador/importador).");
  }
  else if(caracteristica=="Principal Producto Comerciado"){
    $('#description-chart-characterization').text("Se presenta el principal producto comercializado según usuario (exportador/importador).");
  }
  else if(caracteristica=="Principal modo utilizado"){
    $('#description-chart-characterization').text("Se presenta los principales modos de transporte utilizados por los usuarios (exportadores/importadores).");
  }
  else if(caracteristica=="Tamaño Empresa"){
    $('#description-chart-characterization').text("Se presenta el tamaño de las empresas participantes según clasificación de Servicio de Impuestos Internos (SII) para operadores logísticos y usuarios (importadores/exportadores).");
  }



  if(caracteristica=="Principal Producto Comerciado"){
    window.myCharacterizationGraph.options.plugins.title.text = "Principal Producto Comerciado";
  }
  else if(caracteristica=="Principal modo utilizado"){
    window.myCharacterizationGraph.options.plugins.title.text = "Principal modo utilizado";
  }
  else if(caracteristica=="Tamaño Empresa"){
    window.myCharacterizationGraph.options.plugins.title.text = "Tamaño Empresa";
  }
  else window.myCharacterizationGraph.options.plugins.title.text = caracteristica;

  



  let datasets = [];
  let iterator = 0;
  let iteratorMayor = 0;
  let iteratorMayorKey = 0;
  window.labelsGraph = [];

  $("#breadcrumbs-characterization").empty();
  $("#breadcrumbs-characterization").append('<span style="cursor: pointer;" onclick="renderGraphCharacterizationCaracteristica(false,\''+caracteristica+'\')">'+caracteristica+'</span> <img src="svg/arrow-right.svg">');

  
  


  $.each(yearsCharacterization, function(k,year) { 

    if(window.yearsCurrent.includes(String(year.anio))){

      let dataCaracteristica = [];
      $.each(year.caracteristicas, function(k1,carac) {

        if(carac.caracteristica==caracteristica){


          if(caracteristica=="Principal Producto Comerciado" || caracteristica=="Principal modo utilizado"  || caracteristica=="Tamaño Empresa"){

            $.each(carac.actorlogisticos, function(k2,actor) {

              $.each(actor.actorlogisticodesagrupados, function(k3,actordes) {


                $.each(actordes.categorias, function(k4,cat) {

                    let l = cat.categoria=="Total"?actordes.actorlogisticodesagrupado:cat.categoria;
                    let is_exist = window.labelsGraph.indexOf(l);

                    if(iterator==0) if(is_exist==-1) window.labelsGraph.push(l);

                    var valor = parseInt(cat.valor);

                    if(is_exist==-1 && iterator==0) dataCaracteristica.push(valor);
                    else{
                      let olV = parseInt(dataCaracteristica[is_exist]);
                      console.log("VALOR old -->"+l,olV);
                      console.log("VALOR val -->"+l,valor);
                      if(!isNaN(olV)) valor = parseInt((valor+olV));
                      console.log("VALOR new -->"+l,valor);
                      console.log("VALOR pos -->"+l,is_exist);
                      dataCaracteristica[is_exist] = valor;

                    }


                    

                    if(parseInt(valor)>iteratorMayor){
                      iteratorMayor = parseInt(valor);
                      iteratorMayorKey = iterator;
                    }
        

                  });

                

                
              });


            });

          }
          else{

            $.each(carac.actorlogisticos, function(k2,actor) {
              if(iterator==0) window.labelsGraph.push(actor.actorlogistico=="Total"?carac.caracteristica:actor.actorlogistico);
              dataCaracteristica.push(actor.valor);
              if(parseInt(actor.valor)>iteratorMayor){
                iteratorMayor = parseInt(actor.valor);
                iteratorMayorKey = iterator;
              }
            });

          }




        }
        

      });

      let newD = [];

      $.each(dataCaracteristica, function(k,v) {
          if(isNaN(v) || v==undefined || v=="undefined") newD.push(0);
          else newD.push(v);
      });



      let dataset = {
        label: String(year.anio),
        data: newD,
        backgroundColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
        borderColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
        borderWidth: 1,
        maxBarThickness: 100,
        datalabels:{
          anchor: 'end',
          align: 'top',
          color: colors[window.yearsCurrent.indexOf(String(year.anio))], 
          offset: 5
        }
      };

      datasets.push(dataset);
      iterator++;



    }

  });



  var arrayOfObj = window.labelsGraph.map(function(d, i) {
    return {
      label: d,
      data: datasets[iteratorMayorKey].data[i] || 0,
      pos: i
    };
  });

  var sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
    return b.data>a.data;
  });


  // console.log(sortedArrayOfObj);


  var newArrayLabel = [];
  var newArrayData = [];

  $.each(sortedArrayOfObj, function(ksort,o) {
    newArrayLabel.push(o.label);
  });


  $.each(datasets, function(kd,ds) {
    var newData = [];

    $.each(sortedArrayOfObj, function(ksort,o) {

      $.each(ds.data, function(i,d) {
        if(o.pos==i) newData.push(d);
      });
      
    });

    ds.data = newData;

    newArrayData.push(ds);

  });



  removeData(window.myCharacterizationGraph);
  addData(newArrayLabel,newArrayData,window.myCharacterizationGraph);



}




function renderGraphCharacterizationActor(ID,texto1=false,texto2=false){
  $('.graph-charact').show();
  let caracteristica = null;
  let actorlogistico = null;

  if(texto1!==false && texto2!==false){
    caracteristica = texto1;
    actorlogistico = texto2;
  }
  else{
    caracteristica = $(ID).data('caracteristica');
    actorlogistico = $(ID).data('actorlogistico');

    $('.card-items').removeClass("item-active");
    $(ID).addClass("item-active");
    $('.card-items').css("background", "white");
    $('.item-active').css("background", "#2979ff");

  }
  
  let datasets = [];
  let iterator = 0;
  let iteratorMayor = 0;
  let iteratorMayorKey = 0;
  window.labelsGraph = [];


  if(caracteristica=="Cantidad Empresas"){
    window.myCharacterizationGraph.options = window.optionsNumbers;
    $('#description-chart-characterization').text("Se presenta el número total de empresas que participaron según el actor logístico " + actorlogistico + " (exportador/importador).");
  }
  else{
    window.myCharacterizationGraph.options = window.optionsNumbers;
  }



  if(caracteristica=="Principal Producto Comerciado"){
    $('#description-chart-characterization').text("Se presenta el principal producto comercializado según usuario (exportador/importador).");
  }
  else if(caracteristica=="Principal modo utilizado"){
    $('#description-chart-characterization').text("Se presenta los principales modos de transporte utilizados por los usuarios (exportadores/importadores).");
  }
  else if(caracteristica=="Tamaño Empresa"){
    $('#description-chart-characterization').text("Se presenta el tamaño de las empresas participantes según clasificación de Servicio de Impuestos Internos (SII) para operadores logísticos y usuarios (importadores/exportadores).");
  }


  window.myCharacterizationGraph.options.plugins.title.text = caracteristica;



  $("#breadcrumbs-characterization").empty();
  $("#breadcrumbs-characterization").append('<span style="cursor: pointer;" onclick="renderGraphCharacterizationCaracteristica(false,\''+caracteristica+'\')">'+caracteristica+'</span> <img src="svg/arrow-right.svg">');
  $("#breadcrumbs-characterization").append('<span style="cursor: pointer;" onclick="renderGraphCharacterizationActor(false,\''+caracteristica+'\',\''+actorlogistico+'\')">'+actorlogistico+'</span> <img src="svg/arrow-right.svg">');



  //console.log("AAA renderGraphCharacterizationActor",caracteristica+" ",actorlogistico);
  


  $.each(yearsCharacterization, function(k,year) { 

    if(window.yearsCurrent.includes(String(year.anio))){




      let dataTemp = [];
      let labelTemp = [];


      $.each(year.caracteristicas, function(k1,carac) {

        if(carac.caracteristica==caracteristica){

          //console.log("AAA caracteristica",caracteristica);


          $.each(carac.actorlogisticos, function(k2,actor) {


            if(caracteristica=="Principal Producto Comerciado" || caracteristica=="Principal modo utilizado"){



              $.each(actor.actorlogisticodesagrupados, function(k3,actordes) {


                if(actordes.actorlogisticodesagrupado==actorlogistico){

                  $.each(actordes.categorias, function(k4,cat) {
                    let l = cat.categoria=="Total"?actordes.actorlogisticodesagrupado:cat.categoria;

                    labelTemp.push(l);
                    dataTemp.push(cat.valor);


                    if(parseInt(cat.valor)>iteratorMayor){
                      iteratorMayor = parseInt(cat.valor);
                      iteratorMayorKey = iterator;
                    }

                  });

                }



              });



            }
            else{
              if(actor.actorlogistico==actorlogistico){

                $.each(actor.actorlogisticodesagrupados, function(k3,actordes) {


                  $.each(actordes.categorias, function(k4,cat) {
                    let l = cat.categoria=="Total"?actordes.actorlogisticodesagrupado:cat.categoria;

                    labelTemp.push(l);
                    dataTemp.push(cat.valor);


                    if(parseInt(cat.valor)>iteratorMayor){
                      iteratorMayor = parseInt(cat.valor);
                      iteratorMayorKey = iterator;
                    }


                  });



                });

              }
            }




          });
        }
        

      });


      let dataCaracteristica = [];
      window.labelsGraph = [];

      $.each(labelTemp, function(k0,label0) {

        if(!window.labelsGraph.includes(String(label0))){

          window.labelsGraph.push(label0);
          let dataValue = 0;
          let it = 0;
          $.each(labelTemp, function(k1,label1) {
            if(label0==label1){
              dataValue += parseInt(dataTemp[k1]);
              it++;
            }

          });

          if(it>0) dataValue = parseInt(dataValue);

          dataCaracteristica.push(dataValue);
        }

      });

      let newD = [];

      $.each(dataCaracteristica, function(k,v) {
          if(isNaN(v) || v==undefined || v=="undefined") newD.push(0);
          else newD.push(v);
      });




      //console.log("DATA",dataCaracteristica);
      //console.log("DATA",window.labelsGraph);



      let dataset = {
        label: String(year.anio),
        data: newD,
        backgroundColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
        borderColor: colors[window.yearsCurrent.indexOf(String(year.anio))],
        borderWidth: 1,
        maxBarThickness: 100,
        datalabels:{
          anchor: 'end',
          align: 'top',
          color: colors[window.yearsCurrent.indexOf(String(year.anio))], 
          offset: 5
        }
      };

      datasets.push(dataset);
      iterator++;



    }

  });





  var arrayOfObj = window.labelsGraph.map(function(d, i) {
    return {
      label: d,
      data: datasets[iteratorMayorKey].data[i] || 0,
      pos: i
    };
  });

  var sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
    return b.data>a.data;
  });


  console.log(sortedArrayOfObj);


  var newArrayLabel = [];
  var newArrayData = [];

  $.each(sortedArrayOfObj, function(ksort,o) {
    newArrayLabel.push(o.label);
  });


  $.each(datasets, function(kd,ds) {
    var newData = [];

    $.each(sortedArrayOfObj, function(ksort,o) {

      $.each(ds.data, function(i,d) {
        if(o.pos==i) newData.push(d);
      });
      
    });

    ds.data = newData;

    newArrayData.push(ds);

  });




  removeData(window.myCharacterizationGraph);
  addData(newArrayLabel,newArrayData,window.myCharacterizationGraph);




}


