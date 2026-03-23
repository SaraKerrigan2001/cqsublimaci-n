"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, ShoppingCart, X } from "lucide-react";

interface ProductDetailModalProps {
  product: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLike?: (id: string) => void;
}

export function ProductDetailModal({ product, isOpen, onOpenChange, onLike }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#0b0430] border-white/10 text-white p-0 overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0430] to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white/70 hover:text-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-2 bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                {product.category?.name || product.category || "General"}
              </Badge>
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">${product.price?.toFixed(2)}</div>
              <div className="flex items-center gap-1 justify-end mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < (product.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} 
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">
            {product.description || "Sin descripción disponible."}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 hover:bg-white/5 text-white gap-2"
                onClick={() => onLike && onLike(product.id)}
              >
                <Heart className={`w-4 h-4 ${product.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                {product.likes || 0}
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white gap-2">
              <ShoppingCart className="w-4 h-4" />
              Añadir al Carrito
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
