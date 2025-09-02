// components/category-menu.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-context";

interface CategoryMenuProps {
  onCategorySelect: (categorySlug: string) => void;
  onCartClick: () => void;
}

type Category = {
  id: number;
  slug: string;
  name: string;
  image: string; // rutas como /rewards/free-burger.png que viven en /public
};

export default function CategoryMenu({ onCategorySelect, onCartClick }: CategoryMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { getTotalItems } = useCart()

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${BASE}/categorias`)
      .then(r => r.json())
      .then(json => setCategories(json.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando categorías…</p>;

  return (
    <div className="relative">
      {/* Header estilo anterior */}
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Categorías</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCartClick}
          /*className="rounded-full px-3 py-1 bg-primary-foreground/15 hover:bg-primary-foreground/25 transition"*/
          className="relative text-primary-foreground hover:bg-primary-foreground/20"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="h-6 w-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>

      {/* Tarjetas grandes en una sola columna */}
      <div className="p-4 space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onCategorySelect(cat.slug)}
            className="relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition"
          >
            {/* Imagen de fondo */}
            <div className="relative h-40 sm:h-48">
              <Image
                src={cat.image || "/placeholder.png"}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Overlay y título centrado */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-lg sm:text-xl font-extrabold text-center px-4 drop-shadow">
                {cat.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
