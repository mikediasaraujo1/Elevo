const inputClassName =
  "w-full rounded-lg border border-elevo-border bg-elevo-bg px-4 py-3 text-elevo-cream placeholder:text-elevo-smoke/60 outline-none transition-colors focus:border-elevo-gold/50 focus:ring-1 focus:ring-elevo-gold/30";

const labelClassName = "block text-sm font-medium text-elevo-cream";

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput({
  id,
  label,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
}) {
  return (
    <FormField id={id} label={label}>
      <input id={id} className={inputClassName} {...props} />
    </FormField>
  );
}

export function TextArea({
  id,
  label,
  ...props
}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
}) {
  return (
    <FormField id={id} label={label}>
      <textarea id={id} className={`${inputClassName} min-h-[120px] resize-y`} {...props} />
    </FormField>
  );
}

export { inputClassName, labelClassName };
