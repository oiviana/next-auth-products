import { ReactNode } from 'react';

interface SectionProps {
    children?: ReactNode;
}

export default function Section({ children }: SectionProps) {
    return (
        <section className='min-h-30 pt-16 px-3 lg:pl-[300px]'>
            {children}
        </section>
    );
}