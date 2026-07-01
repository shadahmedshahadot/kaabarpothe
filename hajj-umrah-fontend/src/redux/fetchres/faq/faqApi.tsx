import { baseApi } from '@/redux/api/baseApi'

export interface FaqDto {
  id: string
  category: string
  question: string
  answer: string
  position?: number
  createdAt: string
  updatedAt: string
}

interface ListResp {
  statusCode: number
  success: boolean
  message: string
  data: FaqDto[]
}

interface CategoriesResp {
  statusCode: number
  success: boolean
  message: string
  data: string[]
}

export const faqApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFaqs: builder.query<ListResp, { category?: string } | void>({
      query: params => ({ url: '/faqs', method: 'GET', params: params ?? undefined }),
      providesTags: [{ type: 'faq', id: 'LIST' }],
    }),
    getFaqCategories: builder.query<CategoriesResp, void>({
      query: () => ({ url: '/faqs/categories', method: 'GET' }),
      providesTags: [{ type: 'faq', id: 'CATS' }],
    }),
  }),
})

export const { useGetFaqsQuery, useGetFaqCategoriesQuery } = faqApi
