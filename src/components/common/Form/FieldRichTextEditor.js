import React from 'react';
import { compose, withHandlers, withState, withPropsOnChange } from 'recompose';
import { FormFeedback } from 'reactstrap';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FieldRichTextEditor =
    (
        {
            input: { value, onChange },
            meta: { touched, error },
            wrapperClassName, editorClassName, toolbarClassName,
            editorState,
            onEditorStateChange
        }
    ) => (
        <div className="RTWrapper">
            {
                editorState &&
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName={wrapperClassName ? wrapperClassName : 'richtext-wrapper'}
                    editorClassName={editorClassName ? editorClassName : 'richtext-editor'}
                    toolbarClassName={toolbarClassName ? toolbarClassName : null}
                />
            }
            {touched && error && <FormFeedback>{error}</FormFeedback>}
        </div>
    );

export default compose(
    withState("editorState", "setEditorState", EditorState.createEmpty()),
    withPropsOnChange(
        ['input'],
        ({ input: { value }, meta: { dirty }, setEditorState }) => {
            if (dirty) {
                return;
            }
            if (!value) {
                return;
            }
            const contentBlock = htmlToDraft(value);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    ),
    withHandlers({
        onEditorStateChange: ({ input: { onChange }, setEditorState }) => (editorState) => {
            setEditorState(editorState);
            const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            onChange(html);
        },
    })
)(FieldRichTextEditor);