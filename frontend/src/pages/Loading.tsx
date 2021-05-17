import React, { ReactNode } from 'react';
import { useAuth } from '@stores/AuthStore';
import Flex from '@components/atom/FlexBox';
import { fullDisplay } from '@utils/styleFunctions';
import Spinner from '@components/atom/Spinner';

const Loading = ({ children }: { children: ReactNode }): JSX.Element => {
    const { initialized } = useAuth();

    if (!initialized) {
        return (
            <Flex
                align="center"
                justify="center"
                css={`
                    position: absolute;
                    ${fullDisplay};
                    width: 100%;
                    height: 100%;
                    span {
                        font-size: 14px;
                        margin: 0 8px;
                    }
                `}
            >
                <Spinner />
                <span>Fetching data...</span>
            </Flex>
        );
    }

    return <>{children}</>;
};

export default Loading;
