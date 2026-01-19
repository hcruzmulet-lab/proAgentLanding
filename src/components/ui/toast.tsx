"use client"

import * as React from "react"

interface ToastProps {
  title?: string
  description?: string
  onClose: () => void
}

export function Toast({ title, description, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex w-full max-w-md items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-lg animate-in slide-in-from-bottom-5"
      style={{
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
          <span className="material-symbols-outlined text-white text-[20px]">
            check
          </span>
        </div>
        <div className="grid gap-1">
          {title && (
            <div className="text-sm font-semibold text-slate-900">{title}</div>
          )}
          {description && (
            <div className="text-sm text-slate-600">{description}</div>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  )
}
