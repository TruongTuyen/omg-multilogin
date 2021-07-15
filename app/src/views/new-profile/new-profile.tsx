import * as React from 'react'
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import { ipcRenderer } from 'electron'



export default class NewProfile extends React.Component<PageProps> {
	render(): JSX.Element {


		const onFinish = (values: any) => {
			console.log('Success:', values);
			const res = ipcRenderer.sendSync('runCommand', values);
			return res;
		};

		const onFinishFailed = (errorInfo: any) => {
			console.log('Failed:', errorInfo);
		};

		return (
			<div className="layout-padding flex column center no-match">
				<h3>Create new profile here</h3>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="Browser profile name"
						name="profile-name"
						rules={[{ required: true, message: 'Please input your browser profile name!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item label="Group"
						name="profile-group"

					>
						<Select
							showSearch
							style={{ width: 200 }}
							placeholder="Select a person"
							optionFilterProp="children"

						>
							<Option value="jack">Group 1</Option>
							<Option value="lucy">Group 2</Option>
							<Option value="tom">Group 3</Option>
						</Select>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Create new profile
						</Button>
					</Form.Item>
				</Form>
			</div >
		)
	}
} // class ErrorPage end
