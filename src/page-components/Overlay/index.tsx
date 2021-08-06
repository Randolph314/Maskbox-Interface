import { Countdown } from '@/components';
import classnames from 'classnames';
import React, { FC, HTMLProps, useMemo } from 'react';
import styles from './index.module.less';

const end = new Date(2021, 8, 3).getTime();

interface Props extends HTMLProps<HTMLDivElement> {}

export const Overlay: FC<Props> = (props) => {
  const randomEnd = useMemo(() => Math.random() > 0.5, []);
  return (
    <div {...props} className={classnames(styles.overlay, props.className)}>
      {randomEnd ? (
        <div className={styles.box}>
          <h2 className={styles.title}>Ended</h2>
        </div>
      ) : (
        <div className={styles.box}>
          <h2 className={styles.title}>Seascape Zombie Fighter Mystery Box</h2>
          <p className={styles.subtitle}>start sale in</p>
          <Countdown className={styles.countdown} end={end} />
        </div>
      )}
    </div>
  );
};
