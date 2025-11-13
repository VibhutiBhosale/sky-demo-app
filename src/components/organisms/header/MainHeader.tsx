import "./mainHeader.scss";

export default function MainHeader() {
  return (
    <header className="masthead-header">
      <div className="masthead-header-inner-container">
        {/*<ul data-test-id="skip-links" className="svelte-pe0sdd">
          <li className="svelte-pe0sdd">
            <a
              href="#masthead-search-toggle"
              className="mh-header_skip-link masthead-skip-link hide-on-mobile svelte-pe0sdd"
              data-tracking-label="masthead_accessibility_search"
              data-tracking-text="masthead_accessibility_search"
            >
              skip to search
            </a>
          </li>
          <li className="svelte-pe0sdd">
            <a
              href="#masthead-alerts-toggle"
              className="mh-header_skip-link masthead-skip-link hide-on-mobile svelte-pe0sdd"
              data-tracking-label="masthead_accessibility_notifications"
              data-tracking-text="masthead_accessibility_notifications"
            >
              skip to alerts
            </a>
          </li>
          <li className="svelte-pe0sdd">
            <a
              href="#page-content"
              className="mh-header_skip-link masthead-skip-link svelte-pe0sdd"
              data-tracking-label="masthead_accessibility_content"
              data-tracking-text="masthead_accessibility_content"
            >
              skip to content
            </a>
          </li>
          <li className="svelte-pe0sdd">
            <a
              href="#page-footer"
              className="mh-header_skip-link masthead-skip-link svelte-pe0sdd"
              data-tracking-label="masthead_accessibility_footer"
              data-tracking-text="masthead_accessibility_footer"
            >
              skip to footer
            </a>
          </li>
          <li className="svelte-pe0sdd">
            <a
              href="#web-assistant"
              className="mh-header_skip-link masthead-skip-link svelte-pe0sdd"
              data-tracking-label="masthead_accessibility_web-assistant"
              data-tracking-text="masthead_accessibility_web-assistant"
              data-test-id="masthead-web-assistant-quick-link"
              aria-hidden="true"
            >
              skip to the web assistant
            </a>
          </li>
        </ul>*/}
        <div id="masthead" data-test-id="header" className="header-wrapper">
          <div className="logo-wrapper" data-test-id="header-logo">
            <a
              className="masthead-logo tab-focus burger-touch-capture"
              href="https://www.sky.com"
              data-tracking-label="masthead_home_logo"
              data-tracking-text="masthead_home_logo"
              data-tracking-location="Header"
              data-test-id="logo-link"
            >
              <span className="label">Sky home page</span>
            </a>
          </div>
          <div className="nav-toggle-wrapper" data-test-id="header-burger-toggle">
            <button
              className="button burger-nav-toggle-button"
              aria-label="Open navigation menu"
              aria-expanded="false"
              data-tracking-label="masthead_mobile_menu_open"
              data-tracking-text="masthead_mobile_menu_open"
              data-tracking-location="Header"
              aria-controls="masthead-navigation"
              data-test-id="burger-nav-toggle-button"
              id="burger-nav-toggle"
            >
              <svg
                viewBox="0 0 32 32"
                data-test-id="masthead-burger-menu-linear-icon"
                aria-hidden="true"
                className="burger-nav-toggle-button__burger-icon"
              >
                <g>
                  <path d="M25 9H6v1a1 1 0 0 0 1 1h19v-1a1 1 0 0 0-1-1M6 15h19a1 1 0 0 1 1 1v1H7a1 1 0 0 1-1-1zm0 6h19a1 1 0 0 1 1 1v1H7a1 1 0 0 1-1-1z"></path>
                </g>
              </svg>
              <svg
                viewBox="0 0 32 32"
                data-test-id="masthead-cross-linear-icon"
                aria-hidden="true"
                className="burger-nav-toggle-button__close-icon"
              >
                <g>
                  <path d="m16.364 17.778 6.95 6.95.707-.707a1 1 0 0 0 0-1.414l-6.243-6.243 6.95-6.95-.707-.707a1 1 0 0 0-1.414 0l-6.243 6.243L9.414 8l-.707.707a1 1 0 0 0 0 1.414l6.243 6.243L8 23.314l.707.707a1 1 0 0 0 1.414 0z"></path>
                </g>
              </svg>
            </button>
          </div>
          <div
            className="nav-group-wrapper"
            id="masthead-navigation"
            data-test-id="header-nav-group"
          >
            <div className="container">
              <div className="scrollable-wrapper">
                <div className="nav-wrapper">
                  <nav aria-label="primary" data-test-id="nav">
                    <ul className="primary-nav-list" data-test-id="primary-nav-list">
                      <li className="nav-item primary-nav-item" data-test-id="nav-item">
                        <div className="nav-item-group" data-test-id="nav-item-group">
                          <div className="nav-item-group-ctas">
                            <a
                              href="/watch"
                              className="nav-item-link nav-link primary-nav-link"
                              aria-label=""
                              data-test-id="nav-item-link"
                              data-tracking-label="masthead_visit_primary_watch_link"
                              data-tracking-text="masthead_visit_primary_watch_link"
                              data-tracking-location="Header"
                            >
                              Watch
                            </a>
                            <button
                              className="button tab-focus nav-toggle"
                              aria-label="Open Watch menu"
                              id="primary-watch"
                              aria-expanded="false"
                              data-tracking-label="masthead_open_watch_menu"
                              data-tracking-text="masthead_open_watch_menu"
                              data-tracking-location="Header"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-down-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--down"
                              >
                                <g>
                                  <path
                                    d="M16.535 20.909a1 1 0 0 1-1.414 0l-8.828-8.828a1 1 0 0 1 0-1.414L6.96 10l8.868 8.869L24.697 10l.667.667a1 1 0 0 1 0 1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-up-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--up"
                              >
                                <g>
                                  <path
                                    d="M15.121 10.293a1 1 0 0 1 1.414 0l8.829 8.828a1 1 0 0 1 0 1.414l-.667.667-8.869-8.869-8.868 8.869-.667-.667a1 1 0 0 1 0-1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className="secondary-nav-wrapper">
                            <ul className="secondary-nav-list" data-test-id="secondary-nav-list">
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tv/cinema?irct=masthead-cinema"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_cinema_link"
                                    data-tracking-text="masthead_visit_secondary_cinema_link"
                                    data-tracking-location="Header"
                                  >
                                    Cinema
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tv/sports?irct=masthead-sports"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_sports_link"
                                    data-tracking-text="masthead_visit_secondary_sports_link"
                                    data-tracking-location="Header"
                                  >
                                    Sports
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tv/kids?irct=masthead-kids"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_kids_link"
                                    data-tracking-text="masthead_visit_secondary_kids_link"
                                    data-tracking-location="Header"
                                  >
                                    Kids
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/watch/discovery-plus?irct=masthead-discovery"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_discovery+_link"
                                    data-tracking-text="masthead_visit_secondary_discovery+_link"
                                    data-tracking-location="Header"
                                  >
                                    discovery+
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/watch/what-to-watch?irct=masthead-wtw"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_what_to_watch_link"
                                    data-tracking-text="masthead_visit_secondary_what_to_watch_link"
                                    data-tracking-location="Header"
                                  >
                                    What to watch
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <button
                              className="visually-hidden"
                              data-tracking-label="masthead_close_watch_menu"
                              data-tracking-text="masthead_close_watch_menu"
                            >
                              Close Watch menu
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item primary-nav-item" data-test-id="nav-item">
                        <div className="nav-item-group" data-test-id="nav-item-group">
                          <div className="nav-item-group-ctas">
                            <a
                              href="/tv"
                              className="nav-item-link nav-link primary-nav-link"
                              aria-label=""
                              data-test-id="nav-item-link"
                              data-tracking-label="masthead_visit_primary_tv_link"
                              data-tracking-text="masthead_visit_primary_tv_link"
                              data-tracking-location="Header"
                            >
                              TV
                            </a>
                            <button
                              className="button tab-focus nav-toggle"
                              aria-label="Open TV menu"
                              id="primary-tv"
                              aria-expanded="false"
                              data-tracking-label="masthead_open_tv_menu"
                              data-tracking-text="masthead_open_tv_menu"
                              data-tracking-location="Header"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-down-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--down"
                              >
                                <g>
                                  <path
                                    d="M16.535 20.909a1 1 0 0 1-1.414 0l-8.828-8.828a1 1 0 0 1 0-1.414L6.96 10l8.868 8.869L24.697 10l.667.667a1 1 0 0 1 0 1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-up-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--up"
                              >
                                <g>
                                  <path
                                    d="M15.121 10.293a1 1 0 0 1 1.414 0l8.829 8.828a1 1 0 0 1 0 1.414l-.667.667-8.869-8.869-8.868 8.869-.667-.667a1 1 0 0 1 0-1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className="secondary-nav-wrapper">
                            <ul className="secondary-nav-list" data-test-id="secondary-nav-list">
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tv/stream"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_stream_link"
                                    data-tracking-text="masthead_visit_secondary_stream_link"
                                    data-tracking-location="Header"
                                  >
                                    Stream
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/glass"
                                    className="nav-item-link nav-link secondary-nav-link"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_glass_link"
                                    data-tracking-text="masthead_visit_secondary_glass_link"
                                    data-tracking-location="Header"
                                  >
                                    Glass
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tv/sky-q"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_sky_q_link"
                                    data-tracking-text="masthead_visit_secondary_sky_q_link"
                                    data-tracking-location="Header"
                                  >
                                    Sky Q
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tvandbroadband"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_tv_&amp;_broadband_link"
                                    data-tracking-text="masthead_visit_secondary_tv_&amp;_broadband_link"
                                    data-tracking-location="Header"
                                  >
                                    TV &amp; Broadband
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <button
                              className="visually-hidden"
                              data-tracking-label="masthead_close_tv_menu"
                              data-tracking-text="masthead_close_tv_menu"
                            >
                              Close TV menu
                            </button>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nav-item primary-nav-item svelte-14cdk8w"
                        data-test-id="nav-item"
                      >
                        <div
                          className="nav-item-group svelte-1jldxkd"
                          data-test-id="nav-item-group"
                        >
                          <div className="nav-item-group-ctas svelte-1jldxkd">
                            <a
                              href="/glass"
                              className="nav-item-link nav-link primary-nav-link svelte-19lsx3l"
                              aria-label=""
                              data-test-id="nav-item-link"
                              data-tracking-label="masthead_visit_primary_glass_link"
                              data-tracking-text="masthead_visit_primary_glass_link"
                              data-tracking-location="Header"
                            >
                              Glass
                            </a>
                            <button
                              className="button tab-focus nav-toggle svelte-1jldxkd"
                              aria-label="Open Glass menu"
                              id="primary-glass"
                              aria-expanded="false"
                              data-tracking-label="masthead_open_glass_menu"
                              data-tracking-text="masthead_open_glass_menu"
                              data-tracking-location="Header"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-down-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--down"
                              >
                                <g>
                                  <path
                                    d="M16.535 20.909a1 1 0 0 1-1.414 0l-8.828-8.828a1 1 0 0 1 0-1.414L6.96 10l8.868 8.869L24.697 10l.667.667a1 1 0 0 1 0 1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-up-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--up"
                              >
                                <g>
                                  <path
                                    d="M15.121 10.293a1 1 0 0 1 1.414 0l8.829 8.828a1 1 0 0 1 0 1.414l-.667.667-8.869-8.869-8.868 8.869-.667-.667a1 1 0 0 1 0-1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className="secondary-nav-wrapper svelte-1jldxkd">
                            <ul
                              className="secondary-nav-list svelte-1jldxkd"
                              data-test-id="secondary-nav-list"
                            >
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/glass/gen-2"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_glass_gen_2_link"
                                    data-tracking-text="masthead_visit_secondary_glass_gen_2_link"
                                    data-tracking-location="Header"
                                  >
                                    Glass Gen 2
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/glass/air"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_glass_air_link"
                                    data-tracking-text="masthead_visit_secondary_glass_air_link"
                                    data-tracking-location="Header"
                                  >
                                    Glass Air
                                  </a>
                                  <span className="nav-chip">New</span>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/glass/43-inch"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_tech_specs_link"
                                    data-tracking-text="masthead_visit_secondary_tech_specs_link"
                                    data-tracking-location="Header"
                                  >
                                    Tech specs
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/glass/existing-customers"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_switching_to_sky_glass_link"
                                    data-tracking-text="masthead_visit_secondary_switching_to_sky_glass_link"
                                    data-tracking-location="Header"
                                  >
                                    Switching to Sky Glass
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <button
                              className="visually-hidden"
                              data-tracking-label="masthead_close_glass_menu"
                              data-tracking-text="masthead_close_glass_menu"
                            >
                              Close Glass menu
                            </button>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nav-item primary-nav-item svelte-14cdk8w"
                        data-test-id="nav-item"
                      >
                        <div
                          className="nav-item-group svelte-1jldxkd"
                          data-test-id="nav-item-group"
                        >
                          <div className="nav-item-group-ctas svelte-1jldxkd">
                            <a
                              href="/broadband"
                              className="nav-item-link nav-link primary-nav-link svelte-19lsx3l"
                              aria-label=""
                              data-test-id="nav-item-link"
                              data-tracking-label="masthead_visit_primary_broadband_link"
                              data-tracking-text="masthead_visit_primary_broadband_link"
                              data-tracking-location="Header"
                            >
                              Broadband
                            </a>
                            <button
                              className="button tab-focus nav-toggle svelte-1jldxkd"
                              aria-label="Open Broadband menu"
                              id="primary-broadband"
                              aria-expanded="false"
                              data-tracking-label="masthead_open_broadband_menu"
                              data-tracking-text="masthead_open_broadband_menu"
                              data-tracking-location="Header"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-down-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--down"
                              >
                                <g>
                                  <path
                                    d="M16.535 20.909a1 1 0 0 1-1.414 0l-8.828-8.828a1 1 0 0 1 0-1.414L6.96 10l8.868 8.869L24.697 10l.667.667a1 1 0 0 1 0 1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-up-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--up"
                              >
                                <g>
                                  <path
                                    d="M15.121 10.293a1 1 0 0 1 1.414 0l8.829 8.828a1 1 0 0 1 0 1.414l-.667.667-8.869-8.869-8.868 8.869-.667-.667a1 1 0 0 1 0-1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className="secondary-nav-wrapper svelte-1jldxkd">
                            <ul
                              className="secondary-nav-list svelte-1jldxkd"
                              data-test-id="secondary-nav-list"
                            >
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/broadband"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_broadband_link"
                                    data-tracking-text="masthead_visit_secondary_broadband_link"
                                    data-tracking-location="Header"
                                  >
                                    Broadband
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/tvandbroadband"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_tv_&amp;_broadband_link"
                                    data-tracking-text="masthead_visit_secondary_tv_&amp;_broadband_link"
                                    data-tracking-location="Header"
                                  >
                                    TV &amp; Broadband
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/broadband/full-fibre-broadband"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_full_fibre_broadband_link"
                                    data-tracking-text="masthead_visit_secondary_full_fibre_broadband_link"
                                    data-tracking-location="Header"
                                  >
                                    Full Fibre Broadband
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/broadband/gaming"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_broadband_for_gaming_link"
                                    data-tracking-text="masthead_visit_secondary_broadband_for_gaming_link"
                                    data-tracking-location="Header"
                                  >
                                    Broadband for Gaming
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="https://business.sky.com"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_broadband_for_business_link"
                                    data-tracking-text="masthead_visit_secondary_broadband_for_business_link"
                                    data-tracking-location="Header"
                                  >
                                    Broadband for Business
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <button
                              className="visually-hidden"
                              data-tracking-label="masthead_close_broadband_menu"
                              data-tracking-text="masthead_close_broadband_menu"
                            >
                              Close Broadband menu
                            </button>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nav-item primary-nav-item svelte-14cdk8w"
                        data-test-id="nav-item"
                      >
                        <div
                          className="nav-item-group svelte-1jldxkd"
                          data-test-id="nav-item-group"
                        >
                          <div className="nav-item-group-ctas svelte-1jldxkd">
                            <a
                              href="/shop/mobile"
                              className="nav-item-link nav-link primary-nav-link svelte-19lsx3l"
                              aria-label=""
                              data-test-id="nav-item-link"
                              data-tracking-label="masthead_visit_primary_mobile_link"
                              data-tracking-text="masthead_visit_primary_mobile_link"
                              data-tracking-location="Header"
                            >
                              Mobile
                            </a>
                            <button
                              className="button tab-focus nav-toggle svelte-1jldxkd"
                              aria-label="Open Mobile menu"
                              id="primary-mobile"
                              aria-expanded="false"
                              data-tracking-label="masthead_open_mobile_menu"
                              data-tracking-text="masthead_open_mobile_menu"
                              data-tracking-location="Header"
                            >
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-down-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--down"
                              >
                                <g>
                                  <path
                                    d="M16.535 20.909a1 1 0 0 1-1.414 0l-8.828-8.828a1 1 0 0 1 0-1.414L6.96 10l8.868 8.869L24.697 10l.667.667a1 1 0 0 1 0 1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                viewBox="0 0 32 32"
                                data-test-id="masthead-chevron-up-linear-icon"
                                aria-hidden="true"
                                className="chevron chevron--up"
                              >
                                <g>
                                  <path
                                    d="M15.121 10.293a1 1 0 0 1 1.414 0l8.829 8.828a1 1 0 0 1 0 1.414l-.667.667-8.869-8.869-8.868 8.869-.667-.667a1 1 0 0 1 0-1.414z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className="secondary-nav-wrapper svelte-1jldxkd">
                            <ul
                              className="secondary-nav-list svelte-1jldxkd"
                              data-test-id="secondary-nav-list"
                            >
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/mobile"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_sky_mobile_link"
                                    data-tracking-text="masthead_visit_secondary_sky_mobile_link"
                                    data-tracking-location="Header"
                                  >
                                    Sky Mobile
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/mobile/phones"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_phones_link"
                                    data-tracking-text="masthead_visit_secondary_phones_link"
                                    data-tracking-location="Header"
                                  >
                                    Phones
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/mobile/plans"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_sim_link"
                                    data-tracking-text="masthead_visit_secondary_sim_link"
                                    data-tracking-location="Header"
                                  >
                                    SIM
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/mobile/tablets"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_tablets_&amp;_laptops_link"
                                    data-tracking-text="masthead_visit_secondary_tablets_&amp;_laptops_link"
                                    data-tracking-location="Header"
                                  >
                                    Tablets &amp; Laptops
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/mobile/brands"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_brands_link"
                                    data-tracking-text="masthead_visit_secondary_brands_link"
                                    data-tracking-location="Header"
                                  >
                                    Brands
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/accessories/mobile"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_accessories_link"
                                    data-tracking-text="masthead_visit_secondary_accessories_link"
                                    data-tracking-location="Header"
                                  >
                                    Accessories
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/shop/mobile/activation"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_sim_activation_link"
                                    data-tracking-text="masthead_visit_secondary_sim_activation_link"
                                    data-tracking-location="Header"
                                  >
                                    SIM Activation
                                  </a>
                                </div>
                              </li>
                              <li className="secondary-nav-item">
                                <div className="nav-item-link-wrapper tab-focus">
                                  <a
                                    href="/myaccount/mobile"
                                    className="nav-item-link nav-link secondary-nav-link svelte-19lsx3l"
                                    aria-label=""
                                    data-test-id="nav-item-link"
                                    data-tracking-label="masthead_visit_secondary_manage_link"
                                    data-tracking-text="masthead_visit_secondary_manage_link"
                                    data-tracking-location="Header"
                                  >
                                    Manage
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <button
                              className="visually-hidden"
                              data-tracking-label="masthead_close_mobile_menu"
                              data-tracking-text="masthead_close_mobile_menu"
                            >
                              Close Mobile menu
                            </button>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nav-item primary-nav-item svelte-14cdk8w"
                        data-test-id="nav-item"
                      >
                        <a
                          href="/protect"
                          className="nav-item-link nav-link primary-nav-link svelte-19lsx3l"
                          aria-label="Protect"
                          data-test-id="nav-item-link"
                          data-tracking-label="masthead_visit_primary_protect_link"
                          data-tracking-text="masthead_visit_primary_protect_link"
                          data-tracking-location="Header"
                        >
                          Protect
                        </a>
                      </li>
                      <li
                        className="nav-item primary-nav-item svelte-14cdk8w"
                        data-test-id="nav-item"
                      >
                        <a
                          href="https://business.sky.com"
                          className="nav-item-link nav-link primary-nav-link svelte-19lsx3l"
                          aria-label=""
                          data-test-id="nav-item-link"
                          data-tracking-label="masthead_visit_primary_business_link"
                          data-tracking-text="masthead_visit_primary_business_link"
                          data-tracking-location="Header"
                        >
                          Business
                        </a>
                      </li>
                      <li
                        className="nav-item primary-nav-item svelte-14cdk8w"
                        data-test-id="nav-item"
                      >
                        <a
                          href="/deals/black-friday"
                          className="nav-item-link nav-link primary-nav-link svelte-19lsx3l"
                          aria-label=""
                          data-test-id="nav-item-link"
                          data-tracking-label="masthead_visit_primary_deals_link"
                          data-tracking-text="masthead_visit_primary_deals_link"
                          data-tracking-location="Header"
                        >
                          Deals
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="search-wrapper svelte-14vc3h2">
                  <button
                    id="masthead-search-toggle"
                    data-test-id="masthead-search-toggle-button"
                    className="button search-toggle tab-focus svelte-l9wd7q"
                    aria-label="Open Search"
                    aria-expanded="false"
                    data-tracking-label="masthead_search_open"
                    data-tracking-text="masthead_search_open"
                    data-tracking-location="Header"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      data-test-id="masthead-magnifying-glass-linear-icon"
                      aria-hidden="true"
                      className="search-toggle__icon"
                    >
                      <g>
                        <path
                          d="M12 22a9.96 9.96 0 0 0 6.329-2.257l1.732 1.732-.354.353a1 1 0 0 0 0 1.415l6.364 6.364a1 1 0 0 0 1.414 0l2.122-2.122a1 1 0 0 0 0-1.414l-6.364-6.364a1 1 0 0 0-1.415 0l-.353.354-1.732-1.732A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10m0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16m9.828 2.535.707-.707 4.95 4.95-.707.707z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className="footer-wrapper burger-touch-capture footer-wrapper--alerts svelte-14vc3h2 footer-wrapper--without-live-chat"
                data-test-id="footer-wrapper"
              >
                <div
                  className="alerts-wrapper alerts-wrapper--alerts svelte-14vc3h2"
                  data-test-id="alerts-wrapper"
                >
                  <button
                    id="masthead-alerts-toggle"
                    data-test-id="masthead-alerts-toggle-button"
                    data-tracking-label="masthead_alerts_icon:expand"
                    data-tracking-text="masthead_alerts_icon:expand"
                    className="button masthead-alerts-toggle tab-focus svelte-1is4uo8"
                    aria-label="Open alerts, you have no alerts"
                    aria-expanded="false"
                  >
                    <div className="masthead-alerts-toggle__button svelte-1is4uo8">
                      <div className="masthead-alerts-toggle__label svelte-1is4uo8">
                        <svg
                          viewBox="0 0 32 32"
                          data-test-id="masthead-bell-linear-icon"
                          aria-hidden="true"
                          className="masthead-alerts-toggle__icon"
                        >
                          <g>
                            <path
                              d="M17.992 4.077q.008-.09.008-.182a2 2 0 1 0-3.992.183C9.336 4.968 7 8.945 7 12.203v6.238c0 .724-.196 1.434-.568 2.055l-3.525 5.885a1 1 0 0 0 .858 1.514h9.406a3 3 0 0 0 5.658 0h9.406a1 1 0 0 0 .858-1.514l-3.524-5.885A4 4 0 0 1 25 18.441v-6.238c0-3.258-2.336-7.235-7.008-8.126m5.861 17.447 2.618 4.371H5.529l2.618-4.371A6 6 0 0 0 9 18.441v-6.238c0-2.73 2.242-6.308 7-6.308 4.759 0 7 3.578 7 6.308v6.238c0 1.086.295 2.152.853 3.083"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className="masthead-alerts-toggle-label svelte-1is4uo8">Alerts</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="user-menu-wrapper svelte-1m3po1p" data-test-id="header-user-wrapper">
            <a
              href="https://www.sky.com/signin?successUrl=https%3A%2F%2Fwww.sky.com%2F&amp;cancelUrl=https%3A%2F%2Fwww.sky.com%2F"
              className="sign-in-link"
              data-test-id="sign-in-link"
              data-tracking-label="masthead_signin"
              data-tracking-location="Header"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
