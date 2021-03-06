import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, KeyboardEvent, ReactElement, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import useMedia from '../../../../../hooks/media.hook';
import AttachedImg from '../AttachedImg';
import css from './index.module.css';

interface IProps {
    value?: string;
    hasAttachment?: boolean;
    onSubmit: (value: { id: string | string[]; form: FormData }) => void;
}

const CommentForm = ({ onSubmit, value = '', hasAttachment = true }: IProps): ReactElement => {
    const media = useMedia(900);
    const { query } = useRouter();
    const [text, setText] = useState<string>(value);
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setText(event.target.value);
    };

    const handleSubmit = (event?: FormEvent<HTMLFormElement>): void => {
        event?.preventDefault();
        if (!text) return;

        const form = new FormData();
        file && form.append('attachment', file);
        form.append('text', text);

        onSubmit({ id: query.postId, form });
        setText('');
        setFile(null);
    };

    const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key === 'Enter' && !event.shiftKey) {
            if (!media) return;

            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className={css.flex}>
                <TextareaAutosize
                    className={css.comment}
                    name="comment"
                    cols={30}
                    rows={10}
                    value={text}
                    placeholder="Press Enter to submit or press Enter + Shift to break the line"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <button className={clsx('btn btn--blue', css.btn, !text && 'btn--disabled')} type="submit">
                    <FontAwesomeIcon icon={faTelegramPlane} />
                </button>
            </div>

            {hasAttachment && <AttachedImg file={file} onChange={setFile} />}
        </form>
    );
};

export default CommentForm;
