import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index.ts";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/constants.ts";
import { HomePageVideos } from "../../Types.ts";
import { parseData } from "../../utils";

const API_KEY = localStorage.getItem('apiKey') || null;
const recommended: string = localStorage.getItem('recommend') || 'india trending';
console.log('recommend', recommended);

export const getHomePageVideos = createAsyncThunk(
    "youtubeApp/homePageVideos",
    async (isNext: boolean, { getState }) => {
        const { youtubeApp: { nextPageToken: nextPageTokenFromState, videos } } = getState() as RootState;
        const { data: { items, nextPageToken } } = await axios.get(`${YOUTUBE_API_URL}/search?maxResults=20&q=${recommended}&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`);
        const parsedData: HomePageVideos[]  = await parseData(items) || [];
        return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
)