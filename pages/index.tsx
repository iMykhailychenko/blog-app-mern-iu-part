import clsx from 'clsx';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import config from '../assets/config';
import routes from '../assets/routes';
import useAuth from '../components/../hooks/auth.hook';
import FormLogin from '../components/Common/Forms/Login';
import PostsLoader from '../components/Common/Loader/PostsLoader';
import QueueLoader from '../components/Common/Loader/QueueLoader';
import LoadMore from '../components/Common/LoadMore';
import Meta from '../components/Common/Meta';
import Posts from '../components/Common/Posts';
import Aside from '../components/Layout/Aside';
import TrendingPost from '../components/Pages/Home/TrendingPost';
import useMedia from '../hooks/media.hook';
import { IPostList, IState, IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';
import css from './index.module.css';

const QUEUE_LENGTH = 60;

const Home = (): ReactElement => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const mobile = useMedia(900);

    const posts = useSelector<IState, IPostList>(state => state.posts.list);
    const tags = useSelector<IState, string[]>(state => state.trending.tags);
    const queue = useSelector<IState, IPostList>(state => state.queue);

    const handleMore = (page: number): void => {
        dispatch({ type: types.MORE_POSTS_START, payload: { page, limit: config.postPerPage } });
    };

    useEffect(() => {
        if (auth?.token) {
            dispatch({ type: types.GET_QUEUE_START, payload: { page: 1, limit: config.queuePerPage } });
        }
    }, [auth?.token]);

    return (
        <>
            <Meta />
            <main className={clsx(css.main, 'container')}>
                <Aside>
                    {!auth?.token && mobile && <FormLogin />}

                    <h3 className={css.subtitle}>Trending:</h3>
                    <div className={css.tags}>
                        {tags.map(tag => (
                            <Link href={routes.posts.tag[0](tag)} key={tag}>
                                <a className={css.tag}>{`#${tag}`}</a>
                            </Link>
                        ))}
                    </div>

                    {auth?.token && mobile ? (
                        <>
                            <h3 className={css.subtitle}>Queue:</h3>
                            <QueueLoader loading={queue.loading} isEmpty={!queue?.data?.posts?.length}>
                                <>
                                    {queue?.data?.posts?.map(item => (
                                        <Link href={routes.posts.single[0](item._id)} key={item._id}>
                                            <a className={css.queue}>
                                                {item?.title?.length > QUEUE_LENGTH
                                                    ? item.title.slice(0, QUEUE_LENGTH) + '...'
                                                    : item?.title}
                                            </a>
                                        </Link>
                                    ))}
                                    <Link href={routes.queue[0](auth?.user?._id)}>
                                        <a className={css.viewAll}>View all</a>
                                    </Link>
                                </>
                            </QueueLoader>
                        </>
                    ) : null}
                </Aside>

                <div className={css.content}>
                    <TrendingPost />

                    <h2 className={css.title}>Popular posts</h2>
                    <Posts content={posts.data?.posts} />
                    {posts.data?.posts?.length < posts.data?.total ? (
                        <>
                            <PostsLoader />
                            <LoadMore onSubmit={handleMore} loading={posts.loading} />
                        </>
                    ) : null}
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }: GetServerSidePropsContext & { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_TRENDING_POST_START });
        store.dispatch({ type: types.GET_TRENDING_TAGS_START });
        store.dispatch({
            type: types.GET_POSTS_START,
            payload: { page: 1, limit: config.postPerPage },
        });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default Home;
