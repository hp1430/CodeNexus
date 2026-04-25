import EditorToolbar from '@/components/molecules/Toolbar/Toolbar';
import CodeEditor from '../CodeEditor/CodeEditor';

const PlaygroundLayout = ({ roomId, code, setCode }) => {
  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar roomId={roomId} />

      <div className="flex-1">
        <CodeEditor code={code} setCode={setCode} />
      </div>
    </div>
  );
};

export default PlaygroundLayout;
