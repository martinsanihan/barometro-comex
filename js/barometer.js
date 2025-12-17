function transformBarometer(data) {

    // 1. Obtener Años Únicos y ordenarlos numéricamente
    // (Asumimos que uniq está corregido para tomar solo el campo)
    let anios = uniq(data, "anio").sort((a, b) => parseInt(a) - parseInt(b));

    let years = [];

    // 2. Iterar sobre Años
    $.each(anios, function (k, year) {
        let valorYear = 0;
        let dimensiones = uniq(data, "dimension"); // Obtener lista de dimensiones únicas

        let dimensionList = [];
        $.each(dimensiones, function (k, dimen) {
            let subdimensiones = [];
            // Filtrar data para el Año y la Dimensión actual
            $.each(data, function (k, elem) {
                if (year == elem.anio && dimen == elem.dimension) {
                    subdimensiones.push(elem);
                }
            });
            subdimensiones = uniq(subdimensiones, "subdimension");

            let subdimensionesList = [];
            let totalDimensionValue = 0; // Para el valor total de la dimensión (si lo necesitas)
            let subdimCount = 0;

            $.each(subdimensiones, function (k, subdimen) {
                let valorSubDimension = 0;
                
                // Encontrar el registro con actor_logistico: 'Total' para esta Subdimensión
                let totalRecord = null;
                
                // Reconstruir la lista de actores logísticos para la subdimensión
                let actorlogisticosList = [];
                let actorData = data.filter(elem => year === elem.anio && dimen === elem.dimension && subdimen === elem.subdimension);

                $.each(actorData, function (k4, actorObj) {
                    if (actorObj.actor_logistico !== 'Total') {
                        // Aquí puedes agrupar data de Operador/Usuario si lo necesitas para el menú,
                        // pero la nueva lógica de renderizado lo hace al vuelo (subGraph).
                        actorlogisticosList.push({ "actor_logistico": actorObj.actor_logistico, "valor": actorObj.valor });
                    } else {
                        totalRecord = actorObj;
                    }
                });
                
                // Usar el valor del registro 'Total' como valor principal
                valorSubDimension = totalRecord ? totalRecord.valor : 0;
                
                // NO FILTRAMOS POR NOMBRES (como estaba subdimen.indexOf)
                subdimensionesList.push({ "subdimension": subdimen, "actorlogisticos": actorlogisticosList, "valor": valorSubDimension });
                
                totalDimensionValue += parseFloat(valorSubDimension);
                subdimCount++;


            });

            // NO FILTRAMOS POR NOMBRES DE DIMENSIONES
            dimensionList.push({ "dimension": dimen, "subdimensiones": subdimensionesList, "valor": (subdimCount > 0 ? totalDimensionValue / subdimCount : 0) });
            // Valor de la dimensión se calcula como promedio de sus subdimensiones (o 0 si no hay)

        });

        // El valor del año es el promedio de todas las dimensiones
        valorYear = dimensionList.reduce((sum, dim) => sum + dim.valor, 0);
        valorYear = dimensionList.length > 0 ? valorYear / dimensionList.length : 0;
        
        years.push({ "anio": year, "dimensiones": dimensionList, "valor": valorYear });
    });


    // >>> ELIMINAR COMPLETAMENTE LA LÓGICA DE CÁLCULO DE PROMEDIOS DEL FINAL
    // Esto evita que tus valores 'Total' de la API sean sobrescritos por promedios redondeados.
    // ... [Elimina el $.each(years, function (k, year) { ... }) después de la línea 89] ..
    return years;
}

function dimSubdimData(data) {
    const group = data.reduce((acumulador, item) => {
        const dKey = item.dimension;
        const sdKey = item.subdimension;

        if (!acumulador[dKey]) {
            acumulador[dKey] = {};
        }
        if (!acumulador[dKey][sdKey]) {
            acumulador[dKey][sdKey] = [];
        }

        acumulador[dKey][sdKey].push(item);
        return acumulador;
    }, {})
    return group;
}