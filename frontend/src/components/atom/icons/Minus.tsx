import React from 'react';

interface Props {
    size?: number;
}

export default ({ size = 16 }: Props): JSX.Element => {
    return (
        <>
            <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height={size}
                width={size}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
            </svg>
        </>
    );
};
