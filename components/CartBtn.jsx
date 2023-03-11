import { toggleCartState } from '@/utils/atom/cartRecoil'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil'

const CartBtn = () => {
    const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState)
    const handleClick = () => setOpenCart(!isOpenCart)
  return (
    <div>
        <button onClick={handleClick}><ShoppingBagIcon className='h-8 w-8 bg-[#e50914] rounded-md p-1 text-white hover:brightness-75'/></button>
    </div>
  )
}

export default CartBtn