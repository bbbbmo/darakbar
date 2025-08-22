import { create } from "zustand";

type EditProfileFormStore = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: File | null;
};

export const useEditProfileFormStore = create<EditProfileFormStore>();
