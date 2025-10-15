import { writable, derived } from 'svelte/store';

/**
 * Store para manejar el estado de las tareas locales
 * @type {import('svelte/store').Writable<Array<{id: number, title: string, completed: boolean, createdAt: string}>>}
 */
export const tareasLocales = writable([]);

/**
 * Store para manejar el estado de las tareas de la API
 * @type {import('svelte/store').Writable<Array<{id: number, title: string, completed: boolean, userId: number}>>}
 */
export const tareasAPI = writable([]);

/**
 * Store para manejar el estado de carga de la API
 */
export const cargandoAPI = writable(false);

/**
 * Store para manejar errores de la API
 * @type {import('svelte/store').Writable<string | null>}
 */
export const errorAPI = writable(null);

/**
 * Store derivado que calcula estadísticas de las tareas locales
 */
export const estadisticasLocales = derived(
	tareasLocales,
	($tareasLocales) => {
		const total = $tareasLocales.length;
		const completadas = $tareasLocales.filter(t => t.completed).length;
		const pendientes = total - completadas;
		
		return {
			total,
			completadas,
			pendientes,
			porcentajeCompletado: total > 0 ? Math.round((completadas / total) * 100) : 0
		};
	}
);

/**
 * Store derivado que calcula estadísticas de las tareas de la API
 */
export const estadisticasAPI = derived(
	tareasAPI,
	($tareasAPI) => {
		const total = $tareasAPI.length;
		const completadas = $tareasAPI.filter(t => t.completed).length;
		const pendientes = total - completadas;
		
		return {
			total,
			completadas,
			pendientes,
			porcentajeCompletado: total > 0 ? Math.round((completadas / total) * 100) : 0
		};
	}
);

/**
 * Funciones para manipular las tareas locales
 */
export const tareasActions = {
	/**
	 * Agrega una nueva tarea local
	 * @param {{title: string}} tarea - Datos de la nueva tarea
	 */
	agregar: (tarea) => {
		tareasLocales.update(tareas => [
			...tareas,
			{
				id: Date.now(),
				title: tarea.title,
				completed: false,
				createdAt: new Date().toISOString()
			}
		]);
	},

	/**
	 * Alterna el estado completado de una tarea
	 * @param {number} id - ID de la tarea
	 */
	toggle: (id) => {
		tareasLocales.update(tareas =>
			tareas.map(tarea =>
				tarea.id === id
					? { ...tarea, completed: !tarea.completed }
					: tarea
			)
		);
	},

	/**
	 * Elimina una tarea por ID
	 * @param {number} id - ID de la tarea a eliminar
	 */
	eliminar: (id) => {
		tareasLocales.update(tareas =>
			tareas.filter(tarea => tarea.id !== id)
		);
	},

	/**
	 * Limpia todas las tareas locales
	 */
	limpiar: () => {
		tareasLocales.set([]);
	},

	/**
	 * Elimina todas las tareas completadas
	 */
	limpiarCompletadas: () => {
		tareasLocales.update(tareas =>
			tareas.filter(tarea => !tarea.completed)
		);
	}
};

/**
 * Funciones para manejar las tareas de la API
 */
export const apiActions = {
	/**
	 * Establece las tareas obtenidas de la API
	 * @param {Array<{id: number, title: string, completed: boolean, userId: number}>} tareas - Lista de tareas de la API
	 */
	setTareas: (tareas) => {
		tareasAPI.set(tareas);
		errorAPI.set(null);
	},

	/**
	 * Establece el estado de carga
	 * @param {boolean} estado - True si está cargando
	 */
	setCargando: (estado) => {
		cargandoAPI.set(estado);
	},

	/**
	 * Establece un error de la API
	 * @param {string | null} error - Mensaje de error o null para limpiar
	 */
	setError: (error) => {
		errorAPI.set(error);
		cargandoAPI.set(false);
	},

	/**
	 * Limpia el error de la API
	 */
	limpiarError: () => {
		errorAPI.set(null);
	}
};