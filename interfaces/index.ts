import { Store } from 'redux';
import { Task } from 'redux-saga';

/**
 * GENERAL
 */
export interface IStore extends Store {
    sagaTask: Task;
}

/**
 * AUTH
 */
export interface IUser {
    _id: string;
    avatar: string | null;
    name: string;
    banner: string | null;
    bio: null | string;
    feedback: {
        isLiked: 0 | 1;
        isDisliked: 0 | 1;
        like: number;
        dislike: number;
    };
    surname: string;
    email: string;
    nick: string;
    followers?: IUser[];
    following?: IUser[];
}

export interface IAuth {
    loading: boolean;
    token: null | string;
    user: IUser | null;
}

/**
 * POSTS
 */
export interface IFeedback {
    isViewed: 0 | 1;
    isLiked: 0 | 1;
    isDisliked: 0 | 1;
    view: number;
    like: number;
    dislike: number;
}

export interface IPost {
    _id: string;
    feedback: IFeedback;
    queue: 0 | 1;
    edited: string | null;
    banner: string | null;
    tags: string[];
    title: string;
    desc: string;
    content: string;
    user: IUser;
    date: string;
    author: [IUser];
}

export interface IPostPagination {
    total: number;
    count: number;
    posts: IPost[];
}

export interface IPostList {
    loading: boolean;
    data: IPostPagination | null;
}

export interface ISinglePost {
    loading: boolean;
    data: IPost | null;
}

export interface INewPost {
    title: string;
    tags: string;
    banner: null | File;
    desc: string;
    content: string;
}

/**
 * COMMENTS
 */
export interface IComment {
    _id: string;
    date: string;
    edited: string | null;
    text: string;
    attachment: null | string;
    author: [IUser];
    feedback: {
        isLiked: 0 | 1;
        isDisliked: 0 | 1;
        like: number;
        dislike: number;
    };
    answers?: IComment[];
}

export interface ICommentPagination {
    total: number;
    count: number;
    comments: IComment[];
}

export interface ICommentList {
    loading: boolean;
    data: ICommentPagination | null;
}

/**
 * SETTINGS
 */

export interface IFollowersPagination {
    total: number;
    count: number;
    users: IUser[];
}

export interface IFollowers {
    loading: boolean;
    more: boolean;
    data: IFollowersPagination | null;
}

/**
 * APP STATE
 */
export interface IState {
    auth: IAuth | null;
    profile: IUser | null;
    queue: IPostList;
    trending: {
        post: IPost | null;
        tags: string[];
    };
    posts: {
        list: IPostList;
        newPost: INewPost;
        single: ISinglePost;
    };
    followers: IFollowers;
    comments: ICommentList;
}
