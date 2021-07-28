import React, { useCallback } from 'react';
import { Button, notification } from 'antd';

export const Clipboard = ({ value }: { value: string }) => {
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(value);
        notification.success({ message: 'Copied!' });
    }, [value]);

    return <Button onClick={handleCopy} children='Copy' type='link' />;
};
