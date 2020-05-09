import React from 'react';
import clsx from 'clsx';

// components
import Aside from '../../components/aside/Aside';
import FormLogin from '../../components/form/FormLogin';
import Posts from '../../components/posts/Posts';

import styles from './Home.module.css';

const main = clsx(styles.main, 'container');

interface Props {}

const Home: React.FC<Props> = () => (
  <main className={main}>
    <Aside>
      <FormLogin />
    </Aside>
    <div className={styles.content}>
      <Posts />
    </div>
  </main>
);

export default Home;