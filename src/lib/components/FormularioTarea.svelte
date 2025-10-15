<script>
	import { createEventDispatcher } from 'svelte';
	
	export let placeholder = 'Escribe una nueva tarea';
	export let buttonText = 'Agregar Tarea';
	
	let nuevaTarea = '';
	const dispatch = createEventDispatcher();
	
	function handleSubmit() {
		if (nuevaTarea.trim()) {
			dispatch('agregar', {
				title: nuevaTarea.trim(),
				completed: false
			});
			nuevaTarea = '';
		}
	}
	
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<div class="formulario-container">
	<div class="input-group">
		<input 
			type="text" 
			bind:value={nuevaTarea} 
			{placeholder}
			on:keydown={handleKeydown}
			class="input-tarea"
		/>
		<button 
			on:click={handleSubmit}
			disabled={!nuevaTarea.trim()}
			class="btn-agregar"
		>
			{buttonText}
		</button>
	</div>
</div>

<style>
	.formulario-container {
		margin-bottom: 1.5rem;
	}
	
	.input-group {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
	}
	
	.input-tarea {
		flex: 1;
		min-width: 250px;
		padding: 0.75rem;
		border: 2px solid #e9ecef;
		border-radius: 6px;
		font-size: 1rem;
		transition: border-color 0.2s ease;
	}
	
	.input-tarea:focus {
		outline: none;
		border-color: #ff3e00;
		box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.1);
	}
	
	.btn-agregar {
		padding: 0.75rem 1.5rem;
		background-color: #ff3e00;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.2s ease;
		white-space: nowrap;
	}
	
	.btn-agregar:hover:not(:disabled) {
		background-color: #e63900;
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(255, 62, 0, 0.2);
	}
	
	.btn-agregar:disabled {
		background-color: #6c757d;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}
	
	@media (max-width: 600px) {
		.input-group {
			flex-direction: column;
		}
		
		.input-tarea {
			width: 100%;
			min-width: unset;
		}
		
		.btn-agregar {
			width: 100%;
		}
	}
</style>