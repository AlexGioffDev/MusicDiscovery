import SongsLists from "./components/SongsLists";
import {
  getIndieTracks,
  getJapaneseRockTracks,
  getTopTracks,
} from "./services/spotify";
import { searchGenreorTag } from "./services/spotify/search";

export default async function Home() {
  const [topTracksData, indieTracksData, jRockTracksData] = await Promise.all([
    getTopTracks(),
    getIndieTracks(),
    getJapaneseRockTracks(),
  ]);

  const topTracks = (topTracksData?.items || []).reduce(
    (unique: any[], track: any) => {
      if (!unique.some((t) => t.track.id === track.track.id)) {
        unique.push(track);
      }
      return unique;
    },
    []
  );

  const indieTracks = (indieTracksData?.items || []).reduce(
    (unique: any[], track: any) => {
      if (!unique.some((t) => t.track.id === track.track.id)) {
        unique.push(track);
      }
      return unique;
    },
    []
  );

  const jrockTracks = (jRockTracksData?.items || []).reduce(
    (unique: any[], track: any) => {
      if (!unique.some((t) => t.track.id === track.track.id)) {
        unique.push(track);
      }
      return unique;
    },
    []
  );
  return (
    <main className="max-w-7xl mt-10 mx-auto max-h-[80vh] overflow-y-auto p-4 space-y-2">
      <SongsLists
        title="Pop Hits 2000s-2025 Playlists!"
        tracks={topTracks}
        keyCategory="global-records"
      />
      <SongsLists
        title="Found new song!"
        tracks={indieTracks}
        keyCategory="indie-song"
      />
      <SongsLists
        title="Rock from JAPAN 🇯🇵"
        tracks={jrockTracks}
        keyCategory="jrock-song"
      />
    </main>
  );
}
