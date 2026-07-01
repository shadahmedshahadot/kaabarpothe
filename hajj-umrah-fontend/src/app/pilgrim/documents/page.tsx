'use client'

import { useRef, useState } from 'react'
import { FileCheck, Upload, Download, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/format'
import {
  useGetMyDocumentsQuery,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useUploadFileMutation,
} from '@/redux/fetchres/document/documentApi'

const DOC_TYPES = [
  'পাসপোর্ট',
  'জাতীয় পরিচয়পত্র',
  'ছবি',
  'মেনিনজাইটিস (ACWY) টিকা',
  'হজ্ব ভিসা',
  'ভ্রমণ ইন্স্যুরেন্স',
]

export default function PilgrimDocumentsPage() {
  const { data, isLoading, isError, refetch } = useGetMyDocumentsQuery()
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation()
  const [createDocument] = useCreateDocumentMutation()
  const [deleteDocument] = useDeleteDocumentMutation()
  const fileRef = useRef<HTMLInputElement>(null)
  const [pendingType, setPendingType] = useState<string>(DOC_TYPES[0])

  const documents = data?.data ?? []

  const onPickFile = (type: string) => {
    setPendingType(type)
    fileRef.current?.click()
  }

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      toast.error('ফাইল ১০MB এর নিচে হতে হবে')
      return
    }
    try {
      const fd = new FormData()
      fd.append('file', file)
      const uploaded = await uploadFile(fd).unwrap()
      const url = uploaded?.data?.url
      if (!url) throw new Error('আপলোড ব্যর্থ')
      await createDocument({ type: pendingType, fileUrl: url, status: 'UPLOADED' }).unwrap()
      toast.success('ডকুমেন্ট আপলোড সফল')
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'আপলোড ব্যর্থ হয়েছে')
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('ডকুমেন্ট মুছবেন?')) return
    try {
      await deleteDocument(id).unwrap()
      toast.success('মুছে দেওয়া হয়েছে')
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ')
    }
  }

  return (
    <>
      <PageTitle
        title="ডকুমেন্ট"
        description="আপনার ভ্রমণ ডকুমেন্ট আপলোড, যাচাই ও ডাউনলোড করুন।"
        action={
          <button
            type="button"
            onClick={() => onPickFile(pendingType)}
            disabled={isUploading}
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-60"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            ডকুমেন্ট আপলোড
          </button>
        }
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={onFileSelected}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground self-center">ডকুমেন্ট ধরন:</span>
        {DOC_TYPES.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setPendingType(t)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              pendingType === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:bg-muted'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-rose-500">
          ডকুমেন্ট লোড করতে ব্যর্থ হয়েছে।
        </div>
      )}

      {!isLoading && documents.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
          কোনো ডকুমেন্ট নেই। উপরের বাটনে ক্লিক করে আপলোড করুন।
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {documents.map(d => (
          <div key={d.id} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  d.status === 'VERIFIED'
                    ? 'bg-emerald-500/15 text-emerald-600'
                    : d.status === 'UPLOADED'
                    ? 'bg-sky-500/15 text-sky-600'
                    : 'bg-amber-500/15 text-amber-600'
                }`}
              >
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{d.type}</p>
                <p className="text-xs text-muted-foreground">
                  {d.uploadedDate ? `আপলোড ${formatDate(d.uploadedDate)}` : 'এখনো আপলোড করা হয়নি'}
                </p>
              </div>
              <Badge
                variant={d.status === 'VERIFIED' ? 'success' : d.status === 'UPLOADED' ? 'default' : 'warning'}
                className="text-[10px]"
              >
                {d.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              {d.fileUrl && (
                <a
                  href={d.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-border py-2 rounded-lg text-xs font-semibold hover:bg-muted inline-flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> ডাউনলোড
                </a>
              )}
              <button
                type="button"
                onClick={() => onPickFile(d.type)}
                className="flex-1 border border-border py-2 rounded-lg text-xs font-semibold hover:bg-muted inline-flex items-center justify-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" /> প্রতিস্থাপন
              </button>
              <button
                type="button"
                onClick={() => onDelete(d.id)}
                className="border border-rose-200 text-rose-500 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-rose-50 inline-flex items-center justify-center"
                aria-label="মুছুন"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
