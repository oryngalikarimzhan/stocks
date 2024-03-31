import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className='isolate h-full w-full overflow-auto rounded-md border border-white'>
      <table ref={ref} className={twMerge('relative w-full border-collapse overflow-clip', className)} {...props} />
    </div>
  )
);

Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={twMerge('z-10 sticky top-0 bg-prime', className)} {...props} />
  )
);

TableHeader.displayName = 'TableHeader';

const TableHeaderRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={twMerge('[&_th:first-child]:before:hidden [&_th:last-child]:after:hidden', className)}
      {...props}
    />
  )
);

TableHeaderRow.displayName = 'TableHeaderRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={twMerge(
        'text-center p-4 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[0.5px] before::bg-white/50 after:absolute after:right-0 after:top-0 after:h-full after:w-[0.5px] after:bg-white/50',
        className
      )}
      {...props}
    />
  )
);

TableHead.displayName = 'TableHead';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={twMerge(
        'relative before:absolute before:inset-0 before:bg-secondary before:-z-10 [&_tr:last-child]:border-0',
        className
      )}
      {...props}
    />
  )
);

TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={twMerge('hover:bg-muted border-b border-white/50', className)} {...props} />
  )
);

TableRow.displayName = 'TableRow';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={twMerge(
        'text-center p-4 hover:bg-white/10 relative before:absolute before:left-0 before:right-0 before:-top-[100vh] before:-bottom-[100vh] before:-z-[1] hover:before:bg-muted',
        className
      )}
      {...props}
    />
  )
);

TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell };
