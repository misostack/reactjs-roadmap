const getFilenameFromContentDisposition = (res: Response) => {
  let filename = null;

  const disposition = res.headers.get('content-disposition');

  if (disposition?.includes('attachment')) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches?.[1]) {
      filename = matches[1].replace(/['"]/g, '');
      // Sometimes the filename comes in a URI encoded format so decode it
      filename = decodeURIComponent(filename);
      // Sometimes the filename starts with UTF-8, remove that
      filename = filename.replace(/^UTF-8/i, '').trim();
    }
  }

  return filename;
};
export default {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  isImage: (mimeTypes: string) => {
    return [
      'image/avif',
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/tiff',
      'image/webp'
    ].includes(mimeTypes);
  },
  createFileUrl: (object: Blob | File) => {
    return URL.createObjectURL(object);
  },

  createFileObjectFromUrl: async (url: string): Promise<File> => {
    const fileRes = await fetch(url);
    const blob = await fileRes.blob();

    const extractedFileName = getFilenameFromContentDisposition(fileRes);
    const fileName = extractedFileName ? url.split('/').pop() : `${url}`;

    const file = new File([blob], fileName || url, {
      type: blob.type
    });

    return file;
  }
};
