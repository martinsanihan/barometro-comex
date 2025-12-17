# Gráficos manual en nuevo Observatorio Logistico

## Descripción

Repo para ir dejando los gráficos que se editen y/o configuren manualmente, prescindiendo de la aplicación de gestión de gráficos. 
Contendría, además, funciones auxiliares para mantener lo más estandarizado posible los códigos.


---

## manejo de versiones
Las versiones se manejan para cada gráfico de manera independiente.

### Flujo de versionado de visualizaciones

Este repositorio contiene distintas visualizaciones (`viz/c001`, `viz/c006`, etc.).  
El control de versiones se realiza con **tags en la rama `main`**, de la forma:

- **Tags**: marcan versiones estables/publicadas de cada visualización.  
- **Ramas de feature**: se usan para desarrollo temporal, pero no se taggean.  
- **Convención de nombres**: `[código]-v[versión]`, por ejemplo:  
  - `c001-v1.0` → primera versión estable de `c001`  
  - `c001-v1.1` → mejora o actualización de `c001`  
  - `c006-v1.0` → primera versión estable de `c006`  


Los tags se crean **después** de un merge y si antepone el identificador de la visualización para facilitar la lectura. 
git aplica el tag a todo el repo, por lo que es importante que se modifique SOLO los archivos correspondiente a una sola viz. En caso de que la modificación se realice a un archivo 'base' (ej. utils.js) por cambio de librerías u otro que **altere el funcionamiento visible** de los gráficos, ahbrá que actualizar las versiones de todos los gráficos.

#### Esquema del flujo en `main`

(main branch)

●───●────────●────────●────────●
    │        │        │        │
    │        │        │        └── Tag: c012-v1.0
    │        │        └── Tag: c006-v1.0
    │        └── Tag: c001-v1.1
    └── Tag: c001-v1.0

#### Ejemplos de uso

1. Crear un tag para la primera versión de `c001`:
```bash
git tag -a c001-v1.0 -m "Versión inicial de C001"
git push origin c001-v1.0
```

2. Crear un tag luego de una mejora en `c001`:
```bash
git tag -a c001-v1.1 -m "Mejora tooltip en C001"
git push origin c001-v1.1
```

3. Crear un tag para la primera versión de `c006`:
```bash
git tag -a c006-v1.0 -m "Versión inicial de C006"
git push origin c006-v1.0
```

