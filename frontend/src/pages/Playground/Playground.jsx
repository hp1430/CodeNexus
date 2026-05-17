import PlaygroundLayout from '@/components/organisms/Playground/PlaygroundLayout/PlaygroundLayout';

export const Playground = ({ roomId, code, setCode, editorRef, monacoRef }) => {
  return (
    <PlaygroundLayout
      roomId={roomId}
      code={code}
      setCode={setCode}
      editorRef={editorRef}
      monacoRef={monacoRef}
    />
  );
};
