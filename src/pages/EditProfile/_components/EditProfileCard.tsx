import { cardTheme } from "@/flowbite/themes/card.theme";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  CheckIcon,
  FileInput,
  Label,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { EditProfileFormData } from "./EditProfileForm.types";
import { getImagePreview } from "@/utils/file/setImagePreview";
import { useProfileQuery } from "@/hooks/useProfileQuery";

type EditProfileCardProps = {
  register: UseFormRegister<EditProfileFormData>;
  watch: UseFormWatch<EditProfileFormData>;
  errors: FieldErrors<EditProfileFormData>;
};

export default function EditProfileCard({
  register,
  watch,
  errors,
}: EditProfileCardProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: profile } = useProfileQuery();

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const watchedName = watch("name");
  const watchedProfileImage = watch("profileImage");

  const toggleEditName = () => {
    setIsEditingName((prev) => !prev);
  };

  useEffect(() => {
    if (watchedProfileImage && watchedProfileImage instanceof File) {
      getImagePreview(watchedProfileImage).then(setImagePreview);
    }
  }, [watchedProfileImage]);
  return (
    <ThemeProvider theme={cardTheme}>
      <Card theme={cardTheme.editProfile}>
        <Label id="profile-image" className="cursor-pointer">
          <Avatar
            img={imagePreview || profile?.profile_img_url || ""}
            alt="User Profile"
            size="lg"
            rounded
          />
          <FileInput
            id="profile-image"
            className="hidden"
            accept="image/*"
            {...register("profileImage")}
          />
        </Label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <TextInput
                  type="text"
                  {...register("name", {
                    required: "이름을 입력해주세요.",
                  })}
                  placeholder={profile?.name}
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
                <h3 className="text-xl font-bold">{profile?.name}</h3>
                <PencilIcon
                  className="size-4 cursor-pointer fill-zinc-400"
                  onClick={toggleEditName}
                />
              </>
            )}
          </div>
          <h5 className="text-md text-gray-500 dark:text-gray-400">
            {profile?.email}
          </h5>
        </div>
      </Card>
    </ThemeProvider>
  );
}
