import CardSong from "./CardSong";

interface PropsPage {
  title: string;
  keyCategory: string;
  tracks: any[];
}

function SongsLists({ title, tracks, keyCategory }: PropsPage) {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="w-full overflow-x-auto flex gap-10 py-5 overflow-y-hidden">
        {tracks.map((track: any, idx: number) => (
          <CardSong
            key={track.track.id + `${keyCategory} #` + idx}
            track={track}
          />
        ))}
      </div>
    </section>
  );
}

export default SongsLists;
