import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export function TextInput({ label, name, className, ...props }: TextInputProps): React.ReactElement {
  return (
    <div className='relative'>
      <input
        type='text'
        id={name}
        {...props}
        placeholder=' '
        className={twMerge(
          'w-full h-10 pl-3 bg-prime border rounded border-white focus:outline-none focus:ring-0 peer',
          className
        )}
      />
      {label && (
        <label
          className={
            'pointer-events-none absolute start-1 px-2 bg-prime border-none shadow-none text-sm text-white duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4'
          }
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  );
}
