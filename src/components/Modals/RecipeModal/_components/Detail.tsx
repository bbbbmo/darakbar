import { useState } from "react";
import useCocktailStore from "../recipe-modal.store";

// 레시피 정보
export default function Detail() {
  const { clickedCardData } = useCocktailStore();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="wrapper relative h-full w-full flex-col rounded-xl bg-slate-100">
      <div className="details-container h-full w-full text-stone-700">
        {/* 탭 구간 */}
        <div className="tab-group flex gap-5 border-b border-gray-200 px-3 text-xl">
          <ul className="tabs flex flex-wrap gap-2">
            <li onClick={() => handleTabClick(0)}>
              <span
                className={`tab flex items-center justify-center ${activeTab === 0 ? "border-amber-400 bg-zinc-200 text-stone-900" : "border-transparent hover:border-amber-400 hover:text-stone-900"} p-2`}
              >
                설명
              </span>
            </li>
            <li onClick={() => handleTabClick(1)}>
              <span
                className={`tab flex items-center justify-center ${activeTab === 1 ? "border-amber-400 bg-zinc-200 text-stone-900" : "border-transparent hover:border-amber-400 hover:text-stone-900"} p-2`}
              >
                재료
              </span>
            </li>
            <li onClick={() => handleTabClick(2)}>
              <span
                className={`tab flex items-center justify-center ${activeTab === 2 ? "border-amber-400 bg-zinc-200 text-stone-900" : "border-transparent hover:border-amber-400 hover:text-stone-900"} p-2`}
              >
                제조법
              </span>
            </li>
          </ul>
        </div>
        <section className="tab-content p-4 text-xl">
          {activeTab === 0 && clickedCardData && (
            <div className="tab-content__description flex flex-col gap-2">
              <div className="description__base">
                <span className="mr-1 font-bold">베이스:</span>
                {clickedCardData.base_liquor}
              </div>
              <div className="description__glass">
                <span className="mr-1 font-bold">잔:</span>
                {clickedCardData.glass_type}
              </div>
            </div>
          )}
          {activeTab === 1 &&
            clickedCardData &&
            clickedCardData.ingredients.map((ingredient) => (
              <div key={clickedCardData.id}>{ingredient}</div>
            ))}
          {activeTab === 2 && clickedCardData && clickedCardData.instructions}
        </section>
      </div>
    </div>
  );
}
