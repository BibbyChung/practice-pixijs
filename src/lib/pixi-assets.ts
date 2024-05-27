import { Assets, Texture } from "pixi.js";

export class PixiAssets {
  private _loadScreenAssets?: Record<"ghost", Texture>;
  private _gameScreenAssets: Record<string, Texture> = {};

  getLoadScreenAssets() {
    return this._loadScreenAssets;
  }
  async setLoadScreenAssetsBundle() {
    const textureObj = await Assets.loadBundle("load-screen");
    this._loadScreenAssets = textureObj;
  }

  getGameScreenAssets() {
    return this._gameScreenAssets;
  }
  async setGameScreenAssetsBundle(func: (progress: number) => Promise<any>) {
    const textureObj = await Assets.loadBundle("game-screen", func);
    this._gameScreenAssets = textureObj;
  }
}
