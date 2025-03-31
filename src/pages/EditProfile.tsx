import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import React, { useEffect, useRef, useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";

// [TODO] 유저 프로필 이미지 기능 추가하기
export default function EditProfile() {
  const [newName, setNewName] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isLoading, session } = useAuth();
  const userId = session?.user.id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getProfileImage();
    }
  }, [userId]);

  const goToBack = () => {
    navigate(-1); // 뒤로가기
  };

  console.log(userId);
  console.log(session);
  /** 이미지를 클릭하면 file 선택 창이 나타나게 함 */
  const onClickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // input의 click() 메서드를 호출하여 파일 선택 창 열기
    }
  };

  const getProfileImage = async () => {
    const { data, error } = await supabase
      .from("userinfo")
      .select("profile_img_url")
      .eq("id", userId);
    if (data) {
      setImagePreview(data[0].profile_img_url);
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  };

  /** 파일 유형과 용량을 확인하고 저장하는 함수 */
  const updateProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 유형 체크 (이미지 파일인지 확인)
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 체크 (1MB 이하), 1MB = 1024KB = 1024 * 1024 Bytes
      if (file.size > 1024 * 1024) {
        alert("파일 크기는 1MB를 넘을 수 없습니다.");
        return;
      }
      // 이미지 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 파일을 읽은 후 미리보기 이미지로 설정
      };
      reader.readAsDataURL(file); // 파일을 base64로 읽어들임
      setImage(file); // 상태에 이미지 파일 저장
    } else {
      alert("잘못된 파일입니다.");
    }
  };

  /** 새 이름을 supabase에 업데이트하는 함수 */
  const updateNewName = async () => {
    if (newName) {
      // 이름 입력이 있다면, 유저 이름 업데이트
      const { data, error: authError } = await supabase.auth.updateUser({
        data: {
          name: newName,
        },
      });
      console.log("전송된 데이터", data);
      if (authError) {
        setShowError(authError.message);
        return;
      }

      // userinfo 테이블에 새 이름 업데이트
      const { error: tableError } = await supabase
        .from("userinfo")
        .update({ name: newName })
        .eq("id", userId); // user.id 또는 고유한 식별자로 필터링
      if (tableError) {
        setShowError(tableError.message);
        return;
      }
    }
  };

  // [TODO] RLS 활성화 시 이미지 url 테이블에 미저장됨, 고치기
  /** 이미지를 storage에 업로드하고 url 반환 */
  const uploadImageToStorage = async (image: File): Promise<string | null> => {
    const filePath = `profile_img/${image?.name}`;

    const { error: storageError } = await supabase.storage
      .from("darakbar-storage")
      .upload(filePath, image, {
        cacheControl: "3600", // 파일 캐시 시간 (초 단위)
        upsert: true,
      });
    if (storageError) {
      console.error("Error uploading file:", storageError.message);
      setShowError("파일 업로드에 실패했습니다.");
      return null;
    }

    const { data } = await supabase.storage
      .from("darakbar-storage")
      .getPublicUrl(filePath);

    if (data.publicUrl === undefined) {
      return null;
    } else {
      console.log("File uploaded successfully:", data.publicUrl);
      return data.publicUrl;
    }
  };

  /** 유저 정보를 업로드하는 함수 */
  const updateUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    await updateNewName();

    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImageToStorage(image);
      console.log("취득한 url: ", imageUrl);
      const { data, error: tableError } = await supabase
        .from("userinfo")
        .update({ profile_img_url: imageUrl })
        .eq("id", userId);
      console.log("전송된 이미지", data);
      if (tableError) {
        console.error("Error updating userinfo:", tableError.message);
      }
    }

    if (newPassword || confirmPassword) {
      if (newPassword && confirmPassword && newPassword === confirmPassword) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) {
          setShowError(error.message);
          return;
        }
      } else if (newPassword !== confirmPassword) {
        setShowError("비밀번호가 일치하지 않습니다.");
        setSaveLoading(false);
        return;
      }
    }
    setSaveLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="wrapper flex h-full w-full flex-col items-center justify-center py-20">
          <ArrowLeftIcon
            className="fixed top-5 left-5 size-7 cursor-pointer fill-zinc-600"
            onClick={goToBack}
          />
          <form className="flex h-full w-130 flex-col rounded-lg bg-white p-7 text-stone-900">
            <h1 className="header text-4xl font-bold text-amber-400">
              정보 수정
            </h1>
            <div className="main mt-10 flex flex-col gap-5">
              <div className="main__top flex items-center gap-12">
                {/* 프로필 이미지 */}
                <div
                  className="image-container relative"
                  onClick={onClickImage}
                >
                  {!imagePreview && (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-sm whitespace-nowrap text-gray-500">
                      <div className="flex items-center gap-2">
                        <ArrowUpTrayIcon className="size-6" />
                        클릭하여 업로드
                      </div>
                    </span>
                  )}
                  {/* 이미지 미리보기 */}
                  {imagePreview ? (
                    <img
                      className="w-full rounded-full bg-zinc-300 md:h-40 xl:h-40"
                      alt="Uploaded preview"
                      src={imagePreview} // 미리보기 이미지를 화면에 표시
                      onClick={onClickImage}
                    />
                  ) : (
                    <div className="w-45 rounded-full bg-zinc-300 md:h-45 xl:h-45">
                      {/* 기본 스타일을 추가 */}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={updateProfileImage}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <label htmlFor="">닉네임</label>
                  <input
                    type="text"
                    className="input-primary w-full"
                    placeholder={session?.user.user_metadata.name}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
              </div>
              <div className="main__bottom flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">이메일</label>
                  <input
                    type="email"
                    className="input-primary bg-gray-200"
                    placeholder={session?.user.user_metadata.email}
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">비밀번호 변경</label>
                  <input
                    type="password"
                    className="input-primary"
                    placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">비밀번호 재입력</label>
                  <input
                    type="password"
                    className="input-primary"
                    placeholder="비밀번호 확인을 위해 재입력해주세요"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {showError && <p className="text-red-500">{showError}</p>}
              {/* Error 표시 */}
            </div>
            <div className="footer mt-auto flex justify-center gap-3">
              <button className="btn-primary">회원 탈퇴</button>
              <button className="btn-primary" onClick={updateUserProfile}>
                {saveLoading ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
