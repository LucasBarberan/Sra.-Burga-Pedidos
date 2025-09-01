"use client"

import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

interface ProductListProps {
  category: string
  onProductSelect: (product: any) => void
  onBack: () => void
  onCartClick: () => void
}

export function ProductList({ category, onProductSelect, onBack, onCartClick }: ProductListProps) {
  const { getTotalItems } = useCart()

  const getProducts = (categoryId: string) => {
    switch (categoryId) {
      case "hamburguesas-completas":
        return [
          {
            id: 1,
            name: "CHEESEBURGER CON PAPAS",
            description: "Pan de papa, un medallón de carne, doble feta de queso cheddar, mayonesa, ketchup y cebolla",
            price: 9900,
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mUqokKAsVDRCX5KBIjyh6KVgyvfFeq.png",
            category: "hamburguesas-completas",
          },
          {
            id: 2,
            name: "DOBLE CUARTO DE LIBRA CON PAPAS",
            description: "Doble medallón de carne, queso cheddar, lechuga, tomate, cebolla y salsa especial",
            price: 12800,
            image: "/double-quarter-pounder-burger-with-fries.png",
            category: "hamburguesas-completas",
          },
          {
            id: 3,
            name: "ROYAL CON PAPAS",
            description: "Medallón de carne premium, queso suizo, bacon, lechuga y salsa royal",
            price: 12800,
            image: "/royal-burger-with-bacon-and-fries.png",
            category: "hamburguesas-completas",
          },
        ]
      case "hamburguesas-sin-papas":
        return [
          {
            id: 4,
            name: "CHEESEBURGER SIMPLE",
            description: "Pan de papa, medallón de carne, queso cheddar, mayonesa, ketchup y cebolla",
            price: 7500,
            image: "/simple-cheeseburger-without-fries.png",
            category: "hamburguesas-sin-papas",
          },
          {
            id: 5,
            name: "HAMBURGUESA DOBLE",
            description: "Pan de papa, doble medallón de carne, queso cheddar, lechuga, tomate",
            price: 9200,
            image: "/double-hamburger-without-fries.png",
            category: "hamburguesas-sin-papas",
          },
        ]
      case "bebidas":
        return [
          {
            id: 6,
            name: "COCA COLA 500ML",
            description: "Bebida gaseosa Coca Cola 500ml",
            price: 2500,
            image: "/coca-cola-bottle-500ml.png",
            category: "bebidas",
          },
          {
            id: 7,
            name: "AGUA MINERAL",
            description: "Agua mineral sin gas 500ml",
            price: 1800,
            image: "/mineral-water-bottle.png",
            category: "bebidas",
          },
        ]
      case "extras":
        return [
          {
            id: 8,
            name: "PAPAS FRITAS GRANDES",
            description: "Porción grande de papas fritas crujientes",
            price: 3500,
            image: "/large-french-fries-portion.png",
            category: "extras",
          },
          {
            id: 9,
            name: "AROS DE CEBOLLA",
            description: "Aros de cebolla empanados y fritos",
            price: 4200,
            image: "/onion-rings-fried.png",
            category: "extras",
          },
        ]
      default:
        return []
    }
  }

  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case "hamburguesas-completas":
        return "COMBO HAMBURGUESAS CON PAPAS"
      case "hamburguesas-sin-papas":
        return "HAMBURGUESAS SIN PAPAS"
      case "bebidas":
        return "BEBIDAS"
      case "extras":
        return "EXTRAS"
      default:
        return "PRODUCTOS"
    }
  }

  const products = getProducts(category)

  return (
    <div className="relative">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20 p-1"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold">{getCategoryTitle(category)}</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCartClick}
          className="relative text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ShoppingCart className="h-6 w-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>

      {/* Products List */}
      <div className="p-4 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductSelect(product)}
            className="bg-card rounded-xl p-4 flex gap-4 cursor-pointer transform transition-transform active:scale-95 shadow-sm"
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-bold text-card-foreground text-sm mb-1">{product.name}</h3>
              <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{product.description}</p>
              <p className="text-primary font-bold text-lg">${product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
