import { baseApi } from '@/redux/api/baseApi'

export interface PaymentDto {
  id: string
  bookingId: string
  bookingCode: string
  pilgrimName?: string | null
  amount: number
  currency?: string
  method?: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  transactionId?: string | null
  installmentNumber?: number | null
  date: string
  notes?: string | null
  createdAt: string
  updatedAt: string
}

interface ListResp {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: PaymentDto[]
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPayments: builder.query<ListResp, { bookingId?: string; status?: string; page?: number; limit?: number } | void>({
      query: params => ({ url: '/payments', method: 'GET', params: params ?? undefined }),
      providesTags: [{ type: 'payment', id: 'LIST' }],
    }),
  }),
})

export const { useGetPaymentsQuery } = paymentApi
