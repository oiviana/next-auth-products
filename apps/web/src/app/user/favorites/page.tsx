'use client';

import UserLayout from "@/components/common/UserLayout";
import FavoritesGrid from "@/components/favorites/FavoritesGrid";

export default function UserFavoritesPage() {
    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
                </div>
                <FavoritesGrid />
            </div>
        </UserLayout>
    );
}