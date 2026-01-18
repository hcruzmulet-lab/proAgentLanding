'use client';

import * as React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker.css';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Registrar el idioma español
registerLocale('es', es);

interface DatePickerProps {
  date?: Date;
  dateRange?: { from?: Date; to?: Date };
  onSelect?: (date: Date | null) => void;
  onSelectRange?: (range: { from?: Date; to?: Date } | null) => void;
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
  mode = 'single',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedMode, setSelectedMode] = React.useState<'single' | 'range'>(mode);
  const [startDate, setStartDate] = React.useState<Date | null>(
    dateRange?.from || date || null
  );
  const [endDate, setEndDate] = React.useState<Date | null>(dateRange?.to || null);

  React.useEffect(() => {
    if (mode === 'single' && date) {
      setStartDate(date);
      setEndDate(null);
    } else if (mode === 'range' && dateRange) {
      setStartDate(dateRange.from || null);
      setEndDate(dateRange.to || null);
    }
  }, [date, dateRange, mode]);

  const handleDateChange = (dates: Date | [Date | null, Date | null] | null) => {
    if (selectedMode === 'range' && Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      if (onSelectRange) {
        onSelectRange(start || end ? { from: start || undefined, to: end || undefined } : null);
      }
    } else if (selectedMode === 'single' && dates && !Array.isArray(dates)) {
      setStartDate(dates);
      setEndDate(null);
      if (onSelect) {
        onSelect(dates);
      }
      setIsOpen(false);
    }
  };

  const formatDisplayValue = () => {
    if (selectedMode === 'range' && startDate) {
      if (endDate) {
        return `${startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })} - ${endDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      }
      return startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (selectedMode === 'single' && startDate) {
      return startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return placeholder;
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full justify-start text-left font-normal',
          !startDate && 'text-muted-foreground'
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {formatDisplayValue()}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-2 rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="flex gap-2 border-b border-slate-200 p-3">
              <Button
                type="button"
                size="sm"
                variant={selectedMode === 'single' ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedMode('single');
                  setEndDate(null);
                }}
                className={cn(
                  'text-xs',
                  selectedMode === 'single' && 'bg-slate-700 hover:bg-slate-800'
                )}
              >
                Fecha única
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedMode === 'range' ? 'default' : 'outline'}
                onClick={() => setSelectedMode('range')}
                className={cn(
                  'text-xs',
                  selectedMode === 'range' && 'bg-slate-700 hover:bg-slate-800'
                )}
              >
                Rango de fechas
              </Button>
            </div>
            <div className="p-3">
              <ReactDatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange={selectedMode === 'range'}
                inline
                locale="es"
                monthsShown={selectedMode === 'range' ? 2 : 1}
                dateFormat="dd/MM/yyyy"
                calendarClassName="custom-datepicker"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Re-export for backward compatibility
export const DateRangePicker = DatePicker;
