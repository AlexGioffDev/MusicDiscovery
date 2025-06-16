"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlayer } from "../context/PlayerContext";

interface PropsPage {
  track: any;
}

function CardSong({ track }: PropsPage) {
  const { openPlayer } = usePlayer();

  const handlePlayeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openPlayer(track.track.id);
  };

  return (
    <div className="group flex flex-col gap-y-2 hover:bg-[#1f1f1f]  p-2 rounded-lg min-w-[177.73px] h-[250px] relative">
      <div className="relative w-[153.73px] min-h-[153.73px] mx-auto">
        <Image
          src={track.track.album.images[0].url}
          alt={track.track.name}
          fill
          className="object-cover rounded-lg"
        />
        <button
          onClick={handlePlayeClick}
          className="cursor-pointer bg-green-800 w-8 h-8 rounded-full absolute -z-10 opacity-0 group-hover:opacity-100 group-hover:bottom-2 group-hover:z-10 right-2 -bottom-10 flex items-center justify-center transition-all duration-300 hover:bg-green-400"
        >
          <p className="text-stone-900 font-black text-sm">▶</p>
        </button>
      </div>
      <div className="text-justify space-y-1">
        <p className="font-medium text-stone-400 whitespace-break-spaces">
          {track.track.name}
        </p>
      </div>
      <Link href={`/albums/${track.track.album.id}`}>
        <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in hover:text-green-500">
          More from album
        </p>
      </Link>
    </div>
  );
}

export default CardSong;
