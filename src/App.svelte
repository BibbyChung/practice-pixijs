<script lang="ts">
  import { onMount } from "svelte";
  import { ButtonEntity } from "./lib/entities/button-entity";
  import { TextEntity } from "./lib/entities/text-entity";
  import { getGameSystem } from "./lib/game-system";
  import { setPixiRoot } from "./lib/pixi";

  let mainElem: HTMLElement;

  onMount(() => {
    setPixiRoot(mainElem).then(() => {
      const world = getGameSystem();

      // 創建一個文字
      const textObj01 = new TextEntity("Hello, Pixi!", {
        fontSize: 48,
        fill: "white",
        align: "center",
      });
      world.add<TextEntity>(textObj01);

      // 創建一個 button
      const button01 = new ButtonEntity();
      world.add<ButtonEntity>(button01);
    });
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
