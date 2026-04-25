import PlaygroundLayout from '@/components/organisms/Playground/PlaygroundLayout/PlaygroundLayout';

export const Playground = ({ roomId, code, setCode }) => {
  return <PlaygroundLayout roomId={roomId} code={code} setCode={setCode} />;
};
