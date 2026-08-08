import { baseApi } from '@/redux/api/baseApi'
import type { Transport, TransportStatus, TransportType } from '@/data/transports'

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

export interface TransportListQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  type?: TransportType
  status?: TransportStatus
  featured?: boolean
  search?: string
}

export const transportApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTransports: builder.query<ListResp, TransportListQuery | void>({
      query: params => ({ url: '/transports', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(t => ({ type: 'transport' as const, id: t.id })),
              { type: 'transport' as const, id: 'LIST' },
            ]
          : [{ type: 'transport' as const, id: 'LIST' }],
    }),
    getTransport: builder.query<ItemResp, string>({
      query: id => ({ url: `/transports/${encodeURIComponent(id)}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'transport', id }],
    }),
    deleteTransport: builder.mutation<void, string>({
      query: id => ({ url: `/transports/${encodeURIComponent(id)}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'transport', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTransportsQuery,
  useGetTransportQuery,
  useDeleteTransportMutation,
} = transportApi
