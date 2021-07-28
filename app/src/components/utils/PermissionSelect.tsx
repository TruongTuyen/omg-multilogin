import React, { useCallback, useEffect, useState } from 'react';
import { List, Checkbox } from 'antd';
import styled from 'styled-components';

import { Permission } from './Permission';

const Container = styled.div`
    .member-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`;

interface PermissionSelectProps {
    data: any[];
    value?: any[];
}

export const PermissionSelect = ({
    data: dataProps,
    value,
}: PermissionSelectProps) => {
    // State
    const [data, setData] = useState<any[]>([]);

    // Did mount
    useEffect(() => {
        const newData = [...dataProps].filter(Boolean).map((i) => {
            const itemMatched = value?.find((item) => item.id === i.value);
            if (itemMatched == null) {
                return i;
            }
            return {
                ...i,
                selected: true,
                permission: itemMatched.permission,
            };
        });

        setData(newData);
    }, [dataProps, value]);

    // Handle actions
    const handleSelectedChange = useCallback(({ value }) => {
        setData((prev) =>
            prev.map((i) => {
                if (i.value === value) {
                    return {
                        ...i,
                        selected: !i.selected,
                    };
                }
                return i;
            })
        );
    }, []);

    const handlePermission = useCallback(({ value, permission }) => {
        setData((prev) =>
            prev.map((i) => {
                if (i.value === value) {
                    return {
                        ...i,
                        permission,
                    };
                }
                return i;
            })
        );
    }, []);

    // Markup
    const renderItem = useCallback(
        ({ value, selected, label, permission }) => {
            return (
                <List.Item>
                    <div className='member-wrap'>
                        <Checkbox
                            children={label}
                            checked={selected}
                            onChange={() => handleSelectedChange({ value })}
                        />
                        {selected && (
                            <Permission
                                value={permission}
                                onChange={(permission) =>
                                    handlePermission({ value, permission })
                                }
                            />
                        )}
                    </div>
                </List.Item>
            );
        },
        [handleSelectedChange, handlePermission]
    );

    return (
        <Container>
            <List
                size='large'
                header={null}
                footer={null}
                bordered
                dataSource={data}
                renderItem={renderItem}
            />
        </Container>
    );
};
