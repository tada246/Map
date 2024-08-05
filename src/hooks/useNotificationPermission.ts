import { useState, useEffect } from 'react';

const useNotificationPermission = () => {
    const [permission, setPermission] = useState(Notification.permission);

    useEffect(() => {
        const handlePermissionChange = () => {
            setPermission(Notification.permission);
        };

        // 権限が変更されたときに更新する
        navigator.permissions
            .query({ name: 'notifications' })
            .then((permissionStatus) => {
                permissionStatus.onchange = handlePermissionChange;
            });
    }, []);

    const requestPermission = () => {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then((newPermission) => {
                setPermission(newPermission);
            });
        }
    };

    return { permission, requestPermission };
};

export default useNotificationPermission;
