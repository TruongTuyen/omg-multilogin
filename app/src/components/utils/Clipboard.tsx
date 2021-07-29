import React, { cloneElement, useCallback } from 'react';
import { Button, notification } from 'antd';

interface ClipboardProps {
    value: string;
    activator?: React.ReactElement;
}

export const Clipboard = ({ value, activator }: ClipboardProps) => {
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(value);
        notification.success({ message: 'Copied!' });
    }, [value]);

    // Markup
    const newActivator = activator
        ? cloneElement(activator, {
              ...activator.props,
              onClick: handleCopy,
          })
        : null;

    const activatorMarkup = newActivator ? (
        newActivator
    ) : (
        <Button onClick={handleCopy} children='Copy' type='link' />
    );

    return activatorMarkup;
};
