<script lang="ts">
  import { fade } from "svelte/transition";
  import { replace } from "svelte-spa-router";
  import { token } from "./storage";
  import { Button, Form, FormGroup, Input } from "sveltestrap";
  import { toast } from "@zerodevx/svelte-toast";

  $: if ($token !== null) replace("#/dashboard");

  let username: string = "";
  let password: string = "";

  async function submit() {
    if (!username.trim()) {
      toast.push("Введите имя пользователя.", {
        theme: { "--toastBackground": "var(--bs-red)" },
      });
      return;
    }

    if (password.trim().length < 8) {
      toast.push("Пароль должен быть не менее 8 символов.", {
        theme: { "--toastBackground": "var(--bs-red)" },
      });
      return;
    }

    const res = await fetch("https://api.brainyboat.ru/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      const json = await res.json();
      $token = json.token;
    } else if (res.status == 401) {
      toast.push("Неверное имя пользователя или пароль.", {
        theme: { "--toastBackground": "var(--bs-red)" },
      });
    }
  }
</script>

<div in:fade class="vh-100 d-flex justify-content-center align-items-center bg">
  <div class="p-5 shadow bg-white">
    <h1 class="h3 mb-4 fw-normal text-center">Вход в аккаунт</h1>
    <Form
      on:submit={(event) => {
        event.preventDefault();
      }}
    >
      <FormGroup floating label="Имя пользователя">
        <Input bind:value={username} placeholder="Введите значение" />
      </FormGroup>
      <FormGroup floating label="Пароль">
        <Input
          bind:value={password}
          type="password"
          placeholder="Введите значение"
        />
      </FormGroup>
      <Button type="submit" color="primary" class="w-100" on:click={submit}
        >Войти</Button
      >
    </Form>
  </div>
</div>

<style>
  .bg {
    background-image: url("../../assets/login-bg.jpg");
    background-size: cover;
    background-position: center;
  }
</style>
