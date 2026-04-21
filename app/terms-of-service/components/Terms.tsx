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

const sections = [
  { id: 'acceptance', number: '01', title: 'Acceptance of Terms' },
  { id: 'description', number: '02', title: 'Description of Service' },
  { id: 'eligibility', number: '03', title: 'Eligibility' },
  { id: 'accounts', number: '04', title: 'Accounts & Registration' },
  { id: 'connected-platforms', number: '05', title: 'Connected Third-Party Platforms' },
  { id: 'acceptable-use', number: '06', title: 'Acceptable Use Policy' },
  { id: 'prohibited', number: '07', title: 'Prohibited Conduct' },
  { id: 'subscriptions', number: '08', title: 'Subscriptions & Billing' },
  { id: 'ip', number: '09', title: 'Intellectual Property' },
  { id: 'disclaimer', number: '10', title: 'Disclaimers & Warranties' },
  { id: 'liability', number: '11', title: 'Limitation of Liability' },
  { id: 'termination', number: '12', title: 'Termination' },
  { id: 'governing-law', number: '13', title: 'Governing Law & Disputes' },
  { id: 'changes', number: '14', title: 'Changes to These Terms' },
  { id: 'contact', number: '15', title: 'Contact Us' },
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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#050D1A] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/40 to-transparent" />
        <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-3">Legal</p>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-4">Terms of Service</h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Effective date: <span className="text-white/60 font-semibold">January 1, 2025</span> &nbsp;·&nbsp; Last updated: <span className="text-white/60 font-semibold">April 20, 2025</span>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['Governed by California Law', 'Meta Platform Compliant', 'GDPR Compatible'].map((badge) => (
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
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Linkra platform,
              including our website at <span className="text-[#00C2FF]">linkra.io</span>, mobile
              applications, and related services (collectively, the &quot;Service&quot;). Please read these
              Terms carefully before using Linkra. By accessing or using the Service, you agree to be
              bound by these Terms.
            </p>
          </div>

          <Section id="acceptance" number="01" title="Acceptance of Terms">
            <p>
              By creating a Linkra account, clicking &quot;Sign Up&quot;, or otherwise accessing or using the
              Service, you confirm that you have read, understood, and agree to be bound by these Terms
              and our <a href="/privacy" className="text-[#00C2FF] hover:underline">Privacy Policy</a>,
              which is incorporated herein by reference.
            </p>
            <p>
              If you are using the Service on behalf of a company or organization, you represent and
              warrant that you have the authority to bind that entity to these Terms, in which case
              &quot;you&quot; refers to that entity.
            </p>
            <p>
              If you do not agree to these Terms, do not access or use the Service.
            </p>
          </Section>

          <Section id="description" number="02" title="Description of Service">
            <p>
              Linkra is a unified social messaging platform that aggregates your direct messages from
              connected social media applications — including Instagram, WhatsApp, Facebook Messenger,
              Telegram, X (Twitter), and LinkedIn — into a single inbox. The Service allows you to read
              and respond to messages across multiple platforms from one interface.
            </p>
            <p>
              Linkra accesses your connected social media accounts only through official OAuth 2.0
              authorization flows and approved platform APIs. We do not store your social media passwords.
              All platform integrations are subject to the terms and policies of the respective platform.
            </p>
            <p>
              Linkra reserves the right to modify, suspend, or discontinue the Service (or any part
              thereof) at any time with reasonable notice. We will not be liable to you or any third
              party for any modification, suspension, or discontinuation of the Service.
            </p>
          </Section>

          <Section id="eligibility" number="03" title="Eligibility">
            <p>
              You must be at least <strong className="text-white/80">13 years old</strong> to use
              Linkra. If you are located in the European Economic Area, United Kingdom, or another
              jurisdiction with a higher digital consent age, you must meet that age requirement
              (generally <strong className="text-white/80">16 years old</strong>).
            </p>
            <p>
              By using the Service, you represent and warrant that you meet the applicable age
              requirements, that you have not been previously suspended or removed from the Service, and
              that your use of the Service complies with all applicable laws and regulations.
            </p>
          </Section>

          <Section id="accounts" number="04" title="Accounts & Registration">
            <p>
              To use Linkra, you must create an account by providing accurate, complete, and current
              information. You are responsible for maintaining the confidentiality of your account
              credentials and for all activity that occurs under your account.
            </p>
            <p>
              You agree to notify us immediately at{' '}
              <a href="mailto:support@linkra.io" className="text-[#00C2FF] hover:underline">support@linkra.io</a>{' '}
              of any unauthorized use of your account. Linkra is not liable for any loss or damage
              arising from unauthorized access to your account due to your failure to keep credentials
              secure.
            </p>
            <p>
              You may not create more than one account per person, share your account with others, or
              transfer your account to any other person or entity without Linkra&apos;s prior written consent.
            </p>
          </Section>

          <Section id="connected-platforms" number="05" title="Connected Third-Party Platforms">
            <p>
              When you connect a third-party social media platform to Linkra, you authorize Linkra to
              access and retrieve your direct message data from that platform on your behalf using the
              platform&apos;s official API. Your use of connected platforms remains subject to those
              platforms&apos; own terms of service and privacy policies.
            </p>
            <p>
              Linkra is not affiliated with, endorsed by, or sponsored by Meta, Instagram, WhatsApp,
              Telegram, X Corp, or LinkedIn. We are an independent application that integrates with
              these platforms via their official developer APIs.
            </p>
            <p>
              You are responsible for ensuring your use of Linkra complies with the terms of service
              of each platform you connect. Linkra is not responsible for any suspension, restriction,
              or termination of your accounts on connected platforms.
            </p>
            <p>
              You may disconnect any platform from Linkra at any time from your account settings.
              Upon disconnection, we will revoke your access token and delete cached message data
              from that platform within 72 hours.
            </p>
          </Section>

          <Section id="acceptable-use" number="06" title="Acceptable Use Policy">
            <p>
              You agree to use the Service only for lawful purposes and in a manner consistent with
              these Terms. You are solely responsible for all content you send, receive, or otherwise
              interact with through Linkra.
            </p>
            <p>
              The Service is intended for personal and business messaging aggregation. You may not
              use the Service to send unsolicited messages (spam), conduct phishing campaigns, harass
              or threaten others, or engage in any activity that violates applicable laws.
            </p>
            <p>
              You agree not to attempt to reverse engineer, decompile, disassemble, or otherwise
              attempt to derive the source code of Linkra or any portion thereof.
            </p>
          </Section>

          <Section id="prohibited" number="07" title="Prohibited Conduct">
            <div className="space-y-2.5">
              {[
                'Use the Service to send spam, bulk unsolicited messages, or automated messages in violation of platform rules.',
                'Use the Service for any unlawful purpose, including fraud, phishing, or identity theft.',
                'Attempt to gain unauthorized access to any part of the Service or any connected platform account that is not yours.',
                'Interfere with or disrupt the integrity or performance of the Service or its infrastructure.',
                'Scrape, crawl, or data-mine the Service using automated tools.',
                'Use the Service to violate the rights of any third party, including intellectual property rights or privacy rights.',
                'Impersonate any person or entity or falsely claim affiliation with any person or entity.',
                'Circumvent any rate limits, access controls, or security measures implemented by Linkra or connected platforms.',
                'Use the Service in any way that violates Meta Platform Terms, Instagram Platform Policy, WhatsApp Business Policy, or the policies of any other connected platform.',
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
            <p className="mt-2">
              Violation of this section may result in immediate suspension or termination of your
              account without notice and, where applicable, referral to law enforcement authorities.
            </p>
          </Section>

          <Section id="subscriptions" number="08" title="Subscriptions & Billing">
            <p>
              Linkra offers both free and paid subscription plans. By selecting a paid plan, you agree
              to pay the applicable subscription fees. All fees are stated in USD and are exclusive of
              applicable taxes unless stated otherwise.
            </p>
            <p>
              <strong className="text-white/80">Billing Cycle:</strong> Subscriptions are billed on a
              monthly or annual basis, depending on the plan you select. Your subscription will
              automatically renew at the end of each billing period unless you cancel it before the
              renewal date.
            </p>
            <p>
              <strong className="text-white/80">Cancellation:</strong> You may cancel your subscription
              at any time from your account settings. Cancellation takes effect at the end of the
              current billing period. We do not provide refunds for partial billing periods unless
              required by applicable law.
            </p>
            <p>
              <strong className="text-white/80">Price Changes:</strong> We may change our subscription
              fees at any time. We will give you at least 30 days&apos; notice of any price increase before
              it applies to your account. Your continued use of the Service after a price change
              constitutes acceptance of the new fees.
            </p>
            <p>
              <strong className="text-white/80">Payment Processing:</strong> All payments are processed
              by Stripe. By providing payment information, you authorize Stripe to charge your payment
              method on a recurring basis. Linkra does not store full payment card details.
            </p>
          </Section>

          <Section id="ip" number="09" title="Intellectual Property">
            <p>
              <strong className="text-white/80">Linkra&apos;s IP:</strong> The Service, including its
              software, design, logos, trademarks, and all content created by Linkra, is owned by
              Linkra Inc. and is protected by copyright, trademark, and other intellectual property
              laws. You may not copy, modify, distribute, or create derivative works based on Linkra&apos;s
              intellectual property without our express written consent.
            </p>
            <p>
              <strong className="text-white/80">Your Content:</strong> You retain all rights to the
              messages and content you send and receive through the Service. By using Linkra, you grant
              us a limited, non-exclusive license to access, cache, and display your message content
              solely for the purpose of delivering the Service to you. We do not claim ownership of
              your messages.
            </p>
            <p>
              <strong className="text-white/80">Feedback:</strong> If you provide us with feedback,
              ideas, or suggestions about the Service, you grant us a non-exclusive, worldwide,
              royalty-free license to use that feedback for any purpose without compensation to you.
            </p>
          </Section>

          <Section id="disclaimer" number="10" title="Disclaimers & Warranties">
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              Linkra does not warrant that the Service will be uninterrupted, error-free, or free of
              viruses or other harmful components. We do not warrant the accuracy, completeness, or
              reliability of any message data retrieved from connected platforms.
            </p>
            <p>
              Because Linkra relies on third-party platform APIs, we cannot guarantee that all connected
              platforms will remain available, that API access will not be revoked, or that third-party
              platforms will not change their policies or terms in ways that affect the Service.
            </p>
          </Section>

          <Section id="liability" number="11" title="Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, LINKRA INC. AND ITS OFFICERS,
              DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF
              THE SERVICE.
            </p>
            <p>
              IN NO EVENT SHALL LINKRA&apos;S TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE GREATER OF
              (A) THE AMOUNT YOU PAID TO LINKRA IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) USD $100.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of
              liability, so the above limitations may not apply to you in full. In such jurisdictions,
              our liability is limited to the greatest extent permitted by law.
            </p>
          </Section>

          <Section id="termination" number="12" title="Termination">
            <p>
              <strong className="text-white/80">By You:</strong> You may terminate your account at
              any time by going to Settings → Account → Delete Account. Upon deletion, we will
              permanently remove your personal data within 30 days in accordance with our{' '}
              <a href="/privacy" className="text-[#00C2FF] hover:underline">Privacy Policy</a>.
            </p>
            <p>
              <strong className="text-white/80">By Linkra:</strong> We may suspend or terminate your
              access to the Service immediately, without notice, if we believe you have violated
              these Terms, if required by law, or if your account poses a security or legal risk.
            </p>
            <p>
              Upon termination, all licenses granted to you under these Terms will immediately
              terminate. Sections that by their nature should survive termination — including
              Intellectual Property, Disclaimers, Limitation of Liability, and Governing Law —
              shall survive termination.
            </p>
          </Section>

          <Section id="governing-law" number="13" title="Governing Law & Disputes">
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of
              California, United States, without regard to its conflict of law principles.
            </p>
            <p>
              <strong className="text-white/80">Informal Resolution:</strong> Before filing a formal
              legal claim, you agree to contact us at{' '}
              <a href="mailto:legal@linkra.io" className="text-[#00C2FF] hover:underline">legal@linkra.io</a>{' '}
              and attempt to resolve the dispute informally. We will try to resolve disputes within
              30 days of receiving your notice.
            </p>
            <p>
              <strong className="text-white/80">Arbitration:</strong> If informal resolution fails,
              any dispute arising out of or relating to these Terms or the Service shall be resolved
              by binding arbitration in San Francisco, California, under the rules of the American
              Arbitration Association (AAA). You waive your right to participate in any class action
              or class-wide arbitration.
            </p>
            <p>
              <strong className="text-white/80">EU/UK Users:</strong> Nothing in these Terms limits
              your rights under applicable EU or UK consumer protection law, including the right to
              bring claims before your local courts or competent supervisory authority.
            </p>
          </Section>

          <Section id="changes" number="14" title="Changes to These Terms">
            <p>
              We may update these Terms from time to time to reflect changes in our Service, applicable
              law, or connected platform requirements. For material changes, we will:
            </p>
            <p>— Send an email to your registered address at least <strong className="text-white/80">30 days</strong> before changes take effect.</p>
            <p>— Display a prominent in-app notice on your next login.</p>
            <p>— Update the &quot;Last Updated&quot; date at the top of this page.</p>
            <p>
              Your continued use of the Service after changes take effect constitutes your acceptance
              of the updated Terms. If you do not agree to the updated Terms, you must stop using the
              Service and delete your account.
            </p>
          </Section>

          <Section id="contact" number="15" title="Contact Us">
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-5 rounded-xl border border-[#00C2FF]/15 bg-[#00C2FF]/4 space-y-3">
              {[
                { label: 'General & legal enquiries', value: 'legal@linkra.io', href: 'mailto:legal@linkra.io', isLink: true },
                { label: 'Support', value: 'support@linkra.io', href: 'mailto:support@linkra.io', isLink: true },
                { label: 'Response time', value: 'Within 3 business days', isLink: false },
                { label: 'Mailing address', value: 'Linkra Inc., 340 Pine Street, Suite 800, San Francisco, CA 94104, United States', isLink: false },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="#00C2FF" strokeWidth="1.2"/>
                    <path d="M1 4.5l6 4 6-4" stroke="#00C2FF" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <span className="text-white/40 text-xs block">{item.label}</span>
                    {item.isLink ? (
                      <a href={item.href} className="text-[#00C2FF] text-xs font-semibold hover:underline">{item.value}</a>
                    ) : (
                      <span className="text-white/65 text-xs">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

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

      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Linkra Inc. All rights reserved. ·{' '}
          <a href="/" className="hover:text-[#00C2FF] transition-colors">linkra.io</a>
        </p>
      </footer>
    </div>
  )
}