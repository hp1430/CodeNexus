import { useEffect, useState } from 'react';

export const useLocalMedia = () => {
  const [stream, setStream] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let currentStream = null;

    const startMedia = async () => {
      try {
        setLoading(true);

        currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(currentStream);
      } catch (error) {
        console.log('Error while accessing camera/microphone', error);
        setError('Failed to access camera/microphone');
      } finally {
        setLoading(false);
      }
    };
    startMedia();

    return () => {
      currentStream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return {
    stream,
    loading,
    error,
  };
};
