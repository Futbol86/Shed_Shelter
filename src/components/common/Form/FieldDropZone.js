import React from 'react';
import DropZone from 'react-dropzone';
import classNames from 'classnames';

const FieldDropZone = ({input, name, label, disabled, meta, className, handleFileDrops,
                           listDroppedFiles = false, ...otherProps}) => {
    const files = input.value;

    return (
        <React.Fragment>
            <DropZone
                name={name} disabled={disabled}
                onDrop={( filesToUpload, rejectedFiles ) => {
                    input.onChange(filesToUpload);
                    handleFileDrops(filesToUpload, rejectedFiles);
                }}
                className={classNames(className, {"disabled": disabled})}
                {...otherProps}
            >
                {label}
            </DropZone>
            {meta.touched && meta.error && <span className="error">{meta.error}</span>}

            {files && Array.isArray(files) && listDroppedFiles && (
                <ul>
                    { files.map((file, i) => <li key={i}>{file.name}</li>) }
                </ul>
            )}
        </React.Fragment>
    )
};

export default FieldDropZone;