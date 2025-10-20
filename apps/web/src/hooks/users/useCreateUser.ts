// hooks/use-create-user.ts
import { useMutation } from '@tanstack/react-query';
import { usersService } from '@/services/api';
import { UserSignupData } from '@/schemas/users/';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const useCreateUser = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: UserSignupData) => {
      const { confirmPassword, password, ...createData } = userData;
      
      const response = await usersService.createNewUser({
        ...createData,
        passwordHash: password,
      });
      
      return response.data;
    },
    onSuccess: async (user, variables) => {
      try {
        await login(variables.email, variables.password);

        if (user.role === 'SELLER') {
          router.push('/seller');
        } else {
          router.push('/user');
        }
      } catch (error) {
        console.error('Erro ao fazer login após cadastro:', error);

      }
    },
  });
};