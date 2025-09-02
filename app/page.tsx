//"use client"
//
//import { Cart } from "@/components/cart"
//import { CartProvider } from "@/components/cart-context"
//import CategoryMenu from "@/components/category-menu"
//import { ProductDetail } from "@/components/product-detail"
//import { ProductList } from "@/components/product-list"
//import { useState } from "react"
//
//export default function Home() {
//  const [currentView, setCurrentView] = useState<"menu" | "category" | "product">("menu")
//  const [selectedCategory, setSelectedCategory] = useState<string>("")
//  const [selectedProduct, setSelectedProduct] = useState<any>(null)
//  const [showCart, setShowCart] = useState(false)
//
//  const handleCategorySelect = (category: string) => {
//    setSelectedCategory(category)
//    setCurrentView("category")
//  }
//
//  const handleProductSelect = (product: any) => {
//    setSelectedProduct(product)
//    setCurrentView("product")
//  }
//
//  const handleBack = () => {
//    if (currentView === "product") {
//      setCurrentView("category")
//    } else if (currentView === "category") {
//      setCurrentView("menu")
//    }
//  }
//
//  return (
//    <CartProvider>
//      <div className="min-h-screen bg-background">
//        {currentView === "menu" && (
//          <CategoryMenu onCategorySelect={handleCategorySelect} onCartClick={() => setShowCart(true)} />
//        )}
//
//        {currentView === "category" && (
//          <ProductList
//            category={selectedCategory}
//            onProductSelect={handleProductSelect}
//            onBack={handleBack}
//            onCartClick={() => setShowCart(true)}
//          />
//        )}
//
//        {currentView === "product" && selectedProduct && (
//          <ProductDetail product={selectedProduct} onBack={handleBack} onCartClick={() => setShowCart(true)} />
//        )}
//
//        {showCart && <Cart onClose={() => setShowCart(false)} />}
//      </div>
//    </CartProvider>
//  )
//}

// app/page.tsx
"use client";

import { CartProvider } from "@/components/cart-context";
import CategoryMenu from "@/components/category-menu";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <CategoryMenu
          onCategorySelect={() => { /* no se usa más aquí */ }}
          onCartClick={() => { /* si tenés modal de carrito, dejalo */ }}
        />
      </div>
    </CartProvider>
  );
}
