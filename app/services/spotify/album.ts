import { getSpotifyToken } from "./auth";

export const getAlbum = async (id: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const getAlbumBio = async (artist: string, albumName: string) => {
  const API_BASE = "https://ws.audioscrobbler.com/2.0/";
  const res = await fetch(
    `${API_BASE}?method=album.getinfo&artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(albumName)}&api_key=${
      process.env.NEXT_PUBLIC_LASTFM_API_KEY
    }&format=json`
  );

  return await res.json();
};

export const getAlbumTracks = async (id: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/albums/${id}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};
