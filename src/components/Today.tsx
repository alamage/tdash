import { createSignal, onMount, type Component } from "solid-js";

const [dateTime, setDateTime] = createSignal<Date>(new Date());

window.addEventListener("focus", () => {
  setDateTime(new Date());
  const timer = setInterval(() => {
    setDateTime(new Date());
  }, 60000);
  window.addEventListener("blur", () => clearInterval(timer));
});

onMount(() => {});

export const Today: Component = () => {
  return (
    <div class="w-full flex flex-col items-center justify-center">
      <div class="font-mono text-2xl flex flex-row w-full justify-between">
        <div>
          {dateTime().toLocaleDateString("en-us", {
            weekday: "short",
          })}
        </div>
        <div>
          {dateTime().toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};
