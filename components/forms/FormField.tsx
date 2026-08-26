import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
};

export function SelectField({
  label,
  name,
  error,
  required,
  options,
  placeholder,
  ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest2 text-ue-smoke mb-2">
        {label}
        {required && <span className="text-ue-red"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={!!error}
        className="w-full bg-ue-ink border border-ue-line px-4 py-3 text-sm text-ue-white focus:border-ue-red outline-none transition-colors"
        {...rest}
      >
        <option value="" disabled>
          {placeholder || "Seleziona"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-ue-red">{error}</p>}
    </div>
  );
}

export function TextField({
  label,
  name,
  error,
  required,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest2 text-ue-smoke mb-2">
        {label}
        {required && <span className="text-ue-red"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full bg-ue-ink border border-ue-line px-4 py-3 text-sm text-ue-white placeholder:text-ue-smoke/60 focus:border-ue-red outline-none transition-colors"
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-ue-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  required,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest2 text-ue-smoke mb-2">
        {label}
        {required && <span className="text-ue-red"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={4}
        aria-invalid={!!error}
        className="w-full bg-ue-ink border border-ue-line px-4 py-3 text-sm text-ue-white placeholder:text-ue-smoke/60 focus:border-ue-red outline-none transition-colors"
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-ue-red">{error}</p>}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  required,
}: {
  label: React.ReactNode;
  name: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={name} className="flex items-start gap-3 text-sm text-ue-white/80 cursor-pointer">
      <input
        id={name}
        name={name}
        type="checkbox"
        required={required}
        defaultChecked={false}
        className="mt-1 h-4 w-4 accent-ue-red shrink-0"
      />
      <span>{label}</span>
    </label>
  );
}
