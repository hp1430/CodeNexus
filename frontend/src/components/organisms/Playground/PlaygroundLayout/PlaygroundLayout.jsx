import { useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { ToolbarContainer } from '@/components/molecules/Toolbar/ToolbarContainer';
import { useExecuteCode } from '@/hooks/apis/execution/useExecuteCode';
import { Terminal } from '@/components/molecules/Terminal/Terminal';
import { VideoCallSection } from '../../VideoCall/VideoCallSection/VideoCallSection';

const PlaygroundLayout = ({
  roomId,
  code,
  setCode,
  users,
  editorRef,
  monacoRef,
}) => {
  const [currentCode, setCurrentCode] = useState('');
  const { isPending, codeExecutionMutation } = useExecuteCode();
  const [validationError, setValidationError] = useState(null);
  const [executionError, setExecutionError] = useState(null);
  const [output, setOutput] = useState(null);
  async function handleRunClick() {
    console.log('handle run is clicked');
    console.log('room id: ', roomId);
    console.log('code: ', currentCode);
    setValidationError(null);
    setExecutionError(null);
    setOutput(null);

    try {
      if (!currentCode) {
        setValidationError({
          message: 'Please write some code...',
        });
        return;
      }
      if (!roomId) {
        setValidationError({
          message: 'Please enter a valid room first',
        });
        return;
      }
      const response = await codeExecutionMutation({
        code: currentCode,
        roomId: roomId,
        language: 'python',
      });
      console.log('response received is: ', response);
      if (response?.output) {
        setOutput(response?.output);
      }
      if (response?.error) {
        setExecutionError(response?.error);
      }
    } catch (error) {
      console.log('error while executing the code: ', error);
    }
  }
  return (
    <div className="h-screen flex flex-col">
      <ToolbarContainer
        roomId={roomId}
        users={users}
        currentCode={currentCode}
        onRunClick={handleRunClick}
        isExecutionPending={isPending}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1">
          <CodeEditor
            code={code}
            setCode={setCode}
            setCurrentCode={setCurrentCode}
            roomId={roomId}
            editorRef={editorRef}
            monacoRef={monacoRef}
          />
        </div>
        <div className="w-[320px] border-r border-zinc-800 p-3 bg-zinc-900">
          <VideoCallSection />
        </div>
      </div>
      <Terminal
        output={output}
        validationError={validationError}
        executionError={executionError}
        isExecutionPending={isPending}
      />
    </div>
  );
};

export default PlaygroundLayout;
