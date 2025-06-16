import { getPlaylist } from "@/app/services/spotify";
import Image from "next/image";

interface PlaylistPageProps {
  id: string;
}

async function PlaylistPage({
  params,
}: {
  params: Promise<PlaylistPageProps>;
}) {
  const { id } = await params;
  const data = await getPlaylist(id);
  const songs = (data?.tracks?.items || []).filter(
    (item: any) => item?.track?.id
  );

  return (
    <div className="max-w-7xl mx-auto max-h-[80vh] p-4  border border-green-400 rounded-lg  flex flex-col md:flex-row  gap-2 overflow-y-auto md:overflow-hidden">
      <div className="  md:w-1/3">
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={data.images[0].url}
            alt="cover"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <ul className="p-2">
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Playlist</p>
            <p className="font-semibold uppercase">{data.name}</p>
          </li>
          <li className="w-full p-1 flex items-center justify-between">
            <p className="text-stone-500">Owner</p>
            <p className="font-semibold uppercase">{data.owner.display_name}</p>
          </li>
        </ul>
        {data.description != "" && (
          <>
            <hr />
            <div className="p-2">
              <p className="overflow-y-auto text-justify text-stone-300 h-[200px]">
                {data.description}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="md:w-2/3 p-3">
        <h1 className="font-semibold text-lg uppercase">Songs</h1>
        <div className="space-y-4 py-5 overflow-y-auto h-[650px]">
          {songs.map((track: any, idx: number) => (
            <div key={track.name + "-#" + idx + "track"}>
              <iframe
                src={`https://open.spotify.com/embed/track/${track.track.id}`}
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

export default PlaylistPage;
