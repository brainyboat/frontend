<script lang="ts">
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import Map from "./Map.svelte";
  import Navbar from "./Navbar.svelte";
  import { Spinner } from "sveltestrap";
  import BoatList from "./BoatList.svelte";
  import { fade } from "svelte/transition";
  import BoatInfo from "./BoatInfo.svelte";

  let map: Map;
  let data: ShipData;
  let selectedTelemetry = null;

  function handleEntrySelect(event): void {
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
    data = {
      1: {
        ship: {
          id: 1,
          imai: 75719834,
          color: "#856",
          name: "Тестовое судно",
          course: [
            [0, 0],
            [15, 15],
            [20, 30],
          ],
          owner: {
            id: 1,
            username: "arslee",
          },
        },
        telemetry: [
          {
            id: 0,
            ship_id: 1,
            datetime: "",
            longitude: 0,
            latitude: 0,
            temperature: 0,
            voltage: 0,
            velocity: 0,
            angle: 76,
          },
          {
            id: 0,
            ship_id: 1,
            datetime: "",
            longitude: 15,
            latitude: 15,
            temperature: 0,
            voltage: 0,
            velocity: 0,
            angle: 0,
          },
          {
            id: 0,
            ship_id: 1,
            datetime: "",
            longitude: 30,
            latitude: 20,
            temperature: 0,
            voltage: 0,
            angle: 0,
            velocity: 0,
          },
        ],
      },
    };
  })();
</script>

{#await getShips}
  <div
    transition:fade
    class="vh-100 d-flex flex-column justify-content-center align-items-center"
  >
    <p>Загрузка...</p>
    <Spinner />
  </div>
{:then _}
  <div transition:fade>
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
