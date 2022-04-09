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

// import { TailSpin } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// import s from './Loader.module.css';

// const loader = () => {
//   return (
//     <div className={s.loader}>
//       {<TailSpin height="80" width="80" color="00BFFF" ariaLabel="loading" />}
//     </div>
//   );
// };

// export default loader;
