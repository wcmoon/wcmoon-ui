<svelte:options tag="wm-dialog"/>

<script lang="ts">

export let width:number = 600;

let buttonEl;
function sayHello() {
  buttonEl.dispatchEvent(new CustomEvent('message', {detail: {text: 'hello'}, composed: true} ))
}

</script>

dialog
{width}

<button on:click={sayHello} bind:this={buttonEl}>click</button>
