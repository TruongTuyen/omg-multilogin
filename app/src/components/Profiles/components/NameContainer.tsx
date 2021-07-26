import React from 'react';
import { Input, Form, Button } from 'antd';

const { Item } = Form;

interface NameContainerProps {
    record: any;
    onChange?: (value: string) => string;
}

export class NameContainer extends React.Component<NameContainerProps> {
    handleFinish = (values) => {
        console.log(values);
    };
    render() {
        const { record } = this.props;
        return (
            <Form
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={this.handleFinish}
                initialValues={{
                    profileId: record.id,
                    note: record.note,
                }}
            >
                <Item colon label='Profile ID' name='profileId'>
                    <span>{record.id}</span>
                </Item>
                <Item colon label='Note' name='note'>
                    <Input.TextArea size='middle' rows={4} />
                </Item>
                <Item wrapperCol={{ offset: 3, span: 21 }}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Item>
            </Form>
        );
    }
}
