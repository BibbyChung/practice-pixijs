import { Assets, Texture } from "pixi.js";

let _loadScreenAssets: Record<"ghost", Texture>;
export const getLoadScreenAssets = () => {
  if (!_loadScreenAssets) {
    throw new Error(
      'please execute this "setLoadScreenAssetsBundle" method first'
    );
  }
  return _loadScreenAssets;
};
export const setLoadScreenAssetsBundle = async () => {
  const textureObj = await Assets.loadBundle("load-screen");
  _loadScreenAssets = textureObj;
};

let _gameScreenAssets: Record<string, Texture>;
export const getGameScreenAssets = () => {
  if (!_gameScreenAssets) {
    throw new Error(
      'please execute this "setGameScreenAssetsBundle" method first'
    );
  }
  return _gameScreenAssets;
};
export let setGameScreenAssetsBundle = async (
  func: (progress: number) => Promise<any>
) => {
  const textureObj = await Assets.loadBundle("game-screen", func);
  return (_gameScreenAssets = textureObj);
};
