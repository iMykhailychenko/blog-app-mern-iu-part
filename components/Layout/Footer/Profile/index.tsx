import Link from 'next/link';
import React, { ReactElement } from 'react';

import routes from '../../../../assets/routes';
import css from './index.module.css';

const Profile = (): ReactElement => {
    return (
        <ul className={css.list}>
            <li>
                <Link href={routes.users[0]('1')}>
                    <a>Your profile</a>
                </Link>
            </li>
            <li>
                <Link href={routes.posts.new}>
                    <a>Create new post</a>
                </Link>
            </li>
            <li>
                <button type="button">Log out</button>
            </li>
        </ul>
    );
};

export default Profile;
