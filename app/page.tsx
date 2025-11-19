'use client'

import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    const deepLink = 'exp+://expo-development-client/?url=https://u.expo.dev/4912cd96-d87f-41b4-b634-6f1e04cc271e/group/8f421043-89a4-4d6e-a23b-05d07cc36504'
    window.location.href = deepLink
  }, [])

  return (
    <></>
  )
}