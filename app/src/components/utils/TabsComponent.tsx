import React from 'react';
import { Tabs, TabPaneProps } from 'antd';

interface TabProps {
    tabs: TabPaneProps[];
}

const { TabPane } = Tabs;

export class TabsComponent extends React.Component<TabProps> {
    render() {
        const { tabs }: TabProps = this.props;
        return (
            <Tabs defaultActiveKey='1'>
                {tabs.map(({ tab, tabKey, children }: TabPaneProps) => (
                    <TabPane tab={tab} key={tabKey}>
                        <div style={{ paddingLeft: 35, paddingRight: 35 }}>
                            {children}
                        </div>
                    </TabPane>
                ))}
            </Tabs>
        );
    }
}
