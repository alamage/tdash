import { type JSXElement, type Component, type JSX } from "solid-js";

interface Props {
  onclick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  tooltip: string;
  children: JSXElement;
}

export const DashButton: Component<Props> = ({
  onclick,
  tooltip,
  children,
}) => {
  return (
    <div class="group relative w-max flex justify-center items-center">
      <button class="hover:cursor-pointer" onClick={onclick}>
        {children}
      </button>
      <span class="pointer-events-none absolute -top-7 left-[50%] translate-x-[-50%] w-max opacity-0 transition-opacity group-hover:opacity-100 text-sm font-bold bg-white text-black px-2 rounded-md">
        {tooltip}
        <svg
          class="absolute text-white h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </span>
    </div>
  );
};
