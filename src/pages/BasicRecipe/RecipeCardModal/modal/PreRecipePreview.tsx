import { useEffect, useState } from "react";
import useCocktailStore from "../../../../stores/cocktailStore";
import RecipeBtnGroup from "./PreRecipeBtns";

interface recipeVideo {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: [
    {
      kind: string;
      etag: string;
      id: {
        kind: string;
        videoId: string;
      };
      snippet: {
        publishedAt: Date;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          default: {
            url: string;
            width: number;
            height: number;
          };
          medium: {
            url: string;
            width: number;
            height: number;
          };
          high: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: Date;
      };
    },
  ];
}

// 레시피 시각 파트
export default function PreRecipePreview() {
  const { clickedCardData } = useCocktailStore();
  const [recipeVideo, setRecipeVideo] = useState<recipeVideo | null>(null);
  const youtubeKey = import.meta.env.VITE_YOUTUBE_KEY;

  useEffect(() => {
    const getRecipeVideo = async () => {
      if (clickedCardData?.name) {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=cocktail%20${clickedCardData?.name}%20recipe&type=video&videoCategoryId=26&key=${youtubeKey}`,
        );
        if (response) {
          const data = await response.json();
          setRecipeVideo(data);
          console.log(data);
        } else {
          console.log("칵테일 유튜브 동영상 fetch 에러");
        }
      }
    };

    getRecipeVideo();
  }, [clickedCardData, youtubeKey]);

  // `recipeVideo.items`가 존재하고, 배열에 값이 있는지 확인
  const hasVideo = recipeVideo?.items && recipeVideo.items.length > 0;
  const videoId = hasVideo ? recipeVideo.items[0].id.videoId : null;
  const videoTitle = hasVideo
    ? recipeVideo.items[0].snippet.title
    : "비디오를 찾을 수 없음";
  return (
    // [TODO] 배경색 어떻게 할지
    <div className="h-full w-full rounded-xl bg-stone-700 text-stone-100">
      <div className="flex h-[70%] w-full items-center justify-center rounded-t-xl">
        {recipeVideo ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={videoTitle}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy" // iframe이 위치한 거리에 도달할 때까지 iframe 로딩 연기 -> 성능 및 비용 향상
            allowFullScreen
          >
            <a href={`https://www.youtube.com/embed/${videoId}`}></a>
          </iframe>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-900">
            로딩 중...
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center">
          <div className="w-full text-2xl font-bold">
            {clickedCardData ? clickedCardData.name : "이름 없는 칵테일"}
          </div>
          <RecipeBtnGroup />
        </div>
        <article className="mt-2 text-lg">
          {clickedCardData ? clickedCardData.description : "칵테일 설명 없음"}
        </article>
      </div>
    </div>
  );
}
