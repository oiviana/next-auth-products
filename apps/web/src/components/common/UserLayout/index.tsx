import UserMenu from '@/components/user/menu/UserMenu';
import { ReactNode } from 'react';
import Section from '../Section';

interface SectionProps {
    children?: ReactNode;
}

export default function UserLayout({ children }: SectionProps) {
    return (
        <>
      <UserMenu/>
      <Section>
        {children}
      </Section>
      </>
    );
}