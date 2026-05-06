import { socket } from '@/configs/socketConfig';
import { createYjsProvider } from '@/lib/yjs';
import Editor from '@monaco-editor/react';
import { MonacoBinding } from 'y-monaco';

const CodeEditor = ({ code, setCode, roomId, editorRef, monacoRef }) => {
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    const { yText, provider } = createYjsProvider(roomId);

    new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );

    //listen to cursor movement
    editor.onDidChangeCursorPosition((e) => {
      const position = e.position;
      socket.emit('cursor-change', { roomId, position });
    });

    editor.onDidChangeCursorSelection((e) => {
      const selection = e.selection;
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
