// src/components/memory/MemoryCard.tsx
import { type FC, useState } from 'react'
import { Pencil, Trash2, Check, X, Briefcase, Rocket, Wrench, GraduationCap } from 'lucide-react'
import type { MemoryCard as MemoryCardType, UpdateMemoryRequest, MemoryCategory } from '@/types/memory.types'

interface Props {
  card: MemoryCardType
  onDelete: (id: number) => void
  onEdit: (id: number, payload: UpdateMemoryRequest) => void
}

const CATEGORY_BADGES: Record<MemoryCategory, { label: string; icon: typeof Briefcase; color: string }> = {
  experience: {
    label: 'Experience',
    icon: Briefcase,
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  },
  project: {
    label: 'Project',
    icon: Rocket,
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  },
  skill: {
    label: 'Skill',
    icon: Wrench,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  },
  education: {
    label: 'Education',
    icon: GraduationCap,
    color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  },
}

export const MemoryCard: FC<Props> = ({ card, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(card.title ?? '')
  const [editContent, setEditContent] = useState(card.content)

  const handleSave = () => {
    if (!editContent.trim()) return
    onEdit(card.id, { title: editTitle.trim() || undefined, content: editContent.trim() })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(card.title ?? '')
    setEditContent(card.content)
    setIsEditing(false)
  }

  const badgeInfo = CATEGORY_BADGES[card.category] || CATEGORY_BADGES.experience
  const Icon = badgeInfo.icon

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700">
      <div>
        {/* Header: Category Badge & Action Buttons */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${badgeInfo.color}`}>
            <Icon className="h-3.5 w-3.5" />
            {badgeInfo.label}
          </span>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  title="Save Changes"
                  className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  title="Cancel"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  title="Edit Memory"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Delete this memory entry from your Career Memory Bank?')) {
                      onDelete(card.id)
                    }
                  }}
                  title="Delete Memory"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        {isEditing ? (
          <div className="space-y-2.5">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Title / Role
              </label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="e.g. Senior Backend Engineer"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Description / Context
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-700 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        ) : (
          <div>
            {card.title && (
              <h3 className="mb-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {card.title}
              </h3>
            )}
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-6 whitespace-pre-line">
              {card.content}
            </p>
          </div>
        )}
      </div>

      {/* Footer Timestamp */}
      {!isEditing && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <span>Vectorized</span>
          <span>
            {new Date(card.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      )}
    </div>
  )
}
