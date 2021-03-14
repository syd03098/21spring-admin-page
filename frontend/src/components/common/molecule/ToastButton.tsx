import React from 'react';
import ThemedButton from '@components/common/atom/ThemedButton';
import Heart from '@components/common/atom/Heart';

const ToastButton = (): JSX.Element => {
    return (
        <>
            <ThemedButton backgroundColor="#66d9e8">
                <Heart />
                <span>Toast 테스트</span>
            </ThemedButton>
        </>
    );
};

export default ToastButton;
