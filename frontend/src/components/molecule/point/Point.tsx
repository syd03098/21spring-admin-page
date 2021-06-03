import React, { CSSProperties, useCallback, useState } from 'react';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import { getPoints } from '@utils/api/profile';
import { useToast } from '@stores/ToastStore';
import { useAuth } from '@pages/authContext';
import styled, { css } from 'styled-components';
import Spinner from '@components/atom/Spinner';

interface Props {
    inline?: boolean;
    style?: CSSProperties;
}

const Point = ({ inline = true, style }: Props): JSX.Element => {
    const [point, setPoint] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(true);
    const { appendToast } = useToast();

    useEffectOnce(() => {
        (async () => fetchUserPoints())();
    });

    const fetchUserPoints = useCallback(async () => {
        try {
            const { point: fetchedPoint } = await getPoints();
            setPoint(fetchedPoint);
        } catch (e) {
            appendToast('포인트를 조회하는데 실패했습니다. 잠시 후 다시 시도해주세요.', {
                type: 'error',
                timeout: 5000,
            });
        }
        setLoading(false);
    }, [appendToast]);

    return (
        <>
            {isLoading && <Spinner inline={false} size={16} />}
            {!isLoading && (
                <StyledPoints inline={inline} style={style}>
                    <strong>{point}&nbsp;</strong>points
                </StyledPoints>
            )}
        </>
    );
};

const StyledPoints = styled.div<{ inline: boolean }>`
    display: ${(props) => (props.inline ? 'inline-flex' : 'block')};
    color: ${({ theme }) => theme.black40};
    font-size: 15px;
    letter-spacing: -0.4px;
    font-weight: 500;
    strong {
        color: ${({ theme }) => theme.black100};
    }
`;

export default Point;
