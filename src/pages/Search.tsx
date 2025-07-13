import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Spinner } from "../components/ui/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../Types";
import { clearVideos } from "../store";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { SearchCard } from "../components/ui/SearchCard";

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="w-3/4 p-5">
      {
        videos.length ? (
          <InfiniteScroll dataLength={videos.length} next={() => dispatch(getSearchPageVideos(true))} hasMore={videos.length < 500} loader={<Spinner />} height={650}>
            {videos.map((item: HomePageVideos, idx: number) => {
              return (
                <div className="my-5" key={idx}>
                  <SearchCard data={item} />
                </div>
              );
            })}
          </InfiniteScroll>

        ) : (
          <div className="flex justify-center items-center h-[650px]">
            <Spinner />
          </div>
        )
      }
    </div>
  )

}
