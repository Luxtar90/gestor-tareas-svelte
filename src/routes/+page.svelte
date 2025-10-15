<script>
	import { onMount } from 'svelte';
	import { tareasLocales, tareasAPI, cargandoAPI, errorAPI, estadisticasLocales, tareasActions, apiActions } from '$lib/stores/tareasStore.js';
	import { obtenerTareas } from '$lib/api/tareas.js';
	import TareaItem from '$lib/components/TareaItem.svelte';
	import FormularioTarea from '$lib/components/FormularioTarea.svelte';
	import ListaTareas from '$lib/components/ListaTareas.svelte';

	// Variables básicas
	let nombre = '';
	const appTitle = 'Gestor de Tareas';

	// Cargar tareas de la API al montar el componente
	onMount(async () => {
		apiActions.setCargando(true);
		try {
			const tareas = await obtenerTareas(5);
			apiActions.setTareas(tareas);
		} catch (error) {
			apiActions.setError(error.message);
		} finally {
			apiActions.setCargando(false);
		}
	});

	// Función para manejar nuevas tareas
	function manejarNuevaTarea(event) {
		const { title } = event.detail;
		tareasActions.agregar({ title });
	}

	// Función para alternar estado de tareas locales
	function manejarToggleTarea(event) {
		const { id } = event.detail;
		tareasActions.toggle(id);
	}
</script>

<svelte:head>
	<title>{appTitle}</title>
</svelte:head>

<div class="container">
	<header class="text-center mb-6">
		<h1 class="text-3xl font-bold text-primary mb-4">{appTitle}</h1>
		
		<div class="card mb-6">
			<div class="card-body">
				<label for="nombre" class="block text-sm font-semibold text-gray-600 mb-2">
					¿Cuál es tu nombre?
				</label>
				<input 
					id="nombre"
					class="input"
					type="text" 
					bind:value={nombre} 
					placeholder="Escribe tu nombre aquí"
				/>
			</div>
		</div>

		{#if nombre}
			<div class="card mb-6">
				<div class="card-body">
					<p class="text-lg">¡Hola, <span class="font-bold text-primary">{nombre}</span>! 👋</p>
					<p class="text-gray-600">Bienvenido a tu gestor personal de tareas</p>
				</div>
			</div>
		{/if}
	</header>

	<main class="grid gap-6 md:grid-cols-2">
		<!-- Sección de tareas locales -->
		<section class="card">
			<div class="card-header">
				<h2 class="text-xl font-semibold flex items-center justify-between">
					Mis Tareas Personales
					{#if $estadisticasLocales.total > 0}
						<span class="badge badge-primary">
							{$estadisticasLocales.completadas}/{$estadisticasLocales.total}
						</span>
					{/if}
				</h2>
			</div>
			<div class="card-body">
				<FormularioTarea 
					placeholder="Escribe una nueva tarea..."
					textoBoton="Agregar Tarea"
					on:agregar={manejarNuevaTarea}
				/>
				
				<div class="mt-6">
					<ListaTareas 
						tareas={$tareasLocales}
						titulo="Tareas Locales"
						esEditable={true}
						mensajeVacio="No tienes tareas aún. ¡Agrega una nueva!"
						mostrarContador={false}
						on:toggle={manejarToggleTarea}
					/>
				</div>

				{#if $estadisticasLocales.total > 0}
					<div class="mt-4 p-4 bg-gray-50 rounded-lg">
						<h3 class="font-semibold text-gray-700 mb-2">Estadísticas</h3>
						<div class="grid grid-cols-3 gap-4 text-center">
							<div>
								<div class="text-2xl font-bold text-primary">{$estadisticasLocales.total}</div>
								<div class="text-xs text-gray-500">Total</div>
							</div>
							<div>
								<div class="text-2xl font-bold text-success">{$estadisticasLocales.completadas}</div>
								<div class="text-xs text-gray-500">Completadas</div>
							</div>
							<div>
								<div class="text-2xl font-bold text-warning">{$estadisticasLocales.pendientes}</div>
								<div class="text-xs text-gray-500">Pendientes</div>
							</div>
						</div>
						<div class="mt-3">
							<div class="bg-gray-200 rounded-full h-2">
								<div 
									class="bg-primary h-2 rounded-full transition-all duration-300"
									style="width: {$estadisticasLocales.porcentajeCompletado}%"
								></div>
							</div>
							<p class="text-center text-sm text-gray-600 mt-1">
								{$estadisticasLocales.porcentajeCompletado}% completado
							</p>
						</div>
					</div>
				{/if}
			</div>
		</section>

		<!-- Sección de tareas de la API -->
		<section class="card">
			<div class="card-header">
				<h2 class="text-xl font-semibold">Tareas de Ejemplo (API)</h2>
			</div>
			<div class="card-body">
				{#if $cargandoAPI}
					<div class="flex items-center justify-center p-8">
						<div class="spinner mr-2"></div>
						<span class="text-gray-600">Cargando tareas...</span>
					</div>
				{:else if $errorAPI}
					<div class="p-4 bg-error-light border border-error rounded-lg">
						<p class="text-error font-semibold">Error al cargar tareas</p>
						<p class="text-sm text-gray-600 mt-1">{$errorAPI}</p>
					</div>
				{:else}
					<ListaTareas 
						tareas={$tareasAPI}
						titulo="Tareas de la API"
						esEditable={false}
						mensajeVacio="No se encontraron tareas de la API"
						mostrarContador={true}
					/>
				{/if}
			</div>
		</section>
	</main>
</div>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: Arial, sans-serif;
	}
	
	h1 {
		color: #ff3e00;
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.seccion {
		margin-bottom: 2rem;
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		background-color: #f9f9f9;
	}
	
	.seccion h2 {
		color: #333;
		margin-top: 0;
		margin-bottom: 1rem;
	}
	
	input[type="text"] {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
		width: 100%;
		max-width: 300px;
	}
	
	.input-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}
	
	button {
		padding: 0.5rem 1rem;
		background-color: #ff3e00;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}
	
	button:hover {
		background-color: #e63900;
	}
	
	.lista-tareas {
		list-style: none;
		padding: 0;
	}
	
	.tarea {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		background-color: white;
		border: 1px solid #eee;
		border-radius: 4px;
	}
	
	.tarea.completada {
		opacity: 0.6;
		text-decoration: line-through;
	}
	
	.mensaje-vacio {
		color: #666;
		font-style: italic;
	}
	
	.cargando {
		color: #666;
		font-style: italic;
	}
	
	.error {
		color: #d32f2f;
		font-weight: bold;
	}
	
	small {
		color: #666;
		margin-left: auto;
	}
	
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}
</style>
