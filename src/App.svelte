<script lang="ts">
  import { onMount } from "svelte";
  import { getRootContainerEntity } from "./lib/ecs/entities/container-entity";
  import { getSpriteEntity } from "./lib/ecs/entities/sprite-entity";
  import { getTextEntity } from "./lib/ecs/entities/text-entity";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();

    const rec = getRootContainerEntity();
    world.addEntityWithComponent(rec.entity, rec.componentKV);

    // 創建一個文字
    const te = getTextEntity();
    world.addEntityWithComponent(te.entity, te.componentKV);

    // 創建一個 sprite
    const se = getSpriteEntity("ghost", 0.2, 0.2);
    world.addEntityWithComponent(se.entity, se.componentKV);
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
