// app/categoria/[slug]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Producto = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaNombre, setCategoriaNombre] = useState<string>("");

  useEffect(() => {
    if (!slug) return;
    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // De momento sacamos el nombre derivado del slug
    setCategoriaNombre(String(slug).replace(/-/g, " ").toUpperCase());

    fetch(`${BASE}/categorias/${slug}/productos`)
      .then((r) => r.json())
      .then((json) => setProductos(json.data || []))
      .catch(() => setProductos([]));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="rounded-full px-3 py-1 bg-white/10 hover:bg-white/20"
        >
          ←
        </button>
        <h1 className="text-xl font-extrabold uppercase">
          {categoriaNombre}
        </h1>
        <div className="w-10" /> {/* espacio para centrar título */}
      </div>
      <div className="h-[6px] w-full bg-white" />

      {/* Grilla de productos */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <div key={p.id} className="rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
            <div className="relative h-44">
              <Image
                src={p.image || "/placeholder.png"}
                alt={p.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm opacity-70">
                ${p.price?.toFixed?.(2) ?? "-"}
              </div>
              <div className="mt-3">
                <Button onClick={() => router.push(`/producto/${p.id}`)}>
                  Ver detalle
                </Button>
              </div>
            </div>
          </div>
        ))}
        {productos.length === 0 && (
          <div className="col-span-full p-8 text-center opacity-70">
            No hay productos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}
