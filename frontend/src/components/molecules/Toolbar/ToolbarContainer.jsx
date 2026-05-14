import EditorToolbar from './Toolbar';

export const ToolbarContainer = ({
  roomId,
  users,
  onRunClick,
  isExecutionPending,
}) => {
  return (
    <EditorToolbar
      roomId={roomId}
      users={users}
      onRunClick={onRunClick}
      isExecutionPending={isExecutionPending}
    />
  );
};
