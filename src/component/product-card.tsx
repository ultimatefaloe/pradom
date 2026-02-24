import React, { useState } from 'react';
import { Product, ProductOption } from "../constants";
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, o: ProductOption) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption>(product.options[0]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl overflow-hidden product-card-shadow border border-stone-100 flex flex-col group"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-stone-100">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-stone-900 mb-1 leading-tight group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>
        
        {product.options.length > 1 ? (
          <div className="mb-4">
            <label className="text-[10px] uppercase font-bold text-stone-400 mb-1 block">Select Weight</label>
            <div className="grid grid-cols-3 gap-2">
              {product.options.map((opt) => (
                <button
                  key={opt.weight}
                  onClick={() => setSelectedOption(opt)}
                  className={`text-[10px] font-bold py-1.5 rounded-lg border transition-all ${
                    selectedOption.weight === opt.weight
                    ? 'border-brand-primary bg-red-50 text-brand-primary'
                    : 'border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  {opt.weight}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <span className="text-xs text-stone-500">{selectedOption.weight}</span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 font-bold uppercase">Price</span>
            <span className="text-xl font-bold text-brand-primary">£{selectedOption.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product, selectedOption)}
            className="bg-brand-primary text-white p-3 rounded-xl hover:bg-red-900 transition-all shadow-md active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
