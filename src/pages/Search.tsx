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
    <>
      {
        videos.length ? (
          <InfiniteScroll dataLength={videos.length} next={() => dispatch(getSearchPageVideos(true))} hasMore={videos.length < 500} loader={<Spinner />} height={650}>
            {videos.map((item: HomePageVideos) => {
                return (
                  <div className="my-5">
                    <SearchCard data={item} key={item.videoId} />
                  </div>
                );
              })}
          </InfiniteScroll>

        ) : (
          <Spinner />
        )
      }
    </>
  )

}
