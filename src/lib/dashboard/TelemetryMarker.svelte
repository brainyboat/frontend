<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { CircleFill } from "svelte-bootstrap-icons";
  import { Marker, DivIcon } from "svelte-leafletjs";
  import { Tooltip } from "sveltestrap";

  const dispatch = createEventDispatcher();

  export let ship: Ship;
  export let telemetry: Telemetry;
  export let last: boolean;
</script>

<Marker
  events={["click"]}
  on:click={() => dispatch("click")}
  latLng={[telemetry.latitude, telemetry.longitude]}
>
  {#if last}
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
  {:else}
    <DivIcon options={{ iconSize: [16, 16], iconAnchor: [8, 8] }}>
      <CircleFill fill={ship.color} width={16} height={16} />
    </DivIcon>
  {/if}
  <Tooltip target={`boat-${ship.id}`}>{ship.name}</Tooltip>
</Marker>
