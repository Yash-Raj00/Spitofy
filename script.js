let ppBtn = document.getElementById("pp");
// ppBtn.addEventListener("click", () => {
//   const img = ppBtn.querySelector("img");
//   if (img.src.includes("playSong")) {
//     playSong();
//     img.src = "pause.svg";
//   } else {
//     pauseSong();
//     img.src = "playSong.svg";
//   }
// });
let volumeBtn = document.querySelector("#volume");
volumeBtn.addEventListener("click", () => {
  if (volumeBtn.src.includes("volume_full.svg")) {
    // muteVolume();
    volumeBtn.src = "volume_mute.svg";
  } else {
    // onvolume();
    volumeBtn.src = "volume_full.svg";
    // volumeBtn.src = currentVolumeState;
  }
});

function pauseSong() {
  console.log("Song Paused");
}

// API Code:
const token =
  "BQCZf5GUwNNWxLLSxgMpvabQVs5YDFQvCyFnGrPjaYA5qyH2746jhDHAUVoYwMR_CH0JYnvTyIJ-6hFRzC3joGv4LlU-zrcN_k-bzeus5nYSY7_Joe4";
const deviceId = "b41714134c618ce83765109b2c5a84c0636d0aea";

const APIController = (function () {
  clientId = "caa9c06fd59149cdb35fa84207a9a771";
  clientSecret = "917ea1001e6b487899c498711cef19ea";

  //private methods
  const _getToken = async () => {
    try {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });
      if (!result.ok) console.error("error");

      const data = await result.json();
      return data.access_token;
    } catch (error) {
      console.error(error);
    }
  };

  const _getDeviceId = async (token) => {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const _getGenres = async (token) => {
    const response = await fetch(
      "https://api.spotify.com/v1/browse/categories?locale=sv_IN",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    return data.categories.items;
  };
  const _getPlaylistByGenre = async (token, genreId) => {
    const limit = 20;
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await response.json();
    return data.playlists.items;
  };

  const _getTracks = async (token, tracksEndpoint) => {
    const limit = 20;
    const response = await fetch(`${tracksEndpoint}?limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = response.json();
    return data.items;
  };

  const _getTrack = async (token, trackEndpoint) => {
    const response = await fetch(`${trackEndpoint}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = response.json();
    return data;
  };

  return {
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    getDeviceId(token) {
      return _getDeviceId(token);
    },
    getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndpoint) {
      return _getTracks(token, tracksEndpoint);
    },
    getTrack(token, trackEndpoint) {
      return _getTrack(token, trackEndpoint);
    },
  };
})();

const main = (async function () {
  try {
    // console.log(await APIController.getToken());
    console.log(await APIController.getDeviceId(token));
  } catch (error) {
    console.error(error);
  }
  // try {
  //   const response = await fetch(
  //     "https://api.spotify.com/v1/search?q=Daaku%2520artist%3ABadshah&type=track&offset=0&limit=10",
  //     // "https://api.spotify.com/v1/search?q=Daaku&type=track",
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   const items = data.tracks.items;
  //   console.log(items[0].album.href)
  //   const audio = new Audio(items[0].album.href);

  //   async function playSong(track) {
  //     try {
  //         const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
  //             method: 'PUT',
  //             headers: {
  //                 'Authorization': `Bearer ${token}`,
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({
  //                 uris: [track]
  //             })
  //         });

  //         // if (!response.ok) {
  //         //     throw new Error('Failed to play song');
  //         // }

  //         // console.log('Song played successfully');
  //     } catch (error) {
  //         console.error('Error playing song:', error);
  //     }

  //     console.log("Song Played");
  // }

  //   ppBtn.addEventListener("click", () => {
  //     const img = ppBtn.querySelector("img");
  //     if (img.src.includes("playSong")) {
  //       playSong(audio);
  //       img.src = "pause.svg";
  //     } else {
  //       pauseSong();
  //       img.src = "playSong.svg";
  //     }
  //   });

  //   //   console.log(items[0].href);
  // } catch (error) {
  //   console.error(error);
  // }
})();
