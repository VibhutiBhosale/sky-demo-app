import { FooterLinksData, labels } from "@/constants";
import "./footer.scss";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export default function footer() {
  return (
    <footer data-test-id="footer" className="footer">
      <div className="inner-container">
        <div className="logo-wrapper">
          <a className="masthead-logo tab-focus burger-touch-capture" href="https://www.sky.com">
            <span className="logo-text">{labels.footer.logoHeading}</span>
          </a>
          <span className="copyright">{labels.footer.copyrightText}</span>
        </div>

        <div className="footer-links-wrapper svelte-1mmmrxh" data-test-id="footer-nav">
          <ul data-test-id="footer-links" className="svelte-y8jluo">
            {FooterLinksData.links.map((item: FooterLinkItem, index: number) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
