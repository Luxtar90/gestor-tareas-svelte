/**
 * Módulo para manejar las operaciones con la API de tareas
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Obtiene una lista de tareas desde la API
 * @param {number} limit - Número máximo de tareas a obtener
 * @returns {Promise<Array<{id: number, title: string, completed: boolean, userId: number}>>} Lista de tareas
 */
export async function obtenerTareas(limit = 5) {
	try {
		const response = await fetch(`${API_BASE_URL}/todos?_limit=${limit}`);
		
		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}
		
		const tareas = await response.json();
		return tareas;
	} catch (error) {
		console.error('Error al obtener tareas:', error);
		throw new Error('No se pudieron cargar las tareas desde la API');
	}
}

/**
 * Obtiene una tarea específica por ID
 * @param {number} id - ID de la tarea
 * @returns {Promise<{id: number, title: string, completed: boolean, userId: number}>} Tarea específica
 */
export async function obtenerTareaPorId(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/todos/${id}`);
		
		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error al obtener tarea:', error);
		throw new Error(`No se pudo cargar la tarea con ID ${id}`);
	}
}

/**
 * Simula crear una nueva tarea (JSONPlaceholder no persiste datos reales)
 * @param {{title: string, completed?: boolean}} tarea - Datos de la nueva tarea
 * @returns {Promise<{id: number, title: string, completed: boolean, userId: number}>} Tarea creada (simulada)
 */
export async function crearTarea(tarea) {
	try {
		const response = await fetch(`${API_BASE_URL}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: tarea.title,
				completed: tarea.completed || false,
				userId: 1
			})
		});
		
		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error al crear tarea:', error);
		throw new Error('No se pudo crear la tarea');
	}
}

/**
 * Simula actualizar una tarea existente
 * @param {number} id - ID de la tarea
 * @param {{title?: string, completed?: boolean, userId?: number}} datosActualizados - Nuevos datos de la tarea
 * @returns {Promise<{id: number, title: string, completed: boolean, userId: number}>} Tarea actualizada (simulada)
 */
export async function actualizarTarea(id, datosActualizados) {
	try {
		const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datosActualizados)
		});
		
		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error al actualizar tarea:', error);
		throw new Error(`No se pudo actualizar la tarea con ID ${id}`);
	}
}

/**
 * Simula eliminar una tarea
 * @param {number} id - ID de la tarea a eliminar
 * @returns {Promise<boolean>} True si se eliminó correctamente
 */
export async function eliminarTarea(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'DELETE'
		});
		
		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}
		
		return true;
	} catch (error) {
		console.error('Error al eliminar tarea:', error);
		throw new Error(`No se pudo eliminar la tarea con ID ${id}`);
	}
}