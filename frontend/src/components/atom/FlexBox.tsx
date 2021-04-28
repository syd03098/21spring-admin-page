import React, { CSSProperties, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

type direction = 'column' | 'row';
type Justify = 'center' | 'space-around' | 'space-between';
type Align = 'stretch' | 'center' | 'flex-start' | 'flex-end';

interface Props {
    inline?: boolean;
    column?: direction;
    justify?: Justify;
    align?: Align;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

// display: flex 속성을 갖고있는 컴포넌트를 구성하기위한 base component.
const FlexBox = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ children, style, onClick, ...rest }: PropsWithChildren<Props>, ref) => {
        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Container ref={ref} style={style} onClick={onClick} {...rest}>
                {children}
            </Container>
        );
    },
);

const Container = styled.div<Props>`
    display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
    flex-direction: ${({ column }) => column};
    justify-content: ${({ justify }) => justify};
    align-items: ${({ align }) => align};
`;

export default FlexBox;
