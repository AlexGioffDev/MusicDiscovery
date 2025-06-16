import {
  getArtist,
  getArtistAlbums,
  getArtistBio,
  getArtistTopTracks,
} from "@/app/services/spotify/artist";
import { cleanBioText } from "@/app/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ArtistPageProps {
  id: string;
}

async function ArtistPage({ params }: { params: Promise<ArtistPageProps> }) {
  const { id } = await params;
  const artist = await getArtist(id);
  const artistTopTracks = await getArtistTopTracks(id);
  const artistAlbums = await getArtistAlbums(id);
  const artistBio = await getArtistBio(artist.name);

  const cleanBio = cleanBioText(artistBio.artist.bio.content);

  return (
    <div className="max-w-7xl mx-auto max-h-[80vh] p-4  border border-green-400 rounded-lg  flex flex-col md:flex-row  gap-2 overflow-y-auto md:overflow-hidden">
      <div className="md:w-1/3">
        <div className="w-full relative h-[300px] overflow-hidden">
          <Image
            alt="artist"
            src={artist.images[0].url}
            fill
            className="object-cover rounded-lg border border-green-500 overflow-hidden"
          />
        </div>
        <ul className="space-y-3 p-2">
          <li className="flex items-center justify-between">
            <p className="font-semibold uppercase text-stone-400 text-sm">
              Name
            </p>
            <p className="text-green-400 uppercase font-black -xl">
              {artist.name}
            </p>
          </li>
          {artist.genres?.length > 0 && (
            <li className="flex items-start justify-between gap-4">
              <p className="font-semibold uppercase text-stone-400 text-sm whitespace-nowrap">
                Genres
              </p>
              <div className="flex flex-wrap gap-2">
                {artist.genres.map((genre: any, idx: number) => {
                  if (idx > 1) return;
                  return (
                    <span
                      className="text-green-400 uppercase font-black text-sm"
                      key={genre}
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>
            </li>
          )}
          <li className="flex items-center justify-between">
            <p className="font-semibold uppercase text-stone-400 text-sm">
              Followers
            </p>
            <p className="text-green-400 uppercase font-black -xl">
              {new Intl.NumberFormat("es-ES").format(artist.followers.total)}
            </p>
          </li>
        </ul>
        <hr className="mx-2" />
        <div className="p-2">
          <p className="overflow-y-auto text-left text-stone-300 h-[300px] whitespace-pre-line">
            {cleanBio}
          </p>
        </div>
      </div>
      <div className="md:w-2/3 px-5 py-2 space-y-5">
        <section className="space-y-3">
          <h3 className="text-green-400 uppercase font-semibold">Albums</h3>
          <div className="flex gap-6 items-center px-2 overflow-x-auto">
            {artistAlbums.items.map((album: any, idx: number) => {
              return (
                <Link
                  href={`/albums/${album.id}`}
                  className="cursor-pointer"
                  key={`Album: ${album.id}`}
                >
                  <div className="min-w-[200px] h-[200px] relative">
                    <Image
                      alt={`Cover ${album.name}`}
                      fill
                      className="object-cover rounded-lg border border-green-400"
                      src={album.images[0].url}
                      loading="lazy"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-green-400 uppercase font-semibold">Top Songs</h3>
          <div className="flex flex-col h-[400px] overflow-y-auto gap-6 items-center px-2 overflow-x-auto">
            {artistTopTracks.tracks.map((track: any, idx: number) => {
              return (
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}`}
                  width="100%"
                  height="80"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
                  loading="lazy"
                  key={`Track: ${track.name} #${idx}`}
                  className="rounded"
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ArtistPage;
