function CLAMP(a, b, c) {
  return Math.max(b, Math.min(c, a));
}

function DEG_TO_RAD(deg) {
  return deg * (Math.PI / 180);
}

function IS_POWER_OF_2(value) {
  return (value & (value - 1)) == 0;
}

function GET_RANDOM_INT(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function GET_RANDOM_FLOAT(min, max) {
  return (Math.random() * (max - min)) + min;
}

function TO_SIGNED_STRING(n) {
  return (n >= 0 ? '+ ' : '- ') + Math.abs(n);
}