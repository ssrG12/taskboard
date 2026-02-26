# TaskDashboard

Aplicación móvil desarrollada en **React Native** con una arquitectura **offline-first** que permite la gestión de tareas con persistencia local utilizando **Realm** y sincronización con un servicio remoto.

---

## Instalación y ejecución

### Requisitos
- Node.js versión 18 o superior  
- npm o yarn  
- React Native CLI  
- Android Studio para entorno Android  
- Xcode para entorno iOS (macOS únicamente)  

### Clonar el repositorio
- git clone [<repo-url>](https://github.com/ssrG12/taskboard)
- cd taskboard

### Instalar dependencias
- npm install

### Configuración y ejecución en Android
- Abrir Android Studio y verificar que el SDK esté correctamente configurado.
- Iniciar un emulador o conectar un dispositivo físico.

Ejecutar:

- npx react-native run-android

### Configuración y ejecución en iOS (macOS)
- cd ios
- pod install
- cd ..
- npx react-native run-ios

### Ejecutar pruebas
- npm test

### Elección de Realm
Se eligió Realm como solución de persistencia local por sus características orientadas a objetos y su integración eficiente con React Native.

Ventajas:
- Modelos como objetos directamente.
- Alto rendimiento en entornos móviles.
- Lectura y escritura simplificadas.
- Soporte de transacciones sencillo.
- Menor necesidad de serialización manual.

### Uso de IA
Durante el desarrollo se utilizaron herramientas de inteligencia artificial como apoyo técnico y de productividad.

Herramientas utilizadas:
- Claude
- ChatGPT

Alcance de uso:
- Apoyo en el maquetado inicial.
- Organización de servicios y estructura del proyecto.
- Optimización de configuración para mejorar velocidad de desarrollo.
- Integración de componentes nativos en React Native.
- Resolución de problemas de configuración en pruebas y dependencias.
- Revisión y mejora de fragmentos de código.
- Supervisión y validación:
Todo el código sugerido fue revisado, adaptado y validado manualmente. Las decisiones arquitectónicas y ajustes finales fueron realizadas directamente por el desarrollador Santiago Silva.