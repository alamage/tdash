import { createSignal, onMount, type Component } from "solid-js";

const [time, setTime] = createSignal<Date>(new Date());

window.addEventListener("focus", () => {
  setTime(new Date());
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);
  window.addEventListener("blur", () => clearInterval(timer));
});

onMount(() => {});

export const Time: Component = () => {
  return (
    <div class="flex flex-col items-center justify-center">
      <div class="font-mono text-6xl">
        {time().toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );
};
