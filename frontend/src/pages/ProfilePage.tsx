import { useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { meThunk } from "../redux/slices/authSlice";

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!user) dispatch(meThunk());
  }, [dispatch, user]);

  if (!user) return <Spinner label="Loading profile" />;

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h1 className="text-2xl font-semibold text-white">Profile</h1>
      <div className="mt-5 space-y-2 text-sm text-slate-300">
        <div>
          <span className="text-slate-400">Name:</span> <span className="text-white">{user.full_name}</span>
        </div>
        <div>
          <span className="text-slate-400">Email:</span> <span className="text-white">{user.email}</span>
        </div>
        <div>
          <span className="text-slate-400">Role:</span> <span className="text-white">{user.role}</span>
        </div>
      </div>
    </div>
  );
}

