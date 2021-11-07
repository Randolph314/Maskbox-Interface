import { Button, ButtonProps, Icon, LoadingIcon, SNSShare, VideoPlayer } from '@/components';
import { MediaType } from '@/contexts';
import { BoxRSS3Node } from '@/contexts/RSS3Provider';
import { MaskBoxQuery } from '@/graphql-hooks';
import { useGetERC20TokenInfo } from '@/hooks/useGetERC20TokenInfo';
import { TokenType, ZERO } from '@/lib';
import { BoxOnChain, ExtendedBoxInfo } from '@/types';
import classnames from 'classnames';
import { utils } from 'ethers';
import { FC, HTMLProps, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CountdownButton } from './CountdownButton';
import styles from './index.module.less';

export interface MaskboxProps extends Omit<HTMLProps<HTMLDivElement>, 'onLoad'> {
  boxOnSubgraph: MaskBoxQuery['maskbox'];
  boxOnChain: BoxOnChain | null;
  boxOnRSS3: Partial<Pick<BoxRSS3Node, 'mediaType' | 'mediaUrl' | 'activities'>> | null;
  inList?: boolean;
  onLoad?: (box: Partial<ExtendedBoxInfo>) => void;
  onPurchase?: () => void;
}

export const MysteryBox: FC<MaskboxProps> = ({
  boxOnSubgraph,
  boxOnRSS3,
  boxOnChain,
  className,
  inList,
  onLoad,
  onPurchase,
  ...rest
}) => {
  const box = useMemo(
    () => ({
      ...boxOnChain,
      ...boxOnRSS3,
      ...boxOnSubgraph,
    }),
    [boxOnChain, boxOnRSS3, boxOnSubgraph],
  );
  const chainId = box.chain_id;
  const boxId = box.box_id;
  const getERC20Token = useGetERC20TokenInfo();
  const [paymentToken, setPaymentToken] = useState<TokenType | null>(null);
  const payment = box.payment?.[0];
  const history = useHistory();

  useEffect(() => {
    if (box && onLoad) onLoad(box);
  }, [box, onLoad]);

  useEffect(() => {
    if (payment) {
      getERC20Token(payment.token_addr).then((token) => {
        if (token) {
          setPaymentToken(token);
        }
      });
    }
  }, [payment]);

  const startTime = box?.start_time ? box.start_time * 1000 : undefined;
  const notStarted = box.started === false || (startTime && startTime > Date.now());

  const price = useMemo(() => {
    if (payment?.price && paymentToken?.decimals) {
      const digit = utils.formatUnits(payment.price, paymentToken.decimals);
      return `${digit} ${paymentToken.symbol}`;
    }
  }, [payment?.price, paymentToken?.decimals]);
  const isSoldout = useMemo(
    () => box.remaining !== undefined && box.remaining.eq(ZERO),
    [box.remaining],
  );

  const buttonText = useMemo(() => {
    if (isSoldout) return 'Sold out';
    if (box.expired) {
      return 'Ended';
    } else if (inList) {
      return 'View Details';
    }

    return price ? `Draw ( ${price}/Time )` : <LoadingIcon size={24} />;
  }, [inList, price, isSoldout]);

  const buttonProps: ButtonProps = {
    className: styles.drawButton,
    colorScheme: 'primary',
    disabled: !inList && (!price || notStarted || box.expired || isSoldout),
    onClick: () => {
      if (inList) {
        history.push(`/details?chain=${box.chain_id}&box=${box.box_id}`);
      } else if (box.started && !box.expired && onPurchase) {
        onPurchase();
      }
    },
  };

  const total = useMemo(() => {
    // TODO If the box is set to sell all,
    // and the creator get a new NFT after creating the box
    // then remaining will be greater than total.
    // This will be fixed from the contract later
    if (box.total && box.remaining && box.remaining.gt(box.total)) {
      return box.remaining;
    }
    return box.total;
  }, [box.total, box.remaining]);

  const BoxCover = (
    <div className={styles.media}>
      {(() => {
        if (!box?.mediaUrl) return <Icon type="mask" size={48} />;

        switch (box.mediaType as MediaType) {
          case MediaType.Video:
            return <VideoPlayer src={box.mediaUrl} width="480" height="320" controls={!inList} />;
          case MediaType.Audio:
            return <audio src={box.mediaUrl} controls />;
          default:
            return (
              <img
                src={box.mediaUrl}
                loading="lazy"
                width="480"
                height="320"
                alt={box.name ?? '-'}
              />
            );
        }
      })()}
    </div>
  );

  return (
    <div className={classnames(styles.mysteryBox, className)} {...rest}>
      {inList ? <Link to={`/details?chain=${chainId}&box=${boxId}`}>{BoxCover}</Link> : BoxCover}
      <div className={styles.interaction}>
        <dl className={styles.infoList}>
          <dt className={styles.name} title={box.name}>
            {box.name ?? '-'}
          </dt>
          <dd className={styles.infoRow}>Lucky Draw</dd>
          <dd className={styles.infoRow}>Get your unique card (NFT) by lucky draw</dd>
          <dd className={styles.infoRow}>
            {total ? `${total.sub(box.remaining!).toString()}/${total.toString()}` : '-/-'}
          </dd>
          <dd className={styles.infoRow}>limit : {box.personal_limit?.toString()}</dd>
        </dl>
        {notStarted ? (
          <CountdownButton {...buttonProps} startTime={startTime!} />
        ) : (
          <Button {...buttonProps}>{buttonText}</Button>
        )}
      </div>
      {inList ? null : <SNSShare boxName={box.name ?? ''} className={styles.snsShare} />}
    </div>
  );
};