<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Container } from "sveltestrap";

  const dispatch = createEventDispatcher();

  export let ship: Ship;
  export let telemetry: Telemetry;
  export let isShip: boolean;
</script>

<Container class="pt-3">
  <h3 class="tw-medium">Информация о судне</h3>
  <ul>
    <li>Название: {ship.name}</li>
    <li>Идентификатор: {ship.imai}</li>
  </ul>
  <h3 class="tw-medium">Телеметрия</h3>
  <ul>
    <li>Дата: {telemetry.datetime}</li>
    <li>Широта: {telemetry.latitude}°</li>
    <li>Долгота: {telemetry.longitude}°</li>
    <li>Внутренняя температура: {telemetry.temperature}°C</li>
    <li>Курс (отн. севера): {telemetry.angle}°</li>
    <li>Ср. скорость: {telemetry.velocity} км/ч</li>
  </ul>
  {#if isShip}
    <Button color="primary">Построить маршрут</Button>
  {/if}
  <Button color="secondary" outline on:click={() => dispatch("close")}
    >Закрыть</Button
  >
</Container>
