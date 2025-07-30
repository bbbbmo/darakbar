import { cardTheme } from "@/flowbite/themes/card.theme";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Session } from "@supabase/supabase-js";
import {
  Avatar,
  Card,
  CheckIcon,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { EditProfileFormData } from "./EditProfileForm.types";

type EditProfileCardProps = {
  session: Session | null;
  register: UseFormRegister<EditProfileFormData>;
  watch: UseFormWatch<EditProfileFormData>;
  errors: FieldErrors<EditProfileFormData>;
};

export default function EditProfileCard({
  session,
  register,
  watch,
  errors,
}: EditProfileCardProps) {
  const avatarUrl = session?.user.user_metadata.avatar_url;
  const userName = session?.user.user_metadata.name;
  const email = session?.user.user_metadata.email;

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const watchedName = watch("name");

  const toggleEditName = () => {
    setIsEditingName((prev) => !prev);
  };
  return (
    <ThemeProvider theme={cardTheme}>
      <Card theme={cardTheme.editProfile}>
        <Avatar
          img={avatarUrl}
          alt="User Profile"
          className="h-28 w-28 rounded-full bg-zinc-300"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <TextInput
                  type="text"
                  {...register("name")}
                  placeholder={userName}
                  rightIcon={CheckIcon}
                  className="max-w-40"
                  theme={{
                    field: {
                      rightIcon: {
                        svg:
                          (watchedName && watchedName.length > 0) || errors.name
                            ? "fill-green-500"
                            : "fill-red-400",
                      },
                    },
                  }}
                />
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold">{userName}</h3>
                <PencilIcon
                  className="size-4 cursor-pointer fill-zinc-400"
                  onClick={toggleEditName}
                />
              </>
            )}
          </div>
          <h5 className="text-md text-gray-500 dark:text-gray-400">{email}</h5>
        </div>
      </Card>
    </ThemeProvider>
  );
}
