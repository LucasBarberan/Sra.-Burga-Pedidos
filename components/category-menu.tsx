// components/category-menu.tsx
//"use client";
//
//import { useCart } from "@/components/cart-context";
//import { Button } from "@/components/ui/button";
//import { ShoppingCart } from "lucide-react";
//import Image from "next/image";
//import { useEffect, useState } from "react";
//
//interface CategoryMenuProps {
//  onCategorySelect: (categorySlug: string) => void;
//  onCartClick: () => void;
//}
//
//type Category = {
//  id: number;
//  slug: string;
//  name: string;
//  image: string;
//};
//
//export default function CategoryMenu({ onCategorySelect, onCartClick }: CategoryMenuProps) {
//  const [categories, setCategories] = useState<Category[]>([]);
//  const [loading, setLoading] = useState(true);
//  const { getTotalItems } = useCart();
//
//  useEffect(() => {
//    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
//    fetch(`${BASE}/categorias`)
//      .then((r) => r.json())
//      .then((json) => setCategories(json.data || []))
//      .finally(() => setLoading(false));
//  }, []);
//
//  if (loading) return <p className="p-4">Cargando categorías…</p>;
//
//  return (
//    <div className="relative">
//      {/* ======= Header: lo tuyo, sin cambios de estructura ======= */}
//      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
//        <h1 className="text-xl font-bold">Categorías</h1>
//        <Button
//          variant="ghost"
//          size="sm"
//          onClick={onCartClick}
//          className="relative text-primary-foreground hover:bg-primary-foreground/20"
//          aria-label="Abrir carrito"
//        >
//          <ShoppingCart className="h-6 w-6" />
//          {getTotalItems() > 0 && (
//            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
//              {getTotalItems()}
//            </span>
//          )}
//        </Button>
//      </div>
//
//      {/* ======= Contenedor centrado y ancho máximo en desktop (nuevo) ======= */}
//      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6">
//        {/* ======= Grid responsive: 1 col móvil, 2 en md, 3 en xl (nuevo) ======= */}
//        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
//          {categories.map((cat) => (
//            <div
//              key={cat.id}
//              onClick={() => onCategorySelect(cat.slug)}
//              className="group relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition shadow-sm ring-1 ring-black/5 hover:shadow-md"
//              role="button"
//              tabIndex={0}
//              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onCategorySelect(cat.slug)}
//            >
//              {/* Altura adaptable: más baja en desktop para que entre el grid (ajuste) */}
//              <div className="relative h-40 sm:h-48 lg:h-56">
//                <Image
//                  src={cat.image || "/placeholder.png"}
//                  alt={cat.name}
//                  fill
//                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                  className="object-cover duration-300 group-hover:scale-[1.03]"
//                  priority={false}
//                />
//              </div>
//
//              {/* Overlay + título centrado (igual a tu estilo) */}
//              <div className="pointer-events-none absolute inset-0 bg-black/40">
//                <div className="absolute inset-0 flex items-center justify-center">
//                  <h2 className="px-4 text-center font-extrabold uppercase text-white drop-shadow text-base sm:text-lg md:text-xl">
//                    {cat.name}
//                  </h2>
//                </div>
//              </div>
//            </div>
//          ))}
//        </div>
//      </div>
//    </div>
//  );
//}

// components/category-menu.tsx
"use client";

import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryMenuProps {
  onCategorySelect: (categorySlug: string) => void;
  onCartClick: () => void;
}

type Category = { id: number; slug: string; name: string; image: string };

export default function CategoryMenu({ onCartClick }: CategoryMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { getTotalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${BASE}/categorias`)
      .then((r) => r.json())
      .then((json) => setCategories(json.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando categorías…</p>;

  return (
    <div className="relative">
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Categorías</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCartClick}
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

      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => router.push(`/categoria/${cat.slug}`)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition shadow-sm ring-1 ring-black/5 hover:shadow-md"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && router.push(`/categoria/${cat.slug}`)}
            >
              <div className="relative h-40 sm:h-48 lg:h-56">
                <Image
                  src={cat.image || "/placeholder.png"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-black/40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="px-4 text-center font-extrabold uppercase text-white drop-shadow text-base sm:text-lg md:text-xl">
                    {cat.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
