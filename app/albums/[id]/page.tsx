import {
  getAlbum,
  getAlbumBio,
  getAlbumTracks,
} from "@/app/services/spotify/album";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AlbumPageProps {
  id: string;
}

async function AlbumPage({ params }: { params: Promise<AlbumPageProps> }) {
  const { id } = await params;
  const album = await getAlbum(id);
  const tracks = await getAlbumTracks(id);

  const albumBio = await getAlbumBio(album.artists[0].name, album.name);
  const wiki: string | undefined = albumBio.album.wiki?.content;
  const textWiki: string = wiki
    ? wiki.split("<a href=")[0].trim()
    : "No description for this album";
  return (
    <div className="max-w-7xl mx-auto max-h-[80vh] p-4  border border-green-400 rounded-lg  flex flex-col md:flex-row  gap-2 overflow-y-auto md:overflow-hidden">
      <div className="   md:w-1/3">
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={album.images[0].url}
            alt="cover"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <ul className="p-2">
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Album</p>
            <p className="font-semibold uppercase">{album.name}</p>
          </li>
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Artist</p>
            <Link href={`/artists/${album.artists[0].id}`}>
              <p className="font-semibold uppercase text-green-500">
                {album.artists[0].name}
              </p>
            </Link>
          </li>
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Label</p>
            <p className="font-semibold uppercase">{album.label}</p>
          </li>
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Release Data</p>
            <p className="font-semibold uppercase">{album.release_date}</p>
          </li>
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Popularity</p>
            <p className="font-semibold uppercase">{album.popularity}</p>
          </li>
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Type</p>
            <p className="font-semibold uppercase">{album.type}</p>
          </li>
        </ul>
        <hr className="mx-2" />
        <div className="p-2">
          <p className="overflow-y-auto text-justify text-stone-300 h-[200px]">
            {textWiki}
          </p>
        </div>
      </div>
      <div className="md:w-2/3 p-3">
        <h1 className="font-semibold text-lg uppercase">Songs</h1>
        <div className="space-y-4 py-5 overflow-y-auto h-[650px]">
          {tracks.items.map((track: any, idx: number) => (
            <div key={track.name + "-#" + idx + track.artists[0].name}>
              <iframe
                src={`https://open.spotify.com/embed/track/${track.id}`}
                width="100%s"
                height="80"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
                loading="lazy"
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlbumPage;
