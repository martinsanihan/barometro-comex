# Barómetro del Comercio Exterior

Esta aplicación es un servicio que entrega la fundación **Conecta Logística** que busca presentar indicadores logísticos y caracterización de las empresas afiliadas.


## Tecnologías Utilizadas

- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **Librerías JS:**
  - [jQuery](https://jquery.com/): Manipulación del DOM y lógica de eventos.
  - [Chart.js](https://www.chartjs.org/): Renderizado de gráficos interactivos y visualización de datos.
  - [Axios](https://axios-http.com/): Manejo de peticiones HTTP para obtención de datos.
- **Estilos:**
  - [Bootstrap 4](https://getbootstrap.com/): Diseño responsivo y componentes de interfaz.
  - CSS personalizado para animaciones y estilos específicos del barómetro.

## Requisitos del Sistema

1. **Navegador Web Moderno** (Chrome, Firefox, etc...)
2. **Editor de Código** (Opcional, pero recomendado para realizar cambios)
3. **Node.js** (Para instalar librerías)

## Instalación y Ejecución

1. Clonar Repositorio
2. Instalar Dependencias `npm install`
3. Ejecutar Aplicación: Con una extensión como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) o [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) se asegura una correcta carga de recursos para la página estática

## Configuración de Entorno

Dentro de *index.html* se puede modificar la variable *env* para desarrollo local o visualizar la app en producción

```JavaScript
// Linea 66
var env = "dev" // Usa JSON para los datos

var env = "prod" // Conecta con la API del Observatorio Logístico
```