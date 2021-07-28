import React, { useEffect, useState } from 'react';

import { PermissionSelect } from '../../utils/PermissionSelect';
import MEMBERS from '../../../data/members.json';

export function MemberSelect() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const data = MEMBERS.map(({ id, email, ...rest }) => {
            return {
                ...rest,
                value: id,
                label: email,
            };
        });
        setData(data);
    }, []);

    return <PermissionSelect data={data} />;
}
