import { BoxesLoader } from 'react-awesome-loaders';

import s from './Loader.module.css';

const loader = () => {
  return (
    <div className={s.loader}>
      {
        <BoxesLoader
          boxColor={'#6366F1'}
          style={{ marginBottom: '20px' }}
          desktopSize={'128px'}
          mobileSize={'80px'}
        />
      }
    </div>
  );
};

export default loader;
