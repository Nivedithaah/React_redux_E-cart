import { faCartPlus, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Header from '../componenets/Header'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import Swal from 'sweetalert2'
import { addCart } from '../redux/slices/cartSlice'



function Wishlist() {
  const userWishList = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()
    const userCart = useSelector(state=>state.cartReducer)


    const handleCart = (product) =>{
      // check product is already in the cart
      const existingItem = userCart?.find(item=>item?.id==product?.id)
      dispatch(addCart(product))
      dispatch(removeFromWishlist(product.id))
     
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
        {userWishList?.length > 0 ?
          <>
            <h2 className='pt-5 text-info'>User's Wishlist</h2>
            <div className="row pt-5">
              {/* duplicate column according to the products */}
              {
                userWishList?.map(item => (
                  <div className="col-3">
                    {/* cards */}
                    <Card className='shadow p-2'>
                      <Card.Img style={{ height: '300px' }} variant="top" src={item?.thumbnail} />
                      <Card.Body className='text-center'>
                        <Card.Title>{item?.title}</Card.Title>

                        <div className='d-flex justify-content-evenly'>
                          <button onClick={()=>dispatch((removeFromWishlist(item?.id)))} className='btn text-danger fs-3'><FontAwesomeIcon icon={faHeartCircleXmark} /></button>
                          <button onClick={()=>handleCart(item)} className='btn text-success fs-3'><FontAwesomeIcon icon={faCartPlus} /></button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }

            </div>

          </>
          :
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjyGd2ALX92Hm_tqprPvM4jf2I5DXu38cln4EARlfTA&s=10" alt="no image" />
            <h2>Your wishlist is empty</h2>
            <Link to={'/'} className='btn btn-primary'>Add More</Link>
          </div>
        }
      </div>
    </>
  )
}

export default Wishlist
