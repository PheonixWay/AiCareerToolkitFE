// src/stores/memory.store.ts
import { create } from 'zustand'
import type { MemoryCard, AddMemoryRequest, UpdateMemoryRequest } from '@/types/memory.types'
import {
  getAllMemories,
  ingestPdf,
  addMemory,
  updateMemory,
  deleteMemory,
} from '@/api/services/memory.service'

interface MemoryState {
  cards: MemoryCard[]
  isLoading: boolean
  isUploading: boolean
  uploadProgress: number // 0-100
  error: string | null

  // Actions
  fetchMemories: () => Promise<void>
  uploadPdf: (file: File) => Promise<{ chunks_saved: number }>
  addEntry: (payload: AddMemoryRequest) => Promise<void>
  editEntry: (id: number, payload: UpdateMemoryRequest) => Promise<void>
  removeEntry: (id: number) => Promise<void>
  clearError: () => void
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  cards: [],
  isLoading: false,
  isUploading: false,
  uploadProgress: 0,
  error: null,

  fetchMemories: async () => {
    set({ isLoading: true, error: null })
    try {
      const cards = await getAllMemories()
      set({ cards })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch memories.'
      set({ error: msg })
    } finally {
      set({ isLoading: false })
    }
  },

  uploadPdf: async (file: File) => {
    set({ isUploading: true, uploadProgress: 15, error: null })
    try {
      set({ uploadProgress: 45 })
      const result = await ingestPdf(file)
      set({ uploadProgress: 85 })
      await get().fetchMemories()
      set({ uploadProgress: 100 })
      return result
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'PDF upload failed.'
      set({ error: msg })
      throw err
    } finally {
      setTimeout(() => set({ isUploading: false, uploadProgress: 0 }), 600)
    }
  },

  addEntry: async (payload) => {
    set({ isLoading: true, error: null })
    try {
      const newCard = await addMemory(payload)
      set((state) => ({ cards: [newCard, ...state.cards] }))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to add memory.'
      set({ error: msg })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },

  editEntry: async (id, payload) => {
    set({ error: null })
    try {
      const updated = await updateMemory(id, payload)
      set((state) => ({
        cards: state.cards.map((c) => (c.id === id ? updated : c)),
      }))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update memory.'
      set({ error: msg })
      throw err
    }
  },

  removeEntry: async (id) => {
    set({ error: null })
    try {
      await deleteMemory(id)
      set((state) => ({ cards: state.cards.filter((c) => c.id !== id) }))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete memory.'
      set({ error: msg })
      throw err
    }
  },

  clearError: () => set({ error: null }),
}))
