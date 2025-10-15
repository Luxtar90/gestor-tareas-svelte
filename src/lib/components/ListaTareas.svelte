<script>
	import { createEventDispatcher } from 'svelte';
	import TareaItem from './TareaItem.svelte';
	
	export let tareas = [];
	export let titulo = 'Lista de Tareas';
	export let esEditable = true;
	export let mensajeVacio = 'No hay tareas disponibles';
	export let mostrarContador = true;
	
	const dispatch = createEventDispatcher();
	
	function handleToggleTarea(event) {
		dispatch('toggle', event.detail);
	}
	
	$: totalTareas = tareas.length;
	$: tareasCompletadas = tareas.filter(t => t.completed).length;
	$: tareasPendientes = totalTareas - tareasCompletadas;
</script>

<div class="lista-container">
	<div class="header">
		<h2 class="titulo">{titulo}</h2>
		{#if mostrarContador && totalTareas > 0}
			<div class="contador">
				<span class="total">{totalTareas} total</span>
				{#if esEditable}
					<span class="pendientes">{tareasPendientes} pendientes</span>
					<span class="completadas">{tareasCompletadas} completadas</span>
				{/if}
			</div>
		{/if}
	</div>
	
	{#if tareas.length > 0}
		<ul class="lista-tareas">
			{#each tareas as tarea (tarea.id)}
				<TareaItem 
					{tarea} 
					{esEditable}
					on:toggle={handleToggleTarea}
				/>
			{/each}
		</ul>
	{:else}
		<div class="mensaje-vacio">
			<p>{mensajeVacio}</p>
		</div>
	{/if}
</div>

<style>
	.lista-container {
		background-color: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 1rem;
	}
	
	.titulo {
		color: #333;
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
	}
	
	.contador {
		display: flex;
		gap: 1rem;
		font-size: 0.9rem;
		flex-wrap: wrap;
	}
	
	.total {
		color: #495057;
		font-weight: 500;
	}
	
	.pendientes {
		color: #fd7e14;
		font-weight: 500;
	}
	
	.completadas {
		color: #28a745;
		font-weight: 500;
	}
	
	.lista-tareas {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.mensaje-vacio {
		text-align: center;
		padding: 2rem;
		color: #6c757d;
		font-style: italic;
	}
	
	.mensaje-vacio p {
		margin: 0;
		font-size: 1.1rem;
	}
	
	@media (max-width: 600px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
		}
		
		.contador {
			justify-content: flex-start;
		}
	}
</style>