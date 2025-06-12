import type { User } from "@supabase/supabase-js";

interface AuthButtonProps {
  user: User | null;
  signInWithGitHub: () => void;
  signOut: () => void;
}

const AuthButton = ({ user, signInWithGitHub, signOut }: AuthButtonProps) => {
  const displayName = user?.user_metadata.user_name || user?.email;

  return user ? (
    <div className="flex items-center space-x-4">
      {user.user_metadata.avatar_url && (
        <img
          src={user.user_metadata.avatar_url}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <span className="text-gray-300">{displayName}</span>
      <button onClick={signOut} className="bg-red-500 px-3 py-1 rounded">
        Sign Out
      </button>
    </div>
  ) : (
    <button
      onClick={signInWithGitHub}
      className="bg-blue-500 px-3 py-1 rounded"
    >
      SignIn GitHub
    </button>
  );
};

export default AuthButton;
