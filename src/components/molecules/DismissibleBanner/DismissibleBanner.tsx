"use client";
import { useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import NextIcon from "@/components/icons/NextIcon";

import "./dismissibleBanner.scss";

type DismissibleBannerProps = {
  content: string;
};

export default function DismissibleBanner({ content }: DismissibleBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="banner-wrapper">
      <div className="banner-content">
        <a
          href="https://www.sky.com/deals?section=tv&amp;irct=newhome-prospect-banner"
          className="banner-text"
        >
          {content}
          <NextIcon />
        </a>        
      </div>
      <div className="button-position">
          <button onClick={() => setVisible(false)} className="banner-close">
            <CloseIcon />
          </button>
        </div>
    </div>
  );
}
