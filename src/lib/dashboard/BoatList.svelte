<script lang="ts">
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { Search } from "svelte-bootstrap-icons";
  import {
    Container,
    ListGroup,
    ListGroupItem,
    InputGroup,
    InputGroupText,
    Input,
  } from "sveltestrap";

  let dispatch = createEventDispatcher();

  let query: string = "";

  export let data: ShipData;
  let entries: ShipDataEntry[] = Object.values(data);
</script>

<Container class="pt-3">
  <h3 class="mb-3 fw-medium">Мои суда</h3>
  <InputGroup class="mb-4">
    <InputGroupText><Search /></InputGroupText>
    <Input
      type="search"
      name="search"
      id="exampleSearch"
      placeholder="Поиск по названию"
      bind:value={query}
    />
  </InputGroup>
  <ListGroup>
    {#each entries as entry}
      {#if entry.ship.name.toLowerCase().startsWith(query.toLowerCase())}
        <div transition:slide|local>
          <ListGroupItem
            tag="button"
            class="py-3"
            action
            on:click={() => {
              dispatch("entrySelect", entry);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              class="me-3"
              fill={entry.ship.color}
            >
              <path
                d="M156-200 82-457q-4-12 1.5-23.5T101-496l59-20v-224q0-25 17.5-42t42.5-18h150v-120h220v120h150q25 0 42.5 17.5T800-740v225l60 19q11 4 16.5 15t1.5 23l-74 258q-48-5-89.5-29T641-286q-32 36-72.5 61T480-200q-48 0-88.5-25T319-286q-32 33-73.5 57T156-200ZM80-40v-60h80q42 0 83-13t77-37q36 24 77 36t83 12q42 0 83-12t77-36q36 24 77 37t83 13h80v60h-80q-41 0-81-10.5T640-81q-39 20-80 30.5T480-40q-39 0-80-10.5T320-81q-39 20-79 30.5T160-40H80Zm140-495 260-84 260 85v-206H220v205Z"
              />
            </svg>
            {entry.ship.name}
          </ListGroupItem>
        </div>
      {/if}
    {/each}
  </ListGroup>
</Container>
