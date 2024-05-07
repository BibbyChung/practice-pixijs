<script lang="ts">
  import { Application, Text } from "pixi.js";

  let mainElem: HTMLElement;

  // 創建 PIXI 應用程式
  const app = new Application();
  app
    .init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x061626,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
      autoDensity: true,
    })
    .then(() => {
      // app.renderer.resize(window.innerWidth, window.innerHeight);
      // 將應用程式添加到 DOM 中
      mainElem.appendChild(app.canvas);

      // 創建一個文字
      const text = new Text({
        text: "Hello, Pixi!",
        anchor: { x: 0.5, y: 0.5 },
        style: {
          fontSize: 48,
          fill: "white",
          align: "center",
        },
      });

      // 設定文字 position 置中
      text.position.set(app.screen.width / 2, app.screen.height / 2);

      // // 將文字添加到應用程式中
      app.stage.addChild(text);
    });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
