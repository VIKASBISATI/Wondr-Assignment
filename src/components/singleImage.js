import React from 'react';

export default function SingleImage({ image }) {
  return (
      <>
  <img className='single-photo' src={image.download_url} alt='pic' />
  <div></div>
  </>
  )
}