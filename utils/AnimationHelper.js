export const cssAnimationHelper = (name, from, to, isOneComponent) => {
  const _ = isOneComponent ? "" : " ";
  const enter = `&${_}.${name}-enter`;
  const enterActive = `&${_}.${name}-enter-active`;
  const enterDone = `&${_}.${name}-enter-done`;

  const exit = `&${_}.${name}-exit`;
  const exitActive = `&${_}.${name}-exit-active`;
  const exitDone = `&${_}.${name}-exit-done`;
  return {
    [enter]: { ...from },
    [enterActive]: { ...to },
    [enterDone]: { ...to },
    [exit]: { ...to },
    [exitActive]: { ...from },
    [exitDone]: { ...from }
  }
}