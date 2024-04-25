import Image from 'next/image'
import Link from 'next/link'

import { IoHeartOutline } from 'react-icons/io5'

import { SimplePokemon } from '..'

interface Props {
  pokemons: SimplePokemon[]
}

export default function PokemonCard({ pokemons }: Props) {
  return (
    pokemons &&
    pokemons.map((pkmn) => (
      <div key={pkmn.id} className="mx-auto right-0 mt-2 w-60">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div className="flex flex-col items-center p-6 bg-gray-800 border-b">
            <Image
              key={pkmn.id}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pkmn.id}.svg`}
              width={100}
              height={100}
              alt={pkmn.name}
              // las imágenes que no estan en el viewport no son prioridad
              // solo se cargan a medida que se haga scroll
              priority={false}
            />
            <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
              #{pkmn.id} {pkmn.name}
            </p>
            <div className="mt-5">
              <Link
                href={`/dashboard/pokemon/${pkmn.id}`}
                className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
              >
                Más información
              </Link>
            </div>
          </div>
          <div className="border-b">
            <Link href="#" className="px-4 py-2 hover:bg-gray-100 flex justify-center">
              <div className="text-red-500">
                <IoHeartOutline />
              </div>
              <div className="pl-3">
                <p className="text-sm font-medium text-gray-800 leading-none">Agregar a favoritos</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    ))
  )
}
