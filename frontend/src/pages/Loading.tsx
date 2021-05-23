import React from 'react';
import Flex from '@components/atom/FlexBox';
import { fullDisplay } from '@utils/styleFunctions';
import Spinner from '@components/atom/Spinner';

interface Props {
    message: string;
}

const Loading = ({ message }: Props): JSX.Element => {
    return (
        <Flex
            align="center"
            justify="center"
            css={`
                position: absolute;
                ${fullDisplay};
                width: 100%;
                height: 100%;
                background-color: rgb(255, 255, 255);
                z-index: 3000;
                span {
                    font-size: 14px;
                    margin: 0 8px;
                }
            `}
        >
            <Spinner />
            <span>{message}</span>
        </Flex>
    );
};

export default Loading;
