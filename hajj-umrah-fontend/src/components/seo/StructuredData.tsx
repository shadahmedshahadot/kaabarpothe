import React from 'react'

type Props = {
  data: Array<Record<string, unknown>> | Record<string, unknown> | null | undefined
  keyPrefix?: string
}

/**
 * Renders one or more JSON-LD blocks. Server component. Escapes the closing
 * script tag to prevent injection when values contain "</script>".
 */
export default function StructuredData({ data, keyPrefix = 'ld' }: Props) {
  if (!data) return null
  const items = Array.isArray(data) ? data : [data]
  if (!items.length) return null
  return (
    <>
      {items.map((entry, i) => (
        <script
          key={`${keyPrefix}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}
