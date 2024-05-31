import { getCookie, hasCookie, setCookie } from 'cookies-next'

// se espera un objeto con una "x" cantidad de propiedas
// donde la llave serán de tipo string y el valor de tipo number
export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}')
    return cookieCart
  }
  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) cookieCart[id] += 1
  else cookieCart[id] = 1
  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) delete cookieCart[id]
  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    const itemsInCart = cookieCart[id] - 1
    if (itemsInCart <= 0) delete cookieCart[id]
    else cookieCart[id] = itemsInCart
    setCookie('cart', JSON.stringify(cookieCart))
  }
}
