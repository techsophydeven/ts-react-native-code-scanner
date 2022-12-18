import React from 'react';
import type { ViewStyle } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {
  Barcode,
  BarcodeFormat,
  useScanBarcodes,
} from 'vision-camera-code-scanner';

const BarcodeScanner = ({
  style,
  callback,
  camera,
}: {
  style: ViewStyle;
  callback: (barcodes: Barcode[]) => void;
  camera: 'back' | 'front';
}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = camera === 'back' ? devices.back : devices.front;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    callback(barcodes);
  }, [barcodes, callback]);

  return device && hasPermission ? (
    <>
      <Camera
        style={style}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    </>
  ) : (
    <></>
  );
};

export type BarcodeType = Barcode;

export default BarcodeScanner;
