import { socket } from '@/configs/socketConfig';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, roomId, editorRef, monacoRef }) => {
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    console.log('inside handle editor function1: ', monacoRef.current);

    //listen to cursor movement
    editor.onDidChangeCursorPosition((e) => {
      const position = e.position;

      console.log(
        'making the cursor-change event, cursor is moving to the position: ',
        position
      );
      socket.emit('cursor-change', { roomId, position });
    });

    editor.onDidChangeCursorSelection((e) => {
      const selection = e.selection;

      console.log('emitting selection change event: ', roomId, selection);

      socket.emit('selection-change', {
        roomId,
        selection,
      });
    });
  }
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || '')}
      onMount={handleEditorDidMount}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default CodeEditor;
