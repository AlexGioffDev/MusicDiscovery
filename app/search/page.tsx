import Image from "next/image";
import { searchGenreorTag } from "../services/spotify/search";
import { redirect } from "next/navigation";
import Link from "next/link";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const value = (await searchParams).q;

  if (!value) {
    redirect("/");
  }

  const results = await searchGenreorTag(value);
  const validAlbums =
    results.albums?.items?.reduce((acc: any[], item: any) => {
      if (item) acc.push(item);
      return acc;
    }, []) || [];

  const validPlaylists =
    results.playlists?.items?.reduce((acc: any[], item: any) => {
      if (item) acc.push(item);
      return acc;
    }, []) || [];

  console.log(validPlaylists[0]);

  return (
    <div className="max-w-7xl mx-auto max-h-[80vh] p-4  border border-green-400 rounded-lg  space-y-8 overflow-hidden">
      <h1 className="uppercase font-semibold text-stone-400">
        Search results for:{" "}
        <span className="font-black text-green-500 text-2xl">{value}</span>
      </h1>
      <div className="h-[600px] overflow-y-auto space-y-6">
        {validAlbums.length > 0 && (
          <section className="w-full space-y-3">
            <h2 className="font-semibold uppercase text-green-500">Albums</h2>
            <div className="overflow-x-auto w-full flex gap-5 items-center">
              {validAlbums.map((album: any) => {
                return (
                  <Link
                    href={`/albums/${album.id}`}
                    key={`Album-name:${album.name}#${album.id}`}
                  >
                    <div>
                      <div className="relative min-w-[300px] h-[250px]">
                        <Image
                          alt="cover album"
                          src={album.images[0].url}
                          fill
                          className="object-cover rounded border border-green-500"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        {validPlaylists.length > 0 && (
          <section className="w-full space-y-3">
            <h2 className="font-semibold text-green-500 uppercase">
              Playlists
            </h2>
            <div className="overflow-x-auto w-full flex gap-5 items-center">
              {validPlaylists.map((playlist: any) => {
                return (
                  <Link href={`/playlist/${playlist.id}`}>
                    <div key={`playlist-name:${playlist.name}#${playlist.id}`}>
                      <div className="relative min-w-[300px] h-[250px]">
                        <Image
                          alt="cover playlist"
                          src={playlist.images[0].url}
                          fill
                          className="object-cover rounded border border-green-500"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default page;
