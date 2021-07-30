import React from 'react';
import styled from 'styled-components';

import CustomScroll from 'react-custom-scrollbars';

import { Actions } from './Actions';

const Container = styled.div`
    .content-section {
        display: flex;
        flex-direction: row;
        border-top: 1px solid #dcdcdc;

        .main-section {
            padding: 0 30px;
            height: 2000px;
        }

        .second-section {
            width: 35%;
            border-left: 1px solid #dcdcdc;
            padding: 0 30px;
        }
    }

    .footer-section {
        border-top: 1px solid #dcdcdc;
        padding: 16px 25px;
        position: sticky;
        bottom: 0;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: row-reverse;
    }
`;

interface LayoutProps {
    children: React.ReactNode;
    second?: React.ReactNode;
    actions?: React.ReactNode;
}

export function Layout({ children, second, actions }: LayoutProps) {
    return (
        <Container>
            <div className='content-section'>
                <CustomScroll
                    style={{
                        height: 'calc(100vh - 165px)',
                        flex: '1 1',
                    }}
                >
                    <div className='main-section'>{children}</div>
                </CustomScroll>
                {second ? <div className='second-section'>{second}</div> : null}
            </div>
            <div className='footer-section'>
                <Actions />
            </div>
        </Container>
    );
}
