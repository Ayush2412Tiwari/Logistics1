import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto rounded-xl border border-surface-800 bg-surface-900/50">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";

export const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-b border-surface-800 bg-surface-950/50", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-surface-800 transition-colors hover:bg-surface-800/50 data-[state=selected]:bg-surface-800",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-surface-400 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0 text-surface-200", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";
