# 📋 Gestor de Tareas - Instrucciones de Ejecución

## 🚀 Cómo Ejecutar la Aplicación

### Prerrequisitos
Antes de ejecutar la aplicación, asegúrate de tener instalado:
- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)

### Pasos para Ejecutar

1. **Abrir terminal en el directorio del proyecto**
   ```bash
   cd c:\Users\luigg\Documents\trae_projects\tareaweb1
   ```

2. **Instalar dependencias** (solo la primera vez)
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en: `http://localhost:5173/`
   - Se abrirá automáticamente en tu navegador predeterminado

### 🎯 Funcionalidades Implementadas

#### ✅ Requisitos de la Actividad Cumplidos:

1. **Variables y Constantes**
   - Variable reactiva: `nombre` (campo de texto)
   - Constante: `appTitle = 'Gestor de Tareas'`

2. **Data Binding**
   - Campo de texto que actualiza automáticamente el nombre
   - Saludo personalizado que aparece cuando escribes tu nombre

3. **Evento Click**
   - Botón "Agregar Tarea" que agrega nuevas tareas
   - También funciona presionando Enter en el campo de texto

4. **Bloques if y each**
   - Lista de tareas se muestra solo si hay elementos
   - Iteración sobre arrays de tareas con `{#each}`
   - Condicionales para mostrar estadísticas y mensajes

5. **Variable Reactiva**
   - Contador total de tareas que se actualiza automáticamente
   - Estadísticas completas: total, completadas, pendientes, porcentaje

6. **Bloque await con Datos Reales**
   - Carga tareas desde JSONPlaceholder API
   - URL: `https://jsonplaceholder.typicode.com/todos?_limit=5`
   - Manejo de estados: cargando, error, éxito

### 🧪 Cómo Probar las Funcionalidades

#### Data Binding:
1. Escribe tu nombre en el campo "¿Cuál es tu nombre?"
2. Observa cómo aparece el saludo personalizado automáticamente

#### Eventos:
1. Escribe una tarea en "Escribe una nueva tarea..."
2. Haz clic en "Agregar Tarea" o presiona Enter
3. La tarea aparecerá inmediatamente en la lista

#### Variables Reactivas:
1. Agrega varias tareas
2. Marca algunas como completadas haciendo clic en el checkbox
3. Observa cómo se actualizan automáticamente:
   - Contador en el encabezado
   - Estadísticas (total, completadas, pendientes)
   - Barra de progreso y porcentaje

#### API y Await:
1. Al cargar la página, verás "Cargando tareas..." en la sección derecha
2. Después de unos segundos aparecerán 5 tareas de ejemplo de la API
3. Estas tareas no son editables (solo para demostración)

### 📁 Estructura del Proyecto

```
src/
├── routes/
│   └── +page.svelte          # Página principal
├── lib/
│   ├── components/           # Componentes reutilizables
│   │   ├── TareaItem.svelte
│   │   ├── FormularioTarea.svelte
│   │   └── ListaTareas.svelte
│   ├── stores/              # Manejo de estado
│   │   └── tareasStore.js
│   ├── api/                 # Lógica de API
│   │   └── tareas.js
│   └── styles/              # Estilos globales
│       └── global.css
```

### 🛠️ Comandos Adicionales

- **Construir para producción:**
  ```bash
  npm run build
  ```

- **Vista previa de producción:**
  ```bash
  npm run preview
  ```

- **Verificar código:**
  ```bash
  npm run check
  ```

### 🎨 Características Adicionales

- **Diseño Responsivo**: Funciona en desktop y móvil
- **Interfaz Moderna**: Diseño limpio y profesional
- **Componentes Modulares**: Código organizado y reutilizable
- **Manejo de Estado**: Store centralizado con Svelte
- **TypeScript**: Tipado para mejor desarrollo
- **API Integration**: Conexión real con JSONPlaceholder

### 🐛 Solución de Problemas

Si encuentras algún error:

1. **Puerto ocupado**: Si el puerto 5173 está ocupado, Vite automáticamente usará el siguiente disponible
2. **Errores de dependencias**: Ejecuta `npm install` nuevamente
3. **Caché**: Borra la carpeta `.svelte-kit` y ejecuta `npm run dev` otra vez

---

**¡Listo!** Tu aplicación de gestión de tareas está funcionando correctamente con todas las funcionalidades de Svelte implementadas. 🎉