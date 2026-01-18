'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  dateRange?: DateRange;
  onSelect?: (date: Date | undefined) => void;
  onSelectRange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  mode?: 'single' | 'range';
}

export function DatePicker({
  date,
  dateRange,
  onSelect,
  onSelectRange,
  placeholder = 'Seleccionar fecha',
  disabled = false,
  className,
  mode: initialMode = 'single',
}: DatePickerProps) {
  const [mode, setMode] = React.useState<'single' | 'range'>(initialMode);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(date);
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(dateRange);

  React.useEffect(() => {
    setInternalDate(date);
  }, [date]);

  React.useEffect(() => {
    setInternalRange(dateRange);
  }, [dateRange]);

  const handleSingleSelect = (selectedDate: Date | undefined) => {
    setInternalDate(selectedDate);
    onSelect?.(selectedDate);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setInternalRange(range);
    onSelectRange?.(range);
  };

  const displayValue = React.useMemo(() => {
    if (mode === 'range' && internalRange?.from) {
      if (internalRange.to) {
        return `${format(internalRange.from, 'dd MMM yyyy', { locale: es })} - ${format(internalRange.to, 'dd MMM yyyy', { locale: es })}`;
      }
      return format(internalRange.from, 'dd MMM yyyy', { locale: es });
    }
    if (mode === 'single' && internalDate) {
      return format(internalDate, 'PPP', { locale: es });
    }
    return placeholder;
  }, [mode, internalDate, internalRange, placeholder]);

  const calendarStyles = {
    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
    month: 'space-y-4',
    caption: 'flex justify-center pt-1 relative items-center px-10',
    caption_label: 'text-sm font-medium text-slate-700',
    nav: 'space-x-1 flex items-center',
    nav_button: 'h-8 w-8 bg-white border border-slate-300 p-0 hover:bg-slate-100 rounded-md inline-flex items-center justify-center transition-colors',
    nav_button_previous: 'absolute left-0',
    nav_button_next: 'absolute right-0',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex',
    head_cell: 'text-slate-600 rounded-md w-9 font-normal text-[0.8rem]',
    row: 'flex w-full mt-2',
    cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
    day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors text-slate-700',
    day_range_end: 'day-range-end',
    day_selected: 'bg-slate-700 text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white',
    day_today: 'bg-slate-100 text-slate-900 font-semibold',
    day_outside: 'day-outside text-slate-400 opacity-50 aria-selected:bg-slate-100 aria-selected:text-slate-400 aria-selected:opacity-30',
    day_disabled: 'text-slate-400 opacity-50',
    day_range_middle: 'aria-selected:bg-slate-100 aria-selected:text-slate-900',
    day_hidden: 'invisible',
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !internalDate && !internalRange?.from && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b border-slate-200 flex gap-2">
          <Button
            size="sm"
            variant={mode === 'single' ? 'default' : 'outline'}
            onClick={() => setMode('single')}
            className={cn(mode === 'single' && 'bg-slate-700 hover:bg-slate-800')}
          >
            Fecha única
          </Button>
          <Button
            size="sm"
            variant={mode === 'range' ? 'default' : 'outline'}
            onClick={() => setMode('range')}
            className={cn(mode === 'range' && 'bg-slate-700 hover:bg-slate-800')}
          >
            Rango de fechas
          </Button>
        </div>
        {mode === 'single' ? (
          <DayPicker
            mode="single"
            selected={internalDate}
            onSelect={handleSingleSelect}
            locale={es}
            initialFocus
            className="p-3"
            classNames={calendarStyles}
          />
        ) : (
          <DayPicker
            mode="range"
            selected={internalRange}
            onSelect={handleRangeSelect}
            locale={es}
            numberOfMonths={2}
            className="p-3"
            classNames={calendarStyles}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
// Re-export DatePicker as DateRangePicker for backward compatibility
export const DateRangePicker = DatePicker;
