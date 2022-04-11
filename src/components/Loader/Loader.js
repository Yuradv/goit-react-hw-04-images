import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

const loader = () => {
  return (
    <div className={s.loader}>
      {<Oval color="#00BFFF" height={80} width={80} />}
    </div>
  );
};

export default loader;
