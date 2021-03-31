import { useContext } from 'react';
import RootStore, { RootStoreContext } from '@stores/RootStore';

export default (): RootStore => {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nRootStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
