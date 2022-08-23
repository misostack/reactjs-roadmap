import React, { ReactElement, useEffect, useRef, useState } from 'react';
import noImage from '../assets/images/no-image.png';
import examplePDF from '../assets/files/example.pdf';
import fileHelpers from '../helpers/file.helpers';
import HashHelpers from '../helpers/hash.helpers';

type HookExampleProps = {};
// write a file upload component
// 1. Support upload multiple file
// 2. Support file preview: image-preview image, other file types: filename
// 3. Support deleting file
// Analyze:
// 1. Container Component
// Props:
// - options: {maxFiles: number, allowedFileExtensions: string[]}
// State:
// - files : Array<{id: number, file: File}>
// 2. Select Files Component
// Props:
// - options: {maxFiles: number, allowedFileExtensions: string[]}
// State:
// - files: File[] ( FileList )
// 3. File Preview Component
// Props:
// - file: File

export const PreviewBox = (props: {
  style: React.CSSProperties;
  children: ReactElement;
}) => {
  const { style, children } = props;
  return <div style={style}>{children}</div>;
};

export const FilePreview = (props: { file: File }) => {
  const { file } = props;
  const isImage = fileHelpers.isImage(file.type);
  const fileUrl = fileHelpers.createFileUrl(file);
  const backgroundImage = isImage ? fileUrl : noImage;

  return (
    <PreviewBox
      style={{
        margin: '1rem'
      }}
    >
      <>
        <a
          rel="noreferrer"
          href={fileUrl}
          target={'_blank'}
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundColor: 'transparent',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '300px',
            display: 'block'
          }}
        ></a>
        <div className="file-name">{file.name.split('/').pop()}</div>
      </>
    </PreviewBox>
  );
};

export const HookExample = (props: HookExampleProps) => {
  const [files, setFile] = useState<Array<{ id: string; file: File }>>([]);
  const staticState = useRef({ isMounted: false });
  // methods
  const addNewFile = (file: File) => {
    setFile(files => {
      return [...files, { file, id: HashHelpers.generateUID() }];
    });
  };
  // componentDidMount
  useEffect(() => {
    // ReactJS 18 run componentDidMount Twice in StrictMode LOL :))
    if (!staticState.current.isMounted) {
      fileHelpers.createFileObjectFromUrl(noImage).then(file => {
        if (file) {
          addNewFile(file);
        }
      });
      fileHelpers.createFileObjectFromUrl(examplePDF).then(file => {
        if (file) {
          addNewFile(file);
        }
      });
      staticState.current.isMounted = true;
    }
  }, []);
  return (
    <>
      <h1>Example Hook</h1>
      <div className="grid grid-cols-4 gap-4">
        {files.length &&
          files.map(f => <FilePreview key={f.id} file={f.file}></FilePreview>)}
      </div>
    </>
  );
};
