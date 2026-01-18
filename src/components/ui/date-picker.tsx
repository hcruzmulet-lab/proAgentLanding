'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = 'Seleccionar fecha',
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP', { locale: es }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={onSelect}
          locale={es}
          initialFocus
          className="p-3"
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center px-10',
            caption_label: 'text-sm font-medium text-slate-700',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              'h-8 w-8 bg-white border border-slate-300 p-0 hover:bg-slate-100 rounded-md inline-flex items-center justify-center transition-colors'
            ),
            nav_button_previous: 'absolute left-0',
            nav_button_next: 'absolute right-0',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-slate-600 rounded-md w-9 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: cn(
              'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors text-slate-700'
            ),
            day_range_end: 'day-range-end',
            day_selected:
              'bg-slate-700 text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white',
            day_today: 'bg-slate-100 text-slate-900 font-semibold',
            day_outside:
              'day-outside text-slate-400 opacity-50 aria-selected:bg-slate-100 aria-selected:text-slate-400 aria-selected:opacity-30',
            day_disabled: 'text-slate-400 opacity-50',
            day_range_middle:
              'aria-selected:bg-slate-100 aria-selected:text-slate-900',
            day_hidden: 'invisible',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

interface DateRangePickerProps {
  dateRange?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  dateRange,
  onSelect,
  placeholder = 'Seleccionar rango',
  disabled = false,
  className,
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !dateRange && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'LLL dd, y', { locale: es })} -{' '}
                {format(dateRange.to, 'LLL dd, y', { locale: es })}
              </>
            ) : (
              format(dateRange.from, 'LLL dd, y', { locale: es })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={onSelect}
          locale={es}
          numberOfMonths={2}
          className="p-3"
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center px-10',
            caption_label: 'text-sm font-medium text-slate-700',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              'h-8 w-8 bg-white border border-slate-300 p-0 hover:bg-slate-100 rounded-md inline-flex items-center justify-center transition-colors'
            ),
            nav_button_previous: 'absolute left-0',
            nav_button_next: 'absolute right-0',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-slate-600 rounded-md w-9 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: cn(
              'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors text-slate-700'
            ),
            day_range_end: 'day-range-end',
            day_selected:
              'bg-slate-700 text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white',
            day_today: 'bg-slate-100 text-slate-900 font-semibold',
            day_outside:
              'day-outside text-slate-400 opacity-50 aria-selected:bg-slate-100 aria-selected:text-slate-400 aria-selected:opacity-30',
            day_disabled: 'text-slate-400 opacity-50',
            day_range_middle:
              'aria-selected:bg-slate-100 aria-selected:text-slate-900',
            day_hidden: 'invisible',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
