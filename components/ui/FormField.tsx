type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldControlClass =
  "w-full rounded-2xl border border-navy/15 bg-white/80 px-4 py-3 text-base text-ink shadow-inner outline-none transition placeholder:text-muted/70 focus:border-navy focus:ring-2 focus:ring-navy/20";
