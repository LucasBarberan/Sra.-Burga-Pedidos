"use client";

import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryMenuProps {
  // onCategorySelect ya no es necesario si navegamos con router,
  // pero lo dejo opcional para no romper firmas existentes.
  onCategorySelect?: (categorySlug: string) => void;
  onCartClick: () => void;
}

type Category = {
  id: number | string;
  name: string;
  isComboable?: boolean;
  isDefault?: boolean;
  useConsumables?: boolean;
  imageUrl?: string; // por si luego lo agregás en MockAPI
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function CategoryMenu({ onCartClick }: CategoryMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { getTotalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL;

    async function load() {
      try {
        if (!BASE) throw new Error("Falta NEXT_PUBLIC_API_URL en .env.local");

        const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} al pedir /categories`);
        }

        const json = await res.json();

        // MockAPI devuelve un array directo. Pero por seguridad:
        const list: Category[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : [];

        setCategories(list);
      } catch (err) {
        console.error("Error cargando categorías:", err);
        setCategories([]); // evita .map sobre undefined
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="p-4">Cargando categorías…</p>;

  return (
    <div className="relative">
      {/* Header (tu mismo estilo) */}
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

      {/* Contenedor centrado y grid responsive (sin cambiar tu look móvil) */}
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(categories ?? []).map((cat) => {
            const slug = slugify(cat.name);

            return (
              <div
                key={String(cat.id)}
                onClick={() => router.push(`/categoria/${slug}`)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition shadow-sm ring-1 ring-black/5 hover:shadow-md"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") router.push(`/categoria/${slug}`);
                }}
              >
                {/* Imagen de fondo (si no hay imageUrl, usa un placeholder local) */}
                <div className="relative h-40 sm:h-48 lg:h-56">
                  <Image
                    src={cat.imageUrl || "/placeholder.svg"}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover duration-300 group-hover:scale-[1.03]"
                    priority={false}
                  />
                </div>

                {/* Overlay + título centrado (tu estilo) */}
                <div className="pointer-events-none absolute inset-0 bg-black/40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="px-4 text-center font-extrabold uppercase text-white drop-shadow text-base sm:text-lg md:text-xl">
                      {cat.name}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
          {(categories ?? []).length === 0 && (
            <div className="col-span-full p-8 text-center opacity-70">
              No hay categorías para mostrar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
