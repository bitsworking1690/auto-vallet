'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import clsx from 'clsx'

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface DatePickerProps {
  value: string           // YYYY-MM-DD or ''
  onChange: (date: string) => void
  error?: string
}

function toYMD(d: Date): string {
  return d.toISOString().split('T')[0]
}

function isWeekend(year: number, month: number, day: number): boolean {
  const dow = new Date(year, month, day).getDay()
  return dow === 0 // Sunday closed; Saturday open
}

function isPast(year: number, month: number, day: number): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(year, month, day) < today
}

export default function DatePicker({ value, onChange, error }: DatePickerProps) {
  const today = new Date()
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }, [viewMonth])

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }, [viewMonth])

  // Don't allow navigating to past months
  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth()

  // Days in month
  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay() // 0=Sun

  // Parse selected date
  const selectedYMD = value || ''

  const handleDayClick = (day: number) => {
    if (isPast(viewYear, viewMonth, day) || isWeekend(viewYear, viewMonth, day)) return
    const d = new Date(viewYear, viewMonth, day)
    onChange(toYMD(d))
  }

  // Format display label
  const displayLabel = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      })
    : null

  return (
    <div>
      {/* Calendar card */}
      <div
        className={clsx(
          'rounded-2xl border bg-white overflow-hidden transition-colors',
          error ? 'border-red-300' : 'border-neutral-200'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm font-semibold text-neutral-900">
            {MONTHS[viewMonth]} {viewYear}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-white transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day-of-week labels */}
        <div className="grid grid-cols-7 px-3 pt-3 pb-1">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-neutral-400 uppercase tracking-wider py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 px-3 pb-3 gap-y-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day      = idx + 1
            const ymd      = toYMD(new Date(viewYear, viewMonth, day))
            const past     = isPast(viewYear, viewMonth, day)
            const weekend  = isWeekend(viewYear, viewMonth, day)
            const disabled = past || weekend
            const selected = ymd === selectedYMD
            const isToday  = ymd === toYMD(today)

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={disabled}
                className={clsx(
                  'relative h-9 w-full flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-100',
                  selected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : disabled
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'text-neutral-700 hover:bg-brand-50 hover:text-brand-700'
                )}
                aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${disabled ? ' (unavailable)' : ''}`}
                aria-pressed={selected}
              >
                {day}
                {/* Today dot */}
                {isToday && !selected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-400" />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="px-4 pb-3 pt-1 border-t border-neutral-100 flex items-center gap-4 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 inline-block" />
            Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 inline-block" />
            Unavailable
          </span>
          <span className="ml-auto italic">Sundays closed</span>
        </div>
      </div>

      {/* Selected date pill */}
      {displayLabel && (
        <div className="mt-2 flex items-center gap-2 text-sm text-brand-700 font-medium">
          <CalendarDays size={14} className="flex-shrink-0" />
          {displayLabel}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  )
}
