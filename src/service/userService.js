import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import customAPI from "./customApi";
import { SITE } from "../App";

export const login = createAsyncThunk(
    'user/login', //! để tạo action creator tên là user/login
    async (user) => {
        const res = await axios.post(`${SITE}/users/login`, user);
        return res.data;
    })
    export const updateUser = createAsyncThunk(
        'user/updateUser', //! để tạo action creator tên là user/updateUser
        async (user) => {
            console.log(user);
            return user
        })
