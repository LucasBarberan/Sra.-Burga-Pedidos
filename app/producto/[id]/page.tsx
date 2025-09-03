"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number | string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
};

const fmtPrice = (n?: number) =>
  typeof n === "number" ? `$${n.toLocaleString("es-AR")}` : "-";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [prod, setProd] = useState<Product | null>(null);

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!id || !BASE) return;

    (async () => {
      const res = await fetch(`${BASE}/products/${id}`, { cache: "no-store" });
      if (!res.ok) return setProd(null);
      const json = await res.json();
      // MockAPI devuelve el objeto directo
      setProd(json || null);
    })();
  }, [id]);

  if (!prod) return <div className="p-6">Cargando…</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header simple con back */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="rounded-full px-3 py-1 bg-white/10 hover:bg-white/20"
        >
          ←
        </button>
        <h1 className="text-lg sm:text-xl font-extrabold uppercase text-center">
          {prod.name}
        </h1>
        <div className="w-10" />
      </div>
      <div className="h-[6px] w-full bg-white" />

      <div className="mx-auto w-full max-w-3xl p-4 grid gap-6">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white/60">
          <Image
            src={prod.imageUrl && prod.imageUrl.trim() ? prod.imageUrl : "/placeholder.svg"}
            alt={prod.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="rounded-2xl bg-white/60 ring-1 ring-black/5 p-4">
          <div className="text-2xl font-extrabold mb-2">{prod.name}</div>
          <div className="text-[#ea562f] text-xl font-extrabold mb-3">
            {fmtPrice(prod.price)}
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {prod.description || "Sin descripción."}
          </p>
        </div>
      </div>
    </div>
  );
}
