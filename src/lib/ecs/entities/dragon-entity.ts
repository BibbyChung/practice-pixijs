import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import type { assetsImgKey } from "../../pixi-assets";
import { BaseEntity } from "./base-entity";
import { getRGBA2Hex, getRandomInt, getSubject } from "../../common/utils";
import { gsap } from "gsap";
import { tap } from "rxjs";

export class DragonEntity extends BaseEntity {
  constructor() {
    super();
  }

  private play$ = getSubject<boolean>();

  async create(): Promise<void> {
    const c = new Container();

    const { imgHeight, imgWidth, imageData } = this.getImageInfo();
    const gap = 6;
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
          const atom = new Graphics().circle(w, h, 4).fill(hex);
          // const atom = new Graphics().rect(w, h, 6, 6).fill(hex);
          atom.pivot.set(atom.width / 2, atom.height / 2);
          atom.position.set(w, h);
          c.addChild(atom);

          // const sObj = { w, h };
          // const ani = gsap.to(sObj, {
          //   w: w + getRandomInt(-30, 30),
          //   h: h + getRandomInt(-30, 30),
          //   duration: 1,
          //   repeat: -1,
          //   yoyo: true,
          //   ease: "circ.inOut",
          //   paused: true,
          //   onUpdate: function () {
          //     const tObj = this.targets()[0] as typeof sObj;
          //     circle.position.set(tObj.w, tObj.h);
          //   },
          // });

          const sObj = { w, h };
          const ani = gsap.to(sObj, {
            w: w + getRandomInt(-60, 60),
            h: h + getRandomInt(-60, 60),
            duration: 1,
            paused: true,
            ease: "bounce.inOut",
            onUpdate: function () {
              const tObj = this.targets()[0] as typeof sObj;
              atom.position.set(tObj.w, tObj.h);
            },
            onComplete: function () {
              ani.reverse();
            },
          });

          this.play$
            .pipe(
              tap(() => {
                if (ani.isActive()) {
                  return;
                }

                ani.play();
              })
            )
            .subscribe();
        }
      }
    }

    const resolution = this._ge.devicePixelRatio;
    const actualWidth = imgWidth * resolution;
    const actualHeight = imgHeight * resolution;
    c.pivot.set(actualWidth / 2, actualHeight / 2);
    this.pixiElem = c;

    c.position.set(
      this._ge.pixiApp.screen.width / 2,
      this._ge.pixiApp.screen.height / 2
    );

    c.cursor = "pointer";
    c.eventMode = "static";
    c.hitArea = new Rectangle(0, 0, actualWidth, actualHeight);
    c.scale.set(0.5, 0.5);
    c.addEventListener("pointertap", (event) => {
      this.play$.next(true);
    });

    // for test
    // const texture = this._ge.loadScreenAssets["sonic"];
    // const ss = Sprite.from(texture);
    // this._ge.pixiApp.stage.addChild(ss);
  }

  private getImageInfo() {
    let canvas = document.createElement("canvas") as HTMLCanvasElement;
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
    const texture = this._ge.loadScreenAssets["sonic"];
    const img = texture.source.resource as ImageBitmap;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, 0, 0);

    const imgWidth = img.width;
    const imgHeight = img.height;

    let pixel = ctx!.getImageData(0, 0, imgWidth, imgHeight);
    let imageData = pixel.data;
    return { imgHeight, imgWidth, imageData };
  }
}
