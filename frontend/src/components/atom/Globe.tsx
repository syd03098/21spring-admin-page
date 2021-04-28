import React, { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
    style?: CSSProperties;
    className?: string;
}

// 구형 컴포넌트를 구성하기위한 베이스. abolute 속성이 있기때문에 인접 component의 z-index를 높여줘야함
const Globe = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ children, style, className, ...rest }: PropsWithChildren<Props>, ref) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <GlobeContainer ref={ref} className={className} style={style} {...rest} />;
    },
);

const GlobeContainer = styled.div`
    position: absolute;
    border-radius: 50%;
`;

export default Globe;
