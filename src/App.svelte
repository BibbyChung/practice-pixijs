<script lang="ts">
  import { onMount } from "svelte";
  import { ContainerComponent } from "./lib/components/container-component";
  import { InitComponent } from "./lib/components/init-component";
  import { PositionComponent } from "./lib/components/position-component";
  import { RootContainerEntity } from "./lib/entities/root-container-entity";
  import { TextEntity } from "./lib/entities/text-entity";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();

    const rootContainerEntity =
      world.entityManager.createEntity(RootContainerEntity);
    rootContainerEntity.addComponent(InitComponent, ContainerComponent);

    const textEntity = world.entityManager.createEntity(TextEntity);
    textEntity.addComponent(InitComponent, PositionComponent);
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
