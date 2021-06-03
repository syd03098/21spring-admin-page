import React, { useState } from 'react';
import GlobalNavbar from '@components/organism/globalNavbar';
import HorizontalSwiper from '@components/organism/horizontalSwiper';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import axios from 'axios';
import { SwiperMovieResources } from '@utils/api/movie/types';
import Loading from '@pages/Loading';

const Entrance = (): JSX.Element => {
    const [isReady, setReady] = useState<boolean>(false);
    const [resources, setResources] = useState<SwiperMovieResources>({
        currentTime: new Date().getTime(),
        categories: [],
    });

    useEffectOnce(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/movies');
                setResources(data);
            } catch (err) {
                console.error(err);
            } finally {
                setReady(true);
            }
        })();
    });
    if (!isReady) return <Loading message="Fetching Movies from Database..." />;
    return (
        <>
            <GlobalNavbar />
            <HorizontalSwiper resources={resources} />
        </>
    );
};

export default Entrance;
