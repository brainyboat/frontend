<script lang="ts">
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import Map from "./Map.svelte";
  import Navbar from "./Navbar.svelte";
  import { Spinner } from "sveltestrap";
  import BoatList from "./BoatList.svelte";
  import { fade } from "svelte/transition";
  import BoatInfo from "./BoatInfo.svelte";
  import { replace } from "svelte-spa-router";
  import { token } from "../auth/storage";

  $: if ($token === null) replace("#/login");

  let map: Map;
  let data: ShipData;
  let selectedTelemetry = null;

  function handleEntrySelect(event): void {
    selectedTelemetry = {
      isShip: true,
      ship: event.detail.ship,
      telemetry: event.detail.telemetry[0],
    };
    map.goTo([
      event.detail.telemetry[0].latitude,
      event.detail.telemetry[0].longitude,
    ]);
  }

  function handleTelemetrySelect(event): void {
    selectedTelemetry = event.detail;
  }

  const getShips = (async () => {
    await new Promise((r) => setTimeout(r, 1000));

    const ships: Ship[] = await fetch("https://api.brainyboat.ru/ship/get/my", {
      headers: {
        "X-Token": $token,
      },
    }).then((resp) => resp.json());
    const telemetries: Telemetry[] = await fetch(
      "https://api.brainyboat.ru/telemetry/get/my",
      {
        headers: {
          "X-Token": $token,
        },
      }
    ).then((resp) => resp.json());
    console.log(telemetries);

    data = ships.reduce((acc, ship) => {
      acc[ship.id] = {
        ship: ship,
        telemetry: telemetries.filter((t) => t.ship_id == ship.id),
      };
      return acc;
    }, {});
    console.log(data);
  })();
</script>

{#await getShips}
  <div
    in:fade
    class="vh-100 d-flex flex-column justify-content-center align-items-center"
  >
    <p>Загрузка...</p>
    <Spinner />
  </div>
{:then _}
  <div in:fade>
    <Splitpanes
      on:ready={() => setTimeout(map.updateSize, 0)}
      on:resize={map.updateSize}
      class="vh-100"
    >
      <Pane size={25} minSize={25}>
        <Splitpanes horizontal={true}>
          <Pane minSize={30}>
            <Navbar />
            <BoatList {data} on:entrySelect={handleEntrySelect} />
          </Pane>
          {#if selectedTelemetry !== null}
            <Pane size={40} minSize={40}>
              <BoatInfo
                ship={selectedTelemetry.ship}
                telemetry={selectedTelemetry.telemetry}
                isShip={selectedTelemetry.isShip}
                on:close={() => (selectedTelemetry = null)}
              />
            </Pane>
          {/if}
        </Splitpanes>
      </Pane>
      <Pane minSize={70} class="h-100 d-flex flex-column">
        <Map
          {data}
          bind:this={map}
          on:telemetrySelect={handleTelemetrySelect}
        />
      </Pane>
    </Splitpanes>
  </div>
{/await}
