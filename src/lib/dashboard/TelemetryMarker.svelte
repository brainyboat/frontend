<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { CircleFill } from "svelte-bootstrap-icons";
  import { Marker, DivIcon, CircleMarker } from "svelte-leafletjs";
  import { Tooltip } from "sveltestrap";

  const dispatch = createEventDispatcher();

  export let ship: Ship;
  export let telemetry: Telemetry;
  export let last: boolean;
</script>

{#if last}
  <Marker
    events={["click"]}
    on:click={() => dispatch("click")}
    latLng={[telemetry.latitude, telemetry.longitude]}
  >
    <DivIcon options={{ iconSize: [32, 32] }}>
      <svg
        id={`boat-${ship.id}`}
        width="32px"
        height="32px"
        transform={`rotate(${telemetry.angle})`}
        viewBox="0 0 12.7 12.7"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={ship.color}
      >
        <path
          d="M 6.3499999,-9.5367431e-8 3.3499999,3.2081344 V 12.7 h 6 V 3.2081344 Z"
        />
      </svg>
    </DivIcon>
    <Tooltip target={`boat-${ship.id}`}>{ship.name}</Tooltip>
  </Marker>
{:else}
  <CircleMarker
    latLng={[telemetry.latitude, telemetry.longitude]}
    fillColor={ship.color}
    fillOpacity={0.5}
    radius={6}
    events={["click"]}
    on:click={() => dispatch("click")}
    options={{
      stroke: false,
    }}
  />
{/if}
