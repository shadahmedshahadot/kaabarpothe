import { baseApi } from '@/redux/api/baseApi'

export interface UserDocumentDto {
  id: string
  userId: string
  type: string
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED'
  uploadedDate?: string | null
  fileUrl?: string | null
  createdAt: string
  updatedAt: string
}

interface ListResp {
  statusCode: number
  success: boolean
  message: string
  data: UserDocumentDto[]
}

interface ItemResp {
  statusCode: number
  success: boolean
  message: string
  data: UserDocumentDto
}

interface UploadResp {
  statusCode: number
  success: boolean
  message: string
  data: { url: string; public_id?: string }
}

export const documentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyDocuments: builder.query<ListResp, void>({
      query: () => ({ url: '/documents/me', method: 'GET' }),
      providesTags: [{ type: 'document', id: 'ME' }],
    }),
    createDocument: builder.mutation<ItemResp, { type: string; fileUrl: string; status?: 'UPLOADED' | 'PENDING' }>({
      query: body => ({
        url: '/documents',
        method: 'POST',
        body: { status: 'UPLOADED', uploadedDate: new Date().toISOString(), ...body },
      }),
      invalidatesTags: [{ type: 'document', id: 'ME' }],
    }),
    updateDocument: builder.mutation<ItemResp, { id: string; body: Partial<{ type: string; fileUrl: string; status: 'PENDING' | 'UPLOADED' | 'VERIFIED'; uploadedDate: string }> }>({
      query: ({ id, body }) => ({ url: `/documents/${id}`, method: 'PATCH', body }),
      invalidatesTags: [{ type: 'document', id: 'ME' }],
    }),
    deleteDocument: builder.mutation<void, string>({
      query: id => ({ url: `/documents/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'document', id: 'ME' }],
    }),
    uploadFile: builder.mutation<UploadResp, FormData>({
      query: body => ({ url: '/uploads/single', method: 'POST', body }),
    }),
  }),
})

export const {
  useGetMyDocumentsQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useUploadFileMutation,
} = documentApi
