import { EnvironmentTwoTone } from '@ant-design/icons';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.RAPID_API_COINRANKING_APIKEY
  }


const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ( {url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({referenceCurrencyUuid, timePeriod}) => createRequest(`/coin/${referenceCurrencyUuid}/history?timePeriod=${timePeriod}`)
    }),
  })
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

// https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history/
// https://coinranking1.p.rapidapi.com/coin/zNZHO_Sjf/history/7d
