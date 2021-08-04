import React from 'react';
import styled from 'styled-components';
import CustomScroll from 'react-custom-scrollbars';

import { Actions } from './Actions';
import { ProfileSummary } from './ProfileSummary';

const Container = styled.div`
    .content-section {
        display: flex;
        flex-direction: row;
        border-top: 1px solid #dcdcdc;

        .main-section {
            padding: 0 30px;
        }

        .second-section {
            max-width: 30rem;
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
    actions?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
                <div className='second-section'>
                    <ProfileSummary />
                </div>
            </div>
            <div className='footer-section'>
                <Actions />
            </div>
        </Container>
    );
}
