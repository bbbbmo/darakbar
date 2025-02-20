import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function SearchBar() {
  const [cocktailName, setCocktailName] = useState<string>("");

  const getSearchContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCocktailName(event?.target.value);
  };
  return (
    <div className="search-bar__wrapper my-8 flex w-full justify-center gap-3">
      <input
        className="search-bar__input h-15 rounded-2xl border-2 border-amber-300 pl-3 text-xl focus:outline focus:outline-amber-500 xl:w-100"
        value={cocktailName}
        type="text"
        placeholder="원하는 칵테일을 입력해보세요!"
        onChange={getSearchContent}
      />
      <button className="search-bar__btn flex w-20 cursor-pointer items-center justify-center gap-1 rounded-4xl bg-red-500 text-neutral-800 hover:bg-red-600">
        <MagnifyingGlassIcon className="size-5" />
        검색
      </button>
    </div>
  );
}
