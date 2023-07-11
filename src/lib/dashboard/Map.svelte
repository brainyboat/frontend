<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { LeafletMap, TileLayer, Polyline } from "svelte-leafletjs";
  import TelemetryMarker from "./TelemetryMarker.svelte";

  const dispatch = createEventDispatcher();

  const mapOptions = {
    center: [40, 90],
    zoom: 3,
    attributionControl: false,
  };
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
  };

  let map: LeafletMap;

  export function updateSize() {
    map.getMap().invalidateSize();
  }

  export function goTo(latlng: LatLng) {
    map.getMap().flyTo(latlng, 6, {
      duration: 1,
    });
  }

  export let data: ShipData;
  let entries: ShipDataEntry[] = Object.values(data);
</script>

<LeafletMap bind:this={map} options={mapOptions}>
  <TileLayer url={tileUrl} options={tileLayerOptions} />
  {#each entries as entry}
    {#each entry.telemetry as telemetry, i}
      >
      <TelemetryMarker
        on:click={() =>
          dispatch("telemetrySelect", {
            telemetry: telemetry,
            ship: entry.ship,
            isShip: i === 0,
          })}
        last={i === 0}
        ship={entry.ship}
        {telemetry}
      />
    {/each}
    {#if entry.ship.course !== null}
      <Polyline
        latLngs={entry.ship.course}
        color={entry.ship.color}
        opacity={0.5}
      />
    {/if}
  {/each}
</LeafletMap>
