<script lang="ts">
  import closeBtn from "../../assets/images/iPhone/iphone_close_btn.png";
  import iPhoneHand from "../../assets/images/iPhone/iphone_hand.png";
  import iPhoneHeader from "../../assets/images/iPhone/iphone_header.png";
  import iPhoneMenuHover from "../../assets/images/iPhone/iphone_menu_hover.png";
  import iPhoneMenuNormal from "../../assets/images/iPhone/iphone_menu_normal.png";
  import step1 from "../../assets/images/iPhone/iphone_step1.png";
  import step2 from "../../assets/images/iPhone/iphone_step2.png";
  import iPhoneWindow from "../../assets/images/iPhone/iphone_window.png";

  import { gsap } from "gsap";
  import { debounceTime, fromEvent, switchMap, take, tap } from "rxjs";
  import { onMount } from "svelte";
  import { isPortrait } from "../common/device/detecter";
  import {
    getBehaviorSubject,
    getSubject,
    getWindow,
    setIsIPhoneHideToolbar,
  } from "../common/utils";

  const isReady$ = getSubject<boolean>();
  const playAnim$ = getSubject<boolean>();
  const isPlayAnimDone$ = getBehaviorSubject(false);
  const previousHeight$ = getBehaviorSubject(window.innerHeight);
  // const isSelfVisible$ = getBehaviorSubject(true);

  const resizeSub = isReady$
    .pipe(
      switchMap(() => {
        const w = getWindow();
        return fromEvent(w, "resize");
      }),
      debounceTime(460),
      tap((event) => {
        const currentHeight = window.innerHeight;
        const toolbarHidden = currentHeight > previousHeight$.value;

        if (toolbarHidden) {
          setIsIPhoneHideToolbar(false);
        }
      })
    )
    .subscribe();

  const orientationchangeSub = isReady$
    .pipe(
      switchMap(() => {
        const w = getWindow();
        return fromEvent(w, "orientationchange");
      }),
      debounceTime(460),
      tap((event) => {
        previousHeight$.next(window.innerHeight);

        if (!isPortrait()) {
          playAnim$.next(true);
        }
      })
    )
    .subscribe();

  const playAniSub = playAnim$
    .pipe(
      take(1),
      tap(() => {
        const w = getWindow();

        const hand = w.document.querySelector(".iphoneHand") as HTMLElement;
        const menu = w.document.querySelector(".guideMenu") as HTMLElement;
        // const guideMain = document.querySelector(".guideMain") as HTMLElement;

        const tl = gsap.timeline();
        tl.to(hand, {
          x: "-353%",
          y: "-284%",
          duration: 1,
          delay: 1,
          onComplete: () => {
            menu.style.visibility = "visible";
          },
        }).to(
          hand,
          {
            x: "250%",
            y: "-50%",
            duration: 1,
            onComplete: () => {
              isPlayAnimDone$.next(true);
            },
          },
          "+=0.2"
        );
      })
    )
    .subscribe();

  onMount(() => {
    isReady$.next(true);

    if (!isPortrait()) {
      playAnim$.next(true);
    }

    return () => {
      resizeSub.unsubscribe();
      orientationchangeSub.unsubscribe();
      playAniSub.unsubscribe();
    };
  });
</script>

<div class="guideMain">
  <div class="guidePage">
    <div class="iPhoneScreen">
      <img src={iPhoneHeader} alt="" />
      <img id="iphoneWindow" src={iPhoneWindow} alt="" />
    </div>
  </div>

  <div class="guideDesc">
    <div class="descContainer">
      <img class="stepImage" src={step1} alt="" />
      <div class="desc">Click ᴀA on the address bar</div>
      <img class="stepImage" src={step2} alt="" />
      <div class="desc">Click "Hide Toolbar" in the menu</div>
    </div>
  </div>

  <div class="guideMenu">
    <div class="safariMenu">
      {#if $isPlayAnimDone$}
        <img id="menuImg" src={iPhoneMenuHover} alt="" />
      {:else}
        <img id="menuImg" src={iPhoneMenuNormal} alt="" />
      {/if}
      <div class="overlayText">Hide Toolbar</div>
    </div>
  </div>

  <div class="guideHand">
    <img class="iphoneHand" src={iPhoneHand} alt="" />
  </div>

  <div class="guideClose">
    <button on:click|preventDefault={() => setIsIPhoneHideToolbar(false)}>
      <img id="closeBtn" src={closeBtn} alt="" />
    </button>
  </div>
</div>

<style>
  .hidden {
    display: none !important;
  }
  .guideMain {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .guidePage {
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .guidePage img {
    width: 100%;
    display: block;
    object-fit: fill;
  }

  .iPhoneScreen {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .guideMenu {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 7;
    top: 50%;
    left: 0;
    visibility: hidden;
  }

  .guideMenu img {
    width: 100%;
    height: 100%;
    border-radius: 5%;
    display: inline-block;
  }

  .safariMenu {
    position: absolute;
    width: 30%;
    margin-left: 30vw;
    margin-top: -14%;
  }

  .overlayText {
    position: absolute;
    margin: 0 auto;
    color: #ffffff;
    padding: 8px 16px;
    font-size: 2.2vw;
    top: 48%;
    transform: translateY(-50%);
  }

  .guideHand {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 8;
    top: 50%;
  }

  .iphoneHand {
    position: absolute;
    display: inline-block;
    width: 4vw;
    margin-left: 45%;
  }

  .guideDesc {
    width: 30%;
    height: 100%;
    margin-left: 60vw;
    position: relative;
    z-index: 6;
  }

  .descContainer {
    position: relative;
    top: 55%;
    transform: translateY(-50%);
  }

  .desc {
    color: #000000;
    padding: 1.5vh 1.5vw;
    font-size: 2.3vw;
    text-align: center;
  }

  .stepImage {
    width: 4vw;
    display: block;
    margin: auto;
  }

  .guideClose {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
  }

  #closeBtn {
    position: absolute;
    width: 6vw;
    top: 4vh;
    right: 4vh;
  }
</style>
