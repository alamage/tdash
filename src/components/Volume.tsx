import { createSignal, type Component, Show } from "solid-js";
import { DashButton } from "./DashButton";
import { RiMediaVolumeUpFill as VolumeIcon } from "solid-icons/ri";
import { RiMediaVolumeMuteFill as VolumeMutedIcon } from "solid-icons/ri";
import { invoke } from "@tauri-apps/api";
import { debug } from "tauri-plugin-log-api";

const [volume, setVolume] = createSignal(0);
const [muted, setMuted] = createSignal(false);

debug("volume");

async function resyncVolume() {
  let vol: number = await invoke("get_volume");
  setVolume(vol);

  let muteState: boolean = await invoke("get_mute_state");
  setMuted(muteState);
}

async function toggleMute() {
  await invoke("toggle_mute");
}

async function setVolumeSystem(vol: number) {
  await invoke("set_volume", { volume: vol });
}

window.addEventListener("focus", () => {
  resyncVolume();
  const timer = setInterval(() => {
    resyncVolume();
  }, 200);
  window.addEventListener("blur", () => clearInterval(timer));
});

export const Volume: Component = () => {
  return (
    <div class="flex flex-row text-2xl gap-2 items-center justify-center align-center">
      <Show when={muted()}>
        <DashButton tooltip="Unmute" onclick={toggleMute}>
          <VolumeMutedIcon />
        </DashButton>
      </Show>
      <Show when={!muted()}>
        <DashButton tooltip="Mute" onclick={toggleMute}>
          <VolumeIcon />
        </DashButton>
        <input
          class="hover:cursor-pointer accent-slate-500"
          type="range"
          min="0"
          max="100"
          step="10"
          value={volume()}
          onChange={(e) => {
            setVolumeSystem(parseInt(e.target.value));
            setVolume(parseInt(e.target.value));
          }}
        />
      </Show>
    </div>
  );
};
