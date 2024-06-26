<script lang="ts">
  import { onMount } from "svelte";
  // import imgUrl from "../public/images/sonic.png";
  import imgUrl from "../public/images/soldier.png";
  // import imgUrl from "../public/images/girl.png";
  // import imgUrl from "../public/images/skull.png";
  import { getDragonEntity, getRootContainerEntity } from "./lib/ecs/creator";
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
  });
</script>

<main bind:this={mainElem}></main>

<img id="iiImg" src={imgUrl} alt="" style="display: none;" />

<style>
</style>
