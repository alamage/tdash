import { Time } from "./components/Time";
import { Today } from "./components/Today";
import { PowerManagement } from "./components/PowerManagement";
import { Volume } from "./components/Volume";
//import { debug, info } from "tauri-plugin-log-api";

function App() {
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <div class="w-screen h-screen flex flex-row gap-5 items-center justify-center select-none bg-black/70 text-white">
      <div class="h-full p-5 flex flex-col items-center justify-between">
        <Today />
        <Time />
        <div class="w-full text-2xl flex flex-row items-center justify-between">
          <Volume />
          <PowerManagement />
        </div>
      </div>
    </div>
  );
}

export default App;
