import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../componenets/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCart, emptyCart, incrementCart, removeCartItem } from '../redux/slices/cartSlice'
import Swal from 'sweetalert2'
import { iconName } from '@fortawesome/free-brands-svg-icons/fa11ty'

function Cart() {

  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const [cartTotal,setCartTotal] =useState(0)
  const navigate= useNavigate()

  useEffect(()=>{
    setCartTotal(userCart?.reduce((acc,curr)=>acc+curr.totalPrice,0))
  },[userCart])

  const handleDecrementCart = (product) => {
    if(product.quantity > 1){
      dispatch(decrementCart(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }
  const handleCheckout = ()=>{
    dispatch(emptyCart())
    Swal.fire({
      title:"Order placed successfully",
      text:"Thankyou for purchasing with us",
      icon:"success",
      confirmButton:"Ok"
    })
    Navigate('/')
  }

  return (
    <>
    <Header/>

   {
    userCart.length > 0 ?

 <div className='container pt-5 pb-5'>
   <h2 className='pt-5 text-info'>User's Cart</h2>
      <div className="row">
        <div className="col-lg-8 border shadow">
            <table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
               {
                userCart.map((item,index)=>( 
                <tr key={item?.id}>
                  <td>{index+1}</td>
                  <td>{item?.title}</td>
                  <td><img style={{height:'80px'}} variant="top" src={item?.thumbnail} alt="no image" /></td>
                  <td>
                    <div className='d-flex'>
                    <button onClick={() => handleDecrementCart(item)} className='btn fs-1'>-</button>
                    <input style={{width:"70px"}} value={item?.quantity} type="text"  className='form-control' readOnly/>
                    <button onClick={()=>dispatch(incrementCart(item?.id))} className='btn fs-1'>+</button>
                    </div>
                  </td>
                  <td>{item?.totalPrice}</td>
                  <td><FontAwesomeIcon onClick={()=>dispatch(removeCartItem(item?.id))} icon={faXmark} className='text-danger fs-4'/></td>
                </tr>))
               }
              </tbody>
            </table>
            <div className='float-end p-3'>
              <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
              <Link to={'/'} className='btn btn-success text-decoration-none'>Shop More</Link>
            </div>
        </div>
        <div className="col-lg-4">
          <div className="border shadow p-5 rounded text-center">
            <h3>Total Amount : <span className='text-danger'>${cartTotal}</span></h3>
            <hr />
            <button onClick={handleCheckout} className="btn btn-success w-50 ">Checkout</button>
          </div>
        </div>
      </div>
      
    </div>

    :

    <div className='d-flex justify-content-center align-items-center flex-column my-5'>
                <img style={{height:"200px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjyGd2ALX92Hm_tqprPvM4jf2I5DXu38cln4EARlfTA&s=10" alt="no image" />
                <h2>Empty Cart</h2>
                <Link to={'/'} className='btn btn-primary'>Shop More</Link>
              </div>
                 }
      </>
  )
}

export default Cart
