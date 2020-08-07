import React from 'react';
import { Link } from 'react-router-dom';
import router from '../../../../../config/router';
import styles from '../index.module.css';

interface IProps {
    id: string;
    placeholder?: string;
    title: string;
    text: string;
    date: string;
    tags: string[];
}

export default ({ id, placeholder, title, text, date, tags }: IProps) => (
    <>
        <Link to={router.post.single(id)} className={styles.postLink}>
            {placeholder && (
                <img className={styles.img} src={placeholder} alt={title} />
            )}
            <div className={styles.inner}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.text}>{text}</p>
                <p className={styles.date}>{date}</p>
            </div>
        </Link>

        <div className={styles.inner}>
            {!!tags.length &&
                tags.map(tag => (
                    <Link
                        to={router.post.tag(tag)}
                        key={tag}
                        className={styles.tag}
                    >
                        {`#${tag}`}
                    </Link>
                ))}
        </div>
    </>
);
