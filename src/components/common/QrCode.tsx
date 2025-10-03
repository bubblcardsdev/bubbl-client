import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  deviceIdQR: string;
  qrBubbl: string;
  qrImageUrl: string;
}

function generateQR(URL: string, imagePath: string) {
  let qrURL = `https://quickchart.io/qr?text=${URL}&size=200`;
  if (imagePath) {
    qrURL += `&centerImageUrl=${imagePath?.replaceAll("&", "%26")}`;
  }

  return qrURL;
}

const QrCodeImage = (props: Props) => {
  console.log(props,'props')

  // const { deviceIdQR, qrBubbl, qrImageUrl } = props;
    const { deviceIdQR } = props;

  const url = `https://dev.bubbl.cards/profile/?profileId=${deviceIdQR}`;
  const [urlOpened, setUrlOpened] = useState(false);

  useEffect(() => {
    if (urlOpened) {
      window.open(url, "_blank");

      setUrlOpened(false);
    }
  }, [urlOpened, url]);
  return (
    <div className="qrSection flex justify-center items-center">
      <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]">
        {/* QR Code */}
        <Image
          loader={({ src }) => src}
          src={generateQR(url, "")}
          alt="QR Code"
          fill
          className="object-contain"
        />
        {/* Logo at center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <Image
            loader={({ src }) => src}
            src="https://bubbl.cards/_next/static/media/qrBubbl.39f75756.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default QrCodeImage;
