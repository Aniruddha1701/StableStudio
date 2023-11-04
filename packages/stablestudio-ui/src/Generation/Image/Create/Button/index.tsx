import React, { useCallback, useMemo } from 'react';
import { Generation } from '~/Generation';
import { Theme } from '~/Theme';

export function Button({
  id,
  noTitle,
  noBrand,
  disabled,
  onIdleClick,
  onClick: originalOnClick,
  children,
  ...props
}: Button.Props) {
  const isEnabled = Generation.Image.Create.useIsEnabled();
  const { input } = Generation.Image.Input.use(id);

  const onClick = useCallback(
    (event: MouseEvent) => {
      originalOnClick?.(event);
      onIdleClick?.(event);
    },
    [onIdleClick, originalOnClick]
  );

  const handleFeedbackClick = () => {
    window.location.href = 'https://forms.gle/iDJZPHRG9nN4LvHs7';
  };

  const validated = useMemo(
    () => input && Generation.Image.Model.StableDiffusionV1.validate(input),
    [input]
  );

  if (!input) return null;
  return (
    <>
      <Theme.Button
        size="lg"
        color={noBrand ? 'zinc' : 'brand'}
        icon={Theme.Icon.Dream}
        disabled={disabled || !isEnabled || !validated}
        onClick={onClick}
        {...props}
      >
        {children ?? (!noTitle && <>Imagine</>)}
      </Theme.Button>
<br></br>
      {/* Feedback Button */}
      <Theme.Button
        size="lg"
        color={noBrand ? 'zinc' : 'brand'}
        icon={Theme.Icon.Feedback}
        disabled={disabled || !isEnabled || !validated}
        onClick={handleFeedbackClick}
        {...props}
      >
        Provide Feedback
      </Theme.Button>
    </>
  );
}

export namespace Button {
  export type Props = Theme.Button.Props & {
    id: ID;
    noTitle?: boolean;
    noBadge?: boolean;
    noBrand?: boolean;
    onIdleClick?: (event: MouseEvent) => void;
  };
}
