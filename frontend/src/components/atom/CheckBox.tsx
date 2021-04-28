import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import ConfirmIcon from '@components/atom/icons/Confirm';
import { flexCenter } from '@utils/styleFunctions';
import classNames from 'classnames';

const CheckBox = (): JSX.Element => {
    const [checked, setChecked] = useState(false);

    const toggleChecked = useCallback(() => {
        setChecked(!checked);
    }, [checked]);

    return (
        <Checkbox onClick={toggleChecked} className={classNames({ checked })}>
            <ConfirmIcon size={14} />
        </Checkbox>
    );
};

const Checkbox = styled.div`
    ${flexCenter};
    width: 16px;
    height: 16px;
    border: 2px solid ${({ theme }) => theme.black40};
    border-radius: 4px;
    transition: opacity 0.1s linear;
    cursor: pointer;
    opacity: 0.3;

    svg {
        color: transparent;
    }

    &.checked {
        opacity: 0.6;
        svg {
            color: inherit;
        }
    }
`;

export default CheckBox;
