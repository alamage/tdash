import { type Component } from "solid-js";
import { DashButton } from "./DashButton";
import { TbClockPause as SuspendIcon } from "solid-icons/tb";
import { RiDeviceRestartLine as RestartIcon } from "solid-icons/ri";
import { RiDeviceShutDownLine as ShutDownIcon } from "solid-icons/ri";

import { invoke } from "@tauri-apps/api";

export const PowerManagement: Component = () => {
  return (
    <div class="flex flex-row gap-5">
      <DashButton tooltip="Suspend" onclick={() => invoke("system_sleep")}>
        <SuspendIcon />
      </DashButton>
      <DashButton tooltip="Restart" onclick={() => invoke("system_reboot")}>
        <RestartIcon />
      </DashButton>
      <DashButton tooltip="Shut Down" onclick={() => invoke("system_shutdown")}>
        <ShutDownIcon />
      </DashButton>
    </div>
  );
};
