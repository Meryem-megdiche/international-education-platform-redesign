'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react'
import type { University } from '@/lib/db/schema'
import { saveUniversity, deleteUniversity } from '@/app/actions/admin'
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

const COUNTRIES = ['Italy', 'Russia', 'China']

export function UniversitiesManager({ items }: { items: University[] }) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<University | null>(null)
  const [saving, startSaving] = useTransition()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [, startDeleting] = useTransition()

  function openNew() {
    setEditing(null)
    setOpen(true)
  }
  function openEdit(u: University) {
    setEditing(u)
    setOpen(true)
  }

  function handleSubmit(formData: FormData) {
    startSaving(async () => {
      await saveUniversity(formData)
      setOpen(false)
      setEditing(null)
    })
  }

  function handleDelete(id: number) {
    if (!confirm('Delete this university? This cannot be undone.')) return
    setDeletingId(id)
    startDeleting(async () => {
      await deleteUniversity(id)
      setDeletingId(null)
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Universities
          </h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} listed institution{items.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="size-4" /> Add university
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((u) => (
          <div
            key={u.id}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-video">
              <Image
                src={u.imageUrl || '/placeholder.svg'}
                alt={u.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {u.featured && (
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[var(--gold)] px-2 py-0.5 text-xs font-medium text-[var(--gold-foreground)]">
                  <Star className="size-3" /> Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs font-medium uppercase text-primary">
                {u.country} · {u.city}
              </p>
              <h3 className="mt-1 font-semibold text-foreground">{u.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {u.description}
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(u)}
                  className="flex-1"
                >
                  <Pencil className="size-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                  disabled={deletingId === u.id}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  {deletingId === u.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="size-3.5" />
                  )}
                </Button>
              </div>
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
            <SheetTitle>
              {editing ? 'Edit university' : 'Add university'}
            </SheetTitle>
            <SheetDescription>
              Details appear on the public Universities page.
            </SheetDescription>
          </SheetHeader>

          <form action={handleSubmit} className="flex flex-col gap-4 p-4">
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <Field label="Name" name="name" defaultValue={editing?.name} required />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  name="country"
                  defaultValue={editing?.country ?? 'Italy'}
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <Field label="City" name="city" defaultValue={editing?.city} />
            </div>
            <Field
              label="Image URL"
              name="imageUrl"
              defaultValue={editing?.imageUrl}
              placeholder="/images/italy.png"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Tuition from (USD)"
                name="tuitionFrom"
                type="number"
                defaultValue={editing?.tuitionFrom?.toString()}
              />
              <Field
                label="Duration"
                name="duration"
                defaultValue={editing?.duration}
                placeholder="4 years"
              />
            </div>
            <Field
              label="Ranking"
              name="ranking"
              defaultValue={editing?.ranking}
              placeholder="Top 200 worldwide"
            />
            <Field
              label="Programs (comma separated)"
              name="programs"
              defaultValue={editing?.programs?.join(', ')}
              placeholder="Medicine, Engineering, Business"
            />
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editing?.description}
                rows={4}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={editing?.featured}
                className="size-4 rounded border-border"
              />
              Feature on homepage
            </label>

            <Button type="submit" disabled={saving} className="mt-2">
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? 'Saving...' : 'Save university'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  defaultValue?: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
