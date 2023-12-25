import InfiniteScroll from '@/components/PokemonList'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>

   <InfiniteScroll />
   </>
  )
}
