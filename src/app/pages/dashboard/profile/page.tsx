"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAlert,
  toggleSession,
  setName,
  setToken,
} from "../../../../../store/actions";

function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const session = useSelector((state: { hasSession: boolean }) => state.hasSession);

  const handleLogOut = async () => {
    try {
      const res = await axios.get("/api/auth/signOut");
      dispatch(setToken('none'))
      dispatch(toggleSession(false));
      dispatch(setName(null));
      if (session) return router.push("/pages/login");
    } catch (error: any) {console.log(error.response.status)}
  };

  return (
    <div>
      <h1>Profile</h1>

      <button
        className="bg-zinc-800 px-4 py-2 block mb-2"
        onClick={async () => {
          handleLogOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}

export default ProfilePage;
