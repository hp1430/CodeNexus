import { VideoPlayer } from '@/components/molecules/VideoCall/VideoPlayer/VideoPlayer';
import { usePlaygroundStore } from '@/hooks/store/usePlaygroundStore';
import { useLocalMedia } from '@/hooks/videoCall/useLocalMedia';
import {
  createPeerConnection,
  createOffer,
  createAnswer,
} from '@/service/peerConnectionManager';
import { useEffect, useRef, useState } from 'react';

export const VideoCallSection = () => {
  const { stream, loading, error } = useLocalMedia();

  // Stores:
  // socketId => RTCPeerConnection
  const peerConnectionsRef = useRef(new Map());

  // Stores:
  // socketId => MediaStream
  const [remoteStreams, setRemoteStreams] = useState({});

  const { socket, users } = usePlaygroundStore();

  useEffect(() => {
    if (!stream || !users?.length || !socket) return;

    const setupConnections = async () => {
      for (const user of users) {
        // Skip self
        if (user.socketId === socket.id) continue;

        // Prevent duplicate peer connections
        if (peerConnectionsRef.current.has(user.socketId)) {
          continue;
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

        const offer = await createOffer(peerConnection);

        socket.emit('webrtc-offer', {
          targetSocketId: user.socketId,
          offer,
        });

        console.log('Offer created:', offer);
      }
    };

    setupConnections();

    return () => {
      peerConnectionsRef.current.forEach((peerConnection) => {
        peerConnection.close();
      });

      peerConnectionsRef.current.clear();
    };
  }, [users, stream, socket]);

  useEffect(() => {
    if (!socket || !stream) return;

    socket.on('webrtc-offer', async ({ offer, senderSocketId }) => {
      console.log('Offer received from:', senderSocketId);

      let peerConnection = peerConnectionsRef.current.get(senderSocketId);

      // Create PC if doesn't exist
      if (!peerConnection) {
        peerConnection = createPeerConnection({
          socketId: senderSocketId,

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

        peerConnectionsRef.current.set(senderSocketId, peerConnection);
      }

      const answer = await createAnswer(peerConnection, offer);

      console.log('Answer created:', answer);
    });

    return () => {
      socket.off('webrtc-offer');
    };
  }, [socket, stream]);

  if (loading) {
    return <div className="text-white">Loading camera...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Local Video */}
      <div className="aspect-video rounded-xl overflow-hidden bg-black">
        <VideoPlayer stream={stream} muted />
      </div>

      <div className="text-sm text-zinc-400">Local Preview</div>

      {/* Remote Videos */}
      {Object.entries(remoteStreams).map(([socketId, remoteStream]) => (
        <div
          key={socketId}
          className="aspect-video rounded-xl overflow-hidden bg-black"
        >
          <VideoPlayer stream={remoteStream} />
        </div>
      ))}
    </div>
  );
};
