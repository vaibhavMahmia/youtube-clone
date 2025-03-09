import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { Spinner } from "../components/ui/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../Types";
import { Card } from "../components/ui/Card";
import { clearVideos } from "../store";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  useEffect(() => () => dispatch(clearVideos()), [dispatch]);

  return (
    <div className="text-center items-center w-3/5">
      {
        videos.length ? (
          <InfiniteScroll dataLength={videos.length} next={() => dispatch(getHomePageVideos(true))} hasMore={videos.length < 500} loader={<Spinner />} height={650}>
            <div className="grid gap-y-14 gap-x-8 grid-cols-3 p-8 items-center text-center">
              {videos.map((item: HomePageVideos) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>

        ) : (
          <Spinner />
        )
      }
    </div>
  )
}

