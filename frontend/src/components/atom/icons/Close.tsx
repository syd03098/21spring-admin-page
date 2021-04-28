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
                strokeWidth="0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        );
    },
);
