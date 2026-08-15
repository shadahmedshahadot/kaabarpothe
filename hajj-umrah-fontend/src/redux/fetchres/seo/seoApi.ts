import { baseApi } from '@/redux/api/baseApi'
import type { GlobalSEODto, PageSEODto } from '@/lib/seo'

type ApiResp<T> = {
  statusCode: number
  success: boolean
  message: string
  data: T
}

export type PageSEOInput = Partial<
  Omit<PageSEODto, 'id' | 'createdAt' | 'updatedAt' | 'isSystem'>
> & {
  pageKey: string
  pagePath: string
  pageName: string
  locale?: string
}

export type PageSEOUpdate = Partial<
  Omit<PageSEODto, 'id' | 'createdAt' | 'updatedAt'>
>

export type GlobalSEOInput = Partial<Omit<GlobalSEODto, 'key' | 'updatedAt'>>

export const seoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    listSEOPages: builder.query<ApiResp<PageSEODto[]>, { locale?: string; search?: string } | void>({
      query: params => ({ url: '/seo/pages', method: 'GET', params: params ?? undefined }),
      providesTags: [{ type: 'seoPage', id: 'LIST' }],
    }),
    getSEOPage: builder.query<ApiResp<PageSEODto>, string>({
      query: id => ({ url: `/seo/pages/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'seoPage', id }],
    }),
    createSEOPage: builder.mutation<ApiResp<PageSEODto>, PageSEOInput>({
      query: body => ({ url: '/seo/pages', method: 'POST', body }),
      invalidatesTags: [{ type: 'seoPage', id: 'LIST' }],
    }),
    updateSEOPage: builder.mutation<
      ApiResp<PageSEODto>,
      { id: string; body: PageSEOUpdate }
    >({
      query: ({ id, body }) => ({ url: `/seo/pages/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'seoPage', id },
        { type: 'seoPage', id: 'LIST' },
      ],
    }),
    deleteSEOPage: builder.mutation<ApiResp<PageSEODto>, string>({
      query: id => ({ url: `/seo/pages/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'seoPage', id: 'LIST' }],
    }),
    getGlobalSEO: builder.query<ApiResp<GlobalSEODto>, void>({
      query: () => ({ url: '/seo/global', method: 'GET' }),
      providesTags: [{ type: 'seoGlobal', id: 'ROOT' }],
    }),
    upsertGlobalSEO: builder.mutation<ApiResp<GlobalSEODto>, GlobalSEOInput>({
      query: body => ({ url: '/seo/global', method: 'PUT', body }),
      invalidatesTags: [{ type: 'seoGlobal', id: 'ROOT' }],
    }),
    seedSEODefaults: builder.mutation<ApiResp<unknown>, void>({
      query: () => ({ url: '/seo/seed-defaults', method: 'POST' }),
      invalidatesTags: [
        { type: 'seoPage', id: 'LIST' },
        { type: 'seoGlobal', id: 'ROOT' },
      ],
    }),
  }),
})

export const {
  useListSEOPagesQuery,
  useGetSEOPageQuery,
  useCreateSEOPageMutation,
  useUpdateSEOPageMutation,
  useDeleteSEOPageMutation,
  useGetGlobalSEOQuery,
  useUpsertGlobalSEOMutation,
  useSeedSEODefaultsMutation,
} = seoApi
