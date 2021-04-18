import React from 'react';

interface Props {
    size?: number;
}

export default ({ size = 32 }: Props): JSX.Element => {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={0}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
        </svg>
    );
};
