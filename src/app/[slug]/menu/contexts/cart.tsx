"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";


export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  totalQuantity: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //Retornando o Valor total dos produtos
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  //==================//
  //Retornando o Total de produtos
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  //==================//
  //Serve para abrir ou fechar o carrinho
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  //==================//
  //Função para adicionar o produto
  const addProduct = (product: CartProduct) => {
    //Primeiros vamos verificar se o produto já existe no carrinho
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id
    );
    //Se não existir vamos adicionar
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    //Se existir, vou adcionar uma quantidade a ele
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  //==================//
  //Função para tirar uma quantidade do produto
  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        //Primeiro procura o produto na lista
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        //Se existir apenas 1 desse produto, não pode tirar
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }

        //Se existir mais do que 1, vai retorna a lista de produtos, diminuindo 1 do produto escolhido
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  //==================//
  //Função para aumentar uma quantidade do produto
  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  //==================//
  //Função para remover um item do carrinho
  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((prevProduct) => prevProduct.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        total,
        totalQuantity,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
