import React, { ReactElement } from 'react';

// import { useSelector } from 'react-redux';
// import { IComment } from '../../../../../../interfaces';
// import Confirm from '../../../../../Common/Confirm';
import Likes from '../../../../../Common/Likes';
// import CommentModal from '../../CommentModal';
// import EditModal from '../../EditModal';
import styles from '../index.module.css';

const Buttons = (): ReactElement => {
    // const { isAuth } = useSelector(getAuth);

    return (
        <div className={styles.likes}>
            {/* <Likes like={comment.like} dislike={comment.dislike} click /> */}

            {/* {isAuth && ( */}
            <>
                <button className={styles.link} type="button">
                    Answer
                </button>

                <button className={styles.link} type="button">
                    Edit
                </button>

                <button className={styles.link} type="button">
                    Delete
                </button>
            </>
            {/* )} */}
        </div>
    );
};

export default Buttons;
