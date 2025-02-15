import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Camera } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface QRScannerProps {
  onClose?: () => void;
  onScan?: (bookingId: string) => void;
}

const QRScanner = ({
  onClose = () => {},
  onScan = () => {},
}: QRScannerProps) => {
  const [scanning, setScanning] = React.useState(false);

  React.useEffect(() => {
    let codeReader: BrowserQRCodeReader | null = null;

    const startScanning = async () => {
      if (scanning) {
        try {
          codeReader = new BrowserQRCodeReader();
          const videoElement = document.getElementById(
            "qr-reader",
          ) as HTMLVideoElement;

          if (videoElement) {
            const devices = await codeReader.listVideoInputDevices();
            const selectedDeviceId = devices[0].deviceId;

            await codeReader.decodeFromVideoDevice(
              selectedDeviceId,
              videoElement,
              (result) => {
                if (result) {
                  onScan(result.getText());
                  setScanning(false);
                }
              },
            );
          }
        } catch (error) {
          console.error(error);
          setScanning(false);
        }
      }
    };

    startScanning();

    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [scanning, onScan]);

  return (
    <div className="fixed inset-0 bg-[#00B37D] z-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white rounded-lg bg-white/20"
          onClick={onClose}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Scan QR Code</h1>
            <p className="text-gray-500">
              Position the QR code within the frame
            </p>
          </div>

          {!scanning ? (
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-[#00B37D] hover:bg-[#00956A] gap-2"
                onClick={() => setScanning(true)}
              >
                <Camera className="h-5 w-5" />
                Start Scanning
              </Button>
            </div>
          ) : (
            <video
              id="qr-reader"
              className="w-full max-w-sm mx-auto rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
