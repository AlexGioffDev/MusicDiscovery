import { getSpotifyToken } from "./auth";

export const getTopTracks = async () => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    "https://api.spotify.com/v1/playlists/6mtYuOxzl58vSGnEDtZ9uB/tracks",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getIndieTracks = async () => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    "https://api.spotify.com/v1/playlists/4E6TJ1FRmiR8S8FcHYniec/tracks",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getJapaneseRockTracks = async () => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    "https://api.spotify.com/v1/playlists/4qEFDymNzoHnq7ADcmuR61/tracks",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getPlaylist = async (id: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};
