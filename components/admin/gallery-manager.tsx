'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import type { GalleryItem } from '@/lib/db/schema'
import { saveGalleryItem, deleteGalleryItem } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const CATEGORIES = ['Campus', 'Students', 'Events', 'Cities', 'Graduation']

export function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [saving, startSaving] = useTransition()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [, startDeleting] = useTransition()

  function handleSubmit(formData: FormData) {
    startSaving(async () => {
      await saveGalleryItem(formData)
      setOpen(false)
      setEditing(null)
    })
  }

  function handleDelete(id: number) {
    if (!confirm('Delete this item? This cannot be undone.')) return
    setDeletingId(id)
    startDeleting(async () => {
      await deleteGalleryItem(id)
      setDeletingId(null)
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Gallery
          </h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} item{items.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setOpen(true)
          }}
        >
          <Plus className="size-4" /> Add item
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div
            key={g.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-square">
              <Image
                src={g.thumbnailUrl || g.url || '/placeholder.svg'}
                alt={g.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => {
                    setEditing(g)
                    setOpen(true)
                  }}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => handleDelete(g.id)}
                  disabled={deletingId === g.id}
                  className="text-destructive"
                >
                  {deletingId === g.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="size-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <div className="p-2.5">
              <p className="truncate text-sm font-medium text-foreground">
                {g.title}
              </p>
              <p className="text-xs text-muted-foreground">{g.category}</p>
            </div>
          </div>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-md"
        >
          <SheetHeader>
            <SheetTitle>{editing ? 'Edit item' : 'Add item'}</SheetTitle>
            <SheetDescription>
              Media appears on the public Gallery page.
            </SheetDescription>
          </SheetHeader>

          <form action={handleSubmit} className="flex flex-col gap-4 p-4">
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editing?.title}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={editing?.category ?? 'Campus'}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="url">Image URL</Label>
              <Input
                id="url"
                name="url"
                defaultValue={editing?.url}
                placeholder="/images/gallery/campus-1.png"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="thumbnailUrl">
                Thumbnail URL{' '}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="thumbnailUrl"
                name="thumbnailUrl"
                defaultValue={editing?.thumbnailUrl}
                placeholder="Defaults to image URL"
              />
            </div>

            <Button type="submit" disabled={saving} className="mt-2">
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? 'Saving...' : 'Save item'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
