import React from "react";
import Views from "@assets/eye.svg";
import Posts from "@assets/post.svg";
import Likes from "@assets/heart.svg";
import Favorites from "@assets/bookmark.svg";
import Followers from "@assets/profile.svg";

interface LabelsProps {
  statisticsLength: number | null;
}

const labels = [
  { type: "views", icon: Views },
  { type: "posts", icon: Posts },
  { type: "likes", icon: Likes },
  { type: "favorites", icon: Favorites },
  { type: "followers", icon: Followers },
];

export const Labels = ({ statisticsLength }: LabelsProps) => {
  return statisticsLength ? (
    <div className="flex flex-row pl-[52px] pr-1 py-2 bg-indigo-50 rounded-xl">
      {labels.map(({ type, icon: Icon }) => (
        <span key={type} className="flex flex-1 justify-center w-1/2 cursor-help group">
          <span className="relative">
            <Icon className="h-5 w-5 fill-indigo-500 transition-all group-hover:scale-110" />
            <div className="absolute bg-stone-800 text-white text-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-200%] invisible font-semibold rounded-md px-2 py-1 transition-all opacity-0 z-50 group-hover:opacity-100 group-hover:visible">
              {type.toUpperCase()}
            </div>
          </span>
        </span>
      ))}
    </div>
  ) : (
    <></>
  );
};
