import React from 'react'
import { shell } from 'electron'
import { Typography } from 'antd'
const { Title, Paragraph, Text, Link } = Typography;

import './about.less'

export default class About extends React.Component<PageProps> {
	render(): JSX.Element {
		return (
			<div className="about flex column center" style={{ height: '100%' }}>
				<img src={$tools.APP_ICON} width="88" />
				<h2 style={{ marginTop: 8 }}>{$tools.APP_NAME}</h2>
				<p className="fs-12" style={{ margin: 4 }}>
					Version {$tools.APP_VERSION} def
				</p>
				<p className="fs-12" style={{ margin: 4 }}>
				<Typography>
					<Title>Introduction</Title>
					<Paragraph>
					In the process of internal desktop applications development, many different design specs and
					implementations would be involved, which might cause designers and developers difficulties and
					duplication and reduce the efficiency of development.
					</Paragraph>
				</Typography>
				</p>
				<p className="fs-12 text-gray">
					Copyright © {new Date().getFullYear()}{' '}
					<a
						onClick={() => {
							shell.openExternal('https://github.com/lanten')
						}}
					>
						lanten.
					</a>{' '}
					All rights (demo)
				</p>
			</div>
		)
	}
} // class About end
