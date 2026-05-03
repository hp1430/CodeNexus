import { toast } from 'sonner';

export const playgroundSocketHandler = (
  socket,
  roomId,
  setCode,
  setUsers,
  editorRef,
  decorationRef,
  monacoRef
) => {
  socket.on('code-update', ({ code }) => {
    setCode(code);
  });

  socket.on('init-code', ({ code }) => {
    console.log('Received initial code:', code);
    setCode(code);
  });

  socket.on('user-joined', ({ user }) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    toast.success(`${user.name} joined the room!`);
  });

  socket.on('user-left', ({ user }) => {
    console.log('User left:', user);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  });

  socket.on('users-list', ({ users }) => {
    setUsers(users);
  });

  socket.on('cursor-update', ({ user, position }) => {
    console.log(`Cursor update from ${user.name}:`, position);

    const editor = editorRef.current;
    const monacoInstance = monacoRef.current; // or monacoRef.current if you switch

    console.log('editor and monacoInstances are0: ', editor, monacoInstance);

    if (!editor || !monacoInstance) return;

    console.log('editor and monacoInstances are: ', editor, monacoInstance);

    const decoration = {
      range: new monacoInstance.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      ),
      options: {
        beforeContentClassName: 'remote-cursor', // 🔥 FIXED
        hoverMessage: { value: user.name },
      },
    };

    const oldDecorations = decorationRef.current.cursor[user.id] || [];

    const newDecorations = editor.deltaDecorations(oldDecorations, [
      decoration,
    ]);

    decorationRef.current.cursor[user.id] = newDecorations;
  });

  socket.on('selection-update', ({ user, selection }) => {
    const editor = editorRef.current;
    const monacoInstance = monacoRef.current;

    if (!editor || !monacoInstance) return;

    // if (selection.isEmpty()) return;

    const decoration = {
      range: new monacoInstance.Range(
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn
      ),
      options: {
        className: 'remote-selection',
        hoverMessage: { value: user.name },
      },
    };
    const oldDecorations = decorationRef.current.selection[user.id] || [];

    const newDecorations = editor.deltaDecorations(oldDecorations, [
      decoration,
    ]);

    decorationRef.current.selection[user.id] = newDecorations;
  });

  return () => {
    socket.off('cursor-update');
    socket.off('code-update');
    socket.off('init-code');
    socket.off('user-joined');
    socket.off('user-left');
    socket.off('users-list');
    socket.off('selection-update');
  };
};
