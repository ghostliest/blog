import React from "react";
import ViewIcon from "@assets/eye.svg";
import { ViewsProps } from "./Views.props";

export const Views = ({ views, appearance }: ViewsProps) => (
  <div className="flex h-full items-end select-none">
    <span className="flex space-x-2 items-center text-sm">
      <ViewIcon className={`h-5 w-5 ${appearance === "dark" ? "fill-gray-400" : "fill-white"}`} />
      <span className={`font-medium ${appearance === "dark" ? "text-gray-900" : "text-white"}`}>{views}</span>
    </span>
  </div>
);
