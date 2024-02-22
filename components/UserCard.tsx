import { DefaultSession } from "next-auth";

const UserCard = ({ user }: { user: DefaultSession["user"] }) => {
  const userName = user?.name ? user.name : user?.email?.split("@")[0];
  return (
    <div>
      <div className="flex gap-2 items-center">
        <h2>
          Welcome, <strong>{userName}</strong>
        </h2>

        {user?.image ? (
          <img
            src={user.image}
            alt="Avatar"
            className="rounded-full"
            width={28}
            height={28}
          />
        ) : (
          <img
            src={"/images/user-solid.svg"}
            alt="Avatar"
            className="rounded-full bg-white p-1"
            width={28}
            height={28}
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
