import { ReactNode } from 'react';
import Section from '../Section';
import SellerMenu from '@/components/seller/menu/SellerMenu';

interface SectionProps {
  children?: ReactNode;
}

export default function SellerLayout({ children }: SectionProps) {
  return (
    <>
      <SellerMenu />
      <Section>
        {children}
      </Section>
    </>
  );
}