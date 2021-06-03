import React from 'react';
import styled from 'styled-components';
import { flexCenter } from '@utils/styleFunctions';
import classNames from 'classnames';

interface Props {
    active: boolean;
    count: number;
    name: string;
    onSelectTab: () => void;
}

const TabButton = ({ active, count, name, onSelectTab }: Props): JSX.Element => {
    return (
        <TabButtonItem onClick={onSelectTab}>
            <TabButtonContents className={classNames(active && 'active')}>
                <span>
                    {name}&nbsp;{count}
                </span>
            </TabButtonContents>
        </TabButtonItem>
    );
};

const TabButtonItem = styled.li`
    position: relative;
    margin-right: 30px;
    padding: 0;
    cursor: pointer;
`;

const TabButtonContents = styled.div`
    ${flexCenter};
    padding: 24px 0;
    color: ${({ theme }) => theme.black30};

    &.active {
        color: ${({ theme }) => theme.black100};
        font-weight: 600;
    }
`;

export default TabButton;
