<script lang="ts">
  import Router from "svelte-spa-router";

  import Home from "./home/Home.svelte";
  import NotFound from "./notfound/NotFound.svelte";
  import Dashboard from "./dashboard/Dashboard.svelte";
  import Login from "./auth/Login.svelte";

  const routes = {
    "/": Home,
    "/dashboard": Dashboard,
    "/login": Login,
    "*": NotFound,
  };
</script>

<Router {routes} />
