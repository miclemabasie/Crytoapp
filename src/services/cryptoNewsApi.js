import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoNewHeader = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.RAPID_API_COINRANKING_APIKEY
  }

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ( {url, headers: cryptoNewHeader})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
      })
    })
  })
  
  export const {
    useGetCryptoNewsQuery,
  } = cryptoNewsApi;