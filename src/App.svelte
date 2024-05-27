<script lang="ts">
  import { onMount } from "svelte";
  import { ButtonEntity } from "./lib/entities/button-entity";
  import { TextEntity } from "./lib/entities/text-entity";
  import { getGameEngine } from "./lib/game-engine";
  import { setPixiRoot } from "./lib/pixi-application";
  import { RootContainerEntity } from "./lib/entities/root-container-entity";

  let mainElem: HTMLElement;

  onMount(() => {
    setPixiRoot(mainElem).then(async () => {
      const world = await getGameEngine();
      await world.pixiAsssets.setLoadScreenAssetsBundle();

      const rootContainer01 = new RootContainerEntity();
      world.addEntity(rootContainer01);

      // 創建一個文字
      const textObj01 = new TextEntity("Hello, Pixi!", {
        fontSize: 48,
        fill: "white",
        align: "center",
      });
      world.addEntity(textObj01);

      // 創建一個 button
      const button01 = new ButtonEntity();
      world.addEntity(button01);
    });
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
