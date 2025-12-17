function transformCharacterization(data) {

	let anios = uniq(data, "anio").sort((a, b) => parseInt(a) - parseInt(b));
	let years = [];
	//Anio - Caracteristica - Actor_Logistico - Actor_Logistico_Desagrupado - Categoria - Valor actorlogisticodesagrupado
	$.each(anios, function(k,year) { 
		let caracteristicas = [];
		$.each(data, function(k,elem) { 
			if(year===elem.anio){
				caracteristicas.push(elem);
			}
		});
		caracteristicas = uniq(caracteristicas,"caracteristica");
		let caracteristicaList = [];
		$.each(caracteristicas, function(k,caract) { 

			let actorlogisticos = [];
			$.each(data, function(k,elem) { 
				if(year===elem.anio && caract===elem.caracteristica){
					actorlogisticos.push(elem);
				}
			});
			actorlogisticos = uniq(actorlogisticos,"categoria_actor");
			let actorlogisticosList = [];
			$.each(actorlogisticos, function(k,actor) { 

				let actorlogisticodesagrupados = [];
				$.each(data, function(k,elem) { 
					if(year===elem.anio && caract===elem.caracteristica && actor===elem.categoria_actor){
						actorlogisticodesagrupados.push(elem);
					}
				});
				actorlogisticodesagrupados = uniq(actorlogisticodesagrupados,"subcategoria_actor");

				let actorlogisticodesagrupadosList = [];
				$.each(actorlogisticodesagrupados, function(k,actordes) { 

					let categorias = [];
					let cats = [];
					$.each(data, function(k,elem) { 
						if(year===elem.anio && caract===elem.caracteristica && actor===elem.categoria_actor && actordes===elem.subcategoria_actor){
							categorias.push(elem);
						}
					});
					categorias = uniq(categorias,"categoria");

					let categoriasList = [];
					$.each(categorias, function(k4,cat) { 
						$.each(data, function(k2,elem) { 
							if(year===elem.anio && caract===elem.caracteristica && actor===elem.categoria_actor && actordes===elem.subcategoria_actor && cat===elem.categoria){
								categoriasList.push({"categoria":cat,"valor":elem.valor});
							}
						});
					});

					actorlogisticodesagrupadosList.push({"actorlogisticodesagrupado":actordes,"categorias":categoriasList});



				});


				actorlogisticosList.push({"actorlogistico":actor,"actorlogisticodesagrupados":actorlogisticodesagrupadosList});



			});


			caracteristicaList.push({"caracteristica":caract,"actorlogisticos":actorlogisticosList});



		});


		years.push({"anio":year,"caracteristicas":caracteristicaList});




	});




	$.each(years, function(k,year) { 
		var valYear = 0;
		$.each(year.caracteristicas, function(k,cara) { 
			var valCara = 0;
			$.each(cara.actorlogisticos, function(k,actor) { 
				var valActor = 0;
				$.each(actor.actorlogisticodesagrupados, function(k,actordes) { 
					var valActorDes = 0;
					$.each(actordes.categorias, function(k,cat) { 
						valActorDes+=parseFloat(cat.valor);
					});
					actordes.valor = Math.round(valActorDes);
					valActor+=parseFloat(actordes.valor);
				});
				actor.valor = Math.round(valActor);
				valCara+=parseFloat(actor.valor);
			});
			cara.valor = Math.round(valCara);
			valYear+=parseFloat(cara.valor);
		});
		year.valor = Math.round(valYear);
	});



	return years;

}