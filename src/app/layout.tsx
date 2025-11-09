import Image from 'next/image';
import './globals.css';
import '../styles/header.scss';
import '../styles/footer.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <header className="masthead" role="banner">
          <Image
            className="masthead-logo"
            src="https://id.sky.com/static-assets/sky-logo-small.png"
            alt="Sky logo"
            width={41}
            height={25}
          />
        </header>
        <main className="main-content max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Main content goes here */}
          {children}
        </main>

        <footer data-test-id="footer" className="footer">
          <div className="inner-container">
            <div className="logo-wrapper">
              <a
                className="masthead-logo tab-focus burger-touch-capture"
                href="https://www.sky.com"
                data-tracking-label="footer_home"
                data-tracking-text="footer_home"
                data-tracking-location="Header"
                data-test-id="logo-link"
              >
                <span className="logo-text">Sky home page</span>
              </a>
              <span className="copyright" data-test-id="footer-copyright">
                © 2025 Sky UK
              </span>
            </div>

            <div className="footer-links-wrapper svelte-1mmmrxh" data-test-id="footer-nav">
              <ul data-test-id="footer-links" className="svelte-y8jluo">
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="#"
                    data-test-id="cmp-privacy-link"
                    data-tracking-label="masthead_privacy_options"
                    data-tracking-text="masthead_privacy_options"
                  >
                    Privacy options
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.sky.com/shop/terms-conditions/new/"
                    data-tracking-label="masthead_terms_and_conditions"
                    data-tracking-text="masthead_terms_and_conditions"
                  >
                    Terms &amp; conditions
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.sky.com/help/articles/sky-privacy-and-cookies-notice"
                    data-tracking-label="masthead_privacy_and_cookies_notice"
                    data-tracking-text="masthead_privacy_and_cookies_notice"
                  >
                    Privacy &amp; cookies notice
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://skyaccessibility.sky/"
                    data-tracking-label="masthead_accessibility"
                    data-tracking-text="masthead_accessibility"
                  >
                    Accessibility
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.sky.com/sitemap"
                    data-tracking-label="masthead_site_map"
                    data-tracking-text="masthead_site_map"
                  >
                    Site map
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.sky.com/help/articles/contacting-sky"
                    data-tracking-label="masthead_contact_us"
                    data-tracking-text="masthead_contact_us"
                  >
                    Contact us
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.sky.com/help/articles/sky-customer-complaints-code-of-practice/"
                    data-tracking-label="masthead_complaints"
                    data-tracking-text="masthead_complaints"
                  >
                    Complaints
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.skygroup.sky/"
                    data-tracking-label="masthead_sky_group"
                    data-tracking-text="masthead_sky_group"
                  >
                    Sky Group
                  </a>
                </li>
                <li data-test-id="footer-link" className="svelte-y8jluo">
                  <a
                    className="tab-focus svelte-y8jluo"
                    href="https://www.sky.com/shop/store-locator"
                    data-tracking-label="masthead_store_locator"
                    data-tracking-text="masthead_store_locator"
                  >
                    Store locator
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
