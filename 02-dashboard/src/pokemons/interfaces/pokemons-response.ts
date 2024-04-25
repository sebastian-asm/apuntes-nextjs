export interface PokemonsResponse {
  count: number
  next: string
  previous: null
  results: Result[]
}

interface Result {
  name: string
  url: string
}
