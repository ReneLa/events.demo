import cn from 'classnames';
import styles from './loading-dots.module.css';
import px from '../lib/to-pixels'


export default function LoadingDots({ size = 2, height, children, reverse }) {
  return (
    <span
      className={cn(styles.loading, { [styles.reverse]: reverse })}
      style={{
        ['--loading-dots-height']: height ? px(height) : undefined,
        ['--loading-dots-size' ]: size !== 2 ? px(size) : undefined
      }}
    >
      {children && <div className={styles.spacer}>{children}</div>}
      <span />
      <span />
      <span />
    </span>
  );
}