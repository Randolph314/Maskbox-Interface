import { CollectionInfo, NFTInfo } from '@/contracts';
import classnames from 'classnames';
import React, { FC, HTMLProps } from 'react';
import styles from './index.module.less';

export interface NFTItemProps extends NFTInfo {
  name: string;
  imageUrl?: string;
}

const imagePlaceholder = 'https://picsum.photos/400/300';

export const NFTItem: FC<NFTItemProps> = ({ name, percentage, imageUrl = imagePlaceholder }) => {
  return (
    <div className={styles.nft}>
      <div className={styles.image}>
        <img src={imageUrl} alt={name} width="200" height="150" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.meta}>
          <span className={styles.metaName}>Probability</span>
          <span className={styles.metaValue}>{percentage ?? '-'}%</span>
        </p>
      </div>
    </div>
  );
};

interface CollectionProps extends HTMLProps<HTMLUListElement> {
  collection?: CollectionInfo;
}

export const Collection: FC<CollectionProps> = ({ collection, className, ...rest }) => {
  if (!collection) return null;

  const { _name: name, _nft_list: nfts = [] } = collection;

  return (
    <ul className={classnames(styles.nftList, className)} {...rest}>
      {nfts.map((nft) => (
        <li key={nft.latest_nft_id?._hex} className={styles.nftItem}>
          <NFTItem {...nft} name={name} />
        </li>
      ))}
    </ul>
  );
};
