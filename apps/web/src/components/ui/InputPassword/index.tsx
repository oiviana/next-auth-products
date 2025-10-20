import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  register?: any;
}

export const InputPassword = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, register, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1">
          <input
            {...register}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            {...props}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-500' : ''
            } ${className}`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="text-sm text-gray-600">
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </span>
          </button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    );
  }
);

InputPassword.displayName = 'PasswordInput';