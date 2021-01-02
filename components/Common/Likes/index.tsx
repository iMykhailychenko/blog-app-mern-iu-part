import { faEye, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IState, IUser } from '../../../interfaces';
import css from './index.module.css';

interface IProps {
    id?: string;
    postId?: string | string[];
    typeLike?: string;
    typeDislike?: string;
    like: string[];
    dislike: string[];
    view?: string[];
}

const Likes = ({ id, postId, typeLike, typeDislike, like, dislike, view }: IProps): ReactElement => {
    const dispatch = useDispatch();
    const user = useSelector<IState, IUser>(state => state.auth.user);
    const token = useSelector<IState, string | null>(state => state.auth.token);

    const handleLike = (): void => {
        if (!id || !typeLike) return;
        dispatch({ type: typeLike, payload: id, postId });
    };
    const handleDislike = (): void => {
        if (!id || !typeDislike) return;
        dispatch({ type: typeDislike, payload: id, postId });
    };

    return (
        <ul className={css.list} style={token ? {} : { pointerEvents: 'none' }}>
            <li
                className={clsx(css.item, like?.includes(user?._id || null) && css.active)}
                onClick={handleLike}
                aria-hidden
            >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className={css.num}>{like?.length || 0}</span>
            </li>
            <li
                className={clsx(css.item, css.dislike, dislike?.includes(user?._id || null) && css.active)}
                onClick={handleDislike}
                aria-hidden
            >
                <FontAwesomeIcon icon={faThumbsDown} />
                <span className={css.num}>{dislike?.length || 0}</span>
            </li>
            {view && (
                <li
                    className={clsx(css.item, view?.includes(user?._id || null) && css.active)}
                    style={{ pointerEvents: 'none' }}
                >
                    <FontAwesomeIcon icon={faEye} />
                    <span className={css.num}>{view?.length || 0}</span>
                </li>
            )}
        </ul>
    );
};

export default Likes;
