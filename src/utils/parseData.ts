import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { YOUTUBE_API_URL } from "./constants";
import { HomePageVideos } from "../Types";

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const parseData = async (items: any[]): Promise<HomePageVideos[] | undefined> => {
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    items.forEach(
      (item: { snippet?: { channelId?: string }; id?: { videoId?: string } }) => {
        if (item?.snippet?.channelId) channelIds.push(item.snippet.channelId);
        if (item?.id?.videoId) videoIds.push(item.id.videoId);
      }
    );

    const {
      data: { items: channelsData = [] },
    } = await axios.get(
      `${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    const parsedChannelsData: { id: string; image: string }[] = [];
    channelsData.forEach(
      (channel: {
        id?: string;
        snippet?: { thumbnails?: { default?: { url?: string } } };
      }) => {
        if (channel?.id && channel?.snippet?.thumbnails?.default?.url) {
          parsedChannelsData.push({
            id: channel.id,
            image: channel.snippet.thumbnails.default.url,
          });
        }
      }
    );

    const {
      data: { items: videosData = [] },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );
    const parsedData: HomePageVideos[] = [];
    items.forEach(
      (
        item: {
          snippet?: {
            channelId?: string;
            title?: string;
            description?: string;
            thumbnails?: { medium?: { url?: string } };
            publishedAt?: string;
            channelTitle?: string;
          };
          id?: { videoId?: string };
        },
        index: number
      ) => {
        const channelId = item?.snippet?.channelId;
        const channelImage = parsedChannelsData.find(
          (data) => data.id === channelId
        )?.image;

        if (
          channelImage &&
          item?.id?.videoId &&
          item?.snippet?.title &&
          item?.snippet?.description &&
          item?.snippet?.thumbnails?.medium?.url &&
          item?.snippet?.publishedAt &&
          item?.snippet?.channelTitle
        ) {
          parsedData.push({
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail: item.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoDuration: parseVideoDuration(
              videosData[index]?.contentDetails?.duration ?? ""
            ),
            videoViews: convertRawViewstoString(
              videosData[index]?.statistics?.viewCount ?? ""
            ),
            videoAge: timeSince(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: channelId ?? "", // Ensure id is always a string
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
        }
      }
    );

    return parsedData;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};