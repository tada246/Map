import { useEffect, useState } from 'react';

export default function useCameraPermission() {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);

    useEffect(() => {
        const checkCameraPermission = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasCamera = devices.some(
                (device) => device.kind === 'videoinput' && device.label !== ''
            );
            setHasCameraPermission(hasCamera);
        };

        checkCameraPermission();

        const intervalId = setInterval(checkCameraPermission, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return hasCameraPermission;
}
