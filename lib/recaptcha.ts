/**
 * Google reCAPTCHA v3 server-side verification.
 *
 * Calls the siteverify endpoint and validates success + score threshold.
 * If RECAPTCHA_SECRET_KEY is not set, verification is skipped (returns ok)
 * so the app keeps working in dev / before real keys are provisioned.
 */

const SITEVERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const DEFAULT_MIN_SCORE = 0.5

export interface RecaptchaResult {
  ok: boolean
  skipped?: boolean
  score?: number
  action?: string
  errorCodes?: string[]
}

/**
 * Verify a reCAPTCHA v3 token.
 * @param token       token returned by grecaptcha.execute() on the client
 * @param expectedAction  action name the token was generated with (e.g. 'login')
 * @param minScore    minimum acceptable score (0.0 - 1.0)
 */
export async function verifyRecaptcha(
  token: string | undefined | null,
  expectedAction?: string,
  minScore: number = DEFAULT_MIN_SCORE
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  // Not configured yet -> skip so flows are not blocked.
  if (!secret) {
    return { ok: true, skipped: true }
  }

  if (!token) {
    return { ok: false, errorCodes: ['missing-input-response'] }
  }

  try {
    const params = new URLSearchParams({ secret, response: token })
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    const data = (await res.json()) as {
      success: boolean
      score?: number
      action?: string
      'error-codes'?: string[]
    }

    if (!data.success) {
      return { ok: false, errorCodes: data['error-codes'], score: data.score, action: data.action }
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      return { ok: false, score: data.score, action: data.action, errorCodes: ['action-mismatch'] }
    }

    if (typeof data.score === 'number' && data.score < minScore) {
      return { ok: false, score: data.score, action: data.action, errorCodes: ['low-score'] }
    }

    return { ok: true, score: data.score, action: data.action }
  } catch (err) {
    console.error('reCAPTCHA verify error:', err)
    return { ok: false, errorCodes: ['verify-request-failed'] }
  }
}
