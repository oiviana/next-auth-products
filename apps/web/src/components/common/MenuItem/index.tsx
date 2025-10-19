"use client";

import { useRouter } from "next/navigation";

interface MenuItemProps {
  title: string;
  navigateTo: string;
  icon?: string;
}

export default function MenuItem({ title, navigateTo, icon }: MenuItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(navigateTo);
  };

  return (
    <li 
      className="py-2 text:md lg:text-lg hover:text-amber-950 cursor-pointer"
      onClick={handleClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </li>
  );
}