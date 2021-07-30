import React, { useCallback } from 'react';
import { Button } from 'antd';

export const Actions = () => {
    const handleSubmit = useCallback(() => {}, []);

    return (
        <div>
            <Button
                children='Create profile'
                type='primary'
                onClick={handleSubmit}
                style={{ marginRight: '0.5rem' }}
            />
            <Button children='Cancel' />
        </div>
    );
};
