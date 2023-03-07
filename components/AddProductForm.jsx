import React from 'react'

const AddProductForm = () => {
  return (
    <div>
        <h1>
            add products from component.
        </h1>
        <div>
            <form className='flex flex-col gap-4 max-w-[30rem]'>
                {/* id */}
                <div className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="id">Id</label>
                    <input type="text" name="id" id="id" className='addProductInputField'/>
                </div>

                {/* name */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className='addProductInputField'/>
                </div>

                {/* description */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" className='addProductInputField'/>
                </div>

                {/* price */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" className='addProductInputField'/>
                </div>

                {/* discount percentage */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="discountPercentage">Discount %</label>
                    <input type="number" name="discountPercentage" id="discountPercentage" className='addProductInputField'/>
                </div>

                {/* brand */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="brand">Brand</label>
                    <input type="text" name="brand" id="brand" className='addProductInputField'/>
                </div>

                {/* category */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" className='addProductInputField'/>
                </div>

                {/* stock */}
                <div  className='addProductInputBox'>
                    <label className=' col-span-1' htmlFor="stock">stock</label>
                    <input type="number" name="stock" id="stock" className='addProductInputField'/>
                </div>

                {/* submit button */}
                <button className='btn-red' >add product</button>

            </form>
        </div>
    </div>
  )
}

export default AddProductForm