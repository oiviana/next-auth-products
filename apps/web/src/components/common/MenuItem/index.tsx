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
      className="p-2 hover:bg-amber-300 rounded cursor-pointer transition duration-200"
      onClick={handleClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </li>
  );
}