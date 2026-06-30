'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import type { BlogPost } from '@/lib/db/schema'
import { saveBlogPost, deleteBlogPost } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const CATEGORIES = [
  'Visa Guide',
  'Scholarships',
  'Student Life',
  'Admissions',
  'News',
]

export function BlogManager({ items }: { items: BlogPost[] }) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [saving, startSaving] = useTransition()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [, startDeleting] = useTransition()

  function handleSubmit(formData: FormData) {
    startSaving(async () => {
      await saveBlogPost(formData)
      setOpen(false)
      setEditing(null)
    })
  }

  function handleDelete(id: number) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeletingId(id)
    startDeleting(async () => {
      await deleteBlogPost(id)
      setDeletingId(null)
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Blog
          </h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} article{items.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setOpen(true)
          }}
        >
          <Plus className="size-4" /> New post
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {items.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {p.category}
                  </span>
                  {!p.published && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate font-medium text-foreground">
                  {p.title}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {p.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditing(p)
                    setOpen(true)
                  }}
                >
                  <Pencil className="size-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  {deletingId === p.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="size-3.5" />
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-lg"
        >
          <SheetHeader>
            <SheetTitle>{editing ? 'Edit post' : 'New post'}</SheetTitle>
            <SheetDescription>
              Articles appear on the public Blog page.
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
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  defaultValue={editing?.category ?? 'News'}
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="readTime">Read time (min)</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  type="number"
                  defaultValue={editing?.readTime?.toString() ?? '5'}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                defaultValue={editing?.author ?? 'Zenith Education'}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={editing?.imageUrl}
                placeholder="/images/blog/visa.png"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                defaultValue={editing?.excerpt}
                rows={2}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={editing?.content}
                rows={8}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                name="published"
                defaultChecked={editing ? editing.published : true}
                className="size-4 rounded border-border"
              />
              Published
            </label>

            <Button type="submit" disabled={saving} className="mt-2">
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? 'Saving...' : 'Save post'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
