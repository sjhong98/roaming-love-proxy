'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [showLink, setShowLink] = useState(false)
  const expoUrl = 'https://u.expo.dev/4912cd96-d87f-41b4-b634-6f1e04cc271e/group/8f421043-89a4-4d6e-a23b-05d07cc36504'
  // exp:// 스킴 사용 (exp+:// 대신)
  const deepLink = `exp://expo-development-client/?url=${encodeURIComponent(expoUrl)}`
  const deepLinkPlus = `exp+://expo-development-client/?url=${encodeURIComponent(expoUrl)}`

  useEffect(() => {
    // 모바일 앱으로 딥링크 열기 시도
    const openDeepLink = () => {
      const isAndroid = /Android/i.test(navigator.userAgent)
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      
      if (isAndroid) {
        // Android: Intent URL 사용
        const intentUrl = `intent://expo-development-client/?url=${encodeURIComponent(expoUrl)}#Intent;scheme=exp+;package=host.exp.exponent;end`
        window.location.href = intentUrl
      } else if (isIOS) {
        // iOS: 사용자 클릭을 통한 딥링크 열기 (Safari 보안 정책)
        // 자동으로 열 수 없으므로 링크 표시
        setShowLink(true)
      } else {
        // 기타: 직접 딥링크 시도
        window.open(deepLink, '_blank')
      }
    }
    
    openDeepLink()
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    
    if (isIOS) {
      // iOS: Expo Universal Link를 직접 사용 (가장 확실한 방법)
      // expoUrl을 직접 사용하면 Universal Link로 작동
      window.location.href = expoUrl
    } else {
      // Android 및 기타: 딥링크 사용
      window.location.href = deepLink
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {showLink && (
        <a 
          href={expoUrl}
          onClick={handleLinkClick}
          style={{
            padding: '15px 30px',
            backgroundColor: '#007AFF',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          앱에서 열기
        </a>
      )}

      {/* <Image  />/ */}
    </div>
  )
}