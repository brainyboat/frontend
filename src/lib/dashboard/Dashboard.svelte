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
            [43.400580655642806, 39.96366457384003],
            [43.400536807481444, 39.96341378731928],
            [43.40039503154605, 39.96367262047013],
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
            datetime: "2023-07-12 10:59:24",
            longitude: 39.96366457384003,
            latitude: 43.400580655642806,
            temperature: 35,
            voltage: 40,
            velocity: 2,
            angle: 237,
          },
          {
            id: 0,
            ship_id: 1,
            datetime: "2023-07-12 10:45:02",
            longitude: 39.96355166375034,
            latitude: 43.4005832002323,
            temperature: 32,
            voltage: 40,
            velocity: 0,
            angle: 123,
          },
          {
            id: 0,
            ship_id: 1,
            datetime: "2023-07-12 10:41:23",
            longitude: 39.9635671890402,
            latitude: 43.4005374528411,
            temperature: 34,
            voltage: 40,
            velocity: 1.2,
            angle: 62,
          },
          {
            id: 0,
            ship_id: 1,
            datetime: "2023-07-12 10:35:58",
            longitude: 39.963638777876724,
            latitude: 43.40041775744858,
            temperature: 31,
            voltage: 31,
            velocity: 1,
            angle: 72,
          },
        ],
      },
      2: {
        ship: {
          id: 2,
          imai: 8734975947,
          color: "#57e",
          name: "Торговое судно Vladivostok",
          course: null,
          owner: {
            id: 1,
            username: "arslee",
          },
        },
        telemetry: [
          {
            id: 0,
            ship_id: 2,
            datetime: "2023-07-11 13:18:52",
            longitude: 131.87310102361326,
            latitude: 43.100959336101035,
            temperature: 72,
            voltage: 0,
            velocity: 0,
            angle: 120,
          },
        ],
      },
      3: {
        ship: {
          id: 3,
          imai: 9439856893,
          color: "#393",
          name: "Титаник",
          course: [
            [50.90008037655605, -1.4169236786368151],
            [50.77903309083203, -1.2324892537274128],
            [50.715992750420504, -0.9804816856359307],
            [50.124124863322145, -1.492103806045563],
            [49.659441687637546, -1.6213829409570812],
            [49.857527766958626, -1.9244879653284166],
            [46.258364645087774, -27.624628758007276],
            [41.59067005333575, -50.13860087184059],
            [40.061795281117014, -62.59797092134915],
            [40.5411895627008, -73.84280788180112],
          ],
          owner: {
            id: 1,
            username: "arslee",
          },
        },
        telemetry: [
          {
            id: 0,
            ship_id: 3,
            datetime: "2023-04-14 17:10:48",
            longitude: -62.59797092134915,
            latitude: 40.061795281117014,
            temperature: undefined,
            voltage: 0,
            velocity: undefined,
            angle: 240,
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
