import React, { ReactNode } from 'react';
import * as Sty from './ThemedButton.style';

interface Props {
    backgroundColor?: string;
    fontColor?: string;
    onClick?: () => void;
    children: ReactNode;
}

const ThemedButton = ({ backgroundColor, fontColor, onClick, children }: Props): JSX.Element => {
    return (
        <Sty.ThemedButton onClick={onClick} fontColor={fontColor} backgroundColor={backgroundColor}>
            {children}
        </Sty.ThemedButton>
    );
};

export default ThemedButton;
