import { cookies } from 'next/headers'

export function setCookie(name, value, days) {
  try {
    const oneDay = days * 24 * 60 * 60 * 1000
    const cookie = cookies().set(name, value, { expires: Date.now() - oneDay })
    return cookie
  } catch (error) { console.log(error) }
}

export function getCookie(name) {
  try {
    const cookieStore = cookies()
    const cookie = cookieStore.get(name)
    return cookie
  } catch (error) { console.log(error) }
}

export function deleteCookie(name) {
  try {document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";} catch (error) { console.log(error) }
}

export function hasCookie(name) {
  const cookieStore = cookies()
  const hasCookie = cookieStore.has(name)
  return hasCookie
}