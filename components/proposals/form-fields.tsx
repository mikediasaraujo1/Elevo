const labelClassName = "block text-sm font-medium text-[var(--text-primary)]";

export const inputClassName = "input-elevo";

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
      <textarea
        id={id}
        className={`${inputClassName} min-h-[120px] resize-y`}
        {...props}
      />
    </FormField>
  );
}

export { labelClassName };
