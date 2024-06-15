'use client'
import Image from 'next/image'
import Link from 'next/link'

import { IoHeart, IoHeartOutline } from 'react-icons/io5'

import { SimplePokemon } from '..'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleFavorite } from '@/store/pokemons/pokemons'

interface Props {
  pokemon: SimplePokemon
}

export default function PokemonCard({ pokemon }: Props) {
  const { id, name } = pokemon
  const isFavorite = useAppSelector((state) => !!state.pokemons.favorites[id])
  const dispatch = useAppDispatch()

  const onToggle = () => dispatch(toggleFavorite(pokemon))

  return (
    <div key={id} className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center p-6 bg-gray-800 border-b">
          <Image
            key={id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            width={100}
            height={100}
            alt={name}
            // las imágenes que no estan en el viewport no son prioridad
            // solo se cargan a medida que se haga scroll
            priority={false}
          />
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            #{id} {name}
          </p>
          <div className="mt-5">
            <Link
              href={`/dashboard/pokemon/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más información
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div onClick={onToggle} className="px-4 py-2 hover:bg-gray-100 flex justify-center cursor-pointer">
            <div className="text-red-500">{isFavorite ? <IoHeart /> : <IoHeartOutline />}</div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {isFavorite ? 'Es favorito' : 'Agregar a favoritos'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
