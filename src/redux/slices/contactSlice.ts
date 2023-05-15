import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { urlFull, urlShort } from "../../api/axios";
import { СontactDateTypes } from "../sliceTypes";
import { removeDuplicates } from "../../tools/tools";
import { СontactProps } from "../../types/СontactDataType";

export const getContacts = createAsyncThunk(
  "contact/getAllItems",
  async (params?: string) => {
    let url = urlShort;
    if (params === "full") {
      url = urlFull;
    }
    const { data } = await axios.get(url);
    let filtredData = removeDuplicates(data);

    return filtredData;
  },
);

const initialState: СontactDateTypes = {
  data: [],
  filtred: [],
  status: "loading",
  isSorted: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    sortBy: (
      state,
      action: PayloadAction<{ sortType: keyof СontactProps }>,
    ) => {
      if (state.isSorted) {
        state.filtred = state.data.sort((a, b) => {
          state.isSorted = false;
          if (a[action.payload.sortType] < b[action.payload.sortType]) {
            return 1;
          }
          return -1;
        });
      } else
        state.filtred = state.data.sort((a, b) => {
          state.isSorted = true;
          if (a[action.payload.sortType] < b[action.payload.sortType]) {
            return -1;
          }
          return 1;
        });
    },
    filterBy: (
      state,
      action: PayloadAction<{ filterBy: keyof СontactProps; input: string }>,
    ) => {
      state.filtred = state.data.filter((item) =>
        String(item[action.payload.filterBy])
          .toLowerCase()
          .includes(action.payload.input.toLowerCase()),
      );
    },
    createList: (state, action) => {
      const { id, lastName, firstName, email, phone } = action.payload.value;
      const model: СontactProps = {
        id: parseInt(id, 10),
        lastName: lastName,
        firstName: firstName,
        email: email,
        phone: phone,
        description: "empty",
        address: {},
      };

      state.data = [model, ...state.data];
      state.filtred = state.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })

      .addCase(getContacts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.filtred = action.payload;
        state.status = "loaded";
      })

      .addCase(getContacts.rejected, (state) => {
        state.data = [];
      });
  },
});

export const contactReducer = contactSlice.reducer;
export const { sortBy, filterBy, createList } = contactSlice.actions;
