import { baseApi } from '@/redux/api/baseApi'
import type { Transport } from '@/data/transports'

interface ListResp {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: Transport[]
}

interface ItemResp {
  statusCode: number
  success: boolean
  message: string
  data: Transport
}

export const transportApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTransports: builder.query<ListResp, { type?: string; search?: string; page?: number; limit?: number } | void>({
      query: params => ({ url: '/transports', method: 'GET', params: params ?? undefined }),
      providesTags: [{ type: 'transport', id: 'LIST' }],
    }),
    getTransport: builder.query<ItemResp, string>({
      query: id => ({ url: `/transports/${encodeURIComponent(id)}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'transport', id }],
    }),
  }),
})

export const { useGetTransportsQuery, useGetTransportQuery } = transportApi
