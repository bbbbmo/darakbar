import { cardTheme } from "@/flowbite/themes/card.theme";
import { Session } from "@supabase/supabase-js";
import { Avatar, Card, ThemeProvider } from "flowbite-react";

type EditProfileCardProps = {
  session: Session | null;
};

export default function EditProfileCard({ session }: EditProfileCardProps) {
  const avatarUrl = session?.user.user_metadata.avatar_url;
  const userName = session?.user.user_metadata.name;
  const email = session?.user.user_metadata.email;
  return (
    <ThemeProvider theme={cardTheme}>
      <Card theme={cardTheme.editProfile}>
        <Avatar
          img={avatarUrl}
          alt="User Profile"
          className="mr-auto h-28 w-28 rounded-full bg-zinc-300"
        />
        <div>
          <h3 className="text-xl font-bold">{userName}</h3>
          <h5 className="text-md text-gray-500 dark:text-gray-400">{email}</h5>
        </div>
      </Card>
    </ThemeProvider>
  );
}
