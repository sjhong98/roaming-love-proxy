'use client'

import { useEffect, useRef } from "react"

export default function Home() {
  const expoUrl = 'exp://u.expo.dev/4912cd96-d87f-41b4-b634-6f1e04cc271e/group/e3a7a33f-1701-4740-852b-d753fbe47b94'
  const hasTriedAppStore = useRef(false)
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // 사용자 에이전트 확인
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    const isAndroid = /android/i.test(userAgent)

    // Expo Go 앱 스토어 링크
    const expoGoAppStore = isIOS
      ? 'https://apps.apple.com/app/expo-go/id982107779'
      : isAndroid
      ? 'https://play.google.com/store/apps/details?id=host.exp.exponent'
      : 'https://expo.dev/client'

    // Expo Go 앱을 열려고 시도
    const tryOpenExpo = () => {
      window.location.href = expoUrl
      
      // 일정 시간 후에도 페이지가 그대로 있으면 앱이 없는 것으로 판단
      redirectTimer.current = setTimeout(() => {
        // 페이지가 여전히 활성화되어 있고 아직 앱 스토어로 이동하지 않았다면
        if (!hasTriedAppStore.current) {
          hasTriedAppStore.current = true
          window.location.href = expoGoAppStore
        }
      }, 2000)
    }

    // 페이지가 다시 포커스를 받았을 때 (앱 스토어에서 돌아왔을 가능성)
    const handleFocus = () => {
      // 앱 스토어로 이동했었다면, 돌아왔을 때 exp:// URL 다시 시도
      if (hasTriedAppStore.current) {
        // 타이머 클리어
        if (redirectTimer.current) {
          clearTimeout(redirectTimer.current)
        }
        // 다시 exp:// URL 시도
        setTimeout(() => {
          tryOpenExpo()
          // 다시 2초 후에도 안되면 앱 스토어로 (한 번만)
        }, 500)
      }
    }

    // Visibility API를 사용하여 페이지가 다시 보이게 되면
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && hasTriedAppStore.current) {
        handleFocus()
      }
    }

    // 페이지 로드 후 바로 시도
    tryOpenExpo()

    // 이벤트 리스너 등록
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 주기적으로 exp:// URL 시도 (앱 설치 후 자동으로 열리도록)
    const intervalId = setInterval(() => {
      if (hasTriedAppStore.current && document.visibilityState === 'visible') {
        window.location.href = expoUrl
      }
    }, 3000)

    // 클린업
    return () => {
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current)
      }
      clearInterval(intervalId)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <></>
  )
}