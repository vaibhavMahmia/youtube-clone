import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index.ts";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/constants.ts";
import { HomePageVideos } from "../../Types.ts";
import { parseData } from "../../utils";

const API_KEY: string = localStorage.getItem('apiKey') || null;

export const getSearchPageVideos = createAsyncThunk(
    "youtubeApp/serachPageVideos",
    async (isNext: boolean, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
        } = getState() as RootState;
        const {
            data: { items, nextPageToken },
        } = await axios.get(
            `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`
        );
        const parsedData: HomePageVideos[] = await parseData(items);
        return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
);