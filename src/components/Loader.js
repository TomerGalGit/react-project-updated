import * as React from "react";
import './Loader.css';

export default function Loader() {
  return (
    <div className="loaderOverlay">
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
    </div>
  );
}
