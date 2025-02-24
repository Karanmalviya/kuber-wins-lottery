import QRCode from "qrcode";

const generateURL = ({ amount, name, upi }) => {
  return `upi://pay?pa=${upi}&pn=${name}&tn=${`${encodeURI(
    `Payment for Kuber Wins of ${amount}`
  )}`}&am=${amount}&cu=INR`;
};

export async function upiQr(query) {
  const { amount, name, upi } = query;
  if (!amount || !name || !upi) {
    return null;
  }

  const url = generateURL({ amount, name, upi });

  try {
    const canvas = document.createElement("canvas");
    await QRCode.toDataURL(canvas, url, {
      margin: 1,
      width: 130,
    });
    return { canvas, url };
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}
