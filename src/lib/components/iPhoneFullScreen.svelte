<script lang="ts">
  import { onMount } from "svelte";
  import scrollImg from "../../assets/images/HANDPOINT.png";
  import { inIframe, isBarHidden, isPortrait } from "../common/device/detecter";
  import {
    getSubject,
    getWindow,
    setIsIPhoneFullScreen,
  } from "../common/utils";
  import {
    debounce,
    debounceTime,
    fromEvent,
    merge,
    switchMap,
    tap,
  } from "rxjs";

  const isReady$ = getSubject<boolean>();

  let holding = false;

  const triggerMask = () => {
    if (holding) {
      return;
    }

    // const w = getWindow();

    // const img = w.document.querySelector(".scroll") as HTMLElement;
    // const mask = w.document.querySelector(".mask") as HTMLElement;

    if (isPortrait() || isBarHidden()) {
      setIsIPhoneFullScreen(false);
      // img.style.visibility = "hidden";
      // mask.style.visibility = "hidden";

      return;
    }

    setIsIPhoneFullScreen(true);
    // img.style.visibility = "visible";
    // mask.style.visibility = "visible";

    scrollToTop();
  };

  const scrollToTop = () => window.scrollTo({ top: 0 });

  const maskTouchstartSub = isReady$
    .pipe(
      switchMap(() => {
        const w = getWindow();
        const mask = w.document.querySelector(".mask") as HTMLElement;
        return fromEvent(mask, "touchstart");
      }),
      tap(() => {
        holding = true;
      })
    )
    .subscribe();

  const maskTouchendSub = isReady$
    .pipe(
      switchMap(() => {
        const w = getWindow();
        const mask = w.document.querySelector(".mask") as HTMLElement;
        return fromEvent(mask, "touchend");
      }),
      tap(() => {
        holding = false;
        triggerMask();
      })
    )
    .subscribe();

  const resizeAndOrientationchangeSub = isReady$
    .pipe(
      switchMap(() => {
        const w = getWindow();
        return merge(fromEvent(w, "resize"), fromEvent(w, "orientationchange"));
      }),
      debounceTime(300),
      tap((event) => {
        triggerMask();
      })
    )
    .subscribe();

  onMount(() => {
    isReady$.next(true);
    if (inIframe()) {
      return;
    }

    scrollToTop();
    triggerMask();

    return () => {
      resizeAndOrientationchangeSub.unsubscribe();
      maskTouchstartSub.unsubscribe();
      maskTouchendSub.unsubscribe();
    };
  });
</script>

<div class="scroll">
  <img src={scrollImg} alt="" />
</div>

<div>
  <div class="mask"></div>
</div>

<style>
  .mask {
    width: 100%;
    height: 400%;

    position: absolute;
    top: 0px;
    left: 0px;

    z-index: 5;
  }

  .scroll {
    background: black;
    opacity: 0.7;
    position: fixed;
    width: 100%;
    height: 100%;

    z-index: 5;
  }

  .scroll img {
    height: 16vh;

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: move 1s infinite;
  }

  @keyframes move {
    0% {
      top: 60%;
      opacity: 0;
    }
    100% {
      top: 50%;
      opacity: 1;
    }
  }
</style>
