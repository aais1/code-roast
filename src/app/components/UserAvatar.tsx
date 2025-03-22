import { auth } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <img
        src={session.user.image}
        className="rounded-full size-16"
        alt={session.user.name}
      />
      {/* {session.user.email} */}
    </div>
  );
}
