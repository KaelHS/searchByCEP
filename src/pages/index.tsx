import { FormSide } from "../components/FormSide";
import { ResponseSide } from "../components/ResponseSide";

import styles from './home.module.scss';

export default function Home() {

  return(
    <div className={styles.container}>
      <FormSide />
      <ResponseSide />
    </div>
  );
}