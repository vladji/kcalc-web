import { Spinner } from "../Spinner";
import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Spinner />
    </div>
  )
}
