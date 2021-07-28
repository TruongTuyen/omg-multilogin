import React from 'react';

import { MoreAction, MoreActionProps } from '../../../utils/MoreAction';
import { Edit } from './Edit';

interface MoreActionsProps {
    record?: any[];
}

export const MoreActions = ({ record }: MoreActionsProps) => {
    const actions = React.useMemo(() => {
        return [
            {
                name: 'Edit permission',
                render: <Edit record={record} />,
            },
            {
                name: 'Delete',
                render: <p>d</p>,
            },
        ] as MoreActionProps['actions'];
    }, [record]);

    return <MoreAction actions={actions} />;
};
