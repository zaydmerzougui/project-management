// styles
import "./Users.css";

import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Users() {
  const { error, documents } = useCollection("users");
  const { user: uid } = useAuthContext();
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div className="user-list-item" key={user.id}>
            {uid.uid !== user.id && (
              <>
                {user.online && <span className="online-user"></span>}
                <span>{user.displayName}</span>
                <Avatar src={user.photoURL} />
              </>
            )}
          </div>
        ))}
    </div>
  );
}
