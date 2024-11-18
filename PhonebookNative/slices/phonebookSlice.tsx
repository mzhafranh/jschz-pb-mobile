import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const local_url = 'http://192.168.1.5:3001'

interface FetchPhonebookParams {
  keyword: string;
  sort: string;
  page: number;
}

interface addPhonebookParams {
  name: string;
  phone: string;
  keyword: string;
  sort: string
}

interface removePhonebookParams {
  id: number;
  keyword: string;
  sort: string
}

interface updatePhonebookParams {
  id: number;
  name: string;
  phone: string;
}

interface handleFileUploadParams {
  file: string;
  id: number;
  keyword: string;
  sort: string
}

interface Phonebook {
  id: number;
  name: string;
  phone: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PhonebookState {
  phonebooks: Phonebook[];
  page: number;
  totalPage: number;
  keyword: string;
  sort: string;
  loading: boolean;
  error: string | null;
}

// Thunks for async actions
export const fetchPhonebookData = createAsyncThunk(
  'phonebook/fetchPhonebookData',
  async ({ keyword, sort, page }: FetchPhonebookParams, { dispatch }) => {
    console.log('[fetchPhonebookData] called')
    const params = new URLSearchParams({
      keyword,
      sort,
      page: page.toString(),
    }).toString();

    const response = await fetch(`${local_url}/api/phonebooks?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const result = await response.json();
    dispatch(setSort(sort));
    dispatch(setKeyword(keyword))
    dispatch(setTotalPage(result.pages));
    return result.phonebooks;
  }
);

export const refreshPhonebookData = createAsyncThunk(
  'phonebook/refreshPhonebookData',
  async ({ keyword, sort, page }: FetchPhonebookParams, { dispatch }) => {
    console.log('[refreshPhonebookData] called')
    const params = new URLSearchParams({
      keyword,
      sort,
      page: page.toString(),
    }).toString();

    const response = await fetch(`${local_url}/api/phonebooks?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const result = await response.json();
    dispatch(setPage(1));
    dispatch(setSort(sort));
    dispatch(setTotalPage(result.pages));
    return result.phonebooks;
  }
);

export const addPhonebook = createAsyncThunk(
  'phonebook/addPhonebook',
  async ({ name, phone, keyword, sort }: addPhonebookParams, { dispatch }) => {
    const response = await fetch(`${local_url}/api/phonebooks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    });

    if (!response.ok) throw new Error('Failed to post data');
    await response.json();
    dispatch(refreshPhonebookData({ keyword, sort, page: 1 }));
  }
);

export const removePhonebook = createAsyncThunk(
  'phonebook/removePhonebook',
  async ({ id, keyword, sort }: removePhonebookParams, { dispatch }) => {
    const response = await fetch(`${local_url}/api/phonebooks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to delete data');
    await response.json();
    dispatch(refreshPhonebookData({ keyword, sort, page: 1 }));
  }
);

export const updatePhonebook = createAsyncThunk(
  'phonebook/updatePhonebook',
  async ({ id, name, phone }: updatePhonebookParams) => {
    const response = await fetch(`${local_url}/api/phonebooks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    });

    if (!response.ok) throw new Error('Failed to update data');
    await response.json();
  }
);

export const handleFileUpload = createAsyncThunk(
  'phonebook/handleFileUpload',
  async ({ file, id, keyword, sort }: handleFileUploadParams, { dispatch }) => {
    if (!file) throw new Error('Please select a file first');

    const formData = new FormData();
    formData.append('avatar', {
      uri: file,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });

    const response = await fetch(`${local_url}/api/phonebooks/${id}/avatar`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) throw new Error('Failed to upload file');
    await response.json();
    dispatch(refreshPhonebookData({ keyword, sort, page: 1 }));
  }
);

const initialState: PhonebookState = {
  phonebooks: [], // explicitly an array of Phonebook
  page: 1,
  totalPage: 1,
  keyword: '',
  sort: 'asc',
  loading: false,
  error: null,
};

// Redux slice
const phonebookSlice = createSlice({
  name: 'phonebooks',
  initialState,
  reducers: {
    setPage: (state, action) => { state.page = action.payload; },
    setSort: (state, action) => { state.sort = action.payload; },
    setKeyword: (state, action) => { state.keyword = action.payload;  },
    setTotalPage: (state, action) => { state.totalPage = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    clearPhonebook: (state) => {state.phonebooks = []}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhonebookData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhonebookData.fulfilled, (state, action) => {
        state.loading = false;
        state.phonebooks = [...state.phonebooks, ...action.payload];
      })
      .addCase(fetchPhonebookData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(refreshPhonebookData.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshPhonebookData.fulfilled, (state, action) => {
        state.loading = false;
        state.phonebooks = action.payload;
      })
      .addCase(refreshPhonebookData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setPage, setSort, setKeyword, setTotalPage, setLoading, clearPhonebook} = phonebookSlice.actions;
export default phonebookSlice.reducer;
