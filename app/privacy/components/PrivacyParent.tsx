'use client'

import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050D1A]/95 backdrop-blur-xl border-b border-[#00C2FF]/10 shadow-[0_4px_40px_rgba(0,194,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#7B2FFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.4)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10C4 7 6.5 5 9 5h1V3H9C5.13 3 2 6.13 2 10s3.13 7 7 7h1v-2H9C6.5 15 4 13 4 10z" fill="white"/>
              <path d="M11 3v2h1c2.5 0 5 2 5 5s-2.5 5-5 5h-1v2h1c3.87 0 7-3.13 7-7s-3.13-7-7-7h-1z" fill="white" opacity="0.6"/>
              <rect x="7" y="9" width="6" height="2" rx="1" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-black text-xl tracking-tight">Linkra</span>
        </a>
        <a
          href="/"
          className="flex items-center gap-1.5 text-white/50 hover:text-[#00C2FF] text-sm font-medium transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </a>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────
   SECTION COMPONENT
───────────────────────────────────────── */
interface SectionProps {
  id: string
  number: string
  title: string
  children: React.ReactNode
}

function Section({ id, number, title, children }: SectionProps) {
  return (
    <div id={id} className="scroll-mt-28 mb-14">
      <div className="flex items-start gap-4 mb-4">
        <span className="shrink-0 w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] text-xs font-black">
          {number}
        </span>
        <h2 className="text-white text-xl font-bold leading-snug pt-1">{title}</h2>
      </div>
      <div className="ml-12 text-white/55 text-sm leading-[1.9] space-y-3">{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────
   TABLE OF CONTENTS
───────────────────────────────────────── */
const sections = [
  { id: 'overview', number: '01', title: 'Overview & Scope' },
  { id: 'platform-access', number: '02', title: 'How We Access Platform Data (OAuth)' },
  { id: 'information-we-collect', number: '03', title: 'Information We Collect' },
  { id: 'messaging-data', number: '04', title: 'Messaging & Social Data' },
  { id: 'how-we-use', number: '05', title: 'How We Use Your Information' },
  { id: 'what-we-do-not-do', number: '06', title: 'What We Will Never Do' },
  { id: 'legal-basis', number: '07', title: 'Legal Basis for Processing (GDPR)' },
  { id: 'sharing', number: '08', title: 'Sharing Your Information' },
  { id: 'platform-apis', number: '09', title: 'Third-Party Platform APIs & Compliance' },
  { id: 'your-rights', number: '10', title: 'Your Rights' },
  { id: 'data-retention', number: '11', title: 'Data Retention' },
  { id: 'cookies', number: '12', title: 'Cookies & Tracking' },
  { id: 'children', number: '13', title: "Children's Privacy" },
  { id: 'security', number: '14', title: 'Security' },
  { id: 'international', number: '15', title: 'International Data Transfers' },
  { id: 'changes', number: '16', title: 'Changes to This Policy' },
  { id: 'contact', number: '17', title: 'Contact Us' },
]

function TableOfContents() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
      <p className="text-white/30 text-xs font-bold tracking-[0.15em] uppercase mb-4">Contents</p>
      <nav className="space-y-0.5">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              active === s.id
                ? 'bg-[#00C2FF]/10 text-[#00C2FF]'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            <span className={`text-[10px] font-black shrink-0 ${active === s.id ? 'text-[#00C2FF]' : 'text-white/20'}`}>
              {s.number}
            </span>
            {s.title}
          </a>
        ))}
      </nav>
    </aside>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function PrivacyParent() {
  return (
    <div className="min-h-screen bg-[#050D1A] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>

      <Navbar />

      {/* Hero header */}
      <div className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/40 to-transparent" />
        <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-3">Legal</p>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-4">Privacy Policy</h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Effective date: <span className="text-white/60 font-semibold">January 1, 2025</span> &nbsp;·&nbsp; Last updated: <span className="text-white/60 font-semibold">April 20, 2025</span>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            'GDPR Compliant',
            'CCPA Compliant',
            'Meta App Review Ready',
            'WhatsApp Business API',
            'Instagram Graph API',
          ].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00C2FF]/20 bg-[#00C2FF]/5 text-[#00C2FF]/70 text-xs font-medium">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" fill="#00C2FF" opacity="0.6"/>
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24 flex gap-16">
        <TableOfContents />

        <main className="flex-1 max-w-2xl">

          {/* Intro box */}
          <div className="mb-12 p-5 rounded-2xl border border-[#00C2FF]/15 bg-[#00C2FF]/4">
            <p className="text-white/65 text-sm leading-relaxed">
              At Linkra (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), your privacy is not an afterthought — it is the foundation of our
              product. This Privacy Policy explains exactly what data we access, what we do with it, what we
              will never do with it, and how you remain in full control at all times. Linkra is a unified
              social messaging platform that aggregates your direct messages from connected social media
              applications — including Instagram, WhatsApp, Facebook Messenger, Telegram, X (Twitter), and
              LinkedIn — into a single inbox. Because we handle personal communications, we hold ourselves
              to the highest standard of data stewardship.
            </p>
          </div>

          {/* Section 01 */}
          <Section id="overview" number="01" title="Overview & Scope">
            <p>
              This Privacy Policy applies to all users of the Linkra application and services, including
              our website at <span className="text-[#00C2FF]">linkra.io</span>, our mobile applications,
              and any related products or features (collectively, the &quot;Service&quot;). It applies regardless
              of where you are located in the world.
            </p>
            <p>
              Linkra is a messaging aggregation platform. We act as a conduit that retrieves your messages
              from third-party social media platforms you have explicitly authorized and displays them to
              you inside the Linkra interface. We are the &quot;data processor&quot; acting on your behalf; you
              remain the &quot;data controller&quot; of your own personal communications.
            </p>
            <p>
              This policy is designed to satisfy the requirements of the European Union General Data
              Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), the Meta Platform
              Terms and Developer Policies (including Instagram Graph API and WhatsApp Business API
              policies), and other applicable data protection laws globally.
            </p>
          </Section>

          {/* Section 02 */}
          <Section id="platform-access" number="02" title="How We Access Platform Data (OAuth)">
            <p>
              <strong className="text-white/80">We only access your social media accounts using official OAuth 2.0 authorization flows provided by each platform.</strong> This means:
            </p>
            <p>
              <strong className="text-white/80">We never ask for your passwords.</strong> When you connect
              a platform such as Instagram or Facebook, you are redirected to that platform&apos;s own login
              screen. You authenticate directly with them. Linkra receives a secure access token — never
              your username or password.
            </p>
            <p>
              <strong className="text-white/80">We request only minimum necessary permissions.</strong> For
              each platform, we request only the specific API scopes required to retrieve and display your
              direct messages. We do not request permissions to post content, follow users, access your
              feed, view your contacts, or perform any action beyond reading and sending messages within
              the Linkra interface.
            </p>
            <p>
              <strong className="text-white/80">You can revoke access at any time.</strong> You may
              disconnect any platform from Linkra at any time, both from within Linkra&apos;s settings and
              directly from that platform&apos;s authorized applications settings. Upon disconnection, Linkra
              immediately stops accessing that platform and we delete all cached message data from that
              platform within 72 hours.
            </p>
            <p>
              <strong className="text-white/80">Instagram & Facebook / Meta:</strong> Linkra uses the
              Instagram Graph API and the Messenger Platform API under Meta&apos;s Platform Terms. We comply
              fully with Meta&apos;s Platform Policy, including restrictions on data use, data portability,
              and user consent requirements. Our use of Meta APIs has been reviewed and approved through
              Meta&apos;s App Review process.
            </p>
            <p>
              <strong className="text-white/80">WhatsApp:</strong> Linkra integrates with the WhatsApp
              Business API (Cloud API) provided by Meta. Access is governed by WhatsApp&apos;s Business and
              Commerce Policies and Meta&apos;s Platform Terms. We do not access WhatsApp personal account
              data outside of what is explicitly authorized through the official API.
            </p>
          </Section>

          {/* Section 03 */}
          <Section id="information-we-collect" number="03" title="Information We Collect">
            <p>We collect only what is strictly necessary to operate the Service:</p>
            <p>
              <strong className="text-white/80">Account Information:</strong> When you create a Linkra
              account, we collect your name, email address, and a hashed password (we never store plain-text
              passwords). If you sign up using Google or Apple Sign-In, we receive your name, email address,
              and profile picture token from those providers under their respective OAuth flows.
            </p>
            <p>
              <strong className="text-white/80">Platform OAuth Tokens:</strong> To maintain your connected
              social media integrations, we store encrypted OAuth access tokens and refresh tokens for each
              platform you authorize. These tokens allow Linkra to retrieve your messages on your behalf.
              They are encrypted at rest using AES-256 and are never transmitted to third parties.
            </p>
            <p>
              <strong className="text-white/80">Device & Technical Information:</strong> We collect your
              IP address, browser type and version, device type, operating system, time zone, and referring
              URL. This is used for security monitoring, fraud prevention, and service diagnostics only.
            </p>
            <p>
              <strong className="text-white/80">App Usage Data:</strong> We collect anonymized,
              aggregated information about how you interact with Linkra — which features you use, pages
              visited, and session duration — to improve the product. We do not build individual behavioral
              profiles for advertising purposes.
            </p>
            <p>
              <strong className="text-white/80">Support Communications:</strong> If you contact Linkra
              support by email or chat, we retain the content of those communications to resolve your
              request and improve service quality.
            </p>
            <p>
              <strong className="text-white/80">Payment Information:</strong> Payments are processed
              by Stripe. We store only your plan tier and the last 4 digits of your payment card. We never
              store full card numbers, CVVs, or raw payment details on our servers.
            </p>
          </Section>

          {/* Section 04 */}
          <Section id="messaging-data" number="04" title="Messaging & Social Data">
            <p>
              This section specifically addresses how Linkra handles your private messages, which are the
              most sensitive data type we process.
            </p>
            <p>
              <strong className="text-white/80">What message data we access:</strong> When you connect a
              social platform, Linkra retrieves your direct message conversations from that platform via its
              official API. This includes message text, timestamps, sender/recipient information, and where
              permitted by the platform API, media attachments such as images and files.
            </p>
            <p>
              <strong className="text-white/80">How message data is stored:</strong> Messages are cached
              on Linkra&apos;s servers temporarily to power your unified inbox experience. Message content is
              encrypted in transit (TLS 1.3) and at rest (AES-256). We do not permanently archive your
              message history beyond what is necessary for the Service to function — see Section 11 for
              retention details.
            </p>
            <p>
              <strong className="text-white/80">Message data is yours alone:</strong> Your message
              content is private. Linkra employees do not read your messages except under extremely limited
              circumstances — specifically, when responding to a verified legal request, or when you
              explicitly share a message with us as part of a support ticket. All such access is logged
              and audited.
            </p>
            <p>
              <strong className="text-white/80">No training on message data:</strong> We do not use your
              private message content to train machine learning models, to build advertising profiles, or
              for any purpose other than displaying those messages to you inside the Linkra interface.
            </p>
            <p>
              <strong className="text-white/80">AI Smart Replies (Pro feature):</strong> If you use
              Linkra&apos;s AI-assisted reply suggestions, the content of the relevant message thread is
              processed to generate suggestions. This processing occurs in-session only and is not stored
              after the suggestion is generated or dismissed. You can disable Smart Replies at any time in
              your account settings.
            </p>
            <p>
              <strong className="text-white/80">No access to your contacts or social graph:</strong> We do
              not access your social media followers, friend lists, contact books, or social graph data.
              We access only your direct message threads.
            </p>
          </Section>

          {/* Section 05 */}
          <Section id="how-we-use" number="05" title="How We Use Your Information">
            <p>We use the information we collect for the following purposes, and only these purposes:</p>
            <p>
              <strong className="text-white/80">Service Delivery:</strong> To operate the Linkra platform
              — specifically, to authenticate your account, maintain your connected platform integrations,
              fetch and display your messages, and enable you to reply to messages across connected platforms.
            </p>
            <p>
              <strong className="text-white/80">Product Improvement:</strong> To understand aggregate
              usage patterns, diagnose technical issues, and prioritize improvements. We use anonymized,
              aggregate data for this purpose — never individual message content.
            </p>
            <p>
              <strong className="text-white/80">Security & Fraud Prevention:</strong> To detect and prevent
              unauthorized account access, abuse of the platform, spam, and violations of our Terms of
              Service. This includes analyzing login patterns and flagging suspicious activity.
            </p>
            <p>
              <strong className="text-white/80">Communications:</strong> To send you transactional
              communications including email verification, password resets, connected platform
              notifications, and billing receipts. With your explicit opt-in, we may send product updates
              and feature announcements. You may unsubscribe from non-transactional emails at any time.
            </p>
            <p>
              <strong className="text-white/80">Legal Compliance:</strong> To comply with applicable laws,
              court orders, and regulatory requirements, and to enforce our Terms of Service.
            </p>
          </Section>

          {/* Section 06 */}
          <Section id="what-we-do-not-do" number="06" title="What We Will Never Do">
            <p>
              We believe you deserve absolute clarity about what we will never do with your data. These
              are unconditional commitments, not subject to exceptions or future policy changes without
              your explicit consent:
            </p>
            <div className="space-y-2.5">
              {[
                'We will NEVER sell your personal data or message content to any third party.',
                'We will NEVER share your private message content with advertisers.',
                'We will NEVER use your message content to target you with advertisements.',
                'We will NEVER train AI models on your private message content without your explicit, informed, and revocable opt-in consent.',
                'We will NEVER access social media API data for any purpose beyond providing the Linkra messaging aggregation service you authorized.',
                'We will NEVER store your social media passwords. We use OAuth tokens only.',
                'We will NEVER access your social media account data in ways that exceed the permissions you explicitly granted via OAuth.',
                'We will NEVER scrape or harvest data from social platforms beyond what is permitted by each platform\'s official API and Terms of Service.',
                'We will NEVER share API data obtained from Instagram, WhatsApp, Facebook, or any other Meta platform with data brokers or analytics companies.',
                'We will NEVER use Meta platform data for purposes inconsistent with Meta\'s Platform Terms.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/4 border border-red-500/10">
                  <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#EF4444" opacity="0.15"/>
                    <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  <p className="text-white/60 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 07 */}
          <Section id="legal-basis" number="07" title="Legal Basis for Processing (GDPR)">
            <p>
              If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, we
              process your personal data on the following legal bases under the General Data Protection
              Regulation (GDPR):
            </p>
            <p>
              <strong className="text-white/80">Contract Performance (Art. 6(1)(b) GDPR):</strong> The
              primary basis for our processing is to deliver the Linkra Service you have contracted for —
              including connecting your social accounts, aggregating your messages, and enabling you to
              reply. Without this processing, we cannot provide the core Service.
            </p>
            <p>
              <strong className="text-white/80">Explicit Consent (Art. 6(1)(a) GDPR):</strong> For the
              access and processing of your private message data obtained via social platform APIs, we rely
              on your explicit, informed consent granted at the point of connecting each platform. You may
              withdraw this consent at any time by disconnecting a platform within Linkra&apos;s settings.
            </p>
            <p>
              <strong className="text-white/80">Legitimate Interests (Art. 6(1)(f) GDPR):</strong> We
              process certain technical and usage data based on our legitimate interest in operating a
              secure, reliable platform — including security monitoring, fraud detection, and product
              diagnostics. We balance these interests carefully against your rights and freedoms, and
              this processing does not include your message content.
            </p>
            <p>
              <strong className="text-white/80">Legal Obligation (Art. 6(1)(c) GDPR):</strong> We may
              process personal data to comply with applicable legal requirements, including verified law
              enforcement requests and statutory obligations.
            </p>
            <p>
              <strong className="text-white/80">Special Categories:</strong> To the extent your private
              messages may contain special category data (e.g., health information, political opinions),
              we process this data solely on the basis of your explicit consent (Art. 9(2)(a) GDPR) for
              the purpose of delivering the unified inbox service. We do not analyze, categorize, or
              otherwise process special category data for any secondary purpose.
            </p>
          </Section>

          {/* Section 08 */}
          <Section id="sharing" number="08" title="Sharing Your Information">
            <p>
              <strong className="text-white/80">We do not sell your data. We do not share your message content with third parties.</strong> The following describes the limited circumstances in which we share any data at all:
            </p>
            <p>
              <strong className="text-white/80">Infrastructure Sub-processors:</strong> We use the
              following trusted sub-processors to operate the Service. Each is bound by a Data Processing
              Agreement (DPA) and is prohibited from using your data for any purpose beyond providing
              infrastructure services to Linkra:
            </p>
            <div className="mt-2 space-y-2">
              {[
                { name: 'Supabase', role: 'Database, authentication, and real-time messaging infrastructure', cert: 'SOC 2 Type II' },
                { name: 'Vercel / AWS', role: 'Application hosting, CDN, and edge compute infrastructure', cert: 'SOC 2 Type II, ISO 27001' },
                { name: 'Stripe', role: 'Payment processing (PCI-DSS Level 1)', cert: 'PCI-DSS Level 1' },
              ].map((p) => (
                <div key={p.name} className="p-3 rounded-xl border border-white/6 bg-white/2">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-white/80 text-xs font-bold">{p.name}</span>
                    <span className="text-[#00C2FF]/60 text-[10px] font-semibold">{p.cert}</span>
                  </div>
                  <p className="text-white/40 text-xs">{p.role}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              <strong className="text-white/80">Legal Requirements:</strong> We may disclose personal data
              if required by law, court order, or governmental authority. We will notify affected users of
              such requests unless legally prohibited from doing so. We will always challenge requests we
              believe to be overbroad or unlawful.
            </p>
            <p>
              <strong className="text-white/80">Business Transfers:</strong> In the event of a merger,
              acquisition, or asset sale, user data may be transferred. We will notify you via email at
              least 30 days before any such transfer, and you will have the right to delete your account
              and data before the transfer occurs.
            </p>
            <p>
              <strong className="text-white/80">With Your Explicit Consent:</strong> We may share data
              with third parties only if you explicitly consent to such sharing for a specific stated
              purpose. Such consent is always separately obtained and revocable.
            </p>
          </Section>

          {/* Section 09 */}
          <Section id="platform-apis" number="09" title="Third-Party Platform APIs & Compliance">
            <p>
              Linkra&apos;s core functionality depends on official APIs provided by third-party social media
              platforms. Our use of these APIs is strictly governed by each platform&apos;s developer and
              privacy policies. This section explains our compliance posture for each:
            </p>
            <p>
              <strong className="text-white/80">Meta (Instagram, Facebook Messenger, WhatsApp):</strong>{' '}
              We comply fully with Meta&apos;s Platform Terms, Meta&apos;s Developer Policies, and the Instagram
              Platform Policy. Specifically: (a) we use Instagram and Messenger data only to provide the
              messaging aggregation experience users have authorized; (b) we do not use Meta platform data
              for advertising targeting, data brokering, or any purpose that violates Meta&apos;s Prohibited
              Data Uses; (c) we do not transfer Meta platform data to any analytics provider or data
              aggregator; (d) we store Meta platform data only for as long as necessary to deliver the
              Service, and delete it promptly upon user disconnection; (e) our app has completed Meta&apos;s
              App Review process for all required permissions including <code className="text-[#00C2FF] bg-[#00C2FF]/8 px-1 rounded text-xs">instagram_manage_messages</code>,{' '}
              <code className="text-[#00C2FF] bg-[#00C2FF]/8 px-1 rounded text-xs">pages_messaging</code>, and{' '}
              <code className="text-[#00C2FF] bg-[#00C2FF]/8 px-1 rounded text-xs">whatsapp_business_messaging</code>.
            </p>
            <p>
              <strong className="text-white/80">Telegram:</strong> We access Telegram via the official
              Telegram Bot API and MTProto protocol under Telegram&apos;s Terms of Service. We only access
              message data from conversations where you are a participant and have authorized access.
            </p>
            <p>
              <strong className="text-white/80">X (Twitter):</strong> We use the X API v2 under X&apos;s
              Developer Agreement and Policy. We access only Direct Message endpoints with user-level OAuth
              2.0 PKCE authorization. We comply with X&apos;s restricted-use policies for DM data.
            </p>
            <p>
              <strong className="text-white/80">LinkedIn:</strong> We use the LinkedIn API under LinkedIn&apos;s
              API Terms of Use. We access only the Messaging API scope with explicit user authorization via
              OAuth 2.0.
            </p>
            <p>
              <strong className="text-white/80">API Data Minimization:</strong> For every platform, we
              request only the minimum API permissions necessary to deliver the unified inbox experience.
              We do not request permissions to post on your behalf, read your timeline or feed, access
              your followers or connections, or perform any action outside of reading and sending direct
              messages.
            </p>
          </Section>

          {/* Section 10 */}
          <Section id="your-rights" number="10" title="Your Rights">
            <p>
              You have meaningful rights over your personal data. We are committed to honoring all of them
              promptly, without discrimination, and free of charge:
            </p>
            <p>
              <strong className="text-white/80">Right of Access:</strong> You may request a full export
              of all personal data Linkra holds about you, including your account data, connected platform
              tokens (metadata only, not raw tokens), and any cached message data.
            </p>
            <p>
              <strong className="text-white/80">Right to Correction:</strong> You may correct inaccurate
              personal data directly in your Linkra account settings. For data we cannot correct on your
              behalf, we will instruct you on how to do so.
            </p>
            <p>
              <strong className="text-white/80">Right to Deletion ("Right to Be Forgotten"):</strong> You
              may request deletion of your Linkra account and all associated data — including cached
              messages, account information, and OAuth tokens. We will complete this within 30 days.
              Deleting your Linkra account does not delete messages on the source platform; those must be
              deleted directly on Instagram, WhatsApp, etc.
            </p>
            <p>
              <strong className="text-white/80">Right to Disconnect a Platform:</strong> You may disconnect
              any connected social media platform at any time from Linkra&apos;s settings. Upon disconnection,
              we immediately revoke your OAuth token for that platform and delete all cached message data
              from that platform within 72 hours.
            </p>
            <p>
              <strong className="text-white/80">Right to Data Portability:</strong> You may request an
              export of your personal data in a machine-readable format (JSON or CSV).
            </p>
            <p>
              <strong className="text-white/80">Right to Object / Restrict Processing:</strong> You may
              object to processing of your data based on legitimate interests, or request that we restrict
              processing while a dispute is resolved.
            </p>
            <p>
              <strong className="text-white/80">Right to Withdraw Consent:</strong> Where processing is
              based on your consent (including access to social platform message data), you may withdraw
              consent at any time by disconnecting the relevant platform. Withdrawal does not affect prior
              lawful processing.
            </p>
            <p>
              <strong className="text-white/80">CCPA Rights:</strong> California residents have the right
              to know what personal information we collect and how it is used, the right to delete personal
              information, the right to opt out of the sale of personal information (we do not sell
              personal information), and the right to non-discrimination for exercising CCPA rights.
            </p>
            <p>
              <strong className="text-white/80">Right to Lodge a Complaint:</strong> If you believe we
              have violated your privacy rights, you may file a complaint with your local data protection
              authority. For EU residents, this is your national DPA (e.g., ICO for the UK, CNIL for
              France). We encourage you to contact us first so we can resolve the matter directly.
            </p>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:privacy@linkra.io" className="text-[#00C2FF] underline underline-offset-2">
                privacy@linkra.io
              </a>{' '}
              or use the Data & Privacy section in your account settings. We will respond within 30 days
              (or as required by applicable law).
            </p>
          </Section>

          {/* Section 11 */}
          <Section id="data-retention" number="11" title="Data Retention">
            <p>
              We retain data only for as long as necessary. Here is exactly how long we keep each data type:
            </p>
            <div className="space-y-2.5">
              {[
                {
                  type: 'Account Data (name, email, settings)',
                  period: 'Duration of active account + 30 days post-deletion for recovery, then permanently deleted.',
                },
                {
                  type: 'Cached Message Data (Free plan)',
                  period: '30 days of message history cached. Older messages are purged automatically.',
                },
                {
                  type: 'Cached Message Data (Pro plan)',
                  period: '12 months of message history cached. Purged after 12 months.',
                },
                {
                  type: 'Cached Message Data (Team plan)',
                  period: '24 months of message history cached. Purged after 24 months.',
                },
                {
                  type: 'OAuth Tokens',
                  period: 'Retained while platform is connected. Immediately revoked and deleted upon platform disconnection or account deletion.',
                },
                {
                  type: 'Payment & Billing Records',
                  period: '7 years for legal and tax compliance, even after account deletion.',
                },
                {
                  type: 'Security & Access Logs',
                  period: '90 days for fraud detection and security investigations.',
                },
                {
                  type: 'Support Communications',
                  period: '2 years after your last support interaction.',
                },
              ].map((item) => (
                <div key={item.type} className="p-3.5 rounded-xl border border-white/6 bg-white/2">
                  <p className="text-white/75 text-xs font-bold mb-1">{item.type}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{item.period}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Upon account deletion, all personal data is permanently deleted or irreversibly anonymized
              within 30 days, except where longer retention is required by law (e.g., billing records).
            </p>
          </Section>

          {/* Section 12 */}
          <Section id="cookies" number="12" title="Cookies & Tracking">
            <p>
              Linkra uses a minimal set of cookies and local storage to operate the Service. We do not
              use advertising cookies, cross-site tracking, or behavioral profiling technologies.
            </p>
            <p>
              <strong className="text-white/80">Strictly Necessary Cookies:</strong> These are required
              for the Service to function and include your session authentication token, CSRF protection
              tokens, and user interface preferences (e.g., theme, language). You cannot opt out of these
              while using Linkra.
            </p>
            <p>
              <strong className="text-white/80">Analytics:</strong> We use a privacy-first, self-hosted
              analytics tool to measure aggregate usage — page views, feature usage rates, and session
              counts. This tool does not use cookies, does not collect personal identifiers, and does not
              share data with third parties. No individual user profiles are built.
            </p>
            <p>
              <strong className="text-white/80">What we do NOT use:</strong> We do not use Google
              Analytics, Meta Pixel, or any other third-party advertising or behavioral tracking
              technology. We do not participate in behavioral advertising networks.
            </p>
            <p>
              <strong className="text-white/80">Managing Cookies:</strong> You may delete or manage
              cookies at any time through your browser settings. Note that disabling session cookies will
              prevent you from staying logged into Linkra.
            </p>
          </Section>

          {/* Section 13 */}
          <Section id="children" number="13" title="Children's Privacy">
            <p>
              Linkra is not directed at and may not be used by children. The minimum age to use Linkra is
              <strong className="text-white/80"> 13 years old</strong> globally, and{' '}
              <strong className="text-white/80">16 years old</strong> for users in the European Economic
              Area, the United Kingdom, and other jurisdictions that set a higher digital consent age.
            </p>
            <p>
              We do not knowingly collect personal information from children below the applicable minimum
              age. Because Linkra connects to social media platforms that themselves require minimum age
              compliance (Instagram and Facebook require users to be at least 13), we rely on those
              platforms&apos; age verification in addition to our own.
            </p>
            <p>
              If we become aware that a user is below the applicable minimum age, we will immediately
              suspend the account and delete all associated data. If you are a parent or guardian and
              believe your child has created a Linkra account without consent, please contact us
              immediately at{' '}
              <a href="mailto:privacy@linkra.io" className="text-[#00C2FF] underline underline-offset-2">
                privacy@linkra.io
              </a>.
            </p>
          </Section>

          {/* Section 14 */}
          <Section id="security" number="14" title="Security">
            <p>
              Protecting your data — especially your private messages — is our highest technical priority.
              We implement the following controls:
            </p>
            <p>
              <strong className="text-white/80">Encryption in Transit:</strong> All data transmitted
              between your device and Linkra servers uses TLS 1.3. All communication with social platform
              APIs uses TLS with certificate pinning where supported.
            </p>
            <p>
              <strong className="text-white/80">Encryption at Rest:</strong> Message data and OAuth tokens
              are encrypted at rest using AES-256. Passwords are hashed using bcrypt with a minimum cost
              factor of 12. Encryption keys are managed using a hardware security module (HSM) and rotated
              on a regular schedule.
            </p>
            <p>
              <strong className="text-white/80">Access Controls:</strong> Access to production systems is
              restricted to a small number of authorized Linkra engineers via multi-factor authentication
              and SSH key-based access. All access is logged and subject to audit. No engineer may access
              user message data without a formally logged and authorized reason.
            </p>
            <p>
              <strong className="text-white/80">Infrastructure:</strong> Linkra runs on SOC 2 Type II
              certified infrastructure. We conduct regular penetration testing and vulnerability assessments.
              We participate in a responsible disclosure program — security researchers may report
              vulnerabilities to{' '}
              <a href="mailto:security@linkra.io" className="text-[#00C2FF] underline underline-offset-2">
                security@linkra.io
              </a>.
            </p>
            <p>
              <strong className="text-white/80">Incident Response:</strong> In the event of a data breach
              that affects your personal data, we will notify you and relevant supervisory authorities
              within 72 hours of becoming aware of the breach, as required by GDPR Article 33.
            </p>
          </Section>

          {/* Section 15 */}
          <Section id="international" number="15" title="International Data Transfers">
            <p>
              Linkra is operated from the United States. If you access the Service from the EEA, UK,
              Switzerland, or any other jurisdiction with data transfer restrictions, your personal data
              will be transferred to and processed in the United States.
            </p>
            <p>
              We ensure lawful transfer of personal data using the following mechanisms:
            </p>
            <p>
              <strong className="text-white/80">Standard Contractual Clauses (SCCs):</strong> We have
              executed the European Commission&apos;s Standard Contractual Clauses (2021 SCCs) with all
              sub-processors who handle EEA personal data, including infrastructure providers.
            </p>
            <p>
              <strong className="text-white/80">UK International Data Transfer Agreements (IDTAs):</strong>{' '}
              For transfers involving UK personal data, we have entered into the ICO&apos;s International Data
              Transfer Agreements (IDTAs) with relevant sub-processors.
            </p>
            <p>
              <strong className="text-white/80">Adequacy Decisions:</strong> Where the European Commission
              has issued an adequacy decision for the destination country, we rely on it as an additional
              safeguard.
            </p>
            <p>
              By using the Linkra Service, you acknowledge the transfer of your data to the United States
              under the legal safeguards described above.
            </p>
          </Section>

          {/* Section 16 */}
          <Section id="changes" number="16" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy to reflect changes in our product, applicable law, or
              platform API requirements. For material changes — especially changes that affect how we
              handle your message data or social media access — we will:
            </p>
            <p>— Send an email to your registered address at least <strong className="text-white/80">30 days</strong> before changes take effect.</p>
            <p>— Display a prominent in-app notice upon your next login.</p>
            <p>— Update the &quot;Last Updated&quot; date at the top of this page.</p>
            <p>— For changes that require new consent (e.g., new data uses), we will obtain your explicit consent before the change applies to your data.</p>
            <p>
              Your continued use of the Service after changes take effect constitutes acceptance of the
              updated policy. If you do not accept material changes, you may delete your account and
              all associated data at any time.
            </p>
            <p>
              An archive of previous versions of this policy is available upon request by emailing{' '}
              <a href="mailto:privacy@linkra.io" className="text-[#00C2FF] underline underline-offset-2">
                privacy@linkra.io
              </a>.
            </p>
          </Section>

          {/* Section 17 */}
          <Section id="contact" number="17" title="Contact Us">
            <p>
              If you have any questions, concerns, or data rights requests regarding this Privacy Policy
              or Linkra&apos;s data practices, please contact our Privacy Team:
            </p>
            <div className="mt-4 p-5 rounded-xl border border-[#00C2FF]/15 bg-[#00C2FF]/4 space-y-3">
              {[
                {
                  label: 'General privacy enquiries',
                  value: 'privacy@linkra.io',
                  href: 'mailto:privacy@linkra.io',
                  isLink: true,
                },
                {
                  label: 'Security vulnerabilities & incidents',
                  value: 'security@linkra.io',
                  href: 'mailto:security@linkra.io',
                  isLink: true,
                },
                {
                  label: 'Meta / Instagram data complaints',
                  value: 'meta-compliance@linkra.io',
                  href: 'mailto:meta-compliance@linkra.io',
                  isLink: true,
                },
                {
                  label: 'Response time',
                  value: 'Within 3 business days (we aim for 24 hours)',
                  isLink: false,
                },
                {
                  label: 'Mailing address',
                  value: 'Linkra Inc., 340 Pine Street, Suite 800, San Francisco, CA 94104, United States',
                  isLink: false,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="#00C2FF" strokeWidth="1.2"/>
                    <path d="M1 4.5l6 4 6-4" stroke="#00C2FF" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <span className="text-white/40 text-xs block">{item.label}</span>
                    {item.isLink ? (
                      <a href={item.href} className="text-[#00C2FF] text-xs font-semibold hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white/65 text-xs">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4">
              For data subject rights requests (access, deletion, portability), please include your full
              name, the email address on your Linkra account, the platform(s) in question, and a
              description of your request. We may ask for identity verification before fulfilling any
              rights request to protect your account security.
            </p>
            <p>
              <strong className="text-white/80">EU Representative:</strong> For the purposes of GDPR,
              our EU representative for data protection matters may be contacted at{' '}
              <a href="mailto:eu-rep@linkra.io" className="text-[#00C2FF] underline underline-offset-2">
                eu-rep@linkra.io
              </a>.
            </p>
          </Section>

          {/* Back to top */}
          <div className="pt-8 border-t border-white/5 flex items-center justify-between">
            <a href="/" className="flex items-center gap-1.5 text-white/35 hover:text-[#00C2FF] text-sm transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Linkra
            </a>
            <a href="#" className="flex items-center gap-1.5 text-white/35 hover:text-[#00C2FF] text-sm transition-colors">
              Back to top
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 9l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Linkra Inc. All rights reserved. ·{' '}
          <a href="/" className="hover:text-[#00C2FF] transition-colors">linkra.io</a>
        </p>
      </footer>
    </div>
  )
}