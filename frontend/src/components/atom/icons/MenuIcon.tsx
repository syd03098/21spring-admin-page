import React from 'react';

interface Props {
    size?: number;
}

export default ({ size = 24 }: Props): JSX.Element => {
    return (
        <svg width={size} height={size} stroke="currentColor" fill="none" strokeWidth={0} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
};
