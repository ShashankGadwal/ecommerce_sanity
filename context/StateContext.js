import React,{ useEffect, useState ,createContext,useContext} from "react";
import toast, { Toaster } from 'react-hot-toast';
const Context = createContext();
export const StateContext = ({children})=>{
    const [showCart,setShowCart]= useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [totalPrice,setTotalPrice]=useState(0);
    const [qty,setQty]=useState(1);
    const [totalQuantity,setTotalQuantity]=useState(0);
    let foundProduct;
    let index;
    const toggleCartItemQuantity =(id,value)=>{
        foundProduct = cartItems.find((item)=> item._id === id);
        index =cartItems.findIndex((product)=>product._id === id);
        let newCartItems =  cartItems.filter((item)=> item._id !== id)
        if(value ==='inc'){
            setCartItems([...newCartItems,{...foundProduct ,quantity:foundProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + foundProduct.price);
            setTotalQuantity((prevTotalQuantity)=>prevTotalQuantity + 1);

        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems,{...foundProduct ,quantity:foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price);
                setTotalQuantity((prevTotalQuantity)=>prevTotalQuantity - 1);
            }
        }
    }
    const onRemove = ( product)=>{
        foundProduct = cartItems.find((item)=> item._id === product._id);
        let newCartItems =  cartItems.filter((item)=> item._id !== product._id)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantity((precTotalQuantity) => precTotalQuantity - foundProduct.quantity)
        setCartItems(newCartItems);
    }
    const incQnty =()=>{
        setQty((prevQty)=>prevQty +1);
    }
    const decQnty =()=>{
        setQty((prevQty)=>{
            if(prevQty - 1 < 1)return 1;
            return prevQty - 1;
        });
    }
    const onAdd =(product,quantity)=>{
        const checkProductInCart = cartItems.find((item)=>item._id === product._id);
        setTotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * quantity);
        setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity + quantity);
        if(checkProductInCart){
            const updateCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return{
                    ...cartProduct,quantity:cartProduct.quantity + quantity
                }
            })
            setCartItems(updateCartItems);
        }else{
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}]);
        }
        toast.success(`${qty} ${product.name} added to cart.`)
    }
return (
    <Context.Provider value={
        {
            showCart,
            cartItems,
            totalPrice,
            qty,
            totalQuantity,
            incQnty,
            decQnty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantity,
        }
    }>
        {children}
    </Context.Provider>
)
}
export const useStateContext =()=>useContext(Context);