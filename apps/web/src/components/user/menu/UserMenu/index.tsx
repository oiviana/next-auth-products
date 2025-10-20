"use client"

import MenuItem from "@/components/common/MenuItem";
import LogoutButton from "@/components/common/LogoutButton";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export default function UserMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="bg-white h-12 w-screen flex justify-end absolute top-0 z-20 lg:hidden shadow-md">
                <button
                    className="h-full w-12 flex items-center justify-center"
                    onClick={toggleMenu}
                >
                    <IoMenu className="text-black" size={26} />
                </button>
            </div>
            <section
                className={`
          absolute z-35 bg-white h-screen w-64 shadow-md pl-5
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <h1 className="text-left my-8 text-lg lg:text-xl font-semibold">
                    Next Auth Products
                </h1>
                <ul className="space-y-4">
                    <MenuItem
                        title="Início"
                        navigateTo="/user"
                        onClick={handleMenuItemClick}
                    />
                    <MenuItem
                        title="Comprar"
                        navigateTo="/user/products"
                        onClick={handleMenuItemClick}
                    />
                         <MenuItem
                        title="Carrinho"
                        navigateTo="/user/cart"
                        onClick={handleMenuItemClick}
                    />
                    <MenuItem
                        title="Minha Conta"
                        navigateTo="/user/account"
                        onClick={handleMenuItemClick}
                    />
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </section>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-25 z-30 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    );
}