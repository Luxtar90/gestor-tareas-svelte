<script>
	import { createEventDispatcher } from 'svelte';
	
	export let tarea;
	export let esEditable = true;
	
	const dispatch = createEventDispatcher();
	
	function handleToggle() {
		if (esEditable) {
			dispatch('toggle', { id: tarea.id });
		}
	}
</script>

<li class="tarea" class:completada={tarea.completed}>
	<input 
		type="checkbox" 
		checked={tarea.completed}
		disabled={!esEditable}
		on:change={handleToggle}
	/>
	<span class="titulo">{tarea.title}</span>
	{#if tarea.userId}
		<small class="usuario">(Usuario {tarea.userId})</small>
	{/if}
</li>

<style>
	.tarea {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		margin-bottom: 0.5rem;
		background-color: white;
		border: 1px solid #eee;
		border-radius: 6px;
		transition: all 0.2s ease;
	}
	
	.tarea:hover {
		border-color: #ff3e00;
		box-shadow: 0 2px 4px rgba(255, 62, 0, 0.1);
	}
	
	.tarea.completada {
		opacity: 0.6;
		background-color: #f8f9fa;
	}
	
	.tarea.completada .titulo {
		text-decoration: line-through;
		color: #6c757d;
	}
	
	.titulo {
		flex: 1;
		font-size: 1rem;
		line-height: 1.4;
	}
	
	.usuario {
		color: #6c757d;
		font-size: 0.85rem;
		font-style: italic;
	}
	
	input[type="checkbox"] {
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	
	input[type="checkbox"]:disabled {
		cursor: not-allowed;
	}
</style>