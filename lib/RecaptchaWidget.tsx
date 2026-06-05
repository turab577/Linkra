'use client'

import { useEffect, useRef } from 'react'

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const SCRIPT_ID = 'recaptcha-v2-script'

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        }
      ) => number
      reset: (widgetId?: number) => void
      getResponse: (widgetId?: number) => string
    }
  }
}

/**
 * reCAPTCHA v2 checkbox ("I'm not a robot").
 * Renders the widget and reports the token via onChange. If
 * NEXT_PUBLIC_RECAPTCHA_SITE_KEY is unset, renders nothing (server-side
 * verification also skips when unconfigured, so flows are not blocked).
 */
export function Recaptcha({ onChange }: { onChange: (token: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false

    const renderWidget = () => {
      if (cancelled || !ref.current || widgetId.current !== null) return
      if (!window.grecaptcha || !window.grecaptcha.render) {
        setTimeout(renderWidget, 200)
        return
      }
      widgetId.current = window.grecaptcha.render(ref.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => onChange(token),
        'expired-callback': () => onChange(null),
        'error-callback': () => onChange(null),
      })
    }

    if (document.getElementById(SCRIPT_ID)) {
      renderWidget()
    } else {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
    }
  }, [onChange])

  if (!SITE_KEY) return null
  return <div ref={ref} className="flex justify-center" />
}
