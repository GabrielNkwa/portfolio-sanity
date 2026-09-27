// Join class names, skipping falsy values.
const cx = (...classes) => classes.filter(Boolean).join(' ');

export default cx;
