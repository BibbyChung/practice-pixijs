<script lang="ts">
  import { onMount } from "svelte";
  import {
    getDragonEntity,
    getRootContainerEntity,
    getSpriteEntity,
    getTextEntity,
  } from "./lib/ecs/creator";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();

    const rec = getRootContainerEntity();
    world.addEntityWithComponent(rec.entity, rec.componentKV);

    const de = getDragonEntity();
    world.addEntityWithComponent(de.entity, de.componentKV);

    // // 創建一個文字
    // const te = getTextEntity();
    // world.addEntityWithComponent(te.entity, te.componentKV);

    // // 創建一個 sprite
    // const se = getSpriteEntity("ghost", 0.3, 0.3);
    // world.addEntityWithComponent(se.entity, se.componentKV);
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
