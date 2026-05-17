export const createPeerConnection = ({
  localStream,
  socketId,
  onIceCandidate,
  onTrack,
}) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: import.meta.env.VITE_STUN_SERVER_URL,
      },
    ],
  });

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate(socketId, event.candidate);
    }
  };

  peerConnection.ontrack = (event) => {
    const remoteStream = event.streams[0];

    onTrack(socketId, remoteStream);
  };

  return peerConnection;
};
