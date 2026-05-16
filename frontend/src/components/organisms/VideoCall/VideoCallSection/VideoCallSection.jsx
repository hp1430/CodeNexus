import { VideoPlayer } from '@/components/molecules/VideoCall/VideoPlayer/VideoPlayer';
import { useLocalMedia } from '@/hooks/videoCall/useLocalMedia';

export const VideoCallSection = () => {
  const { stream, loading, error } = useLocalMedia();

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
