import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '7d918fad6fmsh71b8c161188d47dp13a893jsn267dbb031af5',
    'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
}

const baseUrl = 'https://news-api14.p.rapidapi.com'
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/search?q=${newsCategory}&country=us&language=en&pageSize=${count}&publisher=cnn.com%2Cbbc.com',`),
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
