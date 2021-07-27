import React from 'react';
import { Button, Popconfirm, notification } from 'antd';

interface PinnedProps {
    record: any;
}

interface PinnedState {
    loading: boolean;
    visible: boolean;
}

export class Pinned extends React.Component<PinnedProps, PinnedState> {
    state: PinnedState = {
        loading: false,
        visible: false,
    };

    handleConfirm = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            notification.success({
                message: 'Pinned this ground successfully.',
            });
        }, 1500);
    };

    toggleVisible = () => {
        this.setState((prev) => ({ ...prev, visible: !prev.visible }));
    };
    render() {
        const { handleConfirm, toggleVisible } = this;
        const { loading, visible } = this.state;

        // Props;
        const { record } = this.props;
        const { pinned } = record;
        const type = pinned ? 'fill' : 'line';

        return (
            <Popconfirm
                title='Are your sure to pin this group?'
                visible={visible}
                onCancel={toggleVisible}
                onConfirm={(e) => {
                    e?.preventDefault();
                    handleConfirm();
                }}
                okButtonProps={{
                    loading,
                }}
            >
                <Button
                    type='text'
                    shape='circle'
                    icon={<i className={`ri-pushpin-2-${type} fs-18`}></i>}
                    onClick={toggleVisible}
                />
            </Popconfirm>
        );
    }
}
