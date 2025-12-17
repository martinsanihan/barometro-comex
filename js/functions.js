function getHashValue(key) {
	var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
	return matches ? matches[1] : null;
}



function encodeObjectBase64(obj) {
	return btoa(JSON.stringify(obj));
}

function decodeObjectBase64(stringB64) {
	return JSON.parse(atob(stringB64));
}


function changeEnv(ID){
	window.env = $(ID).val();
	runData();
}


function changeYear(ID){
	var YEAR = $(ID).val();

	if(YEAR!="-1"){

		addYearSelected(YEAR);
		renderSelectYears();

		bodyCharacterization(window.yearsCharacterization);
		bodyBarometer(window.allDimensions);

	}

}


function clickRemoveYear(YEAR){
	if(window.yearsCurrent.length>1){
		removeYearSelected(String(YEAR));
		usedColors[`${YEAR}`] = 'rgba(0,0,0,0.1)';
		renderSelectYears();

		bodyCharacterization(window.yearsCharacterization);
		bodyBarometer(window.allDimensions);
	}
	else{
		$('.mensaje-selected').show();
		setTimeout(function(){ $('.mensaje-selected').hide(); }, 3000);
	}

}


function addYearSelected(YEAR){
	window.yearsCurrent = addYear(window.yearsCurrent,YEAR);
	window.yearsAvailable = removeYear(window.yearsAvailable,YEAR);
}



function removeYearSelected(YEAR){
	window.yearsAvailable = addYear(window.yearsAvailable,YEAR);
	window.yearsCurrent = removeYear(window.yearsCurrent,YEAR);
}

function renderSelectYears(){

	$('.years-select').empty();

	$('.years-select').append('<option value="-1">Seleccionar Año</option>');

	$.each(window.yearsAvailable, function(k,year) { 

		$('.years-select').append('<option value="'+year+'">'+year+'</option>');

	});



	$('.years-selected').empty();

	$.each(window.yearsCurrent, function(k,year) { 

		$('.years-selected').append('<span class="span-year" style="background:'+colors[k]+'">'+year+'<span class="close-year" style="color:'+colors[k]+'"  onclick="clickRemoveYear('+year+')">x</span></span>');

	});

}


function removeYear(LIST,YEAR){
	LIST = LIST.filter(item => item !== YEAR)
	//LIST.sort();
	LIST = uniq(LIST);
	return LIST;
}





function addYear(LIST,YEAR){
	LIST.push(YEAR);
	LIST.sort();
	LIST = uniq(LIST);
	return LIST;
}

function extractStructure(data) {
	let master = {};

	data.forEach(item => {
		const dim = item.dimension;
		const subdim = item.subdimension;

		if (!master[dim]) {
			master[dim] = new Set();
		}
		master[dim].add(subdim);
	});

	for (const dimKey in master) {
		master[dimKey] = Array.from(master[dimKey]).sort();
	}

	return master;
}


const baromURL = 'https://www.observatoriologistico.cl/api/v1/datastreams/C072/data';
const caracURL = 'https://www.observatoriologistico.cl/api/v1/datastreams/C073/data'

function runData(is_hash=false){
	$('#env').empty();
	if(window.env=="dev") $('#env').append('<option value="dev" selected>DEV</option><option value="prod">PROD</option>');
	else $('#env').append('<option value="dev">DEV</option><option value="prod" selected>PROD</option>');
	if(!is_hash) openMain();
	console.log("OPEN",is_hash);

	//funcion para agregar todas las dimensiones y subdimensiones

	if(window.env === 'prod'){
		console.log('env - ', window.env);

		axios.get(caracURL).then(response => {
			data = response.data.data;

			console.log("DATA FULL - characterization",data);
			/*try{
				$('#sources-chart-characterization').html("<strong>Fuentes</strong><br>"+response.data.title+"<br>"+response.data.sources[0].source__name+"<br>"+response.data.sources[0].source__url);
			}
			catch(e){}*/
			window.yearsCharacterizationOriginal = data;

			window.yearsCharacterization = transformCharacterization(data);
			console.log("DATA - characterization",window.yearsCharacterization);
			

			processData(is_hash);
			//console.log("llamado processData")
		});
		
		axios.get(baromURL).then(response => {

			data = response.data.data;

			console.log("DATA FULL - barometer",data);

			/*try{
				$('#sources-chart-barometer').html("<strong>Fuentes</strong><br>"+response.data.title+"<br>"+response.data.sources[0].source__name+"<br>"+response.data.sources[0].source__url);
			}
			catch(e){}
			*/
			
			window.yearsBarometerOriginal = data;
			//console.log("DATA - barometer1",window.yearsBarometerOriginal);
			window.yearsBarometer = transformBarometer(data);
			console.log("DATA - barometer2",window.yearsBarometer);
			
			window.allDimensions = extractStructure(window.yearsBarometerOriginal);
			processData(is_hash);
			//console.log("llamado processData")
		});




	}


	if(window.env === 'dev'){
		console.log('env - ', window.env);

		window.yearsCharacterization = transformCharacterization(getCaracterizacionJson());
		console.log("DATA - characterization",window.yearsCharacterization);

		window.yearsBarometer = transformBarometer(getBarometerJson());
		console.log("DATA - barometer",window.yearsBarometer);


		window.yearsBarometerOriginal = getBarometerJson();
		window.yearsCharacterizationOriginal = getCaracterizacionJson();


		window.allDimensions = extractStructure(window.yearsBarometerOriginal);
		processData(is_hash);
		// console.log("llamado processData")


	}





}


function processData(is_hash=false){

	$.each(window.yearsBarometer, function (k, year) {
		window.yearsTotal = addYear(window.yearsTotal, year.anio);
		if (k === window.yearsBarometer.length - 1) window.yearsCurrent = addYear(window.yearsCurrent, year.anio);
		else window.yearsAvailable = addYear(window.yearsAvailable, year.anio);
	});

	$.each(window.yearsCharacterization, function (k, year) {
		window.yearsTotal = addYear(window.yearsTotal, year.anio);
		if (k === window.yearsCharacterization.length - 1) window.yearsCurrent = addYear(window.yearsCurrent, year.anio);
		else window.yearsAvailable = addYear(window.yearsAvailable, year.anio);
	});


	//console.log("yearsAvailable on function.js" ,window.yearsAvailable);


	renderSelectYears();

	bodyCharacterization(window.yearsCharacterization,is_hash);
	bodyBarometer(window.allDimensions,is_hash);

}

function roundBase10(number) {
	if (number < 10) {
		return (Math.round(number / 10) * 10) - 10
	}
	return Math.round(number / 10) * 10;
}

