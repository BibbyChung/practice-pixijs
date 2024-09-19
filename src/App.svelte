<script lang="ts">
  import { tap } from 'rxjs'
  import { onMount } from 'svelte'
  import { inIframe, isMobile, isSafari, isTablet } from '~/lib/common/device/detecter'
  import { isFullScreenSupport } from '~/lib/common/device/toggleFullScreen'
  import {
    getBehaviorSubject,
    getIsIPhoneFullScreen,
    getIsIPhoneHideToolbar,
    getSubject,
    getWindow,
    setIsIPhoneFullScreen,
    setIsIPhoneHideToolbar,
  } from '~/lib/common/utils'
  import ForceLandscape from '~/lib/components/forceLandscape.svelte'
  import IPhoneFullScreen from '~/lib/components/iPhoneFullScreen.svelte'
  import IPhoneHideToolbar from '~/lib/components/iPhoneHideToolbar.svelte'

  export const isSvelteAppReady$ = getBehaviorSubject<HTMLElement | null>(null)

  let gameCanvasElem: HTMLElement

  const isReady$ = getSubject<boolean>()
  const isForceLandscape$ = getBehaviorSubject(false)
  const isIPhoneHideToolbar$ = getIsIPhoneHideToolbar()
  const isIPhoneFullScreen$ = getIsIPhoneFullScreen()

  const deviceDetectorSub = isReady$
    .pipe(
      tap(() => {
        const w = getWindow()

        if (isMobile() || isTablet()) {
          isForceLandscape$.next(true)
        }

        if (isMobile() && !isTablet() && !isFullScreenSupport(w.document.body)) {
          if (inIframe()) {
            if (isSafari()) {
              setIsIPhoneHideToolbar(true)
            }
          } else {
            setIsIPhoneFullScreen(true)
          }
        }
        // setIsIPhoneHideToolbar(true);// use it for test
      })
    )
    .subscribe()

  onMount(() => {
    isSvelteAppReady$.next(gameCanvasElem)

    return () => {
      deviceDetectorSub.unsubscribe()
    }
  })
</script>

{#if $isIPhoneHideToolbar$}
  <IPhoneHideToolbar />
{/if}
{#if $isIPhoneFullScreen$}
  <IPhoneFullScreen />
{/if}
{#if $isForceLandscape$}
  <ForceLandscape />
{/if}
<main bind:this={gameCanvasElem}></main>

<style>
</style>
