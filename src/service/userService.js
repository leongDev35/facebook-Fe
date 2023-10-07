import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import customAPI from "./customApi";

export const login = createAsyncThunk(
    'user/login', //! để tạo action creator tên là user/login
    async (user) => {
        const res = await axios.post('http://localhost:3001/users/login', user);
        return res.data;
    })
