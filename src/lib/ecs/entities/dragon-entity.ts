import { gsap } from "gsap";
import { Container, Graphics } from "pixi.js";
import { scan } from "rxjs";
import {
  getPointerDown,
  getRGBA2Hex,
  getRandomInt,
  type PositionXYType,
} from "../../common/utils";
import { BaseEntity } from "./base-entity";

export class DragonEntity extends BaseEntity {
  private pointerDown$ = getPointerDown();

  constructor() {
    super();
  }

  async create(): Promise<void> {
    const c = new Container();
    this.pixiElem = c;

    const shrink = 4 / 10;
    const enlarge = 1 / shrink;

    const { imgHeight, imgWidth, imageData } = await this.getImageInfo();
    const gap = 2;
    for (let h = 0; h < imgHeight; h += gap) {
      for (let w = 0; w < imgWidth; w += gap) {
        const position = (imgWidth * h + w) * 4;
        const r = imageData[position];
        const g = imageData[position + 1];
        const b = imageData[position + 2];

        // 透明是黑色的
        if (r + g + b !== 0) {
          const hex = getRGBA2Hex({ r, g, b, a: 1 });
          // const hex = getRGBA2Hex({ r: 255, g: 255, b: 255, a: 1 });
          // const atom = new Graphics().circle(w, h, 4).fill(hex);
          const atom = new Graphics().rect(w, h, 4, 4).fill(hex);
          atom.pivot.set(atom.width / 2, atom.height / 2);
          atom.position.set(w / 2, h / 2);
          c.addChild(atom);

          this.pointerDown$
            .pipe(
              scan(
                (
                  pre: {
                    diff?: PositionXYType;
                    gsap?: gsap.core.Tween;
                  },
                  info
                ) => {
                  if (!pre.diff) {
                    pre.diff = {
                      x: atom.x * shrink - this._ge.pixiApp.screen.width / 2,
                      y: atom.y * shrink - this._ge.pixiApp.screen.height / 2,
                    };
                  }

                  if (pre.gsap) {
                    pre.gsap.pause();
                    pre.gsap.kill();
                  }

                  const sObj = {
                    x: atom.x,
                    y: atom.y,
                  };
                  const ani = gsap.to(sObj, {
                    x: (info.x + pre.diff.x) * enlarge,
                    y: (info.y + pre.diff.y) * enlarge,
                    duration: getRandomInt(800, 3300) / 1000,
                    ease: "elastic.inOut",
                    paused: true,
                    // ease: "circ.inOut",
                    // overflow: "all",
                    onUpdate: function () {
                      const tObj = this.targets()[0] as typeof sObj;
                      atom.position.set(tObj.x, tObj.y);
                    },
                    onComplete: function () {
                      this.kill();
                    },
                  });
                  ani.play();

                  pre.gsap = ani;
                  return pre;
                },
                {}
              )
            )
            .subscribe();
        }
      }
    }

    // c.cursor = "pointer";
    // c.eventMode = "static";
    // c.hitArea = new Rectangle(0, 0, c.width, c.width);
    c.pivot.set(c.width / 2, c.height / 2);
    c.position.set(
      this._ge.pixiApp.screen.width / 2,
      this._ge.pixiApp.screen.height / 2
    );
    c.scale.set(shrink);
  }

  private async getImageInfo() {
    let canvas = this._ge.window.document.createElement(
      "canvas"
    ) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    // const img = new Image();
    // img.src = "/images/ghost.png";
    // await new Promise((resolve, reject) => {
    //   img.onload = function () {
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     ctx!.drawImage(img, 0, 0);
    //     // console.log(img);
    //     resolve("");
    //   };
    // });

    // const texture = this._ge.loadScreenAssets["sonic"];
    // const img = texture.source.resource as ImageBitmap;
    const elem = this._ge.window.document.querySelector(
      "#iiImg"
    ) as HTMLImageElement;
    const img = elem;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, 0, 0);

    const imgWidth = img.width;
    const imgHeight = img.height;

    let pixel = ctx!.getImageData(0, 0, imgWidth, imgHeight);
    let imageData = pixel.data;
    const result = { imgHeight, imgWidth, imageData };
    return result;
  }
}
