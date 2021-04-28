import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useAdminDashBoard } from '@stores/AdminStore';
import classNames from 'classnames';

interface Props {
    id: string;
    label: string;
}

const SideNavButton = ({ id, label }: Props): JSX.Element => {
    const { currentTab, changeCurrentTab } = useAdminDashBoard();

    const onClickHandler = useCallback(() => {
        if (currentTab !== id) changeCurrentTab(id);
    }, [changeCurrentTab, currentTab, id]);

    return (
        <TabButton className={classNames({ active: id === currentTab })} onClick={onClickHandler}>
            <span>{label}</span>
        </TabButton>
    );
};

const TabButton = styled.button`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => theme.black30};
    cursor: pointer;
    padding: 10px 16px;

    &.active {
        font-weight: 500;
        background-color: ${({ theme }) => theme.smoke80};
        color: ${({ theme }) => theme.black100};
    }
`;

export default SideNavButton;
