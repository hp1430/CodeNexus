import { VideoPlayer } from '@/components/molecules/VideoCall/VideoPlayer/VideoPlayer';
import { usePlaygroundStore } from '@/hooks/store/usePlaygroundStore';
import { useLocalMedia } from '@/hooks/videoCall/useLocalMedia';
import {
  createPeerConnection,
  createOffer,
  createAnswer,
  addAnswer,
} from '@/service/peerConnectionManager';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const VideoCallSection = () => {
  const { stream, loading, error } = useLocalMedia();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Stores:
  // socketId => RTCPeerConnection
  const peerConnectionsRef = useRef(new Map());

  // Stores:
  // socketId => MediaStream
  const [remoteStreams, setRemoteStreams] = useState({});

  const { socket, users } = usePlaygroundStore();

  const toggleMute = () => {
    if (!stream) return;

    const audioTrack = stream.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setIsMuted(!audioTrack.enabled);
  };

  const toggleVideo = () => {
    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setIsVideoOff(!videoTrack.enabled);
  };

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
            socket.emit('webrtc-ice-candidate', {
              targetSocketId: socketId,
              candidate,
            });
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
            socket.emit('webrtc-ice-candidate', {
              targetSocketId: socketId,
              candidate,
            });
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

      socket.emit('webrtc-answer', {
        targetSocketId: senderSocketId,
        answer,
      });

      console.log('Answer created:', answer);
    });

    return () => {
      socket.off('webrtc-offer');
    };
  }, [socket, stream]);

  useEffect(() => {
    if (!socket) return;

    socket.on('webrtc-answer', async ({ answer, senderSocketId }) => {
      console.log('Answer received from:', senderSocketId);

      const peerConnection = peerConnectionsRef.current.get(senderSocketId);

      if (!peerConnection) return;

      await addAnswer(peerConnection, answer);

      console.log('Remote description set');
    });

    return () => {
      socket.off('webrtc-answer');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('webrtc-ice-candidate', async ({ candidate, senderSocketId }) => {
      console.log('ICE candidate received from:', senderSocketId);

      const peerConnection = peerConnectionsRef.current.get(senderSocketId);

      if (!peerConnection) return;

      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));

        console.log('ICE candidate added');
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    });

    return () => {
      socket.off('webrtc-ice-candidate');
    };
  }, [socket]);

  if (loading) {
    return <div className="text-white">Loading camera...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="group relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-lg">
      <VideoPlayer stream={stream} muted />

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
        {/* Mic Button */}
        <button
          onClick={toggleMute}
          className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-200 shadow-lg hover:scale-105 active:scale-95
      ${
        isMuted
          ? 'bg-red-500/90 border-red-400 text-white'
          : 'bg-zinc-900/70 border-zinc-700 text-white hover:bg-zinc-800'
      }`}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Camera Button */}
        <button
          onClick={toggleVideo}
          className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-200 shadow-lg hover:scale-105 active:scale-95
      ${
        isVideoOff
          ? 'bg-red-500/90 border-red-400 text-white'
          : 'bg-zinc-900/70 border-zinc-700 text-white hover:bg-zinc-800'
      }`}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>
      </div>
    </div>
  );
};
