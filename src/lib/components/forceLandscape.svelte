<script lang="ts">
  import { onMount } from 'svelte'
  import rotateImg from '../../assets/images/rotate.jpg'

  onMount(() => {
    return () => {}
  })
</script>

<div class="rotate">
  <img src={rotateImg} alt="" />
</div>

<style>
  .rotate {
    background: white;
    height: 100%;
    width: 100%;
    position: fixed;

    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rotate img {
    height: 32vh;
  }

  @media (orientation: landscape) {
    .rotate {
      visibility: hidden;
    }
  }
</style>
