'use client'

import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    const expoUrl = 'https://u.expo.dev/4912cd96-d87f-41b4-b634-6f1e04cc271e/group/8f421043-89a4-4d6e-a23b-05d07cc36504'
    const deepLink = `exp+://expo-development-client/?url=${encodeURIComponent(expoUrl)}`
    
    // 모바일 앱으로 딥링크 열기
    const openDeepLink = () => {
      const isAndroid = /Android/i.test(navigator.userAgent)
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      
      if (isAndroid) {
        // Android: Intent URL 사용
        const intentUrl = `intent://expo-development-client/?url=${encodeURIComponent(expoUrl)}#Intent;scheme=exp+;package=host.exp.exponent;end`
        window.location.href = intentUrl
      } else if (isIOS) {
        // iOS: 직접 딥링크 시도
        window.location.href = deepLink
      } else {
        // 기타: 직접 딥링크 시도
        window.open(deepLink, '_blank')
      }
    }
    
    openDeepLink()
  }, [])

  
  return (
    <></>
  )
}