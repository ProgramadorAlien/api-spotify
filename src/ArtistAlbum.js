import React, { useState, useEffect } from 'react';

const ArtistAlbums = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [albumNames, setAlbumNames] = useState([]);
  const artistId = '0TnOYISbd1XYRBk9myaseg';
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  const client_Id = '96fc017ba3434613a39f8031bab6a401';
  const client_Secret = 'a01e380ccced4096b6617971c748d583';
  const refresh_token = 'AQAq5sZjHWDniM5ZhSqqmNHJN1ty1_9P16cFLDPmhDlxMCb8Sw-xk6_qn8uQ9l9pmqYS4Q_oB-PjQCMzTbwlECXmJQQ-wMWJC2jPCY8eS22LxFn6vagOY5xU0HoW6dtkjHE';
  const token_Refresh_Endpoint = 'https://accounts.spotify.com/api/token';

  /*const client_Id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_Secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;*/

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch(token_Refresh_Endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_Id + ':' + client_Secret)
          },
          body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
          }).toString() // Convert URLSearchParams to string
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchArtistAlbums = async () => {
        try {
          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch artist albums');
          }

          const data = await response.json();
          setAlbumNames(data.items.map(item => item.name));
        } catch (error) {
          console.error('Failed to fetch artist albums:', error.message);
        }
      };

      fetchArtistAlbums();
    }
  }, [accessToken, url]);

  return (
    <div>
      <h1>Artist Albums</h1>
      <ul>
        {albumNames.map((albumName, index) => (
          <li key={index}>{albumName}</li>
        ))}
      </ul>
    </div>
  );
};

/*const ArtistAlbums = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [albumNames, setAlbumNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const artistId = '0TnOYISbd1XYRBk9myaseg';
    const client_Id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const client_Secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;
    const token_Refresh_Endpoint = 'https://accounts.spotify.com/api/token';
  
    useEffect(() => {
      const fetchAccessToken = async () => {
        try {
          const response = await fetch(token_Refresh_Endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(client_Id + ':' + client_Secret)
            },
            body: new URLSearchParams({
              'grant_type': 'refresh_token',
              'refresh_token': refresh_token
            }).toString() // Convert URLSearchParams to string
          });
  
          if (!response.ok) {
            //console.log(client_Id);
            throw new Error('Failed to fetch access token');
            
          }
  
          const data = await response.json();
          setAccessToken(data.access_token);
        } catch (error) {
          console.error('Error refreshing access token:', error);
        }
      };
  
      fetchAccessToken();
    }, [client_Id, client_Secret, refresh_token, token_Refresh_Endpoint]);
  
    useEffect(() => {
      if (accessToken) {
        const fetchArtistAlbums = async () => {
          setLoading(true);
          try {
            const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
  
            if (!response.ok) {
              throw new Error('Failed to fetch artist albums');
            }
  
            const data = await response.json();
            setAlbumNames(data.items.map(item => item.name));
          } catch (error) {
            console.error('Failed to fetch artist albums:', error.message);
          }
          setLoading(false);
        };
  
        fetchArtistAlbums();
      }
    }, [accessToken, artistId]);
  
    return (
      <div>
        <h1>Artist Albums</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {albumNames.map((albumName, index) => (
              <li key={index}>{albumName}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };*/
  
  export default ArtistAlbums;
