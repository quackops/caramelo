import type { ComponentProps, ElementType } from 'react';

export type SlotProps<
  P extends object,
  E extends ElementType = ElementType,
  OmitIntrinsic extends string = '',
> = P & SlotOwnProps<E, OmitIntrinsic>;

export type SlotAsProps<E extends ElementType = ElementType> = {
  as?: E;
};

export type SlotOwnProps<
  E extends ElementType,
  OmitIntrinsic extends string = '',
> = SlotAsProps<E> &
  Omit<ComponentProps<E>, keyof SlotAsProps<E> | OmitIntrinsic>;

export function Slot<E extends ElementType = ElementType>(
  props: SlotOwnProps<E>,
) {
  const { as, ...rest } = props;
  const Element = as as ElementType;

  return <Element {...rest} />;
}
