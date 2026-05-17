import { VideoPlayer } from '@/components/molecules/VideoCall/VideoPlayer/VideoPlayer';
import { usePlaygroundStore } from '@/hooks/store/usePlaygroundStore';
import { useLocalMedia } from '@/hooks/videoCall/useLocalMedia';
import { createPeerConnection } from '@/service/peerConnectionManager';
import { useEffect, useRef, useState } from 'react';

export const VideoCallSection = () => {
  const { stream, loading, error } = useLocalMedia();
  const peerConnectionsRef = useRef(new Map());
  const [remoteStreams, setRemoteStreams] = useState({});

  const { socket, users } = usePlaygroundStore();

  useEffect(() => {
    if (!stream || !users?.length || !socket) return;

    users.forEach((user) => {
      // Skip self
      if (user.socketId === socket.id) return;

      // Prevent duplicates
      if (peerConnectionsRef.current.has(user.socketId)) {
        return;
      }

      const peerConnection = createPeerConnection({
        socketId: user.socketId,

        localStream: stream,

        onIceCandidate: (socketId, candidate) => {
          console.log('ICE candidate generated:', socketId, candidate);
        },

        onTrack: (socketId, remoteStream) => {
          console.log('Remote stream received:', socketId);

          setRemoteStreams((prev) => ({
            ...prev,
            [socketId]: remoteStream,
          }));
        },
      });

      peerConnectionsRef.current.set(user.socketId, peerConnection);

      console.log('Peer connection created for:', user.socketId);
    });

    return () => {
      peerConnectionsRef.current.forEach((peerConnection) => {
        peerConnection.close();
      });

      peerConnectionsRef.current.clear();
    };
  }, [users, stream, socket]);

  if (loading) {
    return <div className="text-white">Loading camera...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video rounded-xl overflow-hidden bg-black">
        <VideoPlayer stream={stream} muted />
      </div>
      <div className="text-sm text-zinc-400">Local Preview</div>
    </div>
  );
};
