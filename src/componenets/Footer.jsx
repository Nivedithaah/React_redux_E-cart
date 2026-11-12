import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight, faPhone, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <div className=' container-fluid mb-5 bg-primary'>
      <div className='row '>
          <div className="col-md-5 py-4  ps-5 text-white">
      
        <h2>
 <FontAwesomeIcon icon={faTruckFast}/> DailyCart
        </h2>
        <p>Designed and built with all the love in the world
           by  Luminar Team with the  <br /> help of our contributers.</p>
        <p>Code Licenced Luminar,docs CC by 3.0.</p>
        <p>Currently v5.3.2.</p>
       </div>
  
    
      <div className="col-md-2 text-white py-4">
        <h5>Links</h5>
        <p>Home</p>
        <p>Wishlist</p>
        <p>Cart</p>
      </div>
      <div className="col-md-2 text-white py-4">
       <h5>Guides</h5>
        <p>React</p>
        <p>React Bootstrap</p>
        <p>React Router</p>
      </div>
      <div className="col-md-3 text-white py-4">
       <h5>Contact Us</h5>
       <input type="text" placeholder='Email Us' /> <FontAwesomeIcon icon={faArrowRight}/>
       <p className='mt-2'><FontAwesomeIcon icon={faFacebook}/>
     
      <FontAwesomeIcon icon={faTwitter} className='mx-2'/> 
       <FontAwesomeIcon icon={faWhatsapp} className='mx-2'/>
       <FontAwesomeIcon icon={faInstagram} className='mx-2'/>
       <FontAwesomeIcon icon={faEnvelope} className='mx-2'/> 
       <FontAwesomeIcon icon={faPhone} className='mx-2'/> 
   </p>
      </div>
      
    </div>
    <p className='text-white text-center mt-5 '>Copyright &copy; July 2026 Batch,Daily Cart.Build with React Redux.</p>
        </div>
  )
}

export default Footer
