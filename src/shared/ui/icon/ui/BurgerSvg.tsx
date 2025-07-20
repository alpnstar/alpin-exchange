import React from "react";

export const BurgerSvg = () => {
  return (
    <svg
      className="fill-PrimaryText hover:animate-flashYellow"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 4h16v3H4V4zm0 6.5h16v3H4v-3zM20 17H4v3h16v-3z"
      ></path>
    </svg>
  );
};
