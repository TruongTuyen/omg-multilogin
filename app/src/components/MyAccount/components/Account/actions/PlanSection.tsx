import React, { useCallback } from 'react';
import { Button, Popconfirm } from 'antd';

interface CancelPlanProps {
    value?: string;
}

export const CancelPlan = ({ value }: CancelPlanProps) => {
    // Handle actions
    const handleSubmit = useCallback(() => {}, []);

    return (
        <div>
            <span>{value}</span>
            <Popconfirm
                title='Are you sure to cancel this plan?'
                onConfirm={handleSubmit}
            >
                <Button children='Cancel' type='link' />
            </Popconfirm>
        </div>
    );
};
