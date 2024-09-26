import { globby } from 'globby'
import { writeFileSync } from 'node:fs'
import { dirname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRootPath = join(__dirname, '../')

const getAliasName = (path: string) => {
  const p = parse(path)
  const prefix = p.dir
    .replace(process.env.BASE ?? '/', '')
    .split('/')
    .slice(1)
    .join('/')
  return `${join(prefix, p.name)}${p.ext}`
}

const createScreenType = async (
  fileName: string,
  typeName: string,
  ...assetsPatten: string[][]
) => {
  const pathsArr = await Promise.all(
    assetsPatten.map(async (assetsPatten) => {
      const paths = await globby(assetsPatten)

      return paths.map((a) => a.replace('public/', process.env.BASE ?? '/'))
    })
  )
  const assetsPaths = pathsArr.flat()

  const assetsFileName = assetsPaths
    .map((a) => `'${getAliasName(a)}'`)
    .filter((a, index, arr) => arr.indexOf(a) === index)
    .join(', ')
  const assetsTypeResult = `export const ${typeName} = [
  ${assetsFileName}
] as const
`
  writeFileSync(join(projectRootPath, 'src/_generate', fileName), assetsTypeResult)

  return assetsPaths
}

const createManifestJSON = (
  loadAssetsInfo: string[],
  gameAssetsInfo: string[],
  fileName: string
) => {
  const loadScreenInfo = loadAssetsInfo.map((a) => {
    const aliasName = getAliasName(a)
    const obj = {
      alias: aliasName,
      src: a,
    }
    return obj
  })

  const gameScreenInfo = gameAssetsInfo.map((a) => {
    const aliasName = getAliasName(a)
    const obj = {
      alias: aliasName,
      src: a,
    }
    return obj
  })

  const manifestJSON = `{
  "bundles": [
    {
      "name": "load-screen",
      "assets": ${JSON.stringify(loadScreenInfo)}
    },
    {
      "name": "game-screen",
      "assets": ${JSON.stringify(gameScreenInfo)}
    }
  ]
}
`
  writeFileSync(join(projectRootPath, 'src/_generate', fileName), manifestJSON)
}

export const genAssetsTypeFiles = async () => {
  const loadScreenAssetsInfo = await createScreenType(
    'loadScreenAssetsType.generate.ts',
    'LoadScreenAssetKeys',
    ['public/game/load-screen/**/*.{png,jpg,jpeg,json}', '!public/game/load-screen/spines'],
    ['public/game/load-screen/spines/**/*.json']
  )

  const gameScreenAssetsInfo = await createScreenType(
    'gameScreenAssetsType.generate.ts',
    'GameScreenAssetKeys',
    [
      'public/game/game-screen/**/*.{png,jpg,jpeg,json,svg,ttf}',
      '!public/game/game-screen/spines',
      '!public/game/game-screen/bitmapText',
    ],
    ['public/game/game-screen/spines/**/*.json'],
    ['public/game/game-screen/bitmapText/**/*.xml']
  )

  createManifestJSON(loadScreenAssetsInfo, gameScreenAssetsInfo, 'manifest.generate.json')
}
