import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function UserProfile() {
  return (
    <div className="wrapper flex h-full w-full flex-col items-center justify-center py-20">
      <ArrowLeftIcon className="fixed top-5 left-5 size-7 cursor-pointer fill-zinc-600" />
      <form className="flex h-full w-160 flex-col rounded-lg bg-white p-7 text-stone-900">
        <h1 className="header text-4xl font-bold text-amber-400">정보 수정</h1>
        <div className="main mt-10 flex flex-col gap-5">
          <div className="main__top flex items-center gap-50">
            <img src="" alt="" className="size-30 rounded-full bg-blue-100" />
            <div className="flex flex-1 flex-col gap-3">
              <label htmlFor="">닉네임</label>
              <input type="text" className="input-primary w-full" />
            </div>
          </div>
          <div className="main__bottom flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="">이메일</label>
              <input
                type="email"
                className="input-primary bg-gray-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">비밀번호 변경</label>
              <input type="text" className="input-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">뭐징</label>
              <input type="text" className="input-primary" />
            </div>
          </div>
        </div>
        <div className="footer mt-auto flex justify-center gap-3">
          <button className="btn-primary">회원 탈퇴</button>
          <button className="btn-primary">저장하기</button>
        </div>
      </form>
    </div>
  );
}
