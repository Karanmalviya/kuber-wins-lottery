import React, { useEffect } from "react";

const Captcha = () => {
  const reloadCaptcha = () => {
    const fonts = ["cursive", "sans-serif", "serif", "monospace"];

    let captchaValue = "";

    function generateCaptcha() {
      let value = btoa(Math.random() * 10000000000);
      value = value.substring(0, 5 + Math.random() * 5);
      return (captchaValue = value);
    }

    function setCaptcha() {
      let html = captchaValue
        .split("")
        .map((char) => {
          const rotate = -20 + Math.trunc(Math.random() * 30);
          const font = Math.trunc(Math.random() * fonts.length);
          return `<span style="transform : rotate(${rotate}deg); font-family: ${fonts[font]}; color: "red";">${char}</span>`;
        })
        .join("");

      return (document.querySelector(".captcha .preview").innerHTML = html);
    }

    function initCaptcha() {
      document
        .querySelector(".captcha .captcha-refresh")
        .addEventListener("click", () => {
          generateCaptcha();
          setCaptcha();
        });
      generateCaptcha();
      setCaptcha();
    }

    initCaptcha();
  };

  useEffect(() => {
    reloadCaptcha();
  }, []);

  return (
    <>
      <div className="container">
        <div className="preview"></div>
        <div className="captcha-form">
          <input
            type="text"
            id="captcha-input"
            placeholder="Enter Code"
            required
          />
          <button className="captcha-refresh" onClick={reloadCaptcha}>
            🔄
          </button>
        </div>
      </div>
    </>
  );
};

export default Captcha;
