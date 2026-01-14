
import { useContext, useState, useEffect } from 'react';
import { SubjectContext } from '../context/Subjectcontext';

const VideoPlayer = () => {
  const { departmentscontext, videoFiles,setVideoFiles } = useContext(SubjectContext);
  const [filename, setFilename] = useState('');

  const getvideo = async () => {
    if (!departmentscontext) return;
    try {
      const url = `http://localhost:3000/list/${encodeURIComponent(departmentscontext)}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn('Failed to fetch videos', res.status);
        return;
      }
      const data = await res.json();
      setFilename((Array.isArray(data.files) && data.files[0]) || '');
    } catch (err) {
      console.error('Error fetching videos', err);
    }
  };

  useEffect(() => {
    getvideo();
  }, [departmentscontext]);

  if (!departmentscontext || !filename) return <div className="p-4 text-sm text-slate-500">No video available</div>;

  return (
    <video
      width="800"
      controls
      preload="metadata"
      src={`http://localhost:3000/stream/${encodeURIComponent(departmentscontext)}/videos/${encodeURIComponent(filename)}`}
    />
  );
};

export default VideoPlayer;
