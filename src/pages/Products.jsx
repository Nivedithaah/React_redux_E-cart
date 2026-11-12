import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../redux/slices/productSlice';
import Header from '../componenets/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

function Products() {

  const { loading, allProducts, error } = useSelector(state => state.productReducer)

  const dispatch = useDispatch()
  
  // pagenation 
  const [currentPage,setcurrentPage] = useState(1)
  const productPerPage=8
  const totalPages =Math.ceil(allProducts?.length/productPerPage)
  const currentLastPageIndex = currentPage * productPerPage
  const currentFirstPageIndex = currentLastPageIndex - productPerPage
  const visibleProductArray = allProducts?.slice(currentFirstPageIndex,currentLastPageIndex)


  const navigatNextPage = () =>{
    currentPage != totalPages && setcurrentPage(currentPage+1)
  }
   const navigatPreviousPage = () =>{
    currentPage != 1 && setcurrentPage(currentPage-1)
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <>
    <Header insideProduct/>
  
    <div className='m-5'>
      {
        loading ?
          <div className='text-center py-5 fw-bold'>Loading..</div>
          :
          <div className="row pt-5">
            {/* duplicate column according to the products */}


            {
              allProducts.length > 0 ?
                visibleProductArray.map(product => (
                  <div key={product?.id} className="col-3">
                    {/* cards */}
                    <Card className='shadow p-2 mb-3'>
                      <Card.Img style={{ height: '400px' }} variant="top" src={product?.thumbnail} />
                      <Card.Body className='text-center'>
                        <Card.Title>{product?.title}</Card.Title>

                        <Link to={`/products/${product?.id}`} className='btn btn-primary'>View More</Link>
                      </Card.Body>
                    </Card>
                  </div>
                ))
                :
                <div className='fw-bold'>No products found</div>
            }

          </div>
      }
      <div className='text-center fs-5 fw-bold'>
        <button onClick={navigatPreviousPage}><FontAwesomeIcon icon={faBackward}/></button>
            {currentPage} to {totalPages}
          <button onClick={navigatNextPage}><FontAwesomeIcon icon={faForward}/></button>
      </div>

    </div>
      </>
  )
}

export default Products
