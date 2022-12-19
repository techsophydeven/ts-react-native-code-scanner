import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
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
  camera: CameraDevice;
}) => {
  const [hasPermission, setHasPermission] = React.useState(false);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      const currentStatus = await Camera.getCameraPermissionStatus();
      if (currentStatus === 'not-determined') {
        const status = await Camera.requestCameraPermission();
        console.log(status);
        setHasPermission(status === 'authorized');
      } else setHasPermission(currentStatus === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    runOnJS(callback)(barcodes);
  }, [barcodes, callback]);

  if (!hasPermission) return <></>;
  return (
    <Camera
      style={style}
      device={camera}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
  );
};

export type BarcodeType = Barcode;

export default BarcodeScanner;
