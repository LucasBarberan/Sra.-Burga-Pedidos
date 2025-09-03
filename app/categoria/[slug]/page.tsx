"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number | string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId: number | string;
};

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-");

const fmtPrice = (n?: number) =>
  typeof n === "number" ? `$${n.toLocaleString("es-AR")}` : "-";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!slug || !BASE) return;

    (async () => {
      const resCats = await fetch(`${BASE}/categories`, { cache: "no-store" });
      const cats: any[] = await resCats.json();
      const cat = (Array.isArray(cats) ? cats : []).find(c => slugify(c.name) === slug);

      setCategoryName(cat?.name ? String(cat.name).toUpperCase() : String(slug).replace(/-/g, " ").toUpperCase());
      if (!cat) return setProducts([]);

      const resProds = await fetch(`${BASE}/products?categoryId=${cat.id}`, { cache: "no-store" });
      const prods: any[] = await resProds.json();
      setProducts(Array.isArray(prods) ? prods : []);
    })().catch(() => setProducts([]));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="rounded-full px-3 py-1 bg-white/10 hover:bg-white/20"
          aria-label="Volver"
        >
          ←
        </button>
        <h1 className="text-lg sm:text-xl font-extrabold uppercase text-center">
          {categoryName || "CATEGORÍA"}
        </h1>
        <button
          onClick={() => router.push("/carrito")}
          className="rounded-full p-2 bg-white/10 hover:bg-white/20"
          aria-label="Carrito"
          title="Carrito"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
      <div className="h-[6px] w-full bg-white" />

      {/* Lista: 1 col mobile, 2 col desktop */}
      <div className="mx-auto w-full max-w-6xl px-4 py-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map((p) => (
          <div
            key={String(p.id)}
            onClick={() => router.push(`/producto/${p.id}`)}   //{/* 🔹 Navegación al detalle */}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && router.push(`/producto/${p.id}`)}
            className="rounded-2xl bg-white/60 ring-1 ring-black/5 shadow-sm p-4 flex gap-3 cursor-pointer hover:shadow-md transition"
          >
            <div className="relative h-20 w-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={p.imageUrl && p.imageUrl.trim() ? p.imageUrl : "/placeholder.svg"}
                alt={p.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="font-extrabold uppercase text-sm sm:text-base">
                {p.name}
              </div>
              <div className="text-sm text-muted-foreground line-clamp-2">
                {p.description || ""}
              </div>
              <div className="mt-2 text-lg font-extrabold text-[#ea562f]">
                {fmtPrice(p.price)}
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full p-8 text-center opacity-70">
            No hay productos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}
