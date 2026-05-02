import Button from '@/components/atoms/Homepage/Button/Button';
import useUserStore from '@/hooks/store/useUserStore';

const EditorToolbar = ({ roomId, users }) => {
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
  const { user: signedInUser } = useUserStore();
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-[#1e1e1e] border-b border-gray-700 text-gray-200">
      <p className="text-sm">
        Room: <span className="font-medium text-white">{roomId}</span>
      </p>

      <select className="bg-gray-800 text-white p-2 rounded">
        <option key={signedInUser._id}>{signedInUser.name} (You)</option>
        {sortedUsers.map(
          (user) =>
            user.id !== signedInUser._id && (
              <option key={user._id}>{user.name}</option>
            )
        )}
      </select>

      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        Share
      </Button>
    </div>
  );
};

export default EditorToolbar;
