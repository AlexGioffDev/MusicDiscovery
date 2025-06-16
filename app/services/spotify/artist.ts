import { getSpotifyToken } from "./auth";

export const getArtist = async (id: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const getArtistTopTracks = async (id: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getArtistAlbums = async (id: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}/albums`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getArtistBio = async (name: string) => {
  const API_BASE = "https://ws.audioscrobbler.com/2.0/";
  const res = await fetch(
    `${API_BASE}?method=artist.getinfo&artist=${name}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`
  );

  return await res.json();
};
