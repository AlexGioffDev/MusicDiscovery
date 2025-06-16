import { getSpotifyToken } from "./auth";

export const searchGenreorTag = async (q: string) => {
  const { access_token } = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=tag:${q}genre:${q}&type=playlist,album&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};
