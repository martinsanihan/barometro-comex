function backView(){
    //console.log(window.back);
    if(window.back=="main"){
      $('#body-main').show(500);
      $('#body-barometer').hide(500);
      $('#body-characterization').hide(500);
    }
  }

  function openCharacterization(){
    $('#body-main').hide(500);
    $('#body-barometer').hide(500);
    $('#body-characterization').show(500);
    // $('.graph-charact').show();
    // $('#caract-0').click();
  }


  function openBarameter(){

    $('#body-main').hide(500);
    $('#body-barometer').show(500);
    $('#body-characterization').hide(500);
    $('.graph-charact').hide();
    $('.error-bars').show();
  }



  function openMain(){

    $('#body-main').show(500);
    $('#body-barometer').hide(500);
    $('#body-characterization').hide(500);

  }