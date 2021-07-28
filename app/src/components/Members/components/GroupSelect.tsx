import React, { useEffect, useState } from 'react';

import { PermissionSelect } from '../../utils/PermissionSelect';
import GROUPS from '../../../data/groups.json';

interface GroupSelectProps {
    value: any[];
}

export function GroupSelect({ value }: GroupSelectProps) {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const data = GROUPS.map(({ id, name, ...rest }) => {
            return {
                ...rest,
                value: id,
                label: name,
            };
        });
        setData(data);
    }, []);

    return <PermissionSelect data={data} value={value} />;
}
