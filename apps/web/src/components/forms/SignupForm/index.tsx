'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSignupSchema, UserSignupData } from '@/schemas/users/';
import { useCreateUser } from '@/hooks/users/useCreateUser';
import { InputDefault } from '@/components/ui/InputDefault';
import { InputPassword } from '@/components/ui/InputPassword';
import { InputRadioGroup } from '@/components/ui/InputRadioGroup'

interface ApiError {
    response?: {
        data?: {
            error: string;
        };
    };
    message: string;
}

export default function SignupForm() {
    const { mutate: createUser, isPending, error } = useCreateUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSignupData>({
        resolver: zodResolver(userSignupSchema)
    });

    const onSubmit = (data: UserSignupData) => {
        createUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6 bg-white mt-40 shadow-md rounded-md">
            {/* Nome */}
            <InputDefault
                label="Nome completo"
                placeholder="Seu nome completo"
                {...register('name')}
                error={errors.name}
            />

            {/* Email */}
            <InputDefault
                label="Email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                error={errors.email}
            />

            {/* Tipo de Conta */}
            <InputRadioGroup
                label="Tipo de conta"
                options={[
                    { value: "CLIENT", label: "Cliente" },
                    { value: "SELLER", label: "Vendedor" },
                ]}
                register={register("role")}
                error={errors.role}
            />
            {/* Senha */}
            <InputPassword
                label="Senha"
                placeholder="Mínimo 6 caracteres"
                {...register('password')}
                error={errors.password}
            />

            {/* Confirmar Senha */}
            <InputPassword
                label="Confirmar senha"
                placeholder="Digite a senha novamente"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
            />

            {/* Erro da mutation */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">
                        {(error as ApiError).response?.data?.error || error.message || 'Erro ao criar conta. Tente novamente.'}
                    </p>
                </div>
            )}

            {/* Botão de Submit */}
            <button
                type="submit"
                disabled={isPending}
                className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-semibold text-white bg-amber-900 hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
            >
                {isPending ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Criando conta...
                    </>
                ) : (
                    'Criar conta'
                )}
            </button>
        </form>
    );
}