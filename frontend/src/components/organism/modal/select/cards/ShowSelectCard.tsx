import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

interface Props {
    available: number;
    capacity: number;
    isDisabled: boolean;
    runningTime: JSX.Element;
    theaterName: string;
    onSelect: () => void;
}

const ShowSelectCard = ({
    available,
    capacity,
    isDisabled,
    runningTime,
    theaterName,
    onSelect,
}: Props): JSX.Element => {
    const seatsAvailable = useMemo(() => {
        const ratio = available / capacity;
        return (
            <ThemedSpan ratio={ratio}>
                <strong>{available}</strong>/{capacity}
            </ThemedSpan>
        );
    }, [available, capacity]);

    return (
        <StyledSelectShowCard>
            <StyledCardButton disabled={isDisabled} onClick={onSelect}>
                {runningTime}
                <StyledShowDetail>
                    {seatsAvailable}
                    <div>{theaterName}</div>
                </StyledShowDetail>
            </StyledCardButton>
        </StyledSelectShowCard>
    );
};

const StyledSelectShowCard = styled.li`
    display: flex;
    border: 1px solid ${({ theme }) => theme.smoke80};
    padding: 0 12px;
    margin: 0;
    border-radius: 10px;
`;

const ThemedSpan = styled.span<{ ratio: number }>`
    font-size: 14px;
    color: ${({ theme }) => theme.black40};
    font-weight: 500;
    > strong {
        ${(props) =>
            (props.ratio <= 0.2 &&
                css`
                    color: ${({ theme }) => theme.red};
                `) ||
            css`
                color: ${({ theme }) => theme.black80};
            `}
    }
`;

const StyledCardButton = styled.button`
    flex: 1 1 auto;
    cursor: pointer;
    p {
        font-size: 14px;
        color: ${({ theme }) => theme.black30};
        font-weight: 400;
        margin: 8px 0 2px 0;
        text-align: left;
        > strong {
            color: ${({ theme }) => theme.black100};
            font-size: 15px;
            font-weight: 600;
        }
    }
    &:disabled {
        opacity: 0.5;
        cursor: initial;
    }
`;

const StyledShowDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 8px 0;
    div {
        font-size: 14px;
        color: ${({ theme }) => theme.black100};
        font-weight: 500;
    }
`;

export default ShowSelectCard;
