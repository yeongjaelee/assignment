import React from 'react';
import { Modal as AntdModal } from 'antd';
import type { ModalProps } from 'antd';
import type { Comment } from '../types';

interface Props extends ModalProps {
    comment: Comment | null;
}
const Modal = React.memo(function Modal({ comment, ...props }: Props) {
    /***************************************
     * HOOKS & HANDLERS
     **************************************/

    /***************************************
     * RENDER
     **************************************/
    if (!comment) {
        return null;
    }

    return (
        <AntdModal title={`Comment ${comment.id}`} {...props}>
            <p>
                <b>Name</b>: {comment.name}
            </p>
            <p>
                <b>Email</b>: {comment.email}
            </p>
            <p>
                <b>Body</b>: {comment.body}
            </p>
        </AntdModal>
    );
});

export default Modal;
