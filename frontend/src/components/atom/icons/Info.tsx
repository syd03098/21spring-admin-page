import React, { memo } from 'react';

interface Props {
    size?: number;
}

export default memo(
    ({ size = 16 }: Props): JSX.Element => {
        return (
            <svg
                width={size}
                height={size}
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={40}
                    d="M196 220h64v172m-73 4h138"
                />
                <path d="M256 160a32 32 0 1132-32 32 32 0 01-32 32z" />
            </svg>
        );
    },
);
