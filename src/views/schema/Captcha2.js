import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";

const ImageCaptcha = forwardRef(({ setCaptchaVerified }, ref) => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState(false);

  useImperativeHandle(ref, () => ({
    generateCaptchaImage,
  }));

  const generateCaptchaImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const captcha = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
    setCaptchaText(captcha);

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      context.fillStyle = "rgba(0, 0, 0, 0.15)";
      context.fillRect(x, y, 2, 2);
    }

    context.font = "bold 36px Arial";
    context.fillStyle = "black";
    for (let i = 0; i < captcha.length; i++) {
      const x = 20 + i * 30 + Math.random() * 15 - 7.5;
      const y = 40 + Math.random() * 25 - 12.5;
      const angle = (Math.random() - 0.5) * 0.6;
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillText(captcha.charAt(i), 0, 0);
      context.restore();
    }
  };

  useEffect(() => {
    generateCaptchaImage();
  }, []);

  const refreshCaptcha = () => {
    generateCaptchaImage();
    setInputText("");
    setIsValid(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setIsValid(event.target.value === captchaText);
  };

  useEffect(() => {
    if (isValid) {
      setCaptchaVerified(true);
    } else {
      if (inputText === "") {
        setCaptchaVerified("");
      } else {
        setCaptchaVerified(false);
      }
    }
  }, [isValid, inputText]);

  return (
    <div className="row">
      <div className="col-6">
        <div className="">
          <div
            className="canvasRef-k d-flex align-items-center"
            style={{ border: "1px solid #ced4da" }}
          >
            <div>
              <canvas ref={canvasRef} width={200} height={50} />
            </div>
            <i
              onClick={refreshCaptcha}
              className={`fa fa-refresh ms-4`}
              style={{ fontSize: 24, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="form-floating mb-3">
          <input
            maxLength={6}
            className="form-control"
            autofocus
            id="txtContact"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder=" "
          />
          <label for="txtContact">Captcha</label>
        </div>
        {/* <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="form-control"
        />{" "} */}
      </div>
    </div>
  );
});

export default ImageCaptcha;
