import { useState } from 'react'
import React from 'react'
import people from './data'
import { useEffect } from 'react'

function App() {
  const [reviewsData, setReviewsData] = useState(people)
  const [move, setMove] = useState(false)
  const [shift, setShift] = useState(false)
  const [value, setValue] = useState(0)

  function handleNextClick(event) {
    setMove(true)
    setValue(prev => prev + 1)
    if(value === reviewsData.length - 1){
      setValue(0)
    }
  }


  function handlePrevClick(event) {
    setShift(true)
    setValue(prev => prev - 1)
    if (value === 0){
      setValue(reviewsData.length - 1)
    }
  }

  useEffect(()=> {
    const newValue = setInterval(()=> {
        setMove(true)
        setValue(prev => prev + 1)
        if(value === reviewsData.length - 1){
          setValue(0)
        }
    }, 5000)

    return () => clearInterval(newValue)
  }, [value])


  const reviewElements = reviewsData.map((item, index) => {

    const styles = {
      left: `${index * 100}%`,
      transform: move ? `translateX(-${value * 100}%)` : shift ? `translateX(${value * 100}%)` : ""
    }
      const {id, image, name, title, quote} = item
    return (
          <section 
              key={id} 
              style={styles} 
              className='space-y-5 w-full h-full flex flex-col items-center
               py-6 px-2 absolute top-0 right-0 left-0 duration-700 transition-all justify-center '>


              <div className="w-44 h-44 rounded-full shadow-md shadow-zinc-500">
                  <img src={image} alt="" className="w-full h-full rounded-full object-cover" />
              </div>

              <article className="font-bold text-center">
                <h1 className="text-red-500 tracking-widest uppercase">
                  {name}
                </h1>
                <h3 className="text-zinc-500 capitalize">
                  {title}
                </h3>
              </article>

              <p className="text-zinc-400 text-center md:max-w-[80%]">
                {quote}
              </p>

              <p className="text-red-500 text-8xl">
                <i className="fa-solid fa-quote-right"></i>
              </p>
          </section>
    )
  })

  return (
    <div className="App w-full md:w-1/2 md:mx-auto h-[70%] box-border my-24 overflow-hidden relative ">
        {reviewElements}
        <div className=" w-full px-1 flex justify-between absolute top-1/2 -translate-y-[80%]">
                <button onClick={handlePrevClick} 
                      className='text-zinc-400 inline-block text-4xl md:text-6xl'>
                      <i className="fa-solid fa-chevron-left"></i>
                </button>


                <button onClick={handleNextClick} 
                      className='text-zinc-400 inline-block text-4xl md:text-6xl'>
                      <i className="fa-solid fa-chevron-right"></i>
                </button>
        </div>
    </div>

  )
}

export default App
