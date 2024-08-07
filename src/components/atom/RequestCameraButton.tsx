import { Button } from '@nextui-org/react';

export default function RequestCameraButton() {
    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        } catch (_err) {}
    };

    return (
        <Button onClick={() => requestCameraPermission()}>
            カメラの権限を要求
        </Button>
    );
}
