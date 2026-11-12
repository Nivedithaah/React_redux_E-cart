import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Header from '../componenets/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import Swal from 'sweetalert2'
import { addCart } from '../redux/slices/cartSlice'

function View() {

  const { id } = useParams()
  console.log(id);
  const { allProducts } = useSelector(state => state.productReducer)
  const [product,setProduct] = useState({})
  const userWishList = useSelector(state=>state.wishlistReducer) 
  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()


  useEffect(()=>{
    setProduct(allProducts?.find(item=>item.id==id))
  },[])
  console.log(product);

  const handlewishlist = () =>{
    const existingItem = userWishList?.find(item=>item?.id==product?.id)
    if(existingItem){
      Swal.fire({
        title:'Sorry',
        text:'Product Already in your Wishlist',
        icon:'error',
        confirmButtonText:'OK'
      })

    }else{
      dispatch(addToWishlist(product))
    }
  }


   const handleCart = () =>{
    // check product is already in the cart
    const existingItem = userCart?.find(item=>item?.id==product?.id)
    dispatch(addCart(product))
   
      Swal.fire({
        title:'Success',
        text: existingItem? `${existingItem.title} added again` : "Product added to your Cart",
        icon:'success',
        confirmButtonText:'OK'
      })

  }


  return (
    <>
      <Header />
      <div className='container my-5'>
        <div  className="row align-items-center">
          <div className="col-lg-6 text-center">
            <img style={{ height: '500px' }} className='mt-5' src={product?.thumbnail} alt="no image" />
            <div className='d-flex justify-content-evenly mt-5'>
              <button onClick={handlewishlist} className='btn btn-info'>ADD TO WISHLIST</button>
              <button onClick={handleCart} className='btn btn-success'>ADD TO CART</button>
            </div>
          </div>
          <div className="col-lg-6 mt-5">
            <h2>{product?.title}</h2>
            <h3>$ {product?.price}</h3>
            <h4>Brand:{product?.brand} </h4><br />
            <h5>Category:{product?.category} </h5><br />
            <h6>Description: {product?.description} </h6><br />
            <h6>Client Reviews:</h6>
            {
              product?.reviews?.map((item,index)=>(
<div key={index} className='border rounded p-2 shadow my-5' >
              <p><span className='fw-bolder'>Name : {item?.reviewerName} </span> Message : {item?.comment}</p>
              <p>Rating :{item?.rating}  <FontAwesomeIcon icon={faStar} className='text-warning fs-5' /></p>
            </div>
              ))
              
            }
          </div>
        </div>

      </div>
    </>
  )
}

export default View
